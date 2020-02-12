/// <reference types="Cypress" />

describe('testing mouseover menu', function () {
  it('loads page', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
  })
  it('chooses an option from mouseover menu', function () {
    // Target the hidden elements not the grandparent element which is #mousehover
    cy.get('div.mouse-hover-content').invoke('show');
    cy.contains('Top').click();
    cy.url().should('include', 'top');

    // Forcibly click on hidden element
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    cy.contains('Top').click({ force: true });
    cy.url().should('include', 'top');
  });
});