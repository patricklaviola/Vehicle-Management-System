from django.urls import path
from .views import (
    api_list_salespeople,
    api_salesperson_details,
    api_list_customers,
    api_customer_details,
    api_list_sales,
    api_sale_details,
    api_available_cars,
    api_salesperson_history,
)

urlpatterns = [
    path(
        "salespeople/",
        api_list_salespeople,
        name="api_list_salespeople",
    ),
    path(
        "salespeople/<int:id>/",
        api_salesperson_details,
        name="api_salesperson_details",
    ),
    path(
<<<<<<< HEAD
        "sales/history/<int:id>",
=======
        "sales/history/<int:id>/",
>>>>>>> main
        api_salesperson_history,
        name="api_salesperson_history"
    ),
    path(
        "customers/",
        api_list_customers,
        name="api_list_customers",
    ),
    path(
        "customers/<int:id>/",
        api_customer_details,
        name="api_customer_details",
    ),
    path(
        "sales/",
        api_list_sales,
        name="api_list_sales",
    ),
    path(
        "sales/<int:id>/",
        api_sale_details,
        name="api_sale_details",
    ),
    path(
        "cars/",
        api_available_cars,
        name="api_available_cars",
    ),
]
