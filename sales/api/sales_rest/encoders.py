from common.json import ModelEncoder
from .models import (
    Salesperson,
    Customer,
    AutomobileVO,
    Sale,
)
from decimal import Decimal


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id"
    ]
    encoders = {
        "automobile": AutomobileVOEncoder()
    }


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number"
    ]
    encoders = {
        "automobile": AutomobileVOEncoder()
    }


def decimal_to_str(o):
    if isinstance(o, Decimal):
        return str(o)
    raise TypeError()


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price"
    ]

    def default(self, o):
        try:
            return super().default(o)
        except TypeError:
            return decimal_to_str(o)

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }
