from rest_framework import generics, permissions
from .models import Category, Thread, Reply, Question, Tag, Answer, QuestionVote, AnswerVote, Report
from .serializers import CategorySerializer, ThreadSerializer, ReplySerializer, QuestionSerializer, TagSerializer, AnswerSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from django.db.models import Q

from django.utils.timezone import now
from datetime import timedelta


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ThreadListCreateView(generics.ListCreateAPIView):
    queryset = Thread.objects.select_related('author').all().order_by('-created_at')
    serializer_class = ThreadSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ThreadDetailView(generics.RetrieveAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer

    def get_object(self):
        obj = super().get_object()
        obj.views += 1
        obj.save(update_fields=['views'])
        return obj


class ReplyCreateView(generics.CreateAPIView):
    serializer_class = ReplySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        thread_id = self.kwargs['thread_id']
        serializer.save(
            author=self.request.user,
            thread=Thread.objects.get(id=thread_id)
        )

@api_view(['GET'])
def public_questions(request):
    questions = Thread.objects.filter(is_active=True).order_by('-created_at')[:20]

    data = []
    for q in questions:
        data.append({
            "id": q.id,
            "title": q.title,
            "preview": q.content[:120] + "...",
            "answers_count": q.replies.count(),
        })

    return Response(data)

class QuestionCreateAPIView(generics.CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

## create for QuestionDetailAPIView
class QuestionDetailAPIView(RetrieveAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]
    
class TrendingTagsView(APIView):
    def get(self, request):
        tags = Tag.objects.all()[:10]
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)

class QuestionCreateAPIView(generics.CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        user = None
        if self.request.user.is_authenticated:
            user = self.request.user

        serializer.save(user=user)

class AnswerListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = AnswerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        question_id = self.kwargs["question_id"]
        return Answer.objects.filter(
            question_id=question_id,
            is_approved=True
        )

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            question_id=self.kwargs["question_id"]
        )

class AnswerCreateAPIView(generics.CreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class QuestionVoteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        value = int(request.data.get("value"))  # +1 or -1
        question = Question.objects.get(pk=pk)

        vote, created = QuestionVote.objects.get_or_create(
            user=request.user,
            question=question,
            defaults={"value": value}
        )

        if not created:
            if vote.value == value:
                vote.delete()  # toggle off
            else:
                vote.value = value
                vote.save()

        score = sum(v.value for v in question.votes.all())
        return Response({"score": score})


class AnswerVoteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        value = int(request.data.get("value"))
        answer = Answer.objects.get(pk=pk)

        vote, created = AnswerVote.objects.get_or_create(
            user=request.user,
            answer=answer,
            defaults={"value": value}
        )

        if not created:
            if vote.value == value:
                vote.delete()
            else:
                vote.value = value
                vote.save()

        score = sum(v.value for v in answer.votes.all())
        return Response({"score": score})

class ReportAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        question_id = data.get("question")
        answer_id = data.get("answer")

        if not question_id and not answer_id:
            return Response(
                {"detail": "Report must target a question or answer"},
                status=400
            )

        report = Report.objects.create(
            reporter=request.user,
            question=Question.objects.get(id=question_id) if question_id else None,
            answer=Answer.objects.get(id=answer_id) if answer_id else None,
            reason=data.get("reason"),
            comment=data.get("comment", "")
        )

        return Response({"detail": "Report submitted"})

class QuestionSearchAPIView(ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        qs = Question.objects.filter(is_draft=False)
        query = self.request.query_params.get("q")
        tag = self.request.query_params.get("tag")

        if query:
            qs = qs.filter(
                Q(title__icontains=query) |
                Q(content__icontains=query) |
                Q(tags__name__icontains=query)
            ).distinct()

        if tag:
            qs = qs.filter(tags__slug=tag)

        return qs


class TrendingTagsAPIView(ListAPIView):
    serializer_class = TagSerializer

    def get_queryset(self):
        last_7_days = now() - timedelta(days=7)
        return (
            Tag.objects.filter(questions__created_at__gte=last_7_days)
            .distinct()
            .order_by("-questions__created_at")[:10]
        )
