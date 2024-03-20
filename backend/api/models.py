"""
AbstractUser: to extend the builtin use model
models: to setup a django model
"""

from django.contrib.auth.models import AbstractUser
from django.db import models


class UserDetails(AbstractUser):
    """extends the built in django user model to contain more
    fields needed for the project

    Args:
        AbstractUser (_type_): An abstract base class implementing
        a fully featured User model with admin-compliant permissions

    Returns:
        _str_: username
    """

    middle_name = models.CharField(max_length=255, blank=True, null=True)
    career = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    about = models.TextField(blank=True, null=True)
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    primary_color = models.CharField(max_length=50, blank=True, null=True)
    secondary_color = models.CharField(max_length=50, blank=True, null=True)
    picture = models.ImageField(upload_to="profile_pics/", blank=True, null=True)

    def __str__(self):
        return str(self.username)
