from rest_framework import viewsets
from .models import UserDetails, Post
from .serializers import UserDetailsSerializer, PostSerializer

class UserDetailsViewSet(viewsets.ModelViewSet):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
