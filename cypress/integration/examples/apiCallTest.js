/// <reference types="Cypress" />

// Very basic API testing
describe('API Call Tests', function () {
  before(function () {

  });

  it('Api calls', function () {
    // Test with your own backend, REST API
    cy.request('POST', 'URL', {
      "name": "Mr. Test",
      "email": "testboi@testmail.test"
    });
  }).then(function(){
    expect(response.body).to.have.property('Message', 'Post succesfull');
    expect(response.status).to.equal(200);
  });
});