""" thi model defines the url routing endpoints in the api application """

from django.urls import include, path
from rest_framework import routers
from api import views
from .views import GetUserByUsernameView
from .views import UserToolsListView
from .views import UserEducationsListView
from .views import UserPostsListView
from .views import UserExperienceListView



router = routers.DefaultRouter()
# users route definition
router.register(r"users", views.UserDetailsViewSet)
# posts route definition
router.register(r"posts", views.PostViewSet, basename="posts")
# projects route definition
router.register(r"projects", views.ProjectViewSet, basename='projects')
# Tag route definition
router.register(r"tags", views.TagViewSet)
# Tool route definition
router.register(r"tools", views.ToolViewSet)
# Social route definition
router.register(r"socials", views.SocialViewSet)
# Skill route definition
router.register(r"skills", views.SkillViewSet)
# Education route definition
router.register(r"educations", views.EducationViewSet)
# Experience route definition
router.register(r"experiences", views.ExperienceViewSet)
# Rating route definition
router.register(r"ratings", views.RatingViewSet)
# Comment route definition
router.register(r"comments", views.CommentViewSet)
# Reply route definition
router.register(r"replies", views.ReplyViewSet)
# Share route definition
router.register(r"shares", views.ShareViewSet)
# Like route definition
router.register(r"likes", views.LikeViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    path("", include(router.urls)),
    path(
        "user/<str:username>/",
        GetUserByUsernameView.as_view(),
        name="get_user_by_username",
    ),
    path('users/<int:user_id>/tools/', UserToolsListView.as_view(), name='user-tools-list'),
    path('users/<int:user_id>/educations/', UserEducationsListView.as_view(), name='user-educations-list'),
    path('users/<int:user_id>/posts/', UserPostsListView.as_view(), name='user-posts-list'),
    path('users/<int:user_id>/experiences/', UserExperienceListView.as_view(), name='user-expereinces-list'),

]

