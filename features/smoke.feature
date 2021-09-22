Feature: Home Page

Scenario: Home Page
    When Open "Home" page
    Then I am on "Home" page

Scenario: Log in to my account
    Given Open "Login" page
    When I log in with valid credentials
    Then I am on "Order" page

Scenario: Add to cart
    Given Open PDP page for product "0436446"
    When I add product to cart
    And Go to cart
    Then I am on "Cart" page
    And Product "0436446" is in cart