# CampusEats — M1 React Code Explanation

## 1. Project Overview

CampusEats is a React-based campus food ordering application developed to make it easier for students to discover food vendors, browse menus, and place pickup orders.

The application allows users to:
- Browse available campus food vendors.
- View food menus from different vendors.
- Search menu items by name, description, or category.
- Add food items to a shopping cart.
- Increase, decrease, or remove cart items.
- Complete checkout with customer details and pickup time.
- View their previous orders.
- View their recently viewed menu items.

The application is developed using React, JavaScript, Vite, React Router, Custom Hooks, Context API, and browser localStorage.

## 2. Application Entry Point and Routing

### `src/main.jsx`

This file is the entry point of the React application. It imports the global CSS stylesheet and renders the root `App` component using React's `createRoot` API.

### `src/App.jsx`

This file configures the application's navigation using React Router. It uses `BrowserRouter`, `Routes`, and `Route` to define the different pages.

The application includes the following routes:

- `/` — Home page displaying the available vendors.
- `/vendor/:id` — Displays the selected vendor and its menu.
- `/cart` — Displays cart items and the checkout form.
- `/orders` — Displays the user's order history.
- `*` — Displays the Not Found page for unknown routes.

The `CartProvider` wraps the application routes so that cart and order information can be shared across different components.

### `src/components/Layout.jsx`

This component provides the shared layout for the application. It displays the `Header` at the top, the `Footer` at the bottom, and uses React Router's `Outlet` component to render the currently selected page.

## 3. Custom Hooks

Custom Hooks are used to separate reusable logic from the user interface. This makes the application easier to maintain and organize.

### `src/hooks/useLocalStorage.js`

This custom hook manages data stored in the browser's localStorage.

It:
- Retrieves previously saved data when the application loads.
- Converts saved JSON data back into JavaScript values.
- Updates localStorage whenever the state changes.
- Handles errors when reading or saving data.

This hook is reused for cart information, order history, and recently viewed menu items.

### `src/hooks/useVendors.js`

This hook retrieves vendor information from `/api/vendors.json` using the Fetch API.

It manages:
- Vendor data.
- Loading state while retrieving data.
- Error state if the request fails.
- A reload function to retry loading the vendor data.

It also uses `AbortController` to cancel an outdated request when necessary.

### `src/hooks/useCart.js`

This hook provides access to the cart context using React's `useContext` hook.

It allows components to access shared cart and order information without passing the same props through multiple component levels.

It also checks whether the hook is being used inside a `CartProvider` and throws an error if the provider is missing.

### `src/hooks/useRecentlyViewed.js`

This hook manages the Recently Viewed feature.

It:
- Saves recently viewed menu items in localStorage.
- Places the latest viewed item at the beginning of the list.
- Avoids duplicate item IDs.
- Keeps a maximum of five recently viewed items.
- Provides a function to clear the recently viewed list.

This allows users to revisit menu items they have previously selected.

## 4. Cart Context and Order Management

### `src/context/cart-context.js`

This file creates the React Context using `createContext(null)`.

The context allows cart and order information to be shared between components without manually passing props through every component.

### `src/context/CartProvider.jsx`

This component acts as the central provider for cart and order management.

It manages the following functions:

- `addToCart()` — Adds a menu item to the cart or increases its quantity if it already exists.
- `changeQty()` — Increases or decreases the quantity of a cart item.
- `removeFromCart()` — Removes an item from the cart.
- `placeOrder()` — Creates a new order, saves it to order history, and clears the cart.

It also calculates:
- The total number of items in the cart.
- The total price of all items in the cart.

Cart and order information are saved using the `useLocalStorage` custom hook. This allows the information to remain available after refreshing the browser.

## 5. Own Restaurant: Barakah Cafe

Barakah Cafe is the first vendor displayed in CampusEats. It represents the restaurant used for the application's own restaurant implementation.

The restaurant contains eight menu items organized into four categories:

| Category | Menu Items |
|---|---|
| Rice | Nasi Lemak Ayam, Nasi Goreng, Chicken Fried Rice |
| Noodles | Mee Goreng, Maggi Goreng |
| Bread | Roti Canai |
| Drinks | Teh Tarik, Milo Ais |

Each menu item contains information such as its name, description, price, and category.

The vendor and menu information are stored in JSON format and retrieved dynamically by the application.

## 6. Pages and Components

### `src/pages/HomePage.jsx`

This page displays the available food vendors using the `VendorCard` component.

It also includes the Recently Viewed section, allowing users to revisit menu items they have previously selected.

### `src/pages/VendorPage.jsx`

