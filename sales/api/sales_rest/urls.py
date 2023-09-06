from django.urls import path
from .views import (
    api_salespeople,
    api_salesperson,
    api_customers,
    api_customer,
    api_sales,
    api_sale,
    available_cars,
    api_salesperson_sales,
)

urlpatterns = [
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("salespeople/<int:id>/", api_salesperson, name="api_salesperson"),
    path(
        "salespeople/<int:id>/sales/", 
        api_salesperson_sales, 
        name="api_salesperson_sales"
    ),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:id>/", api_customer, name="api_customer"),
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:id>/", api_sale, name="api_sale"),
    path("available_cars/", available_cars, name="available_cars"),
]
