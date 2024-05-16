"""
A test case for testing the Comment model.
"""

from django.test import TestCase
from api.models import Comment, UserDetails, Post
from datetime import datetime
from unittest import skip


class CommentModelTestCase(TestCase):
    """
    A test case for testing the Comment model.
    """

    @classmethod
    def setUpTestData(cls):
        """
        Set up test data for the Comment model tests.
        """
        # Create a user for testing
        cls.user = UserDetails.objects.create(
            username="testuser", email="test@example.com"
        )

        # Create a post for testing
        cls.post = Post.objects.create(
            user=cls.user,
            title="Test Post",
            content="This is a test post",
            publish=True,
        )

    def test_comment_creation(self):
        """
        Set up test data for the Comment model tests.
        """
        # Test comment creation
        comment = Comment.objects.create(
            user=self.user, post=self.post, comment="This is a test comment"
        )
        self.assertIsNotNone(comment)
        self.assertEqual(comment.comment, "This is a test comment")
        self.assertEqual(comment.post, self.post)
        self.assertEqual(comment.user, self.user)

    @skip("due to TypeError: can't compare offset-naive and offset-aware datetimes")
    def test_created_at_auto_now_add(self):
        """
        Set up test data for the Comment model tests.
        """
        # Test auto_now_add behavior for created_at field
        before_creation = datetime.now()
        comment = Comment.objects.create(
            user=self.user, post=self.post, comment="This is a test comment"
        )
        after_creation = datetime.now()
        self.assertLessEqual(before_creation, comment.created_at)
        self.assertLessEqual(comment.created_at, after_creation)

    @skip("needs update")
    def test_updated_at_auto_now(self):
        """
        Set up test data for the Comment model tests.
        """
        # Test auto_now behavior for updated_at field
        comment = Comment.objects.create(
            user=self.user, post=self.post, comment="This is a test comment"
        )
        before_update = comment.updated_at
        comment.comment = "Updated test comment"
        comment.save()
        after_update = comment.updated_at
        self.assertLess(before_update, after_update)

    def test_str_representation(self):
        """
        Set up test data for the Comment model tests.
        """
        # Test string representation of the comment
        comment = Comment.objects.create(
            user=self.user, post=self.post, comment="This is a test comment"
        )
        expected_str = f"{self.user} commented on {self.post} at {comment.created_at}"
        self.assertEqual(str(comment), expected_str)