This page displays the menu of a selected vendor.

It uses React Router's `useParams()` hook to retrieve the vendor ID from the URL.

The page also provides a search function that filters menu items by their names, descriptions, and categories.

If the requested vendor cannot be found, the page displays a Vendor Not Found message.

### `src/pages/CartPage.jsx`

This page displays the items currently added to the shopping cart.

Users can review their selected items, change quantities, remove items, and view the total price.

It also displays the checkout form when the cart contains items.

After a valid checkout, the page calls `placeOrder()` and uses React Router's `useNavigate()` hook to navigate the user to the Orders page.

### `src/pages/OrdersPage.jsx`

This page displays the user's previous orders.

Each order includes:
- Order ID.
- Customer name.
- Mahallah.
- Pickup time.
- Total price.
- List of ordered items and quantities.

Order information is retrieved from the cart context.

### `src/pages/NotFoundPage.jsx`

This page displays a 404 - Page Not Found message when users access an unknown route.

It also provides a link that allows users to return to the Home page.

### `src/components/VendorCard.jsx`

This component displays individual vendor information, including the vendor name, location, operating hours, and open or closed status.

It uses React Router's `Link` component to navigate to the selected vendor's menu page.

### `src/components/MenuList.jsx` and `src/components/MenuItemCard.jsx`

These components display menu items dynamically using React's `map()` function.

Users can view menu information, select a menu item to add it to Recently Viewed, and add available items to their cart.

### `src/components/Header.jsx`

This component displays the main navigation links for Vendors, My Orders, and Cart.

It also displays the current cart item count.

### `src/components/CheckoutForm.jsx`

This component collects customer information, including name, mahallah, and pickup time.

It uses React's `useState` hook to manage form values and validation errors.

The form checks that:
- The customer's name contains at least three characters.
- A mahallah has been selected.
- The pickup time is between 07:00 and 22:00.

The order is submitted only when the validation requirements are satisfied.

### `src/components/CartItem.jsx`

This component displays an individual cart item, including its name, price, quantity, and line total.

It provides buttons for increasing or decreasing the quantity and removing an item from the cart.

## 7. Data Persistence

CampusEats uses browser localStorage to save important application information.

The following information is stored:

- Cart items — `campuseats-cart`
- Order history — `campuseats-orders`
- Recently viewed items — `campuseats-recently-viewed`

The `useLocalStorage` custom hook handles saving and retrieving this information.

As a result, cart contents, order history, and recently viewed items can remain available after refreshing the browser on the same device and browser profile.

The application currently uses local JSON data and browser localStorage. It does not use a server-side database or an online payment gateway.

## 8. Error Handling and Validation

The application includes several error-handling and validation features.

### Vendor Data

The `useVendors` hook manages loading and error states when retrieving vendor information.

If the request fails, the application displays an error message and provides a retry option.

### Checkout Validation

The `CheckoutForm` component validates customer information before submitting an order.

Invalid input displays an appropriate error message and prevents the order from being submitted.

### Routing

The application handles unknown routes through the NotFoundPage component.

The VendorPage also handles an invalid vendor ID by displaying a Vendor Not Found message.

## 9. Testing

The following test cases are used to check the main functions of CampusEats.

| No. | Test Case | Expected Result |
|---|---|---|
| 1 | Open the home page | Vendor cards are displayed. |
| 2 | Select a vendor | The selected vendor's menu is displayed. |
| 3 | Search for a menu item | Matching menu items are displayed. |
| 4 | Add an item to the cart | The item appears in the cart. |
| 5 | Increase or decrease quantity | The quantity and total price are updated. |
| 6 | Remove an item | The selected item is removed from the cart. |
| 7 | Submit invalid checkout details | Validation error messages are displayed. |
| 8 | Submit valid checkout details | An order is created and the user navigates to My Orders. |
| 9 | Refresh the browser | Saved cart and order information remain available. |
| 10 | View more than five unique menu items | Only the five most recently viewed items are retained. |
| 11 | Clear Recently Viewed | The recently viewed list becomes empty. |
| 12 | Open an unknown route | The Not Found page is displayed. |

The production build is also checked using the `npm run build` command to ensure that the application can be compiled successfully.

Actual test outcomes should be recorded after performing each test.

## 10. Conclusion

CampusEats demonstrates the use of React components, props, state management, custom hooks, React Router, Context API, controlled forms, and browser localStorage.

The application brings these concepts together in a campus food ordering system where users can browse vendors, search menus, manage their carts, submit pickup orders, and view their order history.

Through this project, I gained practical experience in developing a React application with reusable components, organized application structure, client-side routing, and persistent data management.