/// <reference types="Cypress" />

describe('Hooks practice', function () {
  before(function () {
    // runs once before all tests in the block
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
    cy.visit('https://rahulshettyacademy.com/angularpractice/');
  });

  it('fills in form', function () {
    cy.get('input[name="name"]:nth-child(1)').type(this.data.name);
    cy.get('select').select(this.data.gender);

  });



  after(function () {
    // runs once after all tests in the block
    it('', function () {
    });
  });

  beforeEach(function () {
    // runs before each test in the block
  });

  afterEach(function () {
    // runs after each test in the block
  });
});