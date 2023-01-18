# Project for Solita dev academy 2023

This is my solution to the Solita dev academy 2023 Spring exercise.
This project is done with React and expressJS using Javascript.

## Features

- Frontend
  * Frontend shows all trips, with pagination, and you can filter them based on all values. It will show all the trips' fields
  * Frontend shows all stations, with pagination, and you can filter them based on name
  * Clicking on a station will open a page with more info about the station with some statistics.
  * UI for adding stations and trips
  * Easy navigation with a navigationbar
  * Eslint is used for codingstyle and quality
     
- Backend
  * Backend supports fetching all trips, or trips based on given values (e.g. all trips where duration is 60 seconds)
  * Backend supports fetching all stations, or station based on station's id or name
  * Fetching one station with station's id or name returns additional statistics on the station
  * Backend also supports adding new trips and stations
  * All requests are validated (see [data\_validation.md](./documentation/data_validation.md)) for more info
  * More information about the apis can be found [here](./documentation/api.md)
  * Backend supports automatic csv-file parsing and importing to mongoDB from a directory. All data from csv-files are also validated.
  * Eslint is used for codingstyle and quality.

- Other:
  * The project implements docker-compose for easy use and testing
  * End to end testing is implemented for the project with cypress and docker-compose. Docker-compose makes it easy to initialize the frontend and backend for cypress

### Tech stack
- Frontend
  * React, due to being my most used frontend library
  * React-router, to create easy routing
  * Axios, for http requests
  * Material UI for basic UI creation
  * Material UIX for the data-grid
  * Testing is implemented with cypress and jest

- Backend
  * NodeJS with expressJS as the framework
  * Mongoose for communication with mongoDB
  * Testing is implemented with jest and supertest

Additionally Docker and Docker-compose are used.

I wrote the entire project with Javascript and not Typescript to save on development time and used testing to compensate not having typing.

## Running the project

The project can be run on linux either manually or with docker-compose (see below) or on windows 10 with docker-compose. Running the project manually on windows 10 has not been confirmed. Please use docker-compose either way. NOTE: I tried to run the project on ubuntu inside a virtual machine (Oracle VMBox) and the mongoDB container did not work due to certain CPU-features not being enabled.

Requirements:
- npm
- nodejs
- Docker
- Docker-compose

It is recommended to delete the containers and images after you don't need them, since they take up a lot of space.

### Docker-compose

Project is meant to be run with docker-compose and it is highly recommended. Running the project with Docker-compose is the easiest way, since no .env file needs to be configured. Make sure that ports 3000, 3001 and 27017 are available, if not configure docker-compose.prodution.yml and nginx.conf to other ports.

Project can be run by running
```
docker-compose -f docker-compose.production.yml up --build
```
in the root directory of the project. Please note that this will take a bit of time to download all the required files. 

Docker-compose will start the production frontend at localhost:3000 and backend at localhost:3001

### Manually with npm


#### Backend

Configure a .env file to ./backend directory. Backend expects that the .env file has a the following line which defines mongoDB uri:
```
MONGODB_URI = 'mongodb+srv://YOURMONGODBURI'
```

If you want the backend to import data from a ./data to the database, add

```
IMPORT_DATA_PATH=./data
```
to the .env.

Then run 
```
npm install
```
in ./backend to install all packages.

To start the backend run:

```
npm start
```

in ./backend

Backend will start at localhost:3001 by default.

#### Frontend

To run the project manually, node and npm must be installed on the system. Frontend expects the backend to be running at localhost:3001, if this is not the case change the url at ./frontend/app.js to the correct url.

To install packages run 
```
npm install
```
at ./frontend

To start the project run

```
npm start
```
at ./frontend

## Testing

### Docker-compose
To run the tests, Docker-compose is recommended. This way you don't have to configure the .env for the backend tests. Docker-compose will run both frontend and backend tests with one command.
Test with Docker-compose can be run with running: 
```
docker-compose -f docker-compose.test.yml up --build
```
at the project's root directory

Note that after the tests docker-compose will start backend and frontend in testing-mode for cypress and thus will not exit automatically.

### Manually

- Frontend

  Run 
  ```
  npm install
  ```
  at the directory ./frontend/ to install all packages

  Run 
  ```
  npm run test
  ```
  at the directory ./frontend/ to run tests

- Backend

  Configure .env file at ./backend/ to have the following
  ```
  MONGODB_URI_TEST = mongodb+srv//YOURTESTMONGODBURI
  ```
  Run
  ```
  npm install
  ```
  at the directory ./backend/ to install all packages

  Run 
  ```
  npm run test
  ```
  at the directory ./backend/ to run tests.

  To start the backend in testing-mode, for cypress, install all the packages and configure the .env as above and run:

  ```
  npm run start:test
  ```

### End to end testing

End to end tests are implemented with cypress.

To run the tests, start the frontend and backend in testing mode. I highly recommend docker-compose to run the frontend and backend in testing-mode (see above), but they can also be started with npm.

Frontend is expected to be running at localhost:3000 and backend at localhost:3001.

When both frontend and backend are running, open another terminal and run the following commands at ./frontend/:

```
npm install
```
then

```
npm run test:e2e
```
to run end to end tests on the terminal or 
```
npm run cypress:open
```
to run end to end tests with a browser

## Features that I wanted to do.

1. Better error handling in the frontend.
2. Better UI. Current UI is rather simple.
3. Station location in single station view.
4. Running the project in Cloud.
5. More interesting statistics about the stations and trips.
