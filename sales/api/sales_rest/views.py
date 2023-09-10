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
# import requests


# Define api_list_salespeople to handle requests for Salesperson data
@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    # If the request method is GET
    if request.method == "GET":
        # Query the database for all Salesperson objects
        salespeople = Salesperson.objects.all()
        # If there are salespeople in the database
        if salespeople:
            # Return JSON response w/ 200 status code + success message
            response = {
                "message": "Salespeople List retrieved successfully",
                "salespeople": salespeople,
            }
            return JsonResponse(
                response,
                encoder=SalespersonEncoder,
            )
        # Otherwise, if there are no salespeople in the database
        else:
            # Return JSON resposne w/ 404 error ("Not Found") + error message
            response = JsonResponse({"message": "No salespeople found"})
            response.status_code = 404
            return response
    # If the request method is POST
    else:  # POST - create a new instance of salesperson
        # Try to parse the request body as JSON
        try:
            content = json.loads(request.body)
            # Create a new Salesperson object using the parsed JSON data
            salesperson = Salesperson.objects.create(**content)
            # Return a JSON response with 200 status code and success message
            response = {
                "message": "Salesperson created successfully",
                "salesperson": salesperson,
            }
            return JsonResponse(
                response,
                encoder=SalespersonEncoder,
                safe=False,
            )
        # If there's an error parsing the request body or...
        # creating the Salesperson object
        except ValueError as e:
            # Return a JSON respone with a 400 status code
            # ("Bad Request" client error) and an error message
            response = JsonResponse(
                {"message": "Unable to create salesperson: {}".format(str(e))}
            )
            response.status_code = 400
            return response


# Define api_salesperson_details to handle requests for a specific Salesperson
@require_http_methods(["GET", "DELETE", "PUT"])
def api_salesperson_details(request, id):
    # If the request method is GET
    if request.method == "GET":
        # Try to get the Salesperson with the specified ID from the database
        try:
            salesperson = Salesperson.objects.get(id=id)
            # Return the Salesperson data as a JSON response
            # with a 200 status code and success message
            response = {
                "message": "Salesperson retrieved successfully",
                "salesperson": salesperson,
            }
            return JsonResponse(
                response,
                encoder=SalespersonEncoder,
                safe=False,
            )
        # If the Salesperson does not exist in the database
        except Salesperson.DoesNotExist:
            # Return a JSON response with a 404 status code and error message
            response = JsonResponse({"message": "Salesperson does not exist"})
            response.status_code = 404
            return response
    # If the request method is DELETE
    elif request.method == "DELETE":
        # Try to get the Salesperson with the specified ID from the database
        try:
            salesperson = Salesperson.objects.get(id=id)
            # Delete the Salesperson from the database
            salesperson.delete()
            # Return a JSON response with a 200 status code and success message
            response = {
                "message": "Salesperson deleted successfully",
                "salesperson": salesperson,
            }
            return JsonResponse(
                response,
                encoder=SalespersonEncoder,
                safe=False,
            )
        # If the Salesperson does not exist in the database OR
        # they've already been deleted
        except Salesperson.DoesNotExist:
            # Return a JSON response with a 404 status code and error message
            response = JsonResponse({"message": "Salesperson does not exist"})
            response.status_code = 404
            return response
    # If the request method is PUT
    else:  # PUT - update a specific salesperson prn
        # Try to parse the request body as JSON
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.get(id=id)
            props = ["first_name", "last_name", "employee_id"]
            # Update any properties provided in the request body
            for prop in props:
                if prop in content:
                    setattr(salesperson, prop, content[prop])
            # Save the updated Salesperson object to the database
            salesperson.save()
            # Return a JSON response with a 200 status code and success message
            response = {
                "message": "Salesperson updated successfully",
                "salesperson": salesperson,
            }
            return JsonResponse(
                response,
                encoder=SalespersonEncoder,
                safe=False,
            )
        # If the Salesperson does not exist in the database or
        # there's an error parsing the request body
        except Salesperson.DoesNotExist:
            # Return a JSON response w/ 404 status code + error message
            response = JsonResponse({"message": "Salesperson does not exist"})
            response.status_code = 404
            return response


