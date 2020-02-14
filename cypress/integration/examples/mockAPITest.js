/// <reference types="Cypress" />

describe('API Mocking practice', function () {
  before(function () {
    cy.visit('https://example.cypress.io/commands/network-requests')
    cy.server();
  });

  it('listening on API and injecting mock response', function () {

    // Mock 404 Not Found Error response to front so you see what happens in the front on res 404
    cy.route({
      method: 'PUT',
      url: 'comments/*',
      status: 404,
      response: {
        error: "Hey, this comment does not exist!"
      },
      delay: 1000,
    }).as('UpdateComment');

    cy.get('.network-put').click();
    cy.get('.network-put-comment').should('contain', 'Hey, this comment does not exist!');

    // GET
    cy.route('GET', 'comments/*').as('getComment');
    cy.get('.network-btn').click();
    cy.wait('@getComment').its('status').should('eq', 200);

    // POST
    cy.route('POST', '/comments').as('postComment');
    cy.get('.network-post').click();
    cy.wait('@postComment');
    // Get Route
    cy.get('@postComment').should(xhr => {
      expect(xhr.requestBody).to.include('email');
      expect(xhr.requestBody).to.include('name', 'Using POST in cy.route()');
      expect(xhr.requestHeaders).to.have.property('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    });
  });
});