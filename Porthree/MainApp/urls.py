""" views: MainApp views
"""
from django.urls import path
from django.contrib.auth import views as auth_views
from .views import (
    user_logout,
    portfolio,
    signup,
    user_login,
    index,
    user_details_form,
    create_project,
    create_skill,
    create_post,
    post_detail,
)

urlpatterns = [
    path('', index, name="index"),
    path("signup/", signup, name="signup"),
    path("login/", user_login, name="login"),
    path("logout/", user_logout, name="logout"),
    path("user/<username>", portfolio, name="portfolio"),
    path("user-details/", user_details_form, name="user-details"),
    path("create-skills/", create_skill, name="create-skills"),
    path("create-project/", create_project, name="create-project"),
    path("edit-project/<uuid:project_id>/", create_project, name="edit-project"),
    path("create-post/", create_post, name="create-post"),
    path("edit-post/<uuid:post_id>/", create_post, name="edit-post"),
    path('posts/<slug:slug>/', post_detail, name='post-detail'),

    # password reset end points

    path('password_reset/', auth_views.PasswordResetView.as_view(
        template_name='MainApp/password_reset.html',), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(
        template_name='MainApp/password_reset_done.html',), name='password_reset_done'),

    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(
        template_name='MainApp/password_reset_confirm.html', ), name='password_reset_confirm'),

    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(
        template_name='MainApp/password_reset_complete.html',), name='password_reset_complete')
]


# the following settings are to ensured django serves files

from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
