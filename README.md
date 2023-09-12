# CarCar

####Team:

* Patrick - Service
* Anna - Sales

## Design
![DIAGRAM OF THE PROJECT](<Screenshot 2023-09-11 at 3.40.13 PM.png>)



#
#
#
#
#
# Service microservice
- Fork the repository
- Add Team members and instructors ad Maintainers
- Clone the repository
- Docker set-up
    - docker volume create beta-data
    - docker-compose build
    - docker-compose up
- Review code with teammate
- Define roles
- Update README.md
- Set up Insomnia
- Install app in the project's settings
- Implement back-end features
- Implement front-end features

###BACK-END
    CREATE MODELS, REGISTER MODELS IN ADMIN, MIGRATE, CREATE VIEW, REGISTER URLS, REGISTER APP URLS IN PROJECT URLS

    TECHNICIAN RESOURCES
        - GET list technichians
        - POST create a new technician
        - DELETE delete a specific technician

    APPOINTMENT RESOURCES
        - GET list appointments
        - POST create an appointment
        - DELETE delete an appointment
        - PUT set appointment status to cancelled
        - PUT set appointment status to finished
    
    POLLING SERVICE
        - it should pull and create the AutomobileVO
        - it should update the AutomobileVO every 60 seconds with updated VINs from the Inventory service


###FRONT-END
    NAVIGATION
        - Create links to:
            - add a technician (form)
            - add a service appointment (form)
            - show a list of appointments
            - show service appointments by VIN(optional)
    
    ADD A TECHNICIAN FORM

    ADD A SERVICE APPOINTMENT FORM

    SERVICE APPOINTMENTS LIST
        - with CANCEL and FINISH buttons
        - should not show appointments that have been cancelled or finished

    SHOW SERVICE HISTORY BY VIN
        - shows all "CANCELLED", "FINISHED", and "CREATED" appointments


####CRUD ROUTE DOCUMENTATION
| ACTION | METHOD | URL |
|:-|:-|:-|
| List technicians | GET | http://localhost:8080/api/technicians/ |
| Create a technician | POST | http://localhost:8080/api/technicians/ |
| Delete a specific technician	| DELETE | http://localhost:8080/api/technicians/:id/ |
| List appointments |	GET | http://localhost:8080/api/appointments/ |
| Create an appointment	| POST | http://localhost:8080/api/appointments/ |
| Delete an appointment	| DELETE | http://localhost:8080/api/appointments/:id/ |
| Set appointment status to "canceled" |	PUT |	http://localhost:8080/api/appointments/:id/cancel/ |
| Set appointment status to "finished" |	PUT |	http://localhost:8080/api/appointments/:id/finish/ |

#
#
#
#
#
# Sales microservice
- Clone the repository
- Docker set-up
    - docker volume create beta-data
    - docker-compose build
    - docker-compose up
- Review code with teammate
- Define roles
- Update README.md
- Set up Insomnia
- Install app in the project's settings
- Implement back-end features
- Implement front-end features

###BACK-END
    CREATE MODELS, REGISTER MODELS IN ADMIN, MIGRATE, CREATE VIEW, REGISTER URLS, REGISTER APP URLS IN PROJECT URLS

    SALESPEOPLE RESOURCE
        - GET list salespeople
        - POST create a new salesperson
        - DELETE delete a specific salesperson

    CUSTOMER RESOURCES
        - GET list customers
        - POST create a specific customer
        - DELETE delete a specific customer
 
    SALES RESOURCES
        - GET list sales
        - POST create a sale
        - DELETE delete a sale
    
    POLLING SERVICE
        - it should pull and create the AutomobileVO
        - it should update the AutomobileVO every 60 seconds with updated VINs from the Inventory service


###FRONT-END
    NAVIGATION
        - Create links to:
            - add a new salesperson
            - add a new customer
            - create a sale record
            - list all sales
            - list all sales by salesperson
    
    ADD SALES PERSON FORM

    ADD A CUSTOMER FORM

    CREATE A SALE RECORD

    LIST ALL SALES

    LIST SALES HISTORY BY SALES PERSON


###CRUD ROUTE DOCUMENTATION
| ACTION | METHOD | URL |
|:-|:-|:-|
| List salespeople | GET | http://localhost:8090/api/salespeople/ |
|Create a salesperson | POST | http://localhost:8090/api/salespeople/ |
|List customers |	GET	|http://localhost:8090/api/customers/|
|Create a customer |	POST	|http://localhost:8090/api/customers/|
|Delete a specific customer	|DELETE|	http://localhost:8090/api/customers/:id/|
|List sales	| GET | http://localhost:8090/api/sales/ |
|Create a sale|	POST |	http://localhost:8090/api/sales/ |
|Delete a sale|	DELETE | http://localhost:8090/api/sales/:id |


