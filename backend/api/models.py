"""
AbstractUser: to extend the builtin use model
models: to setup a django model
"""

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.text import slugify


class UserDetails(AbstractUser):
    """extends the built in django user model to contain more
    fields needed for the project

    Args:
        AbstractUser (_type_): An abstract base class implementing
        a fully featured User model with admin-compliant permissions
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
        """returns the string representation of the  model

        Returns:
            __str__: username
        """
        return str(self.username)

    def full_name(self):
        """gets a users full name

        Returns:
            _str_: users full name
        """
        return f"{self.first_name} {self.middle_name} {self.last_name}"


class Post(models.Model):
    """post model representing users post table in the application

    Args:
        models (_models_): django model

    """

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    post_image = models.ImageField(upload_to="post_images/", blank=True)
    content = models.TextField(blank=True, null=True)
    publish = models.BooleanField(default=False)

    def __str__(self):
        """returns the string representation of the Post model

        Returns:
            _str_: post title
        """
        return str(self.title)

    def save(self, *args, **kwargs):
        """automatically generates posts slug from post title"""
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
