# Api definitions and usage

The following are the routes after the base url.

## /ping   
Used for health tests.

GET /ping will return 'ping' if the request was successful.

## /api/trip

### POST /api/trip

Expected body example: 
```
departure_time: '2021-05-31T23:57:25',
return_time: '2021-06-01T00:05:46',
departure_station_name: 'Käpylän asema',
departure_station_id: 1,
return_station_name: 'Oulunkylän asema',
return_station_id: 2,
distance: 2043,
duration: 500
```

api will validate the stations and the given variables before addition.

If departure station of return station do not exist in the database they will be added to the database.

Status 400 will be given if validation fails for either of the stations or the trip. See [data\_validation.md](./data_validation.md) document for more info.

Status 201 will be given on success.

### GET /api/trip

The following query parameters are supported

```
departure_time,
return_time,
departure_station_name,
return_station_name,
distance,
duration
```

If no query parameters are given, all trips are returned with status 200.

If query parameters are defined api will return all trips that match the parameters with status 200.

If no trips are found status 404 is returned.

Example request

```
GET /api/trip?duration=200&distance=200
```

will return all trips that have duration of 200 minutes and distance of 200 meters.

## /api/station

### POST /api/station

Expected body example:
```
name: Käpylän asema
station_id: 1
```
will add a new station with name 'Käpylän asema' with station\_id 1.

Api will validate the name and station\_id before addition. See [data\_validation.md](./data_validation.md) for more info.

On success status 201 is returned

On validation error status 400 is returned

### GET /api/station

Will return all the stations from the database.

Status 404 is given if no stations are found.

### GET /api/station/:name

Will return all the stations from the database with the given name.

Status 404 is given if no stations are found.

## /api/test

This is only available when the node environment is set to test

### POST /api/test/reset

This request will delete all stations and trips from the testing database. Will return status 200 on success.


### POST /api/test/initState

This request will parse and add all stations and trips from the file /backend/tests/valid\_data.csv to the testing database. Will return status 201 on success.

