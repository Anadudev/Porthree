from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from api.models import UserDetails

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims, if needed
        return token
    

class UserDetailsSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = UserDetails
        fields = ('email', 'username', 'first_name', 'last_name', 'password')

    def create(self, validated_data):
        user = UserDetails.objects.create_user(**validated_data)
        return user

