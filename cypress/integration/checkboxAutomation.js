/// <reference types="Cypress" />

describe('tests the functionality of the site and its checkboxes', () => {
  it('loads page', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
  });
  it('checks and unchecks checkboxes', () => {
    // check all one by one
    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1');
    cy.get('#checkBoxOption2').check().should('be.checked').and('have.value', 'option2');
    cy.get('#checkBoxOption3').check().should('be.checked').and('have.value', 'option3');

    // uncheck all one by one
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked').and('have.value', 'option1');
    cy.get('#checkBoxOption2').uncheck().should('not.be.checked').and('have.value', 'option2');
    cy.get('#checkBoxOption3').uncheck().should('not.be.checked').and('have.value', 'option3');

    // check all at once by common property
    cy.get('input[type="checkbox"]').check().should('be.checked');
    // uncheck all at once by common property
    cy.get('input[type="checkbox"]').uncheck().should('not.be.checked');
    // check by argument
    cy.get('input[type="checkbox"]').check(['option1', 'option3']);


    // Static Dropdown / select by value or text in option
    // Now selecting by attribute value
    cy.get('select').select('option2').should('have.value', 'option2');

    // Dynamic dropdowns
    cy.get('#autocomplete').type('fi');
    cy.get('.ui-menu-item div').each((element, index, list) => {
      if(element.text() === 'Finland') {
        element.click();
      }
    })
  });
});