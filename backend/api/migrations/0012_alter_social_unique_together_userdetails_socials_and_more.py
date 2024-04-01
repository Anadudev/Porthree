# Generated by Django 5.0.3 on 2024-03-30 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_remove_tag_post_remove_tag_project_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='social',
            unique_together={('social', 'url')},
        ),
        migrations.AddField(
            model_name='userdetails',
            name='socials',
            field=models.ManyToManyField(blank=True, related_name='socials', to='api.social'),
        ),
        migrations.RemoveField(
            model_name='social',
            name='user',
        ),
    ]