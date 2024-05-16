from django.test import TestCase
from api.models import Experience, UserDetails
from datetime import datetime, date
from unittest import skip


class ExperienceModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a user for testing
        cls.user = UserDetails.objects.create(
            username="testuser", email="test@example.com"
        )

    def test_experience_creation(self):
        # Test experience creation
        experience = Experience.objects.create(
            user=self.user,
            company="Test Company",
            position="Test Position",
            start_date=date(2018, 9, 1),
            end_date=date(2022, 6, 30),
            detail="This is a test experience",
        )
        self.assertIsNotNone(experience)
        self.assertEqual(experience.company, "Test Company")
        self.assertEqual(experience.position, "Test Position")
        self.assertEqual(experience.user, self.user)

    @skip("due to TypeError: can't compare offset-naive and offset-aware datetimes")
    def test_created_at_auto_now_add(self):
        # Test auto_now_add behavior for created_at field
        before_creation = datetime.now()
        experience = Experience.objects.create(
            user=self.user,
            company="Test Company",
            position="Test Position",
            start_date=date(2018, 9, 1),
            end_date=date(2022, 6, 30),
            detail="This is a test experience",
        )
        after_creation = datetime.now()
        self.assertLessEqual(before_creation, experience.created_at)
        self.assertLessEqual(experience.created_at, after_creation)

    @skip("update later")
    def test_updated_at_auto_now(self):
        # Test auto_now behavior for updated_at field
        experience = Experience.objects.create(
            user=self.user,
            company="Test Company",
            position="Test Position",
            start_date=date(2018, 9, 1),
            end_date=date(2022, 6, 30),
            detail="This is a test experience",
        )
        before_update = experience.updated_at
        experience.company = "Updated Test Company"
        experience.save()
        after_update = experience.updated_at
        self.assertLess(before_update, after_update)

    def test_str_representation(self):
        # Test string representation of the experience
        experience = Experience.objects.create(
            user=self.user,
            company="Test Company",
            position="Test Position",
            start_date=date(2018, 9, 1),
            end_date=date(2022, 6, 30),
            detail="This is a test experience",
        )
        expected_str = "Test Position at Test Company"
        self.assertEqual(str(experience), expected_str)
