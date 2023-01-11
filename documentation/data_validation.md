# Data validation

## Trip

- Departure/Return date
  * Must be parseable to the JavaScript Date object.
  * Must be defined

- Distance
  * Must be defined.
  * Must be at least 10 meters.
  * Must be parseable to an integer, e.g. 10 and "10" are both 
valid.

- Duration
  * Must be defined.
  * Must be at least 10 seconds.
  * Must be parseable to an integer, e.g. 10 and "10" are both valid.
  * Must match the difference between return date and departure date with reasonable accuracy. This also requires the return date to be later than the departure time. Used formula is: 0.95 < (return time - departure time)/duration < 1.05

## Station

- Name
  * Must be a non-empty string.
  * Must be defined.
  * Must be unique.

- ID (user defined, not the MongoDB id)
  * Must be a non-negative integer.
  * Must be defined.
  * Must be unique.

