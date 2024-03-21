""" declaring serializers that work very similar to Django's forms """

from rest_framework import serializers
from api.models import (
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


class UserDetailsSerializer(serializers.ModelSerializer):
    """serializing and deserializing the UserDetails instances into representations such as json"""

    class Meta:
        model = UserDetails
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    """serializing and deserializing the Post instances into representations such as json"""

    class Meta:
        model = Post
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    """serializing and deserializing the Project instances into representations such as json"""

    class Meta:
        model = Project
        fields = "__all__"


class TagSerializer(serializers.ModelSerializer):
    """serializing and deserializing the Tag instances into representations such as json"""

    class Meta:
        model = Tag
        fields = "__all__"


class ToolSerializer(serializers.ModelSerializer):
    """serializing and deserializing the Tool instances into representations such as json"""

    class Meta:
        model = Tool
        fields = "__all__"


class SocialSerializer(serializers.ModelSerializer):
    """serializing and deserializing the Social instances into representations such as json"""

    class Meta:
        model = Social
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    """serializing and deserializing the Skill instances into representations such as json"""

    class Meta:
        model = Skill
        fields = "__all__"


class EducationSerializer(serializers.ModelSerializer):
    """serializing and deserializing the Education instances into representations such as json"""

    class Meta:
        model = Education
        fields = "__all__"


class ExperienceSerializer(serializers.ModelSerializer):
    """serializing and deserializing the Experience instances into representations such as json"""

    class Meta:
        model = Experience
        fields = "__all__"


class RatingSerializer(serializers.ModelSerializer):
    """serializing and deserializing the Rating instances into representations such as json"""

    class Meta:
        model = Rating
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    """serializing and deserializing the Comment instances into representations such as json"""

    class Meta:
        model = Comment
        fields = "__all__"


class ReplySerializer(serializers.ModelSerializer):
    """serializing and deserializing the Reply instances into representations such as json"""

    class Meta:
        model = Reply
        fields = "__all__"


class ShareSerializer(serializers.ModelSerializer):
    """serializing and deserializing the Share instances into representations such as json"""

    class Meta:
        model = Share
        fields = "__all__"


class LikeSerializer(serializers.ModelSerializer):
    """serializing and deserializing the Like instances into representations such as json"""

    class Meta:
        model = Like
        fields = "__all__"
