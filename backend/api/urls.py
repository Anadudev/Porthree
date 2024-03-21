""" thi model defines the url routing endpoints in the api application """

from django.urls import include, path
from rest_framework import routers
from api import views


router = routers.DefaultRouter()
# users route definition
router.register(r"users", views.UserDetailsViewSet)
# posts route definition
router.register(r"posts", views.PostViewSet)
# projects route definition
router.register(r"projects", views.ProjectViewSet)
# Tag route definition
router.register(r"Tag", views.TagViewSet)
# Tool route definition
router.register(r"Tool", views.ToolViewSet)
# Social route definition
router.register(r"Social", views.SocialViewSet)
# Skill route definition
router.register(r"Skill", views.SkillViewSet)
# Education route definition
router.register(r"Education", views.EducationViewSet)
# Experience route definition
router.register(r"Experience", views.ExperienceViewSet)
# Rating route definition
router.register(r"Rating", views.RatingViewSet)
# Comment route definition
router.register(r"Comment", views.CommentViewSet)
# Reply route definition
router.register(r"Reply", views.ReplyViewSet)
# Share route definition
router.register(r"Share", views.ShareViewSet)
# Like route definition
router.register(r"Like", views.LikeViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    path("", include(router.urls)),
]
