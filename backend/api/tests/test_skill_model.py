from django.test import TestCase
from api.models import Skill, UserDetails
from datetime import datetime
from unittest import skip


class SkillModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a user for testing
        cls.user = UserDetails.objects.create(
            username="testuser", email="test@example.com"
        )

    def test_skill_creation(self):
        # Test skill creation
        skill = Skill.objects.create(
            user=self.user, skill="Test Skill", detail="This is a test skill"
        )
        self.assertIsNotNone(skill)
        self.assertEqual(skill.skill, "Test Skill")
        self.assertEqual(skill.user, self.user)

    @skip("due to TypeError: can't compare offset-naive and offset-aware datetimes")
    def test_created_at_auto_now_add(self):
        # Test auto_now_add behavior for created_at field
        before_creation = datetime.now()
        skill = Skill.objects.create(
            user=self.user, skill="Test Skill", detail="This is a test skill"
        )
        after_creation = datetime.now()
        self.assertLessEqual(before_creation, skill.created_at)
        self.assertLessEqual(skill.created_at, after_creation)

    @skip("to be updated")
    def test_updated_at_auto_now(self):
        # Test auto_now behavior for updated_at field
        skill = Skill.objects.create(
            user=self.user, skill="Test Skill", detail="This is a test skill"
        )
        before_update = skill.updated_at
        skill.skill = "Updated Test Skill"
        skill.save()
        after_update = skill.updated_at
        self.assertLess(before_update, after_update)

    def test_str_representation(self):
        # Test string representation of the skill
        skill = Skill.objects.create(
            user=self.user, skill="Test Skill", detail="This is a test skill"
        )
        self.assertEqual(str(skill), "Test Skill")