# Define api_list_customers function to handle requests for Customer data
@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    # If the request method is GET
    if request.method == "GET":
        # Query the database for all Customer objects
        customers = Customer.objects.all()
        # If there are customers in the database
        if customers:
            # Return JSON response with 200 status code + success message
            response = {
                "message": "Customers List retrieved successfully",
                "customers": customers,
            }
            return JsonResponse(
                response,
                encoder=CustomerEncoder,
            )
        else:
            # Otherwise if there are no customers in the database,
            # return a 404 error and error message
            response = JsonResponse({"message": "No customers found"})
            response.status_code = 404
            return response
    # If the request method is POST
    else:  # POST - create a new instance of customer
        # Try to parse the request body as JSON
        try:
            content = json.loads(request.body)
            # Create a new Customer object using the parsed JSON data
            customer = Customer.objects.create(**content)
            # Return a JSON resposne w/ 200 status code + success message
            response = {
                "message": "Customer created successfully",
                "customer": customer,
            }
            return JsonResponse(
                response,
                encoder=CustomerEncoder,
                safe=False,
            )
        # If there's an error parsing the request body or...
        # creating the Customer object
        except ValueError as e:
            # Return JSON response w/ 400 status code + error message
            response = JsonResponse(
                {"message": "Unable to create customer: {}".format(str(e))}
            )
            response.status_code = 400
            return response


# Define api_customer_details to handle requests for a specific Customer
@require_http_methods(["GET", "DELETE", "PUT"])
def api_customer_details(request, id):
    # If the request method is GET
    if request.method == "GET":
        # Try tto get the Customer with the specified ID from the database
        try:
            customer = Customer.objects.get(id=id)
            # Return the Customer data as a JSON response
            # with 200 status code and success message
            response = {
                "message": "Customer retrieved successfully",
                "customer": customer,
            }
            return JsonResponse(
                response,
                encoder=CustomerEncoder,
                safe=False,
            )
        # If the Customer does not exist in the database
        except Customer.DoesNotExist:
            # Return JSON respone w/ 404 status code + error message
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response
    # If the request method is DELETE
    elif request.method == "DELETE":
        # Try to get the Customer with the specified ID from the database
        try:
            customer = Customer.objects.get(id=id)
            # Delete the Customer from the database
            customer.delete()
            # Return JSON response w/ 200 status code + success message
            response = {
                "message": "Customer deleted successfully",
                "customer": customer,
            }
            return JsonResponse(
                response,
                encoder=CustomerEncoder,
                safe=False,
            )
        # If the Customer does not exist in the database OR
        # they've already been deleted
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response
    # If the request method is PUT
    else:  # PUT - update a specific customer prn
        # Try to parse the request body as JSON
        try:
            content = json.loads(request.body)
            # Try to get the Customer with the specified ID from the database
            customer = Customer.objects.get(id=id)
            props = ["first_name", "last_name", "address", "phone_number"]
            # Update any properties provided in the request body
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            # Save the updated Salesperson object to the database
            customer.save()
            # Return JSON response w/ 200 status code + success message
            response = {
                "message": "Customer updated successfully",
                "customer": customer,
            }
            return JsonResponse(
                response,
                encoder=CustomerEncoder,
                safe=False,
            )
        # If the Customer does not exist in the database
        except Customer.DoesNotExist:
            # # Return JSON resposne w/ 404 status code + error message
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response


# Define api_list_sales function to handle requests for Sale data
@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    # If the request method is GET
    if request.method == "GET":
        # Query the database for all Sale objects
        sales = Sale.objects.all()
        # If there are sales in the database,
        if sales:
            # Return JSON response w/ 200 status code + success message
            response = {
                "message": "Sales List retrieved successfully",
                "sales": sales,
            }
            return JsonResponse(
                response,
                encoder=SaleEncoder,
            )
        # Otherwise, if there are no sales in the database,
        else:
            # Return JSON response w/ 404 error + error message
            response = JsonResponse({"message": "Sale does not exist"})
            response.status_code = 404
            return response
    # If the request method is POST
    else:  # POST - create a new instance of sale
        # Try to parse the request body as JSON
        content = json.loads(request.body)
        # AUTOMOBILE
        # Try to get the AutomobileVO with the specified vin from
        # the inventory database,
        # and add it to the Sale object being created
        try:
            content["automobile"] = AutomobileVO.objects.get(
                vin=content["automobile"])
        # If there's an error parsing the request body or...
        # creating the Sale object
        except ValueError as e:
            # Return JSON object w/ 400 status code + error message
            response = JsonResponse(
                {"message": "Invalid Automobile ID: {}".format(str(e))}
            )
            response.status_code = 400
            return response
        # If Automobile has already been sold...
        if content["automobile"].sold:
            response = JsonResponse(
                {"message": "Automobile has already been sold"}
            )
            response.status_code = 400
            return response
        # SALESPERSON
        # Try to get the Salesperson with the specified ID from the database,
        # and add it to the Sale object being created
        try:
            salesperson_id = content['salesperson']
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content['salesperson'] = salesperson
        # If there's an error parsing the request body or...
        # creating the Sale object
        except ValueError as e:
            # Return JSON object w/ 400 status code + error message
            response = JsonResponse(
                {"message": "Invalid Salesperson ID: {}".format(str(e))}
            )
            response.status_code = 400
            return response
        # CUSTOMER
        # Try to get the Customer with the specified ID from the database,
        # and add it to the Sale object being created
        try:
            customer_id = content['customer']
            customer = Customer.objects.get(id=customer_id)
            content['customer'] = customer
        # If there's an error parsing the request body or...
        # creating the Sale object
        except ValueError as e:
            # Return JSON object w/ 400 status code + error message
            response = JsonResponse(
                {"message": "Invalid Customer ID: {}".format(str(e))}
            )
            response.status_code = 400
            return response

        # Create the Sale object and save it to the database
        sale = Sale.objects.create(**content)
        sale.save()
        sale.automobile.sell()

        response = {
            "message": "Sale created successfully",
            "sale": sale,
        }
        # The AutomobileVO.sell() method defined in models.py file
        # This marks the automobile as sold and saves it
        return JsonResponse(
            response,
            encoder=SaleEncoder,
            safe=False,
        )


