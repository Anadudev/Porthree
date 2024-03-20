from django.test import TestCase
from api.models import UserDetails
from django.contrib.auth.hashers import check_password

class UserDetailsTestCase(TestCase):

    def test_user_creation(self):
        user = UserDetails.objects.create_user(username='testuser', email='test@example.com', password='password123')
        self.assertEqual(UserDetails.objects.count(), 1)

    def test_password_hashing(self):
        user = UserDetails.objects.create_user(username='testuser', email='test@example.com', password='password123')
        self.assertTrue(check_password('password123', user.password))

    def test_required_fields(self):
        with self.assertRaises(ValueError):
            user = UserDetails.objects.create_user(username='', email='', password='password123')

    def test_unique_username(self):
        user1 = UserDetails.objects.create_user(username='testuser', email='test1@example.com', password='password123')
        with self.assertRaises(Exception):
            user2 = UserDetails.objects.create_user(username='testuser', email='test2@example.com', password='password123')

    def test_unique_email(self):
        user1 = UserDetails.objects.create_user(username='testuser1', email='test@example.com', password='password123')
        with self.assertRaises(Exception):
            user2 = UserDetails.objects.create_user(username='testuser2', email='test@example.com', password='password123')
