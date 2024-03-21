from django.urls import path
from auth_app.views import signup, MyTokenObtainPairView, Logout

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path('logout/', Logout.as_view(), name='logout'),
]