# Define api_sales_details function to handle requests for a specific Sale
@require_http_methods(["GET", "DELETE"])
def api_sale_details(request, id):
    # If the request method is GET
    if request.method == "GET":
        # Try to get the Sale with the specified ID from the database
        try:
            sale = Sale.objects.get(id=id)
            # Return the Sale data as a JSON response w/
            # 200 status code + success message
            response = {
                "message": "Sale retrieved successfully",
                "sale": sale,
            }
            return JsonResponse(
                response,
                encoder=SaleEncoder,
                safe=False,
            )
        # If the Sale does not exist in the database
        except Sale.DoesNotExist:
            # Return JSON response w/ 404 status code + error message
            response = JsonResponse({"message": "Sale does not exist"})
            response.status_code = 404
            return response
    # If the request method is DELETE
    else:  # DELETE
        # Try to get the Sale with the specified ID from the database
        try:
            sale = Sale.objects.get(id=id)
            # Delete the Sale from the database
            sale.delete()
            # Return the Sale data as a JSON response
            # w/ 200 status code + success message
            response = {
                "message": "Sale deleted successfully",
                "sale": sale,
            }
            return JsonResponse(
                response,
                encoder=SaleEncoder,
                safe=False,
            )
        # If the Sale does not exist in the database OR
        # it's already been deleted
        except Sale.DoesNotExist:
            # Return JSON response w/ 404 status code + error message
            response = JsonResponse({"message": "Sale does not exist"})
            response.status_code = 404
            return response


'''
A person cannot sell a car that is not listed in the
Inventory, nor can a person sell a car that has already
been sold.
'''


# Define api_available_cars to handle request for
# available AutomobileVO objects
@require_http_methods("GET")
def api_available_cars(request):
    # If the request method is GET
    if request.method == "GET":
        # Try to get all AutomobileVO objects that have not been sold
        try:
            automobiles = AutomobileVO.objects.filter(sold=False)
            # Return the AutomobileVO data as a JSON response with
            # 200 status code + success message
            response = {
                "message": "Available Automobiles retrieved successfully",
                "automobiles": automobiles,
            }
            return JsonResponse(
                response,
                encoder=AutomobileVOEncoder,
            )
        # If there are no AutomobileVO objects exist in the database
        # that have not been sold
        except AutomobileVO.DoesNotExist:
            # Return JSON response w/ 404 status code + error message
            response = JsonResponse({"message": "Car does not exist"})
            response.status_code = 404
            return response


# Define api_salesperson_history to handle request for Sale objects
# associated with a specific Salesperson
@require_http_methods(["GET"])
def api_salesperson_history(request, id):
    # If the request method is GET
    if request.method == "GET":
        # Try to get the Salesperson with the specified ID from the database
        try:
            salesperson = Salesperson.objects.get(id=id)
            # Try to get all the Sale ojbects associated w/ the Salesperson
            sales = Sale.objects.filter(salesperson=salesperson)
            # Return the Sale data as a JSON resposne w/ 200 status code
            # + success message
            response = {
                "message": "Sales history retrieved successfully",
                "sales": sales,
            }
            return JsonResponse(
                response,
                encoder=SaleEncoder,
            )
        # If no Sale objects associated with the Salesperson exist
        # in the database
        except Sale.DoesNotExist:
            # Return JSON resposne w/ 404 status code + error message
            response = JsonResponse(
                {"message": "Sales history does not exist"}
            )
            response.status_code = 404
            return response
