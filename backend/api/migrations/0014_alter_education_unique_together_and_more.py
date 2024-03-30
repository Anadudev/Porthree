# Generated by Django 5.0.3 on 2024-03-30 20:56

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_education_unique_together_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='education',
            unique_together=set(),
        ),
        migrations.AlterUniqueTogether(
            name='experience',
            unique_together=set(),
        ),
        migrations.AlterUniqueTogether(
            name='skill',
            unique_together=set(),
        ),
        migrations.AlterUniqueTogether(
            name='social',
            unique_together=set(),
        ),
        migrations.RemoveField(
            model_name='userdetails',
            name='educations',
        ),
        migrations.RemoveField(
            model_name='userdetails',
            name='experiences',
        ),
        migrations.RemoveField(
            model_name='userdetails',
            name='skills',
        ),
        migrations.RemoveField(
            model_name='userdetails',
            name='socials',
        ),
        migrations.AddField(
            model_name='education',
            name='user',
            field=models.ForeignKey(default=4, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='experience',
            name='user',
            field=models.ForeignKey(default=4, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='skill',
            name='user',
            field=models.ForeignKey(default=4, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='social',
            name='user',
            field=models.ForeignKey(default=4, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='post',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='posts', to='api.tag'),
        ),
        migrations.AlterUniqueTogether(
            name='education',
            unique_together={('user', 'institute')},
        ),
        migrations.AlterUniqueTogether(
            name='experience',
            unique_together={('user', 'company')},
        ),
        migrations.AlterUniqueTogether(
            name='skill',
            unique_together={('user', 'skill')},
        ),
        migrations.AlterUniqueTogether(
            name='social',
            unique_together={('user', 'social')},
        ),
    ]
