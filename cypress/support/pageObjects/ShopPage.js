class ShopPage {
  getUrl() {
    return cy.url();
  };
  addItemsToCart() {
    this.data.productName.forEach(name => {
      console.log(name);
      cy.addProduct(name);
    });
  };
  getCheckout() {
    return cy.get('#navbarResponsive a');
  };
  getCheckout2(){
    return cy.get('button[class="btn btn-success"]');
  };
  getCountryInput(){
    return cy.get('#country');
  };
  getSuggestions(){
    return cy.get('.suggestions > ul > li > a');
  };
  getCheckBox(){
    return cy.get('label[for="checkbox2"]');
  };
  getPurchaseButton(){
    return cy.get('input[value="Purchase"]');
  };
  getAfterPurchaseAlert(){
    return cy.get('.alert');
  };
  getTotalPrices(){
    return cy.get('tr > td:nth-child(4) > strong');
  };
  getFinalPrice(){
    return cy.get('h3 > strong');
  };
};
export default ShopPage