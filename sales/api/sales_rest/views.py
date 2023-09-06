from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from common.json import ModelEncoder
from decimal import Decimal
from .models import (
    Salesperson,
    Customer,
    Sale,
    AutomobileVO,
)


# SalespersonEncoder > api_salespeople > api_saleperson > api_salesperson_sales
class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    fields = [
        "first_name",
        "last_name",
        "employee_id"
    ]


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except ValueError as e:
            response = JsonResponse(
                {"message": "Unable to create salesperson: {}".format(str(e))}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE"])
def api_salesperson(request, id):
    try:
        salesperson = Salesperson.objects.get(id=id)
    except Salesperson.DoesNotExist:
        return JsonResponse(
            {"message": "Salesperson does not exist"},
            safe=404,
        )
    if request.method == "GET":
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )
    else:
        salesperson.delete()
        return JsonResponse(
            {"message": "Salesperson deleted"},
            safe=False,
        )


@require_http_methods("GET")
def api_salesperson_sales(request, id):
    sales = Sale.objects.filter(salesperson_id=id)
    return JsonResponse(
        {"sales": sales},
        encoder=SaleEncoder,
    )


# CustomerEncoder > api_customers > api_customer
class CustomerEncoder(ModelEncoder):
    model = Customer
    fields = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except ValueError as e:
            response = JsonResponse(
                {"message": "Unable to create customer: {}".format(str(e))}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE"])
def api_customer(request, id):
    try:
        customer = Customer.objects.get(id=id)
    except Customer.DoesNotExist:
        return JsonResponse(
            {"message": "Customer does not exist"},
            safe=404,
        )
    if request.method == "GET":
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    else:
        customer.delete()
        return JsonResponse(
            {"message": "Customer deleted"},
            safe=False,
        )


# AutomobileEncoder
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    fields = [
        "vin",
        "sold",
    ]


# SaleEncoder > api_sales > api_sale

class SaleEncoder(ModelEncoder):
    model = Sale
    fields = [
        "automobile",
        "salesperson",
        "customer",
        "price",
    ]

    def get_extra_data(self, o):
        # id is automatically included as primary key field
        return {"salesperson_id": o.salesperson.id}

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }

    def default(self, o):
        try:
            return super().default(o)
        except TypeError:
            return decimal_to_str(o)


'''
Can use SaleEncoder class to convert decimal values to strings
when they cannot be serialized using other methods:
'''


def decimal_to_str(o):
    if isinstance(o, Decimal):
        return str(o)
    raise TypeError(repr(o) + " is not JSON serializable")


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            automobile_id = content['automobile']
            automobile = AutomobileVO.objects.get(id=automobile_id)
            content['automobile'] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Automobile id"},
                status=400,
            )
        try:
            salesperson_id = content['salesperson']
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content['salesperson'] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Salesperson id"},
                status=400,
            )
        try:
            customer_id = content['customer']
            customer = Customer.objects.get(id=customer_id)
            content['customer'] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Customer id"},
                status=400,
            )
        sale = Sale.objects.create(**content)
        sale.save()
        sale.automobile.sell()
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_sale(request, id):
    try:
        sale = Sale.objects.get(id=id)
    except Sale.DoesNotExist:
        return JsonResponse(
            {"message": "Sale does not exist"},
            safe=404,
        )
    if request.method == "GET":
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )
    else:
        sale.delete()
        return JsonResponse(
            {"message": "Sale deleted"},
            safe=False,
        )


# available_cars
'''
A person cannot sell a car that is not listed in the
Inventory, nor can a person sell a car that has already
been sold.
'''


@require_http_methods("GET")
def available_cars(request):
    automobiles = AutomobileVO.objects.filter(sold=False)
    return JsonResponse(
        {"automobiles": automobiles},
        encoder=AutomobileVOEncoder,
    )
