# Generated by Django 4.0.3 on 2022-04-26 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0011_rename_events_event_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='verified',
            field=models.BooleanField(default=False),
        ),
    ]
