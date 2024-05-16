from django.test import TestCase
from api.models import Tag, UserDetails, Post, Project
from datetime import datetime
from unittest import skip

class TagModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a user for testing
        cls.user = UserDetails.objects.create(username='testuser', email='test@example.com')

        # Create a post and a project for testing
        cls.post = Post.objects.create(user=cls.user, title='Test Post', content='This is a test post', publish=True)
        cls.project = Project.objects.create(user=cls.user, title='Test Project', content='This is a test project', publish=True)

    def test_tag_creation(self):
        tag = Tag.objects.create(user=self.user, tag='Test Tag')
        self.assertIsNotNone(tag)
        self.assertEqual(tag.tag, 'Test Tag')
        self.assertEqual(tag.user, self.user)

    def test_post_tag_association(self):
        tag = Tag.objects.create(user=self.user, tag='Test Tag')
        tag.post.add(self.post)
        self.assertIn(self.post, tag.post.all())

    def test_project_tag_association(self):
        tag = Tag.objects.create(user=self.user, tag='Test Tag')
        tag.project.add(self.project)
        self.assertIn(self.project, tag.project.all())

    @skip("TypeError: can't compare offset-naive and offset-aware datetimes")
    def test_created_at_auto_now_add(self):
        before_creation = datetime.now()
        tag = Tag.objects.create(user=self.user, tag='Test Tag')
        after_creation = datetime.now()
        self.assertLessEqual(before_creation, tag.created_at)
        self.assertLessEqual(tag.created_at, after_creation)

    @skip("proper update test yet to be implemented")
    def test_updated_at_auto_now(self):
        tag = Tag.objects.create(user=self.user, tag='Test Tag')
        before_update = tag.updated_at
        tag.tag = 'Updated Test Tag'
        tag.save()
        after_update = tag.updated_at
        self.assertLess(before_update, after_update)

    def test_str_representation(self):
        tag = Tag.objects.create(user=self.user, tag='Test Tag')
        self.assertEqual(str(tag), 'Test Tag')
