const selectors = {
    links: {
      Login: '.navigation-account-link',
      MiniCart: '.mini-cart-popup__link-mask',
      ViewBasket: '.mini-cart-popup__checkout-button',
      AddToCart: '#addToCartButton'
    },
    buttons: {
      Signup: 'button',
      Login: '.navigation-account-link',
      LoginFormSubmit: '.login-section .btn-primary'
    },
    fields: {
        login: '#j_username',
        password: '#j_password'
    }
  };
  
  module.exports = selectors;