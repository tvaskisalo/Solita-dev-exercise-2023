const validators = require('../utils/validators')

describe('Validator tests', () => {
  describe('Time validator', () => {
    test('validateTime return true with valid time', () => {
      const valid = validators.validateTime('2021-06-01T00:05:46')
      expect(valid).toBe(true)
    })

    test('validateTime returns false with undefined time', () => {
      const valid = validators.validateTime(undefined)
      expect(valid).toBe(false)
    })

    test('validateTime returns false with empty string', () => {
      const valid = validators.validateTime('')
      expect(valid).toBe(false)
    })

    test('validateTime returns false with invalid format', () => {
      const valid = validators.validateTime('20210601T000546')
      expect(valid).toBe(false)
    })

    test('validateTime returns false with impossible date 1', () => {
      const valid = validators.validateTime('2021-50-01T00:05:46')
      expect(valid).toBe(false)
    })

    test('validateTime returns false with impossible date 2', () => {
      const valid = validators.validateTime('2021-06-01T77:77:77')
      expect(valid).toBe(false)
    })
  })

  describe('Id validator', () => {
    test('validateId returns true with valid id', () => {
      const valid = validators.validateId('10')
      expect(valid).toBe(true)
    })

    test('validateId returns false with undefined id', () => {
      const valid = validators.validateId(undefined)
      expect(valid).toBe(false)
    })

    test('validateId returns false with non-number', () => {
      const valid = validators.validateId('id')
      expect(valid).toBe(false)
    })

    test('validateId returns false with float number', () => {
      const valid = validators.validateId('547.1')
      expect(valid).toBe(false)
    })

    test('validateId returns false with negative number', () => {
      const valid = validators.validateId('-10')
      expect(valid).toBe(false)
    })
  })

  describe('Name validator', () => {
    test('validateStationName returns true with valid name', () => {
      const valid = validators.validateStationName('Käpylän asema')
      expect(valid).toBe(true)
    })

    test('validateStaionName returns false with undefined name', () => {
      const valid = validators.validateStationName(undefined)
      expect(valid).toBe(false)
    })

    test('validateStationName returns false with empty string', () => {
      const valid = validators.validateStationName('')
      expect(valid).toBe(false)
    })
  })

  describe('Distance validator', () => {
    test('validateDistance returns true with valid distance', () => {
      const valid = validators.validateDistance('11')
      expect(valid).toBe(true)
    })

    test('validateDistance returns false with undefined distance', () => {
      const valid = validators.validateDistance(undefined)
      expect(valid).toBe(false)
    })

    test('validateDistance return false with negative distance', () => {
      const valid = validators.validateDistance('-10')
      expect(valid).toBe(false)
    })

    test('validateDistance returns false with non-number string', () => {
      const valid = validators.validateDistance('distance')
      expect(valid).toBe(false)
    })

    test('validateDistance returns false with float-number', () => {
      const valid = validators.validateDistance('12.12')
      expect(valid).toBe(false)
    })

    test('validateDistance returns false with distance less than ten', () => {
      const valid = validators.validateDistance('9')
      expect(valid).toBe(false)
    })

    test('validateDistance returns false with negative integer', () => {
      const valid = validators.validateDistance('-9')
      expect(valid).toBe(false)
    })
  })

  describe('Duration validator', () => {
    test('validateDuration returns true with correct input', () => {
      const valid = validators.validateDuration('2021-05-31T23:57:25', '2021-06-01T00:05:46', 500)
      expect(valid).toBe(true)
    })

    test('validateDuration returns false with undefined input', () => {
      const valid = validators.validateDuration(undefined, undefined, undefined)
      expect(valid).toBe(false)
    })

    test('validateDuration returns false with non-number string', () => {
      const valid = validators.validateDuration('2021-05-31T23:57:25', '2021-06-01T00:05:46', 'duraiton')
      expect(valid).toBe(false)
    })

    test('validateDuration returns false with negative integer', () => {
      const valid = validators.validateDuration('2021-05-31T23:57:25', '2021-06-01T00:05:46', '-10' )
      expect(valid).toBe(false)
    })

    test('validateDuration returns false with duration less than 10 seconds', () => {
      const valid = validators.validateDuration('2021-05-31T00:00:00', '2021-06-01T00:00:09', '9')
      expect(valid).toBe(false)
    })

    test('validateDuration returns false when time difference is too small compared to duration', () => {
      const valid = validators.validateDuration('2021-05-31T00:00:00', '2021-06-01T00:00:09', '11')
      expect(valid).toBe(false)
    })

    test('validateDuration returns false when time difference is too large compared to duration', () => {
      const valid = validators.validateDuration('2021-05-31T00:00:00', '2021-06-01T00:00:20', '10')
      expect(valid).toBe(false)
    })

    test('validateDuration returns false when departure_time is later than return_time', () => {
      const valid = validators.validateDuration('2021-06-01T00:05:46', '2021-05-31T23:57:25', '500')
      expect(valid).toBe(false)
    })
  })
  describe('Line validator', () => {
    test('validateLine returns true with valid input', () => {
      const valid = validators.validateLine('2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,2043,500')
      expect(valid).toBe(true)
    })

    test('validateLine returs false with undefined', () => {
      const valid = validators.validateLine(undefined)
      expect(valid).toBe(false)
    })

    test('validateLine returns false with empty string', () => {
      const valid = validators.validateLine('')
      expect(valid).toBe(false)
    })

    test('validateLine returns false with invalid departure_time', () => {
      const valid = validators.validateLine('departure_time,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,2043,500')
      expect(valid).toBe(false)
    })

    test('validateLine returns false with invalid return_time', () => {
      const valid = validators.validateLine('2021-05-31T23:57:25,return_time:46,094,Laajalahden aukio,100,Teljäntie,2043,500')
      expect(valid).toBe(false)
    })

    test('validateLine returns false with invalid departure_station_id', () => {
      const valid = validators.validateLine('2021-05-31T23:57:25,2021-06-01T00:05:-46,094,Laajalahden aukio,100,Teljäntie,2043,500')
      expect(valid).toBe(false)
    })

    test('validateLine returns false with invalid departure_station_name', () => {
      const valid = validators.validateLine('2021-05-31T23:57:25,2021-06-01T00:05:46,094,,100,Teljäntie,2043,500')
      expect(valid).toBe(false)
    })

    test('validateLine returns false with invalid return_station_id', () => {
      const valid = validators.validateLine('2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,-100,Teljäntie,2043,500')
      expect(valid).toBe(false)
    })

    test('validateLine returns false with invalid return_station_name', () => {
      const valid = validators.validateLine('2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,,2043,500')
      expect(valid).toBe(false)
    })

    test('validateLine returns false with invalid distance', () => {
      const valid = validators.validateLine('2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,-2043,500')
      expect(valid).toBe(false)
    })

    test('validateLine returns false with invalid duration', () => {
      const valid = validators.validateLine('2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,2043,-500')
      expect(valid).toBe(false)
    })
  })
})
