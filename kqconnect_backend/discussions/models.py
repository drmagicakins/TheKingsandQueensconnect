from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Thread(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='discussion_threads')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=255)
    content = models.TextField()

    views = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Reply(models.Model):
    thread = models.ForeignKey(Thread, related_name="replies", on_delete=models.CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='discussion_replies')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)
    usage_count = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-usage_count"]

    def __str__(self):
        return self.name
    
class Question(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="questions")
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    tags = models.ManyToManyField(Tag, related_name="questions", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_draft = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} | {self.user}"

class Answer(models.Model):
    question = models.ForeignKey(
        "Question",
        on_delete=models.CASCADE,
        related_name="answers"
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="answers"
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_approved = models.BooleanField(default=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"Answer by {self.user} on {self.question_id}"


class QuestionVote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="votes"
    )
    value = models.SmallIntegerField()  # +1 or -1
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "question")


class AnswerVote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    answer = models.ForeignKey(
        Answer,
        on_delete=models.CASCADE,
        related_name="votes"
    )
    value = models.SmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "answer")

class Report(models.Model):
    REPORT_REASONS = [
        ("spam", "Spam"),
        ("abuse", "Abusive or hateful"),
        ("misinformation", "Misinformation"),
        ("irrelevant", "Irrelevant"),
        ("other", "Other"),
    ]

    reporter = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reports_made"
    )

    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="reports"
    )

    answer = models.ForeignKey(
        Answer,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="reports"
    )

    reason = models.CharField(max_length=20, choices=REPORT_REASONS)
    comment = models.TextField(blank=True)
    resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        target = self.question or self.answer
        return f"Report on {target} by {self.reporter}"
    

