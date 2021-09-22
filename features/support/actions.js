const scope = require('./scope');
const assert = require('assert');
const pages = require('./pages');
const selectors = require('./selectors');

let headless = true;
let slowMo = 0;

let width = 1280;
let height = 1024;

const visitPage = async (pageName) => {
	const url = scope.host + pages.url[pageName];
	return openPage(url);
};

const visitPDPPage = async product => {
	const url = scope.host + pages.url['PDP'] + product;
	return openPage(url);
};

const openPage = async (url) => {
	if (!scope.browser)
		scope.browser = await scope.driver.launch({ headless, slowMo });
	scope.context.currentPage = await scope.browser.newPage();
	scope.context.currentPage.setViewport({ width: width, height: height });
	const visit = await scope.context.currentPage.goto(url)
	return visit;
};

const clickOnItem = async link => {
	const { currentPage } = scope.context;
	const linkPresent = await currentPage.waitForSelector(
		selectors.links[link]
	);
	await linkPresent;
	return await currentPage.click(selectors.links[link]);
};

const pressButton = async buttonName => {
	const { currentPage } = scope.context;
	return await currentPage.click(selectors.buttons[buttonName]);
};

const shouldBeOnPage = async pageName => {
	const { currentPage } = scope.context;
	await currentPage.waitForSelector(pages.atChecker[pageName], {
		visible: true,
	})
};

const productInCart = async productId => {
	const { currentPage } = scope.context;
	await currentPage.waitForSelector('[data-sku="' + productId + '"]', {
		visible: true,
	})
};

const fillInFormField = async (field, value) => {
	const { currentPage } = scope.context;
	const fieldPresent = await currentPage.waitForSelector(
		selectors.fields[field]
	);
	await fieldPresent;
	await currentPage.focus(selectors.fields[field]);
	await currentPage.type(selectors.fields[field], value, { delay: 1 });
	// await currentPage.$eval(selectors.fields[field], el => el.value = value);
	return;
};

const productAddedToCart = async () => {
	const { currentPage } = scope.context;
	const productsInCart = '.nav-items-total';
	const fieldPresent = await currentPage.waitForSelector(productsInCart);
	await fieldPresent;
	await currentPage.evaluate(productsInCart => productsInCart.textContent, productsInCart) > 1;
};

module.exports = {
	visitPage,
	visitPDPPage,
	clickOnItem,
	shouldBeOnPage,
	pressButton,
	fillInFormField,
	productInCart,
	productAddedToCart
};