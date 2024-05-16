"""
A test case class for testing the UserDetails model.
It includes methods to test user creation, password hashing, required fields, and uniqueness constraints.
"""

from django.test import TestCase
from api.models import UserDetails
from django.contrib.auth.hashers import check_password
from unittest import skip


class UserDetailsTestCase(TestCase):

    def test_user_creation(self):
        """
        Tests the creation of a new user in the UserDetails model.
        It checks if a user can be successfully created and if the count of users increases by one.
        """
        user = UserDetails.objects.create_user(
            username="testuser", email="test@example.com", password="password123"
        )
        self.assertEqual(UserDetails.objects.count(), 1)

    def test_password_hashing(self):
        """
        Tests the creation of a new user in the UserDetails model.
        It checks if a user can be successfully created and if the count of users increases by one.
        """
        user = UserDetails.objects.create_user(
            username="testuser", email="test@example.com", password="password123"
        )
        self.assertTrue(check_password("password123", user.password))

    def test_required_fields(self):
        """
        Tests the required fields constraint of the UserDetails model.
        It checks if an exception is raised when trying to create a user without specifying required fields.
        """
        with self.assertRaises(ValueError):
            user = UserDetails.objects.create_user(
                username="", email="", password="password123"
            )

    def test_unique_username(self):
        """
        Tests the uniqueness constraint of the username field in the UserDetails model.
        It checks if an exception is raised when trying to create a user with a username that already exists.
        """
        user1 = UserDetails.objects.create_user(
            username="testuser", email="test1@example.com", password="password123"
        )
        with self.assertRaises(Exception):
            user2 = UserDetails.objects.create_user(
                username="testuser", email="test2@example.com", password="password123"
            )

    @skip("yet to implement email uniqueness")
    def test_unique_email(self):
        """
        Tests the uniqueness constraint of the email field in the UserDetails model.
        It checks if an exception is raised when trying to create a user with an email that already exists.
        Note: This test is currently skipped as email uniqueness has not been implemented yet.
        """
        user1 = UserDetails.objects.create_user(
            username="testuser1", email="test@example.com", password="password123"
        )
        with self.assertRaises(Exception):
            user2 = UserDetails.objects.create_user(
                username="testuser2", email="test@example.com", password="password123"
            )
