/// <reference types="Cypress" />

describe('Hooks practice', function () {
  before(function () {
    // runs once before all tests in the block
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
    cy.visit('https://rahulshettyacademy.com/angularpractice/');
  });

  it('fills form with mock data and tests form validation', function () {
    cy.get('input[name="name"]:nth-child(2)').type(this.data.name);
    cy.get('select').select(this.data.gender);
    cy.get('input[name="name"]:nth-child(1)').should('have.value', this.data.name);    
    cy.get('input[name="name"]:nth-child(2)').should('have.attr', 'minlength', '2');  
    cy.get('#inlineRadio3').should('be.disabled');  
  });



  after(function () {
    // runs once after all tests in the block
  });

  beforeEach(function () {
    // runs before each test in the block
  });

  afterEach(function () {
    // runs after each test in the block
  });
});