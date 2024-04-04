from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from api.models import UserDetails


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom serializer for obtaining a pair of JWT tokens.
    This class extends the default TokenObtainPairSerializer to add custom claims if needed.
    """

    @classmethod
    def get_token(cls, user):
        """
        Overrides the get_token method to add custom claims to the token.

        Parameters:
        - user (User): The user for whom the token is being generated.

        Returns:
        - token (Token): The generated token with custom claims.
        """
        token = super().get_token(user)
        # Add custom claims, if needed
        return token


class UserDetailsSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserDetails model.
    This serializer handles the serialization and deserialization of UserDetails instances.
    """

    password = serializers.CharField(write_only=True)

    class Meta:
        model = UserDetails
        fields = ("email", "username", "first_name", "last_name", "password")

    def create(self, validated_data):
        """
        Creates and returns a new UserDetails instance.

        Parameters:
        - validated_data (dict): The validated data for the new UserDetails instance.

        Returns:
        - user (UserDetails): The newly created UserDetails instance.
        """
        user = UserDetails.objects.create_user(**validated_data)
        return user
