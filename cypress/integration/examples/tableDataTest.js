/// <reference types="Cypress" />

describe('testing table functionality', function () {
  it('loads page', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
  })

  it('gets the right price for the item', function () {

    cy.get('tr td:nth-child(2)').each(function (el, i, list) {

      const text = el.text();
      if (text.includes('Python')) {
        // My answers work which is nice but are lacking visibility
        // My 1st answer:
        expect(el.next().text()).to.equal('25');

        // 2nd try to get better logging - would require cy.get() to have logging from getting the element so we end up in the tutorials version of doing things with .then(function () {});
        const priceTxt = el.next().text();
        expect(priceTxt).to.equal('25');


        // Optimized v. for better Cypress operation visibilty and logging. We used cy.get() to clearly show and log the element we are looking at
        cy.get('tr td:nth-child(2)').eq(i).next().then(function (price) {
          const pricetxt = price.text();
          expect(pricetxt).to.equal('25');
        });
      };
    });
  });
});