from common.json import ModelEncoder


from .models import (
    Salesperson,
    Customer,
    AutomobileVO,
    Sale,
)


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    fields = [
        "id",
        "first_name",
        "last_name",
        "employee_id"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    fields = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    fields = [
        "id",
        "vin",
        "sold",
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    fields = [
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price",
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

    def get_extra_data(self, o):
        # id is automatically included as primary key field
        return {"salesperson_id": o.salesperson.id}

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }
