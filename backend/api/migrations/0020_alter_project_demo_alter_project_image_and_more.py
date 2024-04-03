# Generated by Django 4.2.7 on 2024-04-03 21:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0019_alter_project_video"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="demo",
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="project",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="project_images/"),
        ),
        migrations.AlterField(
            model_name="project",
            name="video",
            field=models.URLField(blank=True, null=True),
        ),
    ]
