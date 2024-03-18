from django.test import TestCase
from django.urls import reverse

class IndexViewTest(TestCase):
    def test_index_template_exists(self):
        response = self.client.get(reverse("index"))

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check that the "index.html" template is used
        self.assertTemplateUsed(response, "MainApp/index.html")
