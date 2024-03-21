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


class Project(models.Model):
    """Represents a project created by a user."""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    contributors = models.ManyToManyField(
        UserDetails, related_name="contributed_projects", blank=True
    )
    slug = models.SlugField(unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to="project_images/", blank=True)
    demo = models.URLField(blank=True)
    video = models.FileField(upload_to="project_videos/", blank=True)
    content = models.TextField(blank=True, null=True)
    publish = models.BooleanField(default=False)

    def __str__(self):
        return str(self.title)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Tag(models.Model):
    """Represents a tag that can be associated with posts or projects."""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE)
    post = models.ManyToManyField(Post, related_name="tags", blank=True)
    project = models.ManyToManyField(Project, related_name="tags", blank=True)
    tag = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.tag)


class Tool(models.Model):
    """Represents a tool used in a project."""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE)
    project = models.ManyToManyField(Project, related_name="tools", blank=True)
    icon = models.ImageField(upload_to="tool_icons/", blank=True)
    tool = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.tool)


class Social(models.Model):
    """Represents a social media link for a user."""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    icon = models.ImageField(upload_to="social_icons/", blank=True)
    social = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self):
        return str(self.social)


class Skill(models.Model):
    """Represents a skill of a user."""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    skill = models.CharField(max_length=255)
    detail = models.TextField()

    def __str__(self):
        return str(self.skill)


class Education(models.Model):
    """Represents an educational experience of a user."""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    institute = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    detail = models.TextField()

    def __str__(self):
        return f"{self.degree} at {self.institute}"


class Experience(models.Model):
    """Represents a work experience of a user."""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    company = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    detail = models.TextField()

    def __str__(self):
        return f"{self.position} at {self.company}"


class Rating(models.Model):
    """Represents a rating given to a project by a user."""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    rate = models.IntegerField(default=0, choices=[(i, i) for i in range(1, 6)])
    complement = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Rating {self.rate} for {self.project}"


class Comment(models.Model):
    """Represents a comment on a post by a user."""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user} commented on {self.post} at {self.created_at}"


class Reply(models.Model):
    """Represents a reply to a comment or a post."""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, null=True, blank=True
    )
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    reply = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (
            f"Reply by {self.user} on {self.post or self.project} at {self.created_at}"
        )


class Share(models.Model):
    """Represents a share of a post or a project."""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, null=True, blank=True
    )
    thought = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (
            f"Share by {self.user} on {self.post or self.project} at {self.created_at}"
        )


class Like(models.Model):
    """Represents a like on a post, project, comment, reply, or share."""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, null=True, blank=True
    )
    comment = models.ForeignKey(
        Comment, on_delete=models.CASCADE, null=True, blank=True
    )
    reply = models.ForeignKey(Reply, on_delete=models.CASCADE, null=True, blank=True)
    share = models.ForeignKey(Share, on_delete=models.CASCADE, null=True, blank=True)
    like = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Like by {self.user} on {self.post or self.project or self.comment or self.reply or self.share} at {self.created_at}"
