# Generated by Django 3.2.9 on 2021-11-16 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='class_info',
            field=models.IntegerField(null=True),
        ),
    ]
