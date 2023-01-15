describe('Valid station addition', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/test/reset')
    cy.visit('http://localhost:3000/addStation')
  })

  it('Adding valid station gives correct alert', function() {
    cy.get('#StationNameInput').type('Laajalahden aukio')
    cy.get('#StationIdInput').type('94')
    cy.get('#StationSubmitButton').click()
    cy.contains('Added station!')
  })

  it('Submiting valid form adds station to db', function() {
    cy.get('#StationNameInput').type('Laajalahden aukio')
    cy.get('#StationIdInput').type('94')
    cy.get('#StationSubmitButton').click()
    cy.request('GET', 'http://localhost:3001/api/station/').as('tripsReq')
    //Checking that the station was added to the database
    cy.get('@tripsReq')
      .then((res) => {
        expect(res.body.length).to.equal(1)
        const station = res.body[0]
        expect(station.name).to.equal('Laajalahden aukio')
        expect(station.station_id).to.equal(94)
      })
  })
  it('After adding a station, stations are correctly displayed', function() {
    cy.get('#StationNameInput').type('Laajalahden aukio')
    cy.get('#StationIdInput').type('94')
    cy.get('#StationSubmitButton').click()
    cy.visit('http://localhost:3000/stations')
    cy.contains('Laajalahden aukio')
    cy.contains('94')
  })
})
describe('Invalid station addition', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/test/reset')
    cy.visit('http://localhost:3000/addStation')
  })
  it('Invalid station addition gives error message', function() {
    cy.get('#StationSubmitButton').click()
    cy.contains('Invalid or missing station information')
  })
  it('station with invalid station name is not added to db', function() {
    cy.get('#StationIdInput').type('94')
    cy.get('#StationSubmitButton').click()
    cy.request({ method: 'GET', url: 'http://localhost:3001/api/station', failOnStatusCode: false }).its('status').should('equal', 404)
  })
  it('station with invalid departure station id is not added to db', function() {
    cy.get('#StationNameInput').type('Laajalahden aukio')
    cy.get('#StationIdInput').type('-94')
    cy.get('#StationSubmitButton').click()
    cy.request({ method: 'GET', url: 'http://localhost:3001/api/station', failOnStatusCode: false }).its('status').should('equal', 404)
  })
})
