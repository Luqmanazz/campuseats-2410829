
# CampusEats — M1 React Code Explanation

## 1. Project Overview

CampusEats is a React-based campus food ordering application. It allows users to browse food vendors, view menu items, search a menu, add items to a cart, submit pickup orders, and view order history.

The application uses React, JavaScript, Vite, React Router, custom hooks, Context API, and localStorage.

## 2. Application Entry Point and Routing

### `src/main.jsx`
This file imports the global stylesheet and renders the root `App` component using React's `createRoot`.

### `src/App.jsx`
This file configures `BrowserRouter`, `Routes`, and `Route`. It defines routes for:
- `/` — Home page and vendor list
- `/vendor/:id` — Selected vendor and its menu
- `/cart` — Shopping cart and checkout
- `/orders` — Order history
- `*` — Not-found page

The `CartProvider` wraps the routes so that cart and order data can be accessed throughout the application.

### `src/components/Layout.jsx`
This component displays the shared `Header` and `Footer`. The `Outlet` component renders the active route inside the shared layout.

## 3. Custom Hooks

### `src/hooks/useLocalStorage.js`
This hook stores and retrieves JSON data using browser localStorage. It initializes state from saved data and updates localStorage when the state changes.

### `src/hooks/useVendors.js`
This hook fetches vendor data from `/api/vendors.json`. It manages loading and error states, supports retrying a failed request, and uses `AbortController` to cancel an outdated request.

### `src/hooks/useCart.js`
This hook provides access to the cart context. It throws an error if used outside `CartProvider`, helping identify incorrect context usage.

### `src/hooks/useRecentlyViewed.js`
This hook stores recently viewed menu items in localStorage. It places the latest item first, avoids duplicate item IDs, and keeps a maximum of five items.

## 4. Cart Context and Order Management

### `src/context/cart-context.js`
This file creates the React context used to share cart and order data.

### `src/context/CartProvider.jsx`
This provider manages:
- Adding items to the cart
- Increasing and decreasing item quantities
- Removing cart items
- Calculating cart item count and total price
- Placing orders and saving order history
- Clearing the cart after a successful order

Cart and order information are persisted using `useLocalStorage`.

## 5. Pages and Components

### `src/pages/HomePage.jsx`
Displays vendor cards and the Recently Viewed section. Users can return to the vendor associated with a recently viewed item.

### `src/pages/VendorPage.jsx`
Uses `useParams()` to identify the vendor from the URL. It displays the vendor's menu and provides keyword search across item names, descriptions, and categories.

### `src/pages/CartPage.jsx`
Displays cart contents and allows users to review items before checkout.

### `src/pages/OrdersPage.jsx`
Displays saved orders, including order ID, customer details, pickup time, total price, and ordered items.

### `src/pages/NotFoundPage.jsx`
Displays a fallback page for unknown routes.

### `src/components/VendorCard.jsx`
Uses React Router `Link` to navigate to a vendor's menu page.

### `src/components/MenuList.jsx` and `src/components/MenuItemCard.jsx`
Render menu items from data. Users can add items to the cart and select an item name to record it in Recently Viewed.

### `src/components/Header.jsx`
Displays the main navigation and the current cart item count.

### `src/components/CheckoutForm.jsx` and `src/components/CartItem.jsx`
Handle checkout input and cart item interactions, including quantity changes and removal.

## 6. Data Persistence

The application uses browser localStorage for cart contents, order history, and recently viewed items. This allows the saved information to remain available after refreshing the browser on the same device and browser profile.

The application does not use a server-side database or payment gateway.

## 7. Error Handling and Validation

The application displays loading and error states when fetching vendor data. Checkout validates the customer's name, selected mahallah, and pickup time before placing an order.

The application also handles an unknown vendor ID and unknown routes.

## 8. Testing

The following tests should be performed and their actual outcomes recorded before submission:

- Open the home page and view vendor cards.
- Open a vendor and search by a full word and a single letter.
- Add items to the cart and change their quantities.
- Remove an item from the cart.
- Submit checkout with invalid and valid values.
- Confirm that a successful order appears in My Orders.
- Refresh the browser and confirm that cart and order data persist.
- Add more than five unique recently viewed items and confirm that only five remain.
- Clear Recently Viewed and confirm that the list becomes empty.
- Open an unknown vendor URL and an unknown route.
- Run `npm run build` and confirm that it succeeds.

Record the actual result of each test after performing it.

## 9. Conclusion

CampusEats demonstrates reusable React components, custom hooks, client-side routing, Context API, controlled inputs, menu filtering, cart management, checkout validation, and localStorage persistence.

