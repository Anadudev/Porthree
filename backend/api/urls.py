""" thi model defines the url routing endpoints in the api application """

from django.urls import include, path
from rest_framework import routers
from .views import (
    GetUserByUsernameView,
    UserEducationsListView,
    UserPostsListView,
    UserExperienceListView,
    UserProjectsListView,
    UserDetailsViewSet,
    PostViewSet,
    ProjectViewSet,
    TagViewSet,
    AllTagViewSet,
    AllToolViewSet,
    ToolViewSet,
    SocialViewSet,
    SkillViewSet,
    EducationViewSet,
    ExperienceViewSet,
    RatingViewSet,
    PostCommentViewSet,
    ProjectCommentViewSet,
    ShareViewSet,
    LikeViewSet,
)


router = routers.DefaultRouter()
# users route definition
router.register(r"users", UserDetailsViewSet, basename="userdetails")
# posts route definition
router.register(r"posts", PostViewSet, basename="post")
# projects route definition
router.register(r"projects", ProjectViewSet, basename="project")
# Tag route definition
router.register(r"tags", TagViewSet, basename="tag")
# All Tags route definition
router.register(r"all_tags", AllTagViewSet, basename="all_tag")
# all Tools route definition
router.register(r"all_tools", AllToolViewSet, basename="all_tool")
# Tool route definition
router.register(r"tools", ToolViewSet, basename="tool")
# Social route definition
router.register(r"socials", SocialViewSet, basename="social")
# Skill route definition
router.register(r"skills", SkillViewSet, basename="skill")
# Education route definition
router.register(r"educations", EducationViewSet, basename="education")
# Experience route definition
router.register(r"experiences", ExperienceViewSet, basename="experience")
# Rating route definition
router.register(r"ratings", RatingViewSet, basename="rating")
# Post Comment route definition
router.register(r"post_comments", PostCommentViewSet, basename="postcomment")
# project Comment route definition
router.register(r"project_comments", ProjectCommentViewSet, basename="projectcomment")
# Share route definition
router.register(r"shares", ShareViewSet, basename="share")
# Like route definition
router.register(r"likes", LikeViewSet, basename="like")

# defining url patterns
urlpatterns = [
    path("", include(router.urls)),
    path(
        "user/<str:username>/",
        GetUserByUsernameView.as_view(),
        name="get_user_by_username",
    ),
    path(
        "users/<int:user_id>/educations/",
        UserEducationsListView.as_view(),
        name="user-educations-list",
    ),
    path(
        "users/<int:user_id>/posts/",
        UserPostsListView.as_view(),
        name="user-posts-list",
    ),
    path(
        "users/<int:user_id>/experiences/",
        UserExperienceListView.as_view(),
        name="user-experiences-list",
    ),
    path(
        "users/<int:user_id>/projects/",
        UserProjectsListView.as_view(),
        name="user-projects-list",
    ),
    # path("all/tags", AllTagViewSet.as_view(), name="all-tags-list"),
]
