# Generated by Django 4.0.3 on 2022-04-05 16:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0005_remove_eventregisterations_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventregisterations',
            name='group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='dashboard.group'),
        ),
    ]
