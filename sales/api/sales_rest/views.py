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
    AutomobileVOEncoder,
    SaleEncoder,
)


# api_salespeople > api_saleperson


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        try:
            salespeople = Salesperson.objects.all()
            return JsonResponse(
                {"salespeople": salespeople},
                encoder=SalespersonEncoder,
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Salesperson does not exist"})
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
def api_salesperson_details(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
                salesperson,
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


# api_customers > api_customer


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        try:
            customers = Customer.objects.all()
            return JsonResponse(
                {"customers": customers},
                encoder=CustomerEncoder,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
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
def api_customer_details(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
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


# api_sales > api_sale > api_salesperson_history

@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        try:
            sales = Sale.objects.all()
            return JsonResponse(
                {"sales": sales},
                encoder=SaleEncoder,
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Sale does not exist"})
            response.status_code = 404
            return response
    else:  # POST - create a new instance of sale
        content = json.loads(request.body)
        # AUTOMOBILE
        try:
            automobile_id = content['automobile_id']
            automobile = AutomobileVO.objects.get(id=automobile_id)
            content['automobile'] = automobile
        except ValueError as e:
            response = JsonResponse(
                {"message": "Invalid Automobile id: {}".format(str(e))}
            )
            response.status_code = 400
            return response
        # SALESPERSON
        try:
            salesperson_id = content['salesperson_id']
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content['salesperson'] = salesperson
        except ValueError as e:
            response = JsonResponse(
                {"message": "Invalid Salesperson id: {}".format(str(e))}
            )
            response.status_code = 400
            return response
        # CUSTOMER
        try:
            customer_id = content['customer_id']
            customer = Customer.objects.get(id=customer_id)
            content['customer'] = customer
        except ValueError as e:
            response = JsonResponse(
                {"message": "Invalid Customer id: {}".format(str(e))}
            )
            response.status_code = 400
            return response
        # PRICE
        try:
            price = content['price']
        except KeyError:
            response = JsonResponse(
                {"message": "Price is required!"}
            )
            response.status_code = 400
            return response

        # Convert the price to cents before saving
        price = int(price * 100)
        content['price'] = price

        # Create the sale
        sale = Sale.objects.create(**content)
        sale.save()

        # Convert price back to dollars for JSON response
        sale.price = sale.price / 100
        content['price'] = price
        response = {
            "message": "Sale created successfully",
            "sale": sale,
        }
        # The AutomobileVO.sell() method defined in models.py file
        # This marks the automobile as sold and saves it
        sale.automobile.sell()
        return JsonResponse(
            response,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_sale_details(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Sale does not exist"})
            response.status_code = 404
            return response
    else:  # DELETE
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Sale does not exist"})
            response.status_code = 404
            return response


# available_cars > api_salesperson_history
'''
A person cannot sell a car that is not listed in the
Inventory, nor can a person sell a car that has already
been sold.
'''


@require_http_methods("GET")
def api_available_cars(request):
    if request.method == "GET":
        try:
            automobiles = AutomobileVO.objects.filter(sold=False)
            return JsonResponse(
                {"automobiles": automobiles},
                encoder=AutomobileVOEncoder,
            )
        except AutomobileVO.DoesNotExist:
            response = JsonResponse({"message": "Car does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET"])
def api_salesperson_history(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            sales = Sale.objects.filter(salesperson=salesperson)
            return JsonResponse(
                {"sales": sales},
                encoder=SaleEncoder,
            )
        except Sale.DoesNotExist:
            response = JsonResponse(
                {"message": "Sales history does not exist"}
            )
            response.status_code = 404
            return response
