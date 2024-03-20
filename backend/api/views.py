from rest_framework import viewsets
from .models import UserDetails
from .serializers import UserDetailsSerializer

class UserDetailsViewSet(viewsets.ModelViewSet):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer
