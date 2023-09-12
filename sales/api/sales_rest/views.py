from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .models import (
    Salesperson,
    Customer,
    Sale,
    AutomobileVO,
)
from .encoders import (
    SalespersonEncoder,
    CustomerEncoder,
    SaleEncoder,
)


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        if salespeople:
            response = {
                "message": "Salespeople List retrieved successfully",
                "salespeople": salespeople,
            }
            return JsonResponse(
                response,
                encoder=SalespersonEncoder,
            )
        else:
            response = JsonResponse({"message": "No salespeople found"})
            response.status_code = 404
            return response
    else:  # POST - create a new instance of salesperson
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            response = {
                "message": "Salesperson created successfully",
                "salesperson": salesperson,
            }
            return JsonResponse(
                response,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except ValueError as e:
            response = JsonResponse(
                {"message": "Unable to create salesperson: {}".format(str(e))}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE", "PUT"])
def api_salesperson(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            response = {
                "message": "Salesperson retrieved successfully",
                "salesperson": salesperson,
            }
            return JsonResponse(
                response,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Salesperson does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=id)
            salesperson.delete()
            response = {
                "message": "Salesperson deleted successfully",
                "salesperson": salesperson,
            }
            return JsonResponse(
                response,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Salesperson does not exist"})
            response.status_code = 404
            return response
    else:  # PUT - update a specific salesperson prn
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.get(id=id)
            props = ["first_name", "last_name", "employee_id"]
            for prop in props:
                if prop in content:
                    setattr(salesperson, prop, content[prop])
            salesperson.save()
            response = {
                "message": "Salesperson updated successfully",
                "salesperson": salesperson,
            }
            return JsonResponse(
                response,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Salesperson does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        if customers:
            response = {
                "message": "Customers List retrieved successfully",
                "customers": customers,
            }
            return JsonResponse(
                response,
                encoder=CustomerEncoder,
            )
        else:
            response = JsonResponse({"message": "No customers found"})
            response.status_code = 404
            return response
    else:  # POST - create a new instance of customer
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            response = {
                "message": "Customer created successfully",
                "customer": customer,
            }
            return JsonResponse(
                response,
                encoder=CustomerEncoder,
                safe=False,
            )
        except ValueError as e:
            response = JsonResponse(
                {"message": "Unable to create customer: {}".format(str(e))}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE", "PUT"])
def api_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            response = {
                "message": "Customer retrieved successfully",
                "customer": customer,
            }
            return JsonResponse(
                response,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            response = {
                "message": "Customer deleted successfully",
                "customer": customer,
            }
            return JsonResponse(
                response,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response
    else:  # PUT - update a specific customer prn
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=id)
            props = ["first_name", "last_name", "address", "phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            response = {
                "message": "Customer updated successfully",
                "customer": customer,
            }
            return JsonResponse(
                response,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        if sales:
            response = {
                "message": "Sales List retrieved successfully",
                "sales": sales,
            }
            return JsonResponse(
                response,
                encoder=SaleEncoder,
            )
        else:
            response = JsonResponse({"message": "Sale does not exist"})
            response.status_code = 404
            return response
    else:  # POST - create a new instance of sale
        content = json.loads(request.body)
        # Automobiles
        try:
            vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = automobile
            # content["automobile"] = AutomobileVO.objects.get(
            #     vin=content["automobile"])
        except ValueError as e:
            response = JsonResponse(
                {"message": "Invalid Automobile ID: {}".format(str(e))}
            )
            response.status_code = 400
            return response
        if content["automobile"].sold:
            response = JsonResponse(
                {"message": "Automobile has already been sold"}
            )
            response.status_code = 400
            return response
        # Salesperson
        try:
            salesperson = Salesperson.objects.get(
                employee_id=content["salesperson"]
            )
            content['salesperson'] = salesperson
        except ValueError as e:
            response = JsonResponse(
                {"message": "Invalid Salesperson ID: {}".format(str(e))}
            )
            response.status_code = 400
            return response
        # Customer
        try:
            # customer = Customer.objects.get(first_name=content["customer"])
            customer = Customer.objects.get(id=content["customer"])
            content['customer'] = customer
        except ValueError as e:
            response = JsonResponse(
                {"message": "Invalid Customer ID: {}".format(str(e))}
            )
            response.status_code = 400
            return response

        sale = Sale.objects.create(**content)
        sale.save()
        # sale.automobile.sell()

        response = {
            "message": "Sale created successfully",
            "sale": sale,
        }
        return JsonResponse(
            response,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_sale(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            response = {
                "message": "Sale retrieved successfully",
                "sale": sale,
            }
            return JsonResponse(
                response,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Sale does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            response = {
                "message": "Sale deleted successfully",
                "sale": sale,
            }
            return JsonResponse(
                response,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Sale does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            content = json.loads(request.body)
            sale = Sale.objects.get(id=id)
            props = ["automobile", "salesperson", "customer", "price"]
            for prop in props:
                if prop in content:
                    setattr(sale, prop, content[prop])
            sale.save()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


'''
A person cannot sell a car that is not listed in the
Inventory, nor can a person sell a car that has already
been sold.
'''


# @require_http_methods(["GET"])
# def api_salesperson_history(request, id):
#     if request.method == "GET":
#         try:
#             salesperson = Salesperson.objects.get(id=id)
#             sales = Sale.objects.filter(salesperson=salesperson)
#             response = {
#                 "message": "Sales history retrieved successfully",
#                 "sales": sales,
#             }
#             return JsonResponse(
#                 response,
#                 encoder=SalespersonEncoder,
#                 safe=False
#             )
#         except Salesperson.DoesNotExist:
#             response = JsonResponse(
#                 {"message": "Salesperson does not exist"}
#             )
#             response.status_code = 404
#             return response
#         except Sale.DoesNotExist:
#             response = JsonResponse(
#                 {"message": "Sales history does not exist"}
#             )
#             response.status_code = 404
#             return response
