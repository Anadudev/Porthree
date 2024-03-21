from django.urls import include, path
from rest_framework import routers
from api import views


router = routers.DefaultRouter()
router.register(r"users", views.UserDetailsViewSet)
router.register(r"posts", views.PostViewSet)
router.register(r"projects", views.ProjectViewSet)
router.register(r"Tag", views.TagViewSet)
router.register(r"Tool", views.ToolViewSet)
router.register(r"Social", views.SocialViewSet)
router.register(r"Skill", views.SkillViewSet)
router.register(r"Education", views.EducationViewSet)
router.register(r"Experience", views.ExperienceViewSet)
router.register(r"Rating", views.RatingViewSet)
router.register(r"Comment", views.CommentViewSet)
router.register(r"Reply", views.ReplyViewSet)
router.register(r"Share", views.ShareViewSet)
router.register(r"Like", views.LikeViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    path("", include(router.urls)),
]
