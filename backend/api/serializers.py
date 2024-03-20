from api.models import UserDetails
from rest_framework import serializers

class UserDetailsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserDetails
        fields = '__all__'
