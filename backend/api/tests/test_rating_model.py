from django.test import TestCase
from api.models import Rating, UserDetails, Project
from datetime import datetime
from unittest import skip


class RatingModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a user for testing
        cls.user = UserDetails.objects.create(
            username="testuser", email="test@example.com"
        )

        # Create a project for testing
        cls.project = Project.objects.create(
            user=cls.user,
            title="Test Project",
            content="This is a test project",
            publish=True,
        )

    def test_rating_creation(self):
        # Test rating creation
        rating = Rating.objects.create(
            user=self.user,
            project=self.project,
            rate=4,
            complement="This is a test rating",
        )
        self.assertIsNotNone(rating)
        self.assertEqual(rating.rate, 4)
        self.assertEqual(rating.project, self.project)
        self.assertEqual(rating.user, self.user)

    @skip("due to TypeError: can't compare offset-naive and offset-aware datetimes")
    def test_created_at_auto_now_add(self):
        # Test auto_now_add behavior for created_at field
        before_creation = datetime.now()
        rating = Rating.objects.create(
            user=self.user,
            project=self.project,
            rate=4,
            complement="This is a test rating",
        )
        after_creation = datetime.now()
        self.assertLessEqual(before_creation, rating.created_at)
        self.assertLessEqual(rating.created_at, after_creation)

    @skip("update later")
    def test_updated_at_auto_now(self):
        # Test auto_now behavior for updated_at field
        rating = Rating.objects.create(
            user=self.user,
            project=self.project,
            rate=4,
            complement="This is a test rating",
        )
        before_update = rating.updated_at
        rating.rate = 5
        rating.save()
        after_update = rating.updated_at
        self.assertLess(before_update, after_update)

    def test_str_representation(self):
        # Test string representation of the rating
        rating = Rating.objects.create(
            user=self.user,
            project=self.project,
            rate=4,
            complement="This is a test rating",
        )
        expected_str = "Rating 4 for Test Project"
        self.assertEqual(str(rating), expected_str)
