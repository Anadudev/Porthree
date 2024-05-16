""" thi model defines the url routing endpoints in the api application """

from django.urls import include, path
from rest_framework import routers
from api import views
from .views import (
    GetUserByUsernameView,
    UserEducationsListView,
    UserPostsListView,
    UserExperienceListView,
    UserProjectsListView,
)


router = routers.DefaultRouter()
# users route definition
router.register(r"users", views.UserDetailsViewSet, basename="userdetails")
# posts route definition
router.register(r"posts", views.PostViewSet, basename="post")
# projects route definition
router.register(r"projects", views.ProjectViewSet, basename="project")
# Tag route definition
router.register(r"tags", views.TagViewSet, basename="tag")
# All Tags route definition
router.register(r"all_tags", views.AllTagViewSet, basename="all_tag")
# all Tools route definition
router.register(r"all_tools", views.AllToolViewSet, basename="all_tool")
# Tool route definition
router.register(r"tools", views.ToolViewSet, basename="tool")
# Social route definition
router.register(r"socials", views.SocialViewSet, basename="social")
# Skill route definition
router.register(r"skills", views.SkillViewSet, basename="skill")
# Education route definition
router.register(r"educations", views.EducationViewSet, basename="education")
# Experience route definition
router.register(r"experiences", views.ExperienceViewSet, basename="experience")
# Rating route definition
router.register(r"ratings", views.RatingViewSet, basename="rating")
# Comment route definition
router.register(r"comments", views.CommentViewSet, basename="comment")
# Reply route definition
router.register(r"replies", views.ReplyViewSet, basename="replie")
# Share route definition
router.register(r"shares", views.ShareViewSet, basename="share")
# Like route definition
router.register(r"likes", views.LikeViewSet, basename="like")

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

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
        name="user-expereinces-list",
    ),
    path(
        "users/<int:user_id>/projects/",
        UserProjectsListView.as_view(),
        name="user-projects-list",
    ),
    # path("all/tags", AllTagViewSet.as_view(), name="all-tags-list"),
]
