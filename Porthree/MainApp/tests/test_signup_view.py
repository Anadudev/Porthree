from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class SignUpViewTest(TestCase):
    def setUp(self):
        # Create a test user for authentication
        self.test_user = User.objects.create_user(
            username="testuser", password="testpassword"
        )

    def test_signup_view_post_request_with_valid_data(self):
        client = Client()

        # Send a POST request to the signup view with valid data
        response = client.post(
            reverse("signup"),
            {
                "username": "newuser",
                "password1": "newpassword",
                "password2": "newpassword",
            },
        )

        # Check that the response status code is 302 (redirect)
        self.assertEqual(response.status_code, 302)

        # Check that the user was created in the database
        self.assertTrue(User.objects.filter(username="newuser").exists())

        # Check that the user is authenticated after signup
        self.assertTrue(response.wsgi_request.user.is_authenticated)

        # Check that the user is redirected to the portfolio view
        self.assertRedirects(
            response, reverse("portfolio", kwargs={"username": "newuser"})
        )

    def test_signup_view_post_request_with_invalid_data(self):
        client = Client()

        # Send a POST request to the signup view with invalid data (empty form)
        response = client.post(reverse("signup"), {})

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check that the form in the response context is an instance of UserCreationForm
        form = response.context["form"]
        self.assertIsInstance(form, UserCreationForm)

        # Check that the form is not valid
        self.assertFalse(form.is_valid())

        # Check that the user was not created in the database
        self.assertFalse(User.objects.filter(username="newuser").exists())

        # Check that the user is not authenticated after invalid signup attempt
        self.assertFalse(response.wsgi_request.user.is_authenticated)

        # Check that the correct template is used
        self.assertTemplateUsed(response, "MainApp/sign-up.html")

    def test_signup_view_get_request(self):
        client = Client()

        # Send a GET request to the signup view
        response = client.get(reverse("signup"))

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check that the "sign-up.html" template is used
        self.assertTemplateUsed(response, "MainApp/sign-up.html")

        def test_signup_view_post_request_with_non_matching_passwords(self):
            client = Client()

            # Send a POST request to the signup view with non-matching passwords
            response = client.post(
                reverse("signup"),
                {
                    "username": "newuser",
                    "password1": "newpassword",
                    "password2": "differentpassword",  # Non-matching password
                },
            )

            # Check that the response status code is 200 (OK)
            self.assertEqual(response.status_code, 200)

            # Check that the form in the response context is an instance of UserCreationForm
            form = response.context["form"]
            self.assertIsInstance(form, UserCreationForm)

            # Check that the form is not valid
            self.assertFalse(form.is_valid())

            # Check that the expected non-matching password error is in the form errors
            self.assertIn("password2", form.errors)
            self.assertIn("The two password fields didn't match.", form.errors["password2"])

            # Check that the user was not created in the database
            self.assertFalse(User.objects.filter(username="newuser").exists())

            # Check that the user is not authenticated after invalid signup attempt
            self.assertFalse(response.wsgi_request.user.is_authenticated)

            # Check that the correct template is used
            self.assertTemplateUsed(response, "MainApp/sign-up.html")
