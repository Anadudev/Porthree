from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import UserDetails
from .serializers import UserDetailsSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from django.contrib.auth import get_user_model


@api_view(["POST"])
def signup(request):
    """
    Handles user signup by creating a new UserDetails instance.

    Parameters:
    - request (HttpRequest): The incoming request object.

    Returns:
    - Response: A response object containing the serialized user data if successful, or error messages if unsuccessful.
    """
    serializer = UserDetailsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairView(TokenObtainPairView):
    """
    Custom view for obtaining a pair of JWT tokens.
    This class extends the default TokenObtainPairView to customize the token response.
    """

    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        """
        Handles the POST request to log out a user.

        Parameters:
        - request (HttpRequest): The incoming request object.
        - format: The format of the response.

        Returns:
        - Response: A response object indicating success if the refresh token is invalidated, or an error response if unsuccessful.
        """
        response = super().post(request, *args, **kwargs)
        refresh_token = response.data.get("refresh")
        access_token = response.data.get("access")

        # Extracting username from request data
        username = request.data.get("username")

        if username:
            # Get user object with the given username
            User = get_user_model()
            try:
                user = User.objects.get(username=username)
                response.data["user"] = {
                    "id": user.id,
                    "username": user.username,
                }
            except User.DoesNotExist:
                pass  # Handle the case where the user doesn't exist

        return response


class Logout(APIView):
    """
    Handles user logout by invalidating the refresh token.
    """

    def post(self, request, format=None):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
