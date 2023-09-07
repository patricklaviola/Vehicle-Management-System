from django.contrib import admin
from .models import (
    Salesperson,
    Customer,
    Sale,
    AutomobileVO,
)


@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    pass


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    pass


@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass
