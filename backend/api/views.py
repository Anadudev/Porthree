from api.models import UserDetails
from rest_framework import permissions, viewsets
from api.serializers import UserDetailsSerializer

class UserDetailsViewSet(viewsets.ModelViewSet):
    queryset = UserDetails.objects.all().order_by('-date_joined')
    serializer_class = UserDetailsSerializer
    permission_classes = [permissions.IsAuthenticated]
