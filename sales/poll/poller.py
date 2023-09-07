import django
import os
import sys
import time
import json
import requests

'''
Automobile poller: update AutomobileVO every 60 seconds with
updated VINs from Inventory Service.
'''

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import AutomobileVO


def poll(interval=60, repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            url = "http://project-beta-inventory-api-1:8000/api/automobiles/"
            response = requests.get(url)

            if response.status_code != 200:
                raise Exception(
                    "Failed to get automobiles from Inventory Service"
                )

            content = json.loads(response.content)
            for auto in content['autos']:
                AutomobileVO.objects.update_or_create(
                    id=auto[id],
                    defaults={"vin": auto["vin"]}
                )
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(interval)


if __name__ == "__main__":
    poll()
