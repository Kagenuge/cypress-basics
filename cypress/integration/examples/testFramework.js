/// <reference types="Cypress" />
import HomePage from '../../support/pageObjects/HomePage';
import ShopPage from '../../support/pageObjects/ShopPage';

describe('Hooks practice', function () {
  const homePage = new HomePage();
  const shopPage = new ShopPage();
  before(function () {
    // runs once before all tests in the block
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
    // You can also give a custom URL for runtime from the commmand line!
    //  npx cypress run --spec cypress/integration/examples/testFramework.js --env angularUrl=http://google.com --headed
    cy.visit(Cypress.env('angularUrl'));
  });

  it('fills form with mock data and tests form validation / does everything because this.data is not visible elsewhere??', function () {
    homePage.getNameInput().type(this.data.name);
    homePage.getGender().select(this.data.gender);
    homePage.getTwoWayDataBinding().should('have.value', this.data.name);
    homePage.getNameInput().should('have.attr', 'minlength', '2');
    homePage.getEntrepreneurRadioButton().should('be.disabled');
    homePage.getShopBtn().click();

    shopPage.getUrl().should('contain', 'shop');
    this.data.productName.forEach(name => {
      console.log('Adding to cart: ',name);
      cy.addProduct(name);
    });
    shopPage.getCheckout().click();

    var totalPrice = 0;
    shopPage.getTotalPrices().each(function(el, i, list){
      let itemPrice = parseInt(el.text().substring(3));
      totalPrice = totalPrice + itemPrice;
      console.log('Item Total price: ', totalPrice);
    });
    shopPage.getFinalPrice().then((price) => {
      const finalPrice = parseInt(price.text().substring(3));
      console.log('Final price: ', finalPrice);
      expect(finalPrice).to.equal(totalPrice);
    });

    shopPage.getCheckout2().click();

    // Override cypress.json settings
    //Cypress.config('defaultCommandTimeout', 10000);

    shopPage.getCountryInput().type('in');
    shopPage.getSuggestions().each(function (suggestion, i, list) {
      if (suggestion.text() === this.data.country) {
        console.log('Country suggestion condition filled');
        shopPage.getSuggestions().eq(i).click();
      };
    });
    shopPage.getCheckBox().click();
    shopPage.getPurchaseButton().click();
    shopPage.getAfterPurchaseAlert().should('contain', 'Success! Thank you! Your order will be delivered in next few weeks :-).');
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