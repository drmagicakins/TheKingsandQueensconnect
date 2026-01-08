from rest_framework import serializers
from .models import AnswerVote, Category, QuestionVote, Thread, Reply, Tag, Question, Answer

from django.contrib.auth import get_user_model

User = get_user_model()



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']


class ReplySerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Reply
        fields = ['id', 'author', 'content', 'created_at']


class ThreadSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    replies = ReplySerializer(many=True, read_only=True)

    class Meta:
        model = Thread
        fields = [
            'id', 'author', 'category', 'title', 'content',
            'views', 'likes', 'created_at', 'replies'
        ]

class AnswerSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Answer
        fields = [
            "id",
            "question",
            "user",
            "content",
            "created_at",
        ]
        read_only_fields = ["user", "created_at"]

    
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = "__all__"
        read_only_fields = ("user", "created_at", "updated_at")

    def validate(self, data):
        request = self.context.get("request")

        is_draft = data.get("is_draft", False)

        if not is_draft and not request.user.is_authenticated:
            raise serializers.ValidationError(
                "You must be logged in to publish a question."
            )

        return data


votes_count = serializers.SerializerMethodField()

def get_votes_count(self, obj):
    return sum(v.value for v in obj.votes.all())

class QuestionVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionVote
        fields = ["id", "question", "user", "value"]
        read_only_fields = ["user"]
        
    def validate_value(self, value):
        if value not in [1, -1]:
            raise serializers.ValidationError("Vote value must be either +1 or -1.")
        return value

    votes_count = serializers.SerializerMethodField()

    def get_votes_count(self, obj):
        return sum(v.value for v in obj.votes.all())

    
class AnswerVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerVote
        fields = ["id", "answer", "user", "value"]
        read_only_fields = ["user"]

    def validate_value(self, value):
        if value not in [1, -1]:
            raise serializers.ValidationError("Vote value must be either +1 or -1.")
        return value

    votes_count = serializers.SerializerMethodField()

    def get_votes_count(self, obj):
        return sum(v.value for v in obj.votes.all())
    
class QuestionCreateSerializer(serializers.ModelSerializer):
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        many=True,
        write_only=True,
        required=False
    )

    class Meta:
        model = Question
        fields = ["title", "content", "tag_ids", "is_draft"]

    def create(self, validated_data):
        tags = validated_data.pop("tag_ids", [])
        question = Question.objects.create(**validated_data)
        question.tags.set(tags)
        return question


