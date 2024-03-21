from rest_framework import viewsets
from .models import (
    UserDetails,
    Post,
    Project,
    Tag,
    Tool,
    Social,
    Skill,
    Education,
    Experience,
    Rating,
    Comment,
    Reply,
    Share,
    Like,
)
from .serializers import (
    UserDetailsSerializer,
    PostSerializer,
    ProjectSerializer,
    TagSerializer,
    ToolSerializer,
    SocialSerializer,
    SkillSerializer,
    EducationSerializer,
    ExperienceSerializer,
    RatingSerializer,
    CommentSerializer,
    ReplySerializer,
    ShareSerializer,
    LikeSerializer
)


class UserDetailsViewSet(viewsets.ModelViewSet):
    queryset = UserDetails.objects.all().order_by("date_joined")
    serializer_class = UserDetailsSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by("created_at")
    serializer_class = PostSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by("created_at")
    serializer_class = ProjectSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all().order_by("created_at")
    serializer_class = TagSerializer


class ToolViewSet(viewsets.ModelViewSet):
    queryset = Tool.objects.all().order_by("created_at")
    serializer_class = ToolSerializer


class SocialViewSet(viewsets.ModelViewSet):
    queryset = Social.objects.all().order_by("created_at")
    serializer_class = SocialSerializer


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().order_by("created_at")
    serializer_class = SkillSerializer


class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all().order_by("created_at")
    serializer_class = EducationSerializer


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all().order_by("created_at")
    serializer_class = ExperienceSerializer


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all().order_by("created_at")
    serializer_class = RatingSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by("created_at")
    serializer_class = CommentSerializer


class ReplyViewSet(viewsets.ModelViewSet):
    queryset = Reply.objects.all().order_by("created_at")
    serializer_class = ReplySerializer


class ShareViewSet(viewsets.ModelViewSet):
    queryset = Share.objects.all().order_by("created_at")
    serializer_class = ShareSerializer


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all().order_by("created_at")
    serializer_class = LikeSerializer
