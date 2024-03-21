from django.test import TestCase
from api.models import Education, UserDetails
from datetime import datetime, date
from unittest import skip


class EducationModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a user for testing
        cls.user = UserDetails.objects.create(
            username="testuser", email="test@example.com"
        )

    def test_education_creation(self):
        # Test education creation
        education = Education.objects.create(
            user=self.user,
            institute="Test Institute",
            degree="Test Degree",
            start_date=date(2020, 9, 1),
            end_date=date(2024, 6, 30),
            detail="This is a test education",
        )
        self.assertIsNotNone(education)
        self.assertEqual(education.institute, "Test Institute")
        self.assertEqual(education.degree, "Test Degree")
        self.assertEqual(education.user, self.user)

    @skip("to be updated")
    def test_created_at_auto_now_add(self):
        # Test auto_now_add behavior for created_at field
        before_creation = datetime.now()
        education = Education.objects.create(
            user=self.user,
            institute="Test Institute",
            degree="Test Degree",
            start_date=date(2020, 9, 1),
            end_date=date(2024, 6, 30),
            detail="This is a test education",
        )
        after_creation = datetime.now()
        self.assertLessEqual(before_creation, education.created_at)
        self.assertLessEqual(education.created_at, after_creation)

    @skip("update later")
    def test_updated_at_auto_now(self):
        # Test auto_now behavior for updated_at field
        education = Education.objects.create(
            user=self.user,
            institute="Test Institute",
            degree="Test Degree",
            start_date=date(2020, 9, 1),
            end_date=date(2024, 6, 30),
            detail="This is a test education",
        )
        before_update = education.updated_at
        education.institute = "Updated Test Institute"
        education.save()
        after_update = education.updated_at
        self.assertLess(before_update, after_update)

    def test_str_representation(self):
        # Test string representation of the education
        education = Education.objects.create(
            user=self.user,
            institute="Test Institute",
            degree="Test Degree",
            start_date=date(2020, 9, 1),
            end_date=date(2024, 6, 30),
            detail="This is a test education",
        )
        expected_str = "Test Degree at Test Institute"
        self.assertEqual(str(education), expected_str)
