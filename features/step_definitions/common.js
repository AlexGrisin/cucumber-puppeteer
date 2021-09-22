// Dependencies
const { Given, When, Then } = require('cucumber');
const {
  visitPage,
  visitPDPPage,
  clickOnItem,
  shouldBeOnPage,
  pressButton,
  fillInFormField,
  productInCart,
  productAddedToCart
} = require('../support/actions');

Given('Open {string} page', visitPage);

Given('Open PDP page for product {string}', visitPDPPage);

When('Go to cart', { timeout: 10000 }, async () => {
  await clickOnItem('MiniCart');
  await clickOnItem('ViewBasket');
});

When('I add product to cart', { timeout: 10000 }, async () => {
  await clickOnItem('AddToCart');
  await productAddedToCart();
});

When('I click on {string}', clickOnItem);

When('I log in with valid credentials', { timeout: 10000 }, async () => {
	await fillInFormField('login', 'agrisin@tacitknowledge.com');
	await fillInFormField('password', '1qaz2wsx');
	await pressButton('LoginFormSubmit');
});

Then('I am on {string} page', shouldBeOnPage);

Then('Product {string} is in cart', productInCart);