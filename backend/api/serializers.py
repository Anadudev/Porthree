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


class UserDetailsSerializer(serializers.HyperlinkedModelSerializer):
    """serializing and deserializing the UserDetails instances into representations such as json"""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = UserDetails
        fields = [
            "url",
            "id",
            "last_login",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_active",
            "date_joined",
            "middle_name",
            "career",
            "bio",
            "location",
            "about",
            "phone",
            "primary_color",
            "secondary_color",
            "picture",
            "groups",
            "tools",
        ]


class TagSerializer(serializers.HyperlinkedModelSerializer):
    """serializing and deserializing the Tag instances into representations such as json"""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Tag
        fields = "__all__"


class PostSerializer(serializers.HyperlinkedModelSerializer):
    """serializing and deserializing the Post instances into representations such as json"""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Post
        fields = "__all__"


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    """serializing and deserializing the Project instances into representations such as json"""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Project
        fields = "__all__"


class ToolSerializer(serializers.HyperlinkedModelSerializer):
    """serializing and deserializing the Tool instances into representations such as json"""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Tool
        fields = "__all__"


class SocialSerializer(serializers.HyperlinkedModelSerializer):
    """serializing and deserializing the Social instances into representations such as json"""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Social
        fields = "__all__"


class SkillSerializer(serializers.HyperlinkedModelSerializer):
    """serializing and deserializing the Skill instances into representations such as json"""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Skill
        fields = "__all__"


class EducationSerializer(serializers.HyperlinkedModelSerializer):
    """serializing and deserializing the Education instances into representations such as json"""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Education
        fields = "__all__"


class ExperienceSerializer(serializers.HyperlinkedModelSerializer):
    """serializing and deserializing the Experience instances into representations such as json"""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Experience
        fields = "__all__"


class RatingSerializer(serializers.HyperlinkedModelSerializer):
    """serializing and deserializing the Rating instances into representations such as json"""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Rating
        fields = "__all__"


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    """serializing and deserializing the Comment instances into representations such as json"""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"


class ReplySerializer(serializers.HyperlinkedModelSerializer):
    """serializing and deserializing the Reply instances into representations such as json"""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Reply
        fields = "__all__"


class ShareSerializer(serializers.HyperlinkedModelSerializer):
    """serializing and deserializing the Share instances into representations such as json"""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Share
        fields = "__all__"


class LikeSerializer(serializers.HyperlinkedModelSerializer):
    """serializing and deserializing the Like instances into representations such as json"""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Like
        fields = "__all__"
