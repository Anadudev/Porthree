# Generated by Django 5.0.3 on 2024-03-21 02:58

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_rename_name_social_social_alter_project_contributors'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='contributors',
            field=models.ManyToManyField(blank=True, related_name='contributed_projects', to=settings.AUTH_USER_MODEL),
        ),
    ]