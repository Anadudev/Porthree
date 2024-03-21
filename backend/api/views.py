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
    LikeSerializer,
)


class UserDetailsViewSet(viewsets.ModelViewSet):
    """adds representations of the to to the API view"""

    queryset = UserDetails.objects.all().order_by("date_joined")
    serializer_class = UserDetailsSerializer


class PostViewSet(viewsets.ModelViewSet):
    """adds representations of the Post to the API view"""

    queryset = Post.objects.all().order_by("created_at")
    serializer_class = PostSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    """adds representations of the Project to the API view"""

    queryset = Project.objects.all().order_by("created_at")
    serializer_class = ProjectSerializer


class TagViewSet(viewsets.ModelViewSet):
    """adds representations of the Tag to the API view"""

    queryset = Tag.objects.all().order_by("created_at")
    serializer_class = TagSerializer


class ToolViewSet(viewsets.ModelViewSet):
    """adds representations of the Tool to the API view"""

    queryset = Tool.objects.all().order_by("created_at")
    serializer_class = ToolSerializer


class SocialViewSet(viewsets.ModelViewSet):
    """adds representations of the Social to the API view"""

    queryset = Social.objects.all().order_by("created_at")
    serializer_class = SocialSerializer


class SkillViewSet(viewsets.ModelViewSet):
    """adds representations of the Skill to the API view"""

    queryset = Skill.objects.all().order_by("created_at")
    serializer_class = SkillSerializer


class EducationViewSet(viewsets.ModelViewSet):
    """adds representations of the Education to the API view"""

    queryset = Education.objects.all().order_by("created_at")
    serializer_class = EducationSerializer


class ExperienceViewSet(viewsets.ModelViewSet):
    """adds representations of the Experience to the API view"""

    queryset = Experience.objects.all().order_by("created_at")
    serializer_class = ExperienceSerializer


class RatingViewSet(viewsets.ModelViewSet):
    """adds representations of the Rating to the API view"""

    queryset = Rating.objects.all().order_by("created_at")
    serializer_class = RatingSerializer


class CommentViewSet(viewsets.ModelViewSet):
    """adds representations of the Comment to the API view"""

    queryset = Comment.objects.all().order_by("created_at")
    serializer_class = CommentSerializer


class ReplyViewSet(viewsets.ModelViewSet):
    """adds representations of the Reply to the API view"""

    queryset = Reply.objects.all().order_by("created_at")
    serializer_class = ReplySerializer


class ShareViewSet(viewsets.ModelViewSet):
    """adds representations of the Share to the API view"""

    queryset = Share.objects.all().order_by("created_at")
    serializer_class = ShareSerializer


class LikeViewSet(viewsets.ModelViewSet):
    """adds representations of the Like to the API view"""

    queryset = Like.objects.all().order_by("created_at")
    serializer_class = LikeSerializer
