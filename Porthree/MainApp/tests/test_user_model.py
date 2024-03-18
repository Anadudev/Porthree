from django.test import TestCase
from django.contrib.auth.models import User
from MainApp.models import UserDetails
from django.core.exceptions import ValidationError


class UserDetailsModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a user for ForeignKey relationship
        cls.user = User.objects.create(username="testuser")

    def setUp(self):
        # Create a UserDetails instance for each test
        self.user_details = UserDetails.objects.create(
            user=self.user,
            email="test@example.com",
            career_title="Software Developer",
            phone_number=123456789,
            first_name="John",
            last_name="Doe",
            rating=4,
            about_me="A passionate developer",
            resume="path/to/resume.pdf",
        )

    def test_user_details_creation(self):
        user_details = UserDetails.objects.get(id=self.user_details.id)
        self.assertEqual(user_details.user, self.user)
        self.assertEqual(user_details.email, "test@example.com")
        self.assertEqual(user_details.career_title, "Software Developer")
        self.assertEqual(user_details.phone_number, 123456789)
        self.assertEqual(user_details.first_name, "John")
        self.assertEqual(user_details.last_name, "Doe")
        self.assertEqual(user_details.rating, 4)
        self.assertEqual(user_details.about_me, "A passionate developer")
        self.assertEqual(user_details.resume, "path/to/resume.pdf")

    def test_str_method(self):
        self.assertEqual(
            str(self.user_details),
            f"{self.user_details.first_name} {self.user_details.last_name}",
        )

    def test_unique_email_constraint(self):
        # Attempt to create another UserDetails with the same email should raise IntegrityError
        with self.assertRaises(Exception):
            UserDetails.objects.create(
                user=self.user,
                email="test@example.com",
                first_name="Another",
                last_name="User",
            )

    def test_blank_fields(self):
        # Test that fields marked as blank can be empty
        blank_user_details = UserDetails.objects.create(
            user=self.user, email="blank@example.com", first_name="Blank"
        )
        self.assertEqual(blank_user_details.phone_number, None)
        self.assertEqual(blank_user_details.career_title, None)
        self.assertEqual(blank_user_details.about_me, None)
        self.assertEqual(blank_user_details.resume, None)

    def test_rating_cannot_exceed_max_value(self):
        # Create a UserDetails instance with a rating greater than 5
        user_details = UserDetails(
            user=self.user,
            email="test@example.com",
            rating=6,  # Attempting to set a rating above 5
        )

        # Attempt to save the instance and expect a ValidationError
        with self.assertRaises(ValidationError) as context:
            user_details.full_clean()  # Validate the model fields

        # Check that the correct validation error message is raised
        self.assertIn(
            "Ensure this value is less than or equal to 5.", str(context.exception)
        )
