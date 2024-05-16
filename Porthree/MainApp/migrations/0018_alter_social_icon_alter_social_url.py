# Generated by Django 4.2.7 on 2024-03-19 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MainApp', '0017_commentlike'),
    ]

    operations = [
        migrations.AlterField(
            model_name='social',
            name='icon',
            field=models.FileField(null=True, upload_to='static/icons/'),
        ),
        migrations.AlterField(
            model_name='social',
            name='url',
            field=models.URLField(default='#', unique=True),
        ),
    ]
