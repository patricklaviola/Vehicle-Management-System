# Generated by Django 4.0.3 on 2023-09-07 01:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_alter_technician_employee_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='technician',
            name='employee_id',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]