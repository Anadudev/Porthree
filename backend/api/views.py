from rest_framework import viewsets
from rest_framework import generics
from django.http import JsonResponse
from django.views import View
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from django_filters import rest_framework as filters

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


class ReadOnly(BasePermission):
    """will allow authenticated users to perform
    any request. Requests for unauthenticated users
    will only be permitted if the request method is
    one of the "safe" methods; GET, HEAD or OPTIONS"""

    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class UserDetailsViewSet(viewsets.ModelViewSet):
    """adds representations of the to to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = UserDetails.objects.all().order_by("-date_joined")
    serializer_class = UserDetailsSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ["username", "id"]


class PostViewSet(viewsets.ModelViewSet):
    """adds representations of the Post to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = PostSerializer
    queryset = Post.objects.all().order_by("-created_at")
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ["slug", "id"]


class UserPostsListView(generics.ListAPIView):
    """manage posts associated with specific user"""

    serializer_class = PostSerializer

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        return Post.objects.filter(user_id=user_id)


class ProjectViewSet(viewsets.ModelViewSet):
    """adds representations of the Project to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all().order_by("-created_at")
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ["slug", "id"]


class UserProjectsListView(generics.ListAPIView):
    """manage projects associated with specific user"""

    serializer_class = ProjectSerializer

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        return Project.objects.filter(user_id=user_id)


class TagViewSet(viewsets.ModelViewSet):
    """adds representations of the Tag to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Tag.objects.all().order_by("-created_at")
    serializer_class = TagSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ["tag", "id"]


class ToolViewSet(viewsets.ModelViewSet):
    """adds representations of the Tool to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Tool.objects.all().order_by("-created_at")
    serializer_class = ToolSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ["tool", "id"]


class SocialViewSet(viewsets.ModelViewSet):
    """adds representations of the Social to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Social.objects.all().order_by("-created_at")
    serializer_class = SocialSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ["social", "id"]


class SkillViewSet(viewsets.ModelViewSet):
    """adds representations of the Skill to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Skill.objects.all().order_by("-created_at")
    serializer_class = SkillSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ["skill", "id"]


class EducationViewSet(viewsets.ModelViewSet):
    """adds representations of the Education to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Education.objects.all().order_by("-created_at")
    serializer_class = EducationSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ["institute", "id"]


class UserEducationsListView(generics.ListAPIView):
    """manage educations associated with specific user"""

    serializer_class = EducationSerializer

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        return Education.objects.filter(user_id=user_id).order_by("-created_at")


class ExperienceViewSet(viewsets.ModelViewSet):
    """adds representations of the Experience to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Experience.objects.all().order_by("-created_at")
    serializer_class = ExperienceSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ["company", "id"]


class UserExperienceListView(generics.ListAPIView):
    """manage experiences associated with specific user"""

    serializer_class = ExperienceSerializer

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        return Experience.objects.filter(user_id=user_id).order_by("-created_at")


class RatingViewSet(viewsets.ModelViewSet):
    """adds representations of the Rating to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Rating.objects.all().order_by("-created_at")
    serializer_class = RatingSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ["rate", "id"]


class CommentViewSet(viewsets.ModelViewSet):
    """adds representations of the Comment to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Comment.objects.all().order_by("-created_at")
    serializer_class = CommentSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ["comment", "id"]


class ReplyViewSet(viewsets.ModelViewSet):
    """adds representations of the Reply to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Reply.objects.all().order_by("-created_at")
    serializer_class = ReplySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ["reply", "id"]


class ShareViewSet(viewsets.ModelViewSet):
    """adds representations of the Share to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Share.objects.all().order_by("-created_at")
    serializer_class = ShareSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ["id"]


class LikeViewSet(viewsets.ModelViewSet):
    """adds representations of the Like to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Like.objects.all().order_by("-created_at")
    serializer_class = LikeSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ["like", "id"]


class GetUserByUsernameView(View):
    """this class get a user based on user name passed to the url endpoint"""

    def get(self, request, username):
        try:
            user = UserDetails.objects.get(username=username)
            serialized_user = {
                "id": user.id,
                "username": user.username,
                # "url": user.url,
            }
            return JsonResponse(serialized_user)
        except ObjectDoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)
