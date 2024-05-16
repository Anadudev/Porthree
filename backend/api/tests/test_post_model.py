"""
This module contains tests for the Post model in the Porthree project.
It includes tests for creating, retrieving, and manipulating Post objects.
"""

from django.test import TestCase

from api.models import UserDetails, Post


class PostModelTestCase(TestCase):
    """
    A test case for the Post model.

    This class contains tests for creating, retrieving, and manipulating Post objects.
    Test case for the Post model.

    This class contains tests for creating, retrieving, and manipulating Post objects.
    It sets up a test user for each test and provides methods to test various aspects of the Post model.
    """

    def setUp(self):
        """
        Set up method for the PostModelTestCase.

        This method creates a test user that is used in the tests for creating and manipulating Post objects.
        """
        self.user = UserDetails.objects.create_user(
            username="testuser", email="test@example.com", password="password123"
        )

    def test_post_creation(self):
        """
        Tests the creation of a Post object.

        This method creates a test user that is used in the tests for creating and manipulating Post objects.
        This test checks if a Post object can be created successfully and if its title is correctly set.
        """
        post = Post.objects.create(
            user=self.user, title="Test Post", content="Test content"
        )
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(post.title, "Test Post")

    def test_slug_generation(self):
        """
        Set up method for the PostModelTestCase.

        This method creates a test user that is used in the tests for creating and manipulating Post objects.
        """
        post = Post.objects.create(
            user=self.user, title="Test Post", content="Test content"
        )
        self.assertEqual(post.slug, "test-post")

    def test_created_at_auto_imputed(self):
        """
        Set up method for the PostModelTestCase.

        This method creates a test user that is used in the tests for creating and manipulating Post objects.
        """
        post = Post.objects.create(
            user=self.user, title="Test Post", content="Test content"
        )
        self.assertIsNotNone(post.created_at)
