# Generated by Django 4.2.7 on 2024-04-01 17:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0016_alter_tag_tag"),
    ]

    operations = [
        migrations.AlterUniqueTogether(name="education", unique_together=set(),),
    ]
