from django.test import TestCase
from api.models import Like, UserDetails, Post, Project, Comment, Reply, Share
from datetime import datetime
from unittest import skip

class LikeModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a user for testing
        cls.user = UserDetails.objects.create(username='testuser', email='test@example.com')

        # Create a post for testing
        cls.post = Post.objects.create(user=cls.user, title='Test Post', content='This is a test post', publish=True)

        # Create a project for testing
        cls.project = Project.objects.create(user=cls.user, title='Test Project', content='This is a test project', publish=True)

        # Create a comment for testing
        cls.comment = Comment.objects.create(user=cls.user, post=cls.post, comment='This is a test comment')

        # Create a reply for testing
        cls.reply = Reply.objects.create(user=cls.user, post=cls.post, comment=cls.comment, reply='This is a test reply')

        # Create a share for testing
        cls.share = Share.objects.create(user=cls.user, post=cls.post, thought='This is a test share')

    def test_like_creation_post(self):
        # Test like creation for a post
        like = Like.objects.create(
            user=self.user,
            post=self.post,
            like=True
        )
        self.assertIsNotNone(like)
        self.assertEqual(like.like, True)
        self.assertEqual(like.post, self.post)
        self.assertEqual(like.user, self.user)
        self.assertIsNone(like.project)
        self.assertIsNone(like.comment)
        self.assertIsNone(like.reply)
        self.assertIsNone(like.share)

    def test_like_creation_project(self):
        # Test like creation for a project
        like = Like.objects.create(
            user=self.user,
            project=self.project,
            like=True
        )
        self.assertIsNotNone(like)
        self.assertEqual(like.like, True)
        self.assertEqual(like.project, self.project)
        self.assertEqual(like.user, self.user)
        self.assertIsNone(like.post)
        self.assertIsNone(like.comment)
        self.assertIsNone(like.reply)
        self.assertIsNone(like.share)

    def test_like_creation_comment(self):
        # Test like creation for a comment
        like = Like.objects.create(
            user=self.user,
            comment=self.comment,
            like=True
        )
        self.assertIsNotNone(like)
        self.assertEqual(like.like, True)
        self.assertEqual(like.comment, self.comment)
        self.assertEqual(like.user, self.user)
        self.assertIsNone(like.post)
        self.assertIsNone(like.project)
        self.assertIsNone(like.reply)
        self.assertIsNone(like.share)

    def test_like_creation_reply(self):
        # Test like creation for a reply
        like = Like.objects.create(
            user=self.user,
            reply=self.reply,
            like=True
        )
        self.assertIsNotNone(like)
        self.assertEqual(like.like, True)
        self.assertEqual(like.reply, self.reply)
        self.assertEqual(like.user, self.user)
        self.assertIsNone(like.post)
        self.assertIsNone(like.project)
        self.assertIsNone(like.comment)
        self.assertIsNone(like.share)

    def test_like_creation_share(self):
        # Test like creation for a share
        like = Like.objects.create(
            user=self.user,
            share=self.share,
            like=True
        )
        self.assertIsNotNone(like)
        self.assertEqual(like.like, True)
        self.assertEqual(like.share, self.share)
        self.assertEqual(like.user, self.user)
        self.assertIsNone(like.post)
        self.assertIsNone(like.project)
        self.assertIsNone(like.comment)
        self.assertIsNone(like.reply)

    @skip("needs update")
    def test_created_at_auto_now_add(self):
        # Test auto_now_add behavior for created_at field
        before_creation = datetime.now()
        like = Like.objects.create(
            user=self.user,
            post=self.post,
            like=True
        )
        after_creation = datetime.now()
        self.assertLessEqual(before_creation, like.created_at)
        self.assertLessEqual(like.created_at, after_creation)

    def test_str_representation_post(self):
        # Test string representation of the like for a post
        like = Like.objects.create(
            user=self.user,
            post=self.post,
            like=True
        )
        expected_str = f"Like by {self.user} on {self.post} at {like.created_at}"
        self.assertEqual(str(like), expected_str)

    def test_str_representation_project(self):
        # Test string representation of the like for a project
        like = Like.objects.create(
            user=self.user,
            project=self.project,
            like=True
        )
        expected_str = f"Like by {self.user} on {self.project} at {like.created_at}"
        self.assertEqual(str(like), expected_str)

    def test_str_representation_comment(self):
        # Test string representation of the like for a comment
        like = Like.objects.create(
            user=self.user,
            comment=self.comment,
            like=True
        )
        expected_str = f"Like by {self.user} on {self.comment} at {like.created_at}"
        self.assertEqual(str(like), expected_str)

    def test_str_representation_reply(self):
        # Test string representation of the like for a reply
        like = Like.objects.create(
            user=self.user,
            reply=self.reply,
            like=True
        )
        expected_str = f"Like by {self.user} on {self.reply} at {like.created_at}"
        self.assertEqual(str(like), expected_str)
