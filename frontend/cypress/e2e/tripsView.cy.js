describe('Trips view', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/test/reset')
    cy.request('POST', 'http://localhost:3001/test/initState')
    cy.visit('http://localhost:3000/trips')
  })
  it('TripsView shows correct trips from db', function() {
    cy.contains('Departure time')
    cy.contains('Return time')
    cy.contains('Departure Station')
    cy.contains('Departure Station id')
    cy.contains('Return Station')
    cy.contains('Return Station id')
    cy.contains('Distance (km)')
    cy.contains('Duration (min)')

    cy.contains('2021-05-31T23:57:25')
    cy.contains('2021-06-01T00:05:46')
    cy.contains('Laajalahden aukio')
    cy.contains('94')
    cy.contains('Teljäntie')
    cy.contains('100')
    cy.contains('2.043')
    cy.contains('8.333')

    cy.contains('2021-05-31T23:56:11')
    cy.contains('2021-06-01T00:02:02')
    cy.contains('Viiskulma')
    cy.contains('4')
    cy.contains('Hernesaarenranta')
    cy.contains('65')
    cy.contains('1.4')
    cy.contains('5.833')
  })

  it('Departure time filter works', function() {
    cy.get('#departureTimeFilter').type('2021-05-31T23:57:25')
    cy.contains('2021-05-31T23:57:25')
    cy.contains('2021-06-01T00:05:46')
    cy.contains('Laajalahden aukio')
    cy.contains('94')
    cy.contains('Teljäntie')
    cy.contains('100')
    cy.contains('2.043')
    cy.contains('8.333')
    //I am making the assumption that if the other departure stations are not visible
    //Then no data relating to them is visible.
    cy.contains('Töölöntulli').should('not.exist')
    cy.contains('Näkinsilta').should('not.exist')
    cy.contains('Viiskulma').should('not.exist')
    cy.contains('Koskelan varikko').should('not.exist')
    cy.contains('Kansallismuseo').should('not.exist')
    cy.contains('Viikin normaalikoulu').should('not.exist')
    cy.contains('Linnanmäki').should('not.exist')
    cy.contains('Käpylän asema').should('not.exist')
    cy.contains('Kalevankatu').should('not.exist')
    cy.contains('Jämeräntaival').should('not.exist')
  })
  it('Return time filter works', function() {
    cy.get('#returnTimeFilter').type('2021-06-01T00:29:58')
    cy.contains('2021-05-31T23:56:23')
    cy.contains('2021-06-01T00:29:58')
    cy.contains('Viiskulma')
    cy.contains('4')
    cy.contains('Hernesaarenranta')
    cy.contains('65')
    cy.contains('4.318')
    cy.contains('33.483')
    //I am making the assumption that if the other departure stations are not visible
    //Then no data relating to them is visible.
    cy.contains('Töölöntulli').should('not.exist')
    cy.contains('Näkinsilta').should('not.exist')
    cy.contains('Laajalahden aukio').should('not.exist')
    cy.contains('Koskelan varikko').should('not.exist')
    cy.contains('Kansallismuseo').should('not.exist')
    cy.contains('Viikin normaalikoulu').should('not.exist')
    cy.contains('Linnanmäki').should('not.exist')
    cy.contains('Käpylän asema').should('not.exist')
    cy.contains('Kalevankatu').should('not.exist')
    cy.contains('Jämeräntaival').should('not.exist')
  })
  it('Departure station name filter works', function() {
    cy.get('#departureStationNameFilter').type('Kalevankatu')
    cy.contains('2021-05-31T23:50:00')
    cy.contains('2021-05-31T23:55:38')
    cy.contains('Kalevankatu')
    cy.contains('69')
    cy.contains('Välimerenkatu')
    cy.contains('62')
    cy.contains('1.131')
    cy.contains('5.6')
    //I am making the assumption that if the other departure stations are not visible
    //Then no data relating to them is visible.
    cy.contains('Töölöntulli').should('not.exist')
    cy.contains('Näkinsilta').should('not.exist')
    cy.contains('Laajalahden aukio').should('not.exist')
    cy.contains('Koskelan varikko').should('not.exist')
    cy.contains('Kansallismuseo').should('not.exist')
    cy.contains('Viikin normaalikoulu').should('not.exist')
    cy.contains('Linnanmäki').should('not.exist')
    cy.contains('Käpylän asema').should('not.exist')
    cy.contains('Viiskulma').should('not.exist')
    cy.contains('Jämeräntaival').should('not.exist')
  })
  it('Return station name filter works', function() {
    cy.get('#returnStationNameFilter').type('Puotila (M)')
    cy.contains('2021-05-31T23:53:04')
    cy.contains('2021-06-01T00:14:52')
    cy.contains('Viikin normaalikoulu')
    cy.contains('240')
    cy.contains('Puotila (M)')
    cy.contains('281')
    cy.contains('5.366')
    cy.contains('21.733')
    //I am making the assumption that if the other departure stations are not visible
    //Then no data relating to them is visible.
    cy.contains('Töölöntulli').should('not.exist')
    cy.contains('Näkinsilta').should('not.exist')
    cy.contains('Laajalahden aukio').should('not.exist')
    cy.contains('Koskelan varikko').should('not.exist')
    cy.contains('Kansallismuseo').should('not.exist')
    cy.contains('Kalevankatu').should('not.exist')
    cy.contains('Linnanmäki').should('not.exist')
    cy.contains('Käpylän asema').should('not.exist')
    cy.contains('Viiskulma').should('not.exist')
    cy.contains('Jämeräntaival').should('not.exist')
  })
  it('Distance minimum filter works', function() {
    cy.get('#distanceMinFilter').type('5')
    cy.contains('2021-05-31T23:53:04')
    cy.contains('2021-06-01T00:14:52')
    cy.contains('Viikin normaalikoulu')
    cy.contains('240')
    cy.contains('Puotila (M)')
    cy.contains('281')
    cy.contains('5.366')
    cy.contains('21.733')
    //I am making the assumption that if the other departure stations are not visible
    //Then no data relating to them is visible.
    cy.contains('Töölöntulli').should('not.exist')
    cy.contains('Näkinsilta').should('not.exist')
    cy.contains('Laajalahden aukio').should('not.exist')
    cy.contains('Koskelan varikko').should('not.exist')
    cy.contains('Kansallismuseo').should('not.exist')
    cy.contains('Kalevankatu').should('not.exist')
    cy.contains('Linnanmäki').should('not.exist')
    cy.contains('Käpylän asema').should('not.exist')
    cy.contains('Viiskulma').should('not.exist')
    cy.contains('Jämeräntaival').should('not.exist')
  })
  it('Distance maximum filter works', function() {
    cy.get('#distanceMaxFilter').type('1.06')
    cy.contains('2021-05-31T23:56:44')
    cy.contains('2021-06-01T00:03:26')
    cy.contains('Näkinsilta')
    cy.contains('123')
    cy.contains('Vilhonvuorenkatu')
    cy.contains('121')
    cy.contains('1.025')
    cy.contains('6.65')
    //I am making the assumption that if the other departure stations are not visible
    //Then no data relating to them is visible.
    cy.contains('Töölöntulli').should('not.exist')
    cy.contains('Viikin normaalikoulu').should('not.exist')
    cy.contains('Laajalahden aukio').should('not.exist')
    cy.contains('Koskelan varikko').should('not.exist')
    cy.contains('Kansallismuseo').should('not.exist')
    cy.contains('Kalevankatu').should('not.exist')
    cy.contains('Linnanmäki').should('not.exist')
    cy.contains('Käpylän asema').should('not.exist')
    cy.contains('Viiskulma').should('not.exist')
    cy.contains('Jämeräntaival').should('not.exist')
  })
  it('Duration minimum filter works', function() {
    cy.get('#durationMinFilter').type('50')
    cy.contains('2021-05-31T23:49:36')
    cy.contains('2021-06-01T00:40:20')
    cy.contains('Jämeräntaival')
    cy.contains('547')
    cy.contains('1.227')
    cy.contains('50.667')
    //I am making the assumption that if the other departure stations are not visible
    //Then no data relating to them is visible.
    cy.contains('Töölöntulli').should('not.exist')
    cy.contains('Näkinsilta').should('not.exist')
    cy.contains('Laajalahden aukio').should('not.exist')
    cy.contains('Koskelan varikko').should('not.exist')
    cy.contains('Kansallismuseo').should('not.exist')
    cy.contains('Kalevankatu').should('not.exist')
    cy.contains('Linnanmäki').should('not.exist')
    cy.contains('Käpylän asema').should('not.exist')
    cy.contains('Viiskulma').should('not.exist')
    cy.contains('Viikin normaalikoulu').should('not.exist')
  })
  it('Duration maximum filter works', function() {
    cy.get('#durationMaxFilter').type('5.61')
    cy.contains('2021-05-31T23:49:59')
    cy.contains('2021-05-31T23:55:38')
    cy.contains('Kalevankatu')
    cy.contains('69')
    cy.contains('Välimerenkatu')
    cy.contains('62')
    cy.contains('1.125')
    cy.contains('5.6')
    //I am making the assumption that if the other departure stations are not visible
    //Then no data relating to them is visible.
    cy.contains('Töölöntulli').should('not.exist')
    cy.contains('Näkinsilta').should('not.exist')
    cy.contains('Laajalahden aukio').should('not.exist')
    cy.contains('Koskelan varikko').should('not.exist')
    cy.contains('Kansallismuseo').should('not.exist')
    cy.contains('Viikin normaalikoulu').should('not.exist')
    cy.contains('Linnanmäki').should('not.exist')
    cy.contains('Käpylän asema').should('not.exist')
    cy.contains('Viiskulma').should('not.exist')
    cy.contains('Jämeräntaival').should('not.exist')
  })
  it('Multiple filters at the same time', function() {
    //these values are such that each should remove one or more trips from the grid and leave only one behind
    cy.get('#departureTimeFilter').type('23:5')
    cy.get('#returnTimeFilter').type('00')
    cy.get('#departureStationNameFilter').type('a')
    cy.get('#returnStationNameFilter').type('e')
    cy.get('#distanceMinFilter').type('1.2')
    cy.get('#distanceMaxFilter').type('4')
    cy.get('#durationMinFilter').type('10')
    cy.get('#durationMaxFilter').type('20')

    cy.contains('2021-05-31T23:50:05')
    cy.contains('2021-06-01T00:01:22')
    cy.contains('Käpylän asema')
    cy.contains('147')
    cy.contains('Oulunkylän asema')
    cy.contains('232')
    cy.contains('1.633')
    cy.contains('11.2')

    //I am making the assumption that if the other departure stations are not visible
    //Then no data relating to them is visible.
    cy.contains('Töölöntulli').should('not.exist')
    cy.contains('Näkinsilta').should('not.exist')
    cy.contains('Laajalahden aukio').should('not.exist')
    cy.contains('Koskelan varikko').should('not.exist')
    cy.contains('Kansallismuseo').should('not.exist')
    cy.contains('Viikin normaalikoulu').should('not.exist')
    cy.contains('Linnanmäki').should('not.exist')
    cy.contains('Kalevankatu').should('not.exist')
    cy.contains('Viiskulma').should('not.exist')
    cy.contains('Jämeräntaival').should('not.exist')
  })
})