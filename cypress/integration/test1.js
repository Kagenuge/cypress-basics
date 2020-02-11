/// <reference types="Cypress" />

describe('my first test suite', () => {
  it('does not do much', () => {
    expect(true).to.equal(true);
  });
  it('visits page succesfully', () => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
  });
  it('types, searches, and then displays 2 search results, which is cucumber and capsicum and adds capsicum to the cart', () => {
    cy.get('.search-keyword').type('cu');
    cy.wait(2000);


    // Aliasing helps create centralized names for things
    cy.get('.products').as('productLocator');
    // :visible only retrieves visible elements
    cy.get('.product:visible').should('have.length',2);
    // .find() finds the child elements that match the gicen CSS Selector
    // parent > child chaining
    cy.get('@productLocator').find('.product').should('have.length',2);
    cy.get('.products > .product').should('have.length',2);
    console.log('Hello')


    // not iterating over elements, breaks easily
    cy.get('.products').find('.product').eq(1);
    cy.get('.products').find('.product').eq(0).contains('Cucumber');
    cy.get('.products').find('.product').eq(0).find('button').click();

    // .each() iterates over elements making the test more resistant
    cy.get('.products').find('.product').each((element, index, list) => {
      // find the h4.product-name of the currently looped .product item
      const textVeg = element.find('h4.product-name').text()
      if (textVeg.includes('Capsicum')) {
        element.find('button').click();
      }
      if (textVeg.includes('Cucumber')) {
        element.find('button').click();
      }
    });

    // Chai assertion; .should('have.text', 'GREENKART')
    cy.get('.brand').should('have.text', 'GREENKART');

    // manually resolve <--> grab brand / logo text
    cy.get('.brand').then(logo => cy.log(logo.text()))

    // print in clog
    cy.get('.brand').then(() => {
      console.log('hello, I am manually resolved because I am not a cypress command')
    });
  });

  it('clicks cart icon and proceeds to checkout', () => {
    cy.get('.cart-icon').click();
    cy.get('.cart-preview > .action-block').find('button').click();
  })

  // fixture - store data used in tests
})