#
#
#
#
#
# Inventory microservice
###FRONT-END
    Create React components and navbar links to:
        - show a list of manufacturers
        - create a manufacturer
        - show a list of vehicle models
        - create a vehicle model
        - show a list of automobiles in inventory

###CRUD ROUTE DOCUMENTATION
#####MANUFACTURERS
| ACTION | METHOD | URL |
|:-|:-|:-|
| List manufacturers | GET | http://localhost:8100/api/manufacturers/ |
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/ |
| Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/:id/ |
| Update  a specific manufacturer |	PUT | http://localhost:8100/api/manufacturers/:id/ |
| Delete a specific manufacturer	| DELETE | http://localhost:8100/api/manufacturers/:id/ |

######Creating and updating a manufacturer requires only the manufacturer's name.
    {
    "name": "Chrysler"
    }

######The return value of creating, getting, and updating a single manufacturer is its name, href, and id.
    {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Chrysler"
    }

######The list of manufacturers is a dictionary with the key "manufacturers" set to a list of manufacturers.
    {
    "manufacturers": [
        {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
        }
    ]
    }

####VEHICLE MODELS
| ACTION | METHOD | URL |
|:-|:-|:-|
| List vehicle models | GET | http://localhost:8100/api/models/ |
| Create a vehicle model | POST | http://localhost:8100/api/models/ |
| Get a specific vehicle model | GET | http://localhost:8100/api/models/:id/ |
| Update  a specific vehicle model |	PUT | http://localhost:8100/api/models/:id/ |
| Delete a specific vehicle model	| DELETE | http://localhost:8100/api/models/:id/ |


######Creating a vehicle model requires the model name, a URL of an image, and the id of the manufacturer.
    {
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer_id": 1
    }

######Updating a vehicle model can take the name and/or the picture URL. It is not possible to update a vehicle model's manufacturer.
    {
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
    }

######Getting the detail of a vehicle model, or the return value from creating or updating a vehicle model, returns the model's information and the manufacturer's information.
    {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
            "href": "/api/manufacturers/1/",
            "id": 1,
            "name": "Daimler-Chrysler"
        }
    }

######Getting a list of vehicle models returns a list of the detail information with the key "models".
    {
    "models": [
        {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
            "href": "/api/manufacturers/1/",
            "id": 1,
            "name": "Daimler-Chrysler"
        }
        }
    ]
    }

####AUTOMOBILES
| ACTION | METHOD | URL |
|:-|:-|:-|
| List automobiles | GET | http://localhost:8100/api/automobiles/ |
| Create an automobile | POST | http://localhost:8100/api/automobiles/ |
| Get a specific automobile | GET | http://localhost:8100/api/automobiles/:vin/ |
| Update  a specific automobile |	PUT | http://localhost:8100/api/automobiles/:vin/ |
| Delete a specific automobile	| DELETE | http://localhost:8100/api/automobiles/:vin/ |

######You can create an automobile with its color, year, VIN, and the id of the vehicle model.
    {
    "color": "red",
    "year": 2012,
    "vin": "1C3CC5FB2AN120174",
    "model_id": 1
    }

######As noted, you query an automobile by its VIN. The details for an automobile include its model and manufacturer.
    {
    "href": "/api/automobiles/1C3CC5FB2AN120174/",
    "id": 1,
    "color": "yellow",
    "year": 2013,
    "vin": "1C3CC5FB2AN120174",
    "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
        }
    },
    "sold": false
    }

######You can update the color, year, and sold status of an automobile.
    {
    "color": "red",
    "year": 2012,
    "sold": true
    }

######Getting a list of automobiles returns a dictionary with the key "autos" set to a list of automobile information.
    {
    "autos": [
        {
        "href": "/api/automobiles/1C3CC5FB2AN120174/",
        "id": 1,
        "color": "yellow",
        "year": 2013,
        "vin": "1C3CC5FB2AN120174",
        "model": {
            "href": "/api/models/1/",
            "id": 1,
            "name": "Sebring",
            "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
            "manufacturer": {
            "href": "/api/manufacturers/1/",
            "id": 1,
            "name": "Daimler-Chrysler"
            }
        },
        "sold": false
        }
    ]
    }