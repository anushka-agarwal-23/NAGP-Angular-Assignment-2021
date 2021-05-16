# EKART – SHOPPING WEB APP

## REQUIREMENTS:
1.	[GITHUB LINK](https://github.com/anushka-agarwal-23/NAGP-Angular-Assignment-2021)
2.	[NETLIFY LINK](https://epic-payne-4f2df9.netlify.app)
3.	**DUMMY USER CREDENTIALS:**
    *	Username: Anushka
    *	Password: guest
4.	**TEST CASE:**
    *	Component: product-list.component.ts
    *	Service: product.service.ts
5.	**BONUS POINTS:** ATTEMPTED
    * Category tree for each product displayed on product detail page and product grid can be filtered category or subcategory wise. 
    * Internationalization performed to support English and French as system language.
6.	**AUTHENTICATION:**
    Done using guard named AuthGaurd which implements CanActivate interface that checks whether user is logged in or not (if user is logged in, its username is stored in local storage). If not, then navigates to Login screen.
7.	**BACKEND APPROACH:** Mock json data files
8.	**RESOLVERS:** used for rendering product grid and product detail page faster.
9.	APP STRUCTURE: 
    *	The structure comprises of core, feature, and shared modules. 
    *	The core module consists of data-models, services, guard, and resolvers. 
    *	The shared module consists of header and footer component. 
    *	The feature module consists of various features of the app like authentication, home, product,   cart, checkout, and order-detail.

## COMPONENTS DESCRIPTION:
1.	**LOGIN (Authentication Module):** 
    * This component is used for login functionality. 
    *	It shows a Login screen to enter username and password. 
    *	If credentials entered are valid, user is directed to the last active page. 
    *	For example- if user is not logged in and try to go to cart page, he/she is directed to login page and only after successful login redirected to cart page.

2.	**PRODUCT LIST (Product Module):** 
    * This component is responsible for displaying the product grid. 
    *	Each product card consists of Image, Title, Price, Category, Subcategory, Rating, Quick view icon, Add to Cart button, and Add to wish list icon (not functional). 
    *	If a product has reached its stock limit, add to cart button is changed to out of stock. 
    *	Pagination is applied which is set to display 12 cards/page by default. 
    *	When user clicks on a particular product’s image or quick view icon, it is directed to product details page.

3.	**HEADER (Shared Module):** This component consists of:
    *	App Logo
    *	Search Product: It searches for the entered criteria to match with any product’s title and lists them on product grid.
    *	Cart Icon: It shows the current count of items present in the cart and redirects to the cart page once clicked.
    *	Multi-language support: A dropdown to select desired language i.e., en:English and fr:French.
    *	My Account: It is mainly used to login/logout from the application.
    *	Navbar:
      Home: redirects to product grid page 
      Categories: Shows category tree from which desired category/subcategory can be selected to see only those products on the grid.

4.	**PRODUCT-DETAIL (Product Module):**
    *	This component displays various details of the product like image, title, description, category, price, In-stock/Out of Stock, quantity to be added in cart, add to cart button and category tree which is shown as a breadcrumb.
    *	Add to cart button is enabled when quantity is greater than zero and it is not visible when the product is out of stock.

5.	**CART (Cart Module):**
    *	This component shows the items added to the cart by the user in table format. 
    *	It allows to increase/decrease the product quantity or remove product from cart. 
    *	It also shows the product wise subtotal and total of all the items in the cart.
    *	It consists of continue shopping button to redirect to product grid screen and checkout button to redirect to checkout screen.

6.	**CHECKOUT (Checkout Module):**
    *	This component consists of delivery details form and order details panel. 
    *	The form consists of basic user information inputs like Name, Email, Address, City, Country, Zip code, contact number (numbers only directive has been used for zip code and contact number).
    *	The user can select to ship to a different address and fill details accordingly. 
    *	Once all required details are provided and payment method and terms and conditions are selected, place order button turns active. On clicking place order button, user is directed to order-placed screen.

7.	**ORDER-DETAIL (Order-detail Module):**
    *	It shows the thank you message with an autogenerated order id for placed order.

8.	**HOME (Home Module):**
    *	This component’s main purpose is to render the various features according to the route.

## Notes:
> Form Validations like required, email, max length have been applied on login and checkout page.
