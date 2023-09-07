from django.contrib import admin

from .models import Technician, Appointment, AutomobileVO, Status


@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass


@admin.register(AutomobileVO)
class AutomobileVAdmin(admin.ModelAdmin):
    pass


@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    pass
