from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


class Status(models.Model):
    id = models.PositiveSmallIntegerField(primary_key=True)
    name = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("id",)
        verbose_name_plural = "statuses"


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"pk": self.id})
    # change to self.employee_id??


class Appointment(models.Model):

    @classmethod
    def create(cls, **kwargs):
        try:
            auto = AutomobileVO.objects.get(vin=kwargs["vin"])
            kwargs["is_vip"] = auto.sold
        except AutomobileVO.DoesNotExist:
            kwargs["is_vip"] = False
            
        kwargs["status"] = Status.objects.get(name="CREATED")
        appointment = cls(**kwargs)
        appointment.save()
        return appointment

    is_vip = models.BooleanField(default=False)
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.ForeignKey(
        Status,
        related_name="appointments",
        on_delete=models.PROTECT,
    )
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT
    )

    def finish(self):
        status = Status.objects.get(name="FINISHED")
        self.status = status
        self.save()

    def cancel(self):
        status = Status.objects.get(name="CANCELLED")
        self.status = status
        self.save()

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.id})

    def __str__(self):
        return f"Appointment for {self.customer} on {self.date_time}"

    class Meta:
        ordering = ("vin",)
