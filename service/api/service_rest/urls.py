"""service_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path

from .views import (
    api_list_technicians,
    api_list_appointments,
    api_show_technician,
    api_delete_appointment,
    api_finish_appointment,
    api_cancel_appointment,
)


urlpatterns = [
    path(
        "technicians/",
        api_list_technicians,
        name="api_list_technicians"
        ),
    path(
        "technicians/<int:pk>/",
        api_show_technician,
        name="api_show_technician",
    ),
    path(
        "appointments/",
        api_list_appointments,
        name="api_list_appointments"
        ),
    path(
        "appointments/<int:pk>/",
        api_delete_appointment,
        name="api_delete_appointment"
    ),
    path(
        "appointments/<int:pk>/finish/",
        api_finish_appointment,
        name="api_finish_appointment",
    ),
    path(
        "appointments/<int:pk>/cancel/",
        api_cancel_appointment,
        name="api_cancel_appointment",
    ),
]
