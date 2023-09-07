from django.db import models
from django.urls import reverse


class Salesperson(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    employee_id = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def get_api_url(self):
        return reverse("api_salesperson", kwargs={"pk": self.id})


class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    address = models.CharField(max_length=150, null=True)
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.id})


class AutomobileVO(models.Model):
    id = models.AutoField(primary_key=True)
    vin = models.CharField(max_length=150)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.vin}"

    # Report a sale: this marks the vehicle as sold and saves the model
    def sell(self):
        self.sold = True
        self.save()


class Sale(models.Model):
    id = models.AutoField(primary_key=True)
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.CASCADE,
    )
    price = models.PositiveIntegerField(null=True)

    def get_api_url(self):
        return reverse("api_sale", kwargs={"pk": self.id})
