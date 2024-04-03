from rest_framework import viewsets
from rest_framework import generics
from django.http import JsonResponse
from django.views import View
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
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
    queryset = UserDetails.objects.all().order_by("date_joined")
    serializer_class = UserDetailsSerializer


class PostViewSet(viewsets.ModelViewSet):
    """adds representations of the Post to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = PostSerializer
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given post,
        by filtering against a `slug` query parameter in the URL.
        """
        queryset = Post.objects.all().order_by("created_at")
        slug = self.request.query_params.get('slug')
        if slug is not None:
            queryset = queryset.filter(slug=slug)
        return queryset

class UserPostsListView(generics.ListAPIView):
    """ manage posts associated with specific user"""
    serializer_class = PostSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']  # assuming you pass user_id in URL
        return Post.objects.filter(user_id=user_id)

class ProjectViewSet(viewsets.ModelViewSet):
    """adds representations of the Project to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = ProjectSerializer
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given project,
        by filtering against a `slug` query parameter in the URL.
        """
        queryset = Project.objects.all().order_by("created_at")
        slug = self.request.query_params.get('slug')
        if slug is not None:
            queryset = queryset.filter(slug=slug)
        return queryset



class TagViewSet(viewsets.ModelViewSet):
    """adds representations of the Tag to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Tag.objects.all().order_by("created_at")
    serializer_class = TagSerializer


class ToolViewSet(viewsets.ModelViewSet):
    """adds representations of the Tool to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Tool.objects.all().order_by("created_at")
    serializer_class = ToolSerializer

class UserToolsListView(generics.ListAPIView):
    """ manage tools associated with specific users"""
    serializer_class = ToolSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']  # assuming you pass user_id in URL
        return Tool.objects.filter(user_id=user_id)

class SocialViewSet(viewsets.ModelViewSet):
    """adds representations of the Social to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Social.objects.all().order_by("created_at")
    serializer_class = SocialSerializer


class SkillViewSet(viewsets.ModelViewSet):
    """adds representations of the Skill to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Skill.objects.all().order_by("created_at")
    serializer_class = SkillSerializer


class EducationViewSet(viewsets.ModelViewSet):
    """adds representations of the Education to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Education.objects.all().order_by("created_at")
    serializer_class = EducationSerializer

class UserEducationsListView(generics.ListAPIView):
    """ manage educations associated with specific user"""
    serializer_class = EducationSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']  # assuming you pass user_id in URL
        return Education.objects.filter(user_id=user_id)

class ExperienceViewSet(viewsets.ModelViewSet):
    """adds representations of the Experience to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Experience.objects.all().order_by("created_at")
    serializer_class = ExperienceSerializer

class UserExperienceListView(generics.ListAPIView):
    """ manage experiences associated with specific user"""
    serializer_class = ExperienceSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']  # assuming you pass user_id in URL
        return Experience.objects.filter(user_id=user_id)

class RatingViewSet(viewsets.ModelViewSet):
    """adds representations of the Rating to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Rating.objects.all().order_by("created_at")
    serializer_class = RatingSerializer


class CommentViewSet(viewsets.ModelViewSet):
    """adds representations of the Comment to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Comment.objects.all().order_by("created_at")
    serializer_class = CommentSerializer


class ReplyViewSet(viewsets.ModelViewSet):
    """adds representations of the Reply to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Reply.objects.all().order_by("created_at")
    serializer_class = ReplySerializer


class ShareViewSet(viewsets.ModelViewSet):
    """adds representations of the Share to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Share.objects.all().order_by("created_at")
    serializer_class = ShareSerializer


class LikeViewSet(viewsets.ModelViewSet):
    """adds representations of the Like to the API view"""

    permission_classes = [IsAuthenticated | ReadOnly]
    queryset = Like.objects.all().order_by("created_at")
    serializer_class = LikeSerializer

class GetUserByUsernameView(View):
    def get(self, request, username):
        try:
            user = UserDetails.objects.get(username=username)
            serialized_user = {
                'id': user.id,
                'username': user.username,
            }
            return JsonResponse(serialized_user)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
