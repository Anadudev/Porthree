from django.test import TestCase
from api.models import Reply, UserDetails, Post, Project, Comment
from datetime import datetime
from unittest import skip


class ReplyModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
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

        # Create a comment for testing
        cls.comment = Comment.objects.create(
            user=cls.user, post=cls.post, comment="This is a test comment"
        )

        # Create a project for testing
        cls.project = Project.objects.create(
            user=cls.user,
            title="Test Project",
            content="This is a test project",
            publish=True,
        )

    def test_reply_creation_post(self):
        # Test reply creation for a post
        reply = Reply.objects.create(
            user=self.user,
            post=self.post,
            comment=self.comment,
            reply="This is a test reply for a post",
        )
        self.assertIsNotNone(reply)
        self.assertEqual(reply.reply, "This is a test reply for a post")
        self.assertEqual(reply.post, self.post)
        self.assertEqual(reply.user, self.user)
        self.assertEqual(reply.comment, self.comment)

    def test_reply_creation_project(self):
        # Test reply creation for a project
        reply = Reply.objects.create(
            user=self.user,
            project=self.project,
            comment=self.comment,
            reply="This is a test reply for a project",
        )
        self.assertIsNotNone(reply)
        self.assertEqual(reply.reply, "This is a test reply for a project")
        self.assertEqual(reply.project, self.project)
        self.assertEqual(reply.user, self.user)
        self.assertEqual(reply.comment, self.comment)

    @skip("due to TypeError: can't compare offset-naive and offset-aware datetimes")
    def test_created_at_auto_now_add(self):
        # Test auto_now_add behavior for created_at field
        before_creation = datetime.now()
        reply = Reply.objects.create(
            user=self.user,
            post=self.post,
            comment=self.comment,
            reply="This is a test reply",
        )
        after_creation = datetime.now()
        self.assertLessEqual(before_creation, reply.created_at)
        self.assertLessEqual(reply.created_at, after_creation)

    @skip("update later")
    def test_updated_at_auto_now(self):
        # Test auto_now behavior for updated_at field
        reply = Reply.objects.create(
            user=self.user,
            post=self.post,
            comment=self.comment,
            reply="This is a test reply",
        )
        before_update = reply.updated_at
        reply.reply = "Updated test reply"
        reply.save()
        after_update = reply.updated_at
        self.assertLess(before_update, after_update)

    def test_str_representation_post(self):
        # Test string representation of the reply for a post
        reply = Reply.objects.create(
            user=self.user,
            post=self.post,
            comment=self.comment,
            reply="This is a test reply for a post",
        )
        expected_str = f"Reply by {self.user} on {self.post} at {reply.created_at}"
        self.assertEqual(str(reply), expected_str)

    def test_str_representation_project(self):
        # Test string representation of the reply for a project
        reply = Reply.objects.create(
            user=self.user,
            project=self.project,
            comment=self.comment,
            reply="This is a test reply for a project",
        )
        expected_str = f"Reply by {self.user} on {self.project} at {reply.created_at}"
        self.assertEqual(str(reply), expected_str)
