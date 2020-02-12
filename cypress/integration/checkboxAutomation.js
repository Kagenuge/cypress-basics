/// <reference types="Cypress" />

describe('tests the functionality of the site and its checkboxes', function() {
  it('loads page', function() {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
  });
  it('checks and unchecks checkboxes', function() {
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
    cy.get('.ui-menu-item div').each(function(element, index, list) {
      if(element.text() === 'Finland') {
        element.click();
      }
    });
  });
  it('selects Finland as the dynamic dropwdown option', function() {
    cy.get('#autocomplete').should('have.value', 'Finland');
  });
  it('verifies box invisibility and visibility', function() {
    cy.get('#displayed-text').should('be.visible');
    cy.get('#hide-textbox').click();
    cy.get('#displayed-text').should('not.be.visible');
    cy.get('#show-textbox').click();
    cy.get('#displayed-text').should('be.visible');
  });
  it('tests radio button functionality', function() {
    cy.get('input[value="radio1"]').click().should('be.checked');
    cy.get('input[value="radio2"]').click().should('be.checked');
    cy.get('input[value="radio1"]').should('not.be.checked');
    cy.get('input[value="radio3"]').click().should('be.checked');
    // .uncheck() doesnt work for some reason
    // Error: uncheck() only works for :checkbox
    // Reason: Radio buttons can't be unchecked
  });
  it('tests alert functionality', function() {
    //Cypress auto accepts alerts and popups
    cy.get('#name').type('Kaarle');
    cy.get('#alertbtn').click();
    cy.get('#name').type('Kaarle');
    cy.get('#confirmbtn').click();
    // Cypress events for browser events - window:alert
    cy.on('window:alert', function(str) {
      // Mocha to.equal
      expect(str).to.equal('Hello Kaarle, share this practice page and share your knowledge');
    });
    cy.on('window:confirm', function(str) {
      // Mocha to.equal
      expect(str).to.equal('Hello Kaarle, Are you sure you want to confirm?');
    });
  });
  it('tests link functionality and comes back to mainpage', function() {
    // invoke invokes JQuery functions, check JQuery docs to find more
    cy.get('#opentab').invoke('removeAttr', 'target').click();
    // retrieve page URL
    cy.url().should('include', 'rahulshettyacademy.com/#/index');
    // cy.go(direction) - 'back' / 'forward'
    cy.go('back');

    // 2nd way of opening link in current tab; take the property href of the link element and cy.visit(url) it
    cy.get('#opentab').then(function(el) {
      const url = el.prop('href');
      // Changing domains is usually not ok - circumvent with "chromeWebSecurity": false in cypress.json
      cy.visit(url);
    });
    cy.go('back');
  });
});