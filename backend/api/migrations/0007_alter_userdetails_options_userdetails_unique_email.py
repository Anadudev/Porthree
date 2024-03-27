# Generated by Django 5.0.3 on 2024-03-25 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_project_contributors'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userdetails',
            options={},
        ),
        migrations.AddConstraint(
            model_name='userdetails',
            constraint=models.UniqueConstraint(fields=('email',), name='unique_email'),
        ),
    ]