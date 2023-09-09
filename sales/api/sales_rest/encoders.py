from common.json import ModelEncoder
from .models import (
    Salesperson,
    Customer,
    AutomobileVO,
    Sale,
)


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number"
    ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
        "sold"
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price"
    ]

    def to_representation(self, o):
        data = super().to_representation(o)
        data["price"] = o.price / 100
        return data

    def default(self, o):
        try:
            return super().default(o)
        except ValueError:
            return {"error": "Invalid price"}

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }

    # def get_extra_data_salesperson(self, o):
    #     return {"salesperson": {
    #         "salesperson_id": o.salesperson.id,
    #         "first_name": o.salesperson.first_name,
    #         "last_name": o.salesperson.last_name,
    #         "employee_id": o.salesperson.employee_id
    #     }}

    # def get_extra_data_customer(self, o):
    #     return {"customer": o.customer.id}
