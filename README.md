# Laborit's Backend Developer Test 

## About project
This project was done as a test for Laborit's backend developer position.\
It was done using Node.js (Express) with TypeScript and PostgreSQL. And applying TDD and DDD practices.

## How prepare the application
After git clone, use the command "yarn" or "npm install" in the application's root directory.\
Modify the necessary configuration files such as database information or the secret that will be used to generate the token (these are the files ending with .example)\
After creating the database, it is necessary to run the project migrations to create the tables that will be used in the project using one of the following commands:
```
yarn typeorm migration:run
npm run typeorm migration:run
```

## Running the application
The following commands can be used to run the project (Remember that they must start with ```yarn``` or ```npm run```):\
```build``` - For use in a production environment\
```dev:server``` - For use in the development environment (changes and debugging)\
```typerorm``` - To use commands linked to the database like the previous one\
```test``` - Run the application tests

## Routes
By default, the routes are starting with ```http://localhost:3333```
### Admin
- Create: ```POST /api/admins``` [ADMIN] Create a new admin. Is necessary ```name```, ```email``` and ```password```

### Session
- Create: ```POST /api/admins``` [ADMIN] create a new token to use routes for admins. Is necessary ```email``` and ```password```

To use the token on the routes you need, simply select authentication as a bearer token in your API test tool, and paste the token into the token field

### Brands
- Create: ```POST /api/brands``` [ADMIN] Should create a new brand. Is necessary ```name```
- Read: ```GET /api/brands/{id}``` [ADMIN] Should read a brand by Id
- Update: ```PUT /api/brands/{id}``` [ADMIN] Should update a brand
- Delete: ```DELETE /api/brands/{id}``` [ADMIN] Should delete a brand
- Read: ```GET /api/brands``` [PUBLIC] Should list all brands ordered by name ascending\
Example:
``` JSON
[
  {
    name: "Acura",
    id: "1"
  },
  {
    name: "Agrale",
    id: "2"
  },
  {
    name: "Alfa Romeo",
    id: "3"
  }
]
```

### Models

- Create: ```POST /api/models [ADMIN]``` Should create a new model. Is necessary ```name``` and ```brand_id``` 
- Read: ```GET /api/models/{id} [ADMIN]``` Should read a model by Id
- Update: ```PUT /api/models/{id} [ADMIN]``` Should update a model
- Delete: ```DELETE /api/models/{id} [ADMIN]``` Should delete a model
- Read: ```GET /api/models/?brand_id={brandId} [PUBLIC]``` Should list all models from a brand ordered by name ascending\
Example:
``` JSON
[
    {
      name: "AMAROK CD2.0 16V/S CD2.0 16V TDI 4x2 Die",
      id: 5585
    },
    {
      name: "AMAROK CD2.0 16V/S CD2.0 16V TDI 4x4 Die",
      id: 5586
    },
    {
      name: "AMAROK CS2.0 16V/S2.0 16V TDI 4x2 Diesel",
      id: 5748
    }  
]
```

### Vehicles
- Create: ```POST /api/vehicles [ADMIN]``` Should create a new vehicle. Is necessary ```value  ``` and ```brand_id``` 
- Read: ```GET /api/vehicles/{id} [ADMIN]``` Should read a vehicle by Id
- Update: ```PUT /api/vehicles/{id} [ADMIN]``` *Should update a vehicle *
- Delete: ```DELETE /api/vehicles/{id} [ADMIN]``` *Should delete a vehicle *
- Read: ```GET /api/vehicles/?model_id={modelId} [PUBLIC]``` Should list all vehicles from a model ordered by value ascending\
``` JSON
[
	{
		id: 1254
		value: "R$ 10.254,00",
		brand: "Acura",
		model: "Integra GS 1.8",
		yearModel: 1992,
		fuel: "Gasolina"
	},
	{
		id: 1387
		value: "R$ 11.532,00",
		brand: "Acura",
		model: "Integra GS 1.8",
		yearModel: 1992,
		fuel: "Gasolina"
	}
]
```
