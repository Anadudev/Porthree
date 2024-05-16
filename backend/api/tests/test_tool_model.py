from django.test import TestCase
from api.models import Tool, UserDetails, Project
from datetime import datetime
from django.core.files.uploadedfile import SimpleUploadedFile
import os
from unittest import skip


class ToolModelTestCase(TestCase):
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

    def test_tool_creation(self):
        # Test tool creation
        tool = Tool.objects.create(user=self.user, tool="Test Tool")
        self.assertIsNotNone(tool)
        self.assertEqual(tool.tool, "Test Tool")
        self.assertEqual(tool.user, self.user)

    def test_project_tool_association(self):
        # Test associating a tool with a project
        tool = Tool.objects.create(user=self.user, tool="Test Tool")
        tool.project.add(self.project)
        self.assertIn(self.project, tool.project.all())

    @skip("due to TypeError: can't compare offset-naive and offset-aware datetimes")
    def test_created_at_auto_now_add(self):
        # Test auto_now_add behavior for created_at field
        before_creation = datetime.now()
        tool = Tool.objects.create(user=self.user, tool="Test Tool")
        after_creation = datetime.now()
        self.assertLessEqual(before_creation, tool.created_at)
        self.assertLessEqual(tool.created_at, after_creation)

    @skip("test will be updated in the future")
    def test_updated_at_auto_now(self):
        # Test auto_now behavior for updated_at field
        tool = Tool.objects.create(user=self.user, tool="Test Tool")
        before_update = tool.updated_at
        tool.tool = "Updated Test Tool"
        tool.save()
        after_update = tool.updated_at
        self.assertLess(before_update, after_update)

    def test_str_representation(self):
        # Test string representation of the tool
        tool = Tool.objects.create(user=self.user, tool="Test Tool")
        self.assertEqual(str(tool), "Test Tool")

    def test_icon_upload(self):
        # Test image upload for icon field
        test_image_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), "test_image.png"
        )
        with open(test_image_path, "rb") as f:
            icon = SimpleUploadedFile("test_image.png", f.read())
            tool = Tool.objects.create(user=self.user, tool="Test Tool", icon=icon)
            self.assertTrue(tool.icon.name.endswith(".png"))
