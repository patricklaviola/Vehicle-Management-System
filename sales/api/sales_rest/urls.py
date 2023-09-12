from django.urls import path
from .views import (
    api_salespeople,
    api_salesperson,
    api_customers,
    api_customer,
    api_sales,
    api_sale,
    # api_salesperson_history,
)

urlpatterns = [
    path(
        "salespeople/",
        api_salespeople,
        name="api_salespeople",
    ),
    path(
        "salespeople/<int:id>/",
        api_salesperson,
        name="api_salesperson_details",
    ),
    # path(
    #     "sales/history/<int:id>/",
    #     api_salesperson_history,
    #     name="api_salesperson_history"
    # ),
    path(
        "customers/",
        api_customers,
        name="api_customers",
    ),
    path(
        "customers/<int:id>/",
        api_customer,
        name="api_customer_details",
    ),
    path(
        "sales/",
        api_sales,
        name="api_list_sales",
    ),
    path(
        "sales/<int:id>/",
        api_sale,
        name="api_sale_details",
    ),
]
