# Generated by Django 3.1.7 on 2021-03-30 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_auto_20210322_0436'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/default.png', null=True, upload_to=''),
        ),
    ]
