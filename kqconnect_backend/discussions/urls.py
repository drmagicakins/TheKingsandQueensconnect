from django.urls import path
from .views import (
    CategoryListView,
    ReportAPIView,
    ThreadListCreateView,
    ThreadDetailView,
    ReplyCreateView,
    QuestionCreateAPIView,
    public_questions,
    TrendingTagsView,
    QuestionSearchAPIView,
    TrendingTagsAPIView,
)
from .views import QuestionDetailAPIView, AnswerListCreateAPIView, AnswerCreateAPIView, QuestionVoteAPIView, AnswerVoteAPIView


urlpatterns = [
    path('categories/', CategoryListView.as_view()),
    path('threads/', ThreadListCreateView.as_view()),
    path('threads/<int:pk>/', ThreadDetailView.as_view()),
    path('threads/<int:thread_id>/reply/', ReplyCreateView.as_view()),
    path("public/", public_questions),
    path('questions/', QuestionCreateAPIView.as_view(), name='create-question'),
    path("tags/trending/", TrendingTagsView.as_view()),
    path(
        "questions/<int:question_id>/answers/",
        AnswerListCreateAPIView.as_view(),
        name="question-answers"
    ),
    path("answers/", AnswerCreateAPIView.as_view(), name="answer-create"),
    path("questions/<int:pk>/", QuestionDetailAPIView.as_view(), name="question-detail"),
    path("questions/<int:pk>/vote/", QuestionVoteAPIView.as_view()),
    path("answers/<int:pk>/vote/", AnswerVoteAPIView.as_view()),
    path("reports/", ReportAPIView.as_view()),
    path("questions/search/", QuestionSearchAPIView.as_view()),
    path("tags/trending/", TrendingTagsAPIView.as_view()),

]



