from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "vin",
        "customer",
        "is_vip",
    ]

    def get_extra_data(self, o):
        return {
            "status": o.status.name,
            "technician": str(o.technician),
        }


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except ValueError as e:
            response = JsonResponse(
                {"message": "Unable to create the technician: {}".format(
                    str(e)
                )}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician does not exist"})
            response.status_code = 404
            return response
        
    elif request.method == "DELETE":
        try:
            count, _ = Technician.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician does not exist"})
    else:
        try:
            content = json.loads(request.body)
            Technician.objects.filter(id=pk).update(**content)
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician_id = content.get("technician")
            technician_instance = get_object_or_404(
                Technician, id=technician_id
            )
            content['technician'] = technician_instance
            appointment = Appointment.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except ValueError as e:
            response = JsonResponse(
                {"message": "Unable to create the appointment: {}".format(
                    str(e)
                )}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def api_delete_appointment(request, pk):
    try:
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment does not exist"})


@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.finish()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        response = JsonResponse({"message": "Appointment does not exist"})
        response.status_code = 404
        return response


@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.cancel()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        response = JsonResponse({"message": "Appointment does not exist"})
        response.status_code = 404
        return response
