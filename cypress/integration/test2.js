/// <reference types="Cypress" />

describe('Test suite for searching for items, adding to cart and checking out', () => {
  it('visits page succesfully', () => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
  });

  it('types, searches, and then displays 2 search results, which are cucumber and capsicum and adds both to the cart', () => {
    cy.get('.search-keyword').type('cu');
    cy.wait(2000);
    cy.get('.products').find('.product').each((element, index, list) => {
      const textVeg = element.find('h4.product-name').text()
      if (textVeg.includes('Capsicum')) {
        element.find('button').click();
      }
      if (textVeg.includes('Cucumber')) {
        element.find('button').click();
      }
    });
  });

  it('clicks cart icon and proceeds to checkout, chooses language, agrees to terms and proceeds to the end', () => {
    cy.get('.cart-icon').click();
    cy.contains('PROCEED TO CHECKOUT').click();
    // Have to use .visit() because Of bug in Cypress that malforms the URL in automation
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/cart')
    cy.wait(1000)
    cy.contains('Place Order').click();
    cy.wait(1000)
    cy.get('.wrapperTwo').find('select').select('Finland');
    cy.get('.chkAgree').click();
    cy.contains('Proceed').click();
  });
});