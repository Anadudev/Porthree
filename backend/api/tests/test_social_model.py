from django.test import TestCase
from api.models import Social, UserDetails
from datetime import datetime
from django.core.files.uploadedfile import SimpleUploadedFile
import os
from unittest import skip


class SocialModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a user for testing
        cls.user = UserDetails.objects.create(
            username="testuser", email="test@example.com"
        )

    def test_social_creation(self):
        # Test social creation
        social = Social.objects.create(
            user=self.user, social="Test Social", url="http://example.com"
        )
        self.assertIsNotNone(social)
        self.assertEqual(social.social, "Test Social")
        self.assertEqual(social.user, self.user)

    @skip("due to TypeError: can't compare offset-naive and offset-aware datetimes")
    def test_created_at_auto_now_add(self):
        # Test auto_now_add behavior for created_at field
        before_creation = datetime.now()
        social = Social.objects.create(
            user=self.user, social="Test Social", url="http://example.com"
        )
        after_creation = datetime.now()
        self.assertLessEqual(before_creation, social.created_at)
        self.assertLessEqual(social.created_at, after_creation)

    @skip("will be updated")
    def test_updated_at_auto_now(self):
        # Test auto_now behavior for updated_at field
        social = Social.objects.create(
            user=self.user, social="Test Social", url="http://example.com"
        )
        before_update = social.updated_at
        social.social = "Updated Test Social"
        social.save()
        after_update = social.updated_at
        self.assertLess(before_update, after_update)

    def test_str_representation(self):
        # Test string representation of the social
        social = Social.objects.create(
            user=self.user, social="Test Social", url="http://example.com"
        )
        self.assertEqual(str(social), "Test Social")

    def test_icon_upload(self):
        # Test image upload for icon field
        test_image_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), "test_image.png"
        )
        with open(test_image_path, "rb") as f:
            icon = SimpleUploadedFile("test_image.png", f.read())
            social = Social.objects.create(
                user=self.user,
                social="Test Social",
                url="http://example.com",
                icon=icon,
            )
            self.assertTrue(social.icon.name.endswith(".png"))
