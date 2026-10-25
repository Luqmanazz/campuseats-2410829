# M1 React Milestone Report

> **Working draft:** Transfer this content into the official Milestone Reports
> template before submission. The official template was not present in the
> project folder. Text in square brackets and the proposed business details
> must be checked and completed by the student.

## Cover information

- **Restaurant:** Barakah Cafe
- **Student name:** [Your name]
- **Student ID:** [Confirm your student ID]
- **Course / section:** [Course and section]
- **Milestone:** M1 — React
- **Submission date:** 27 October 2026
- **Code tag / commit:** [Add the exact tag or commit required for submission]

## 1. Introduction

This report describes the React milestone work for CampusEats and the
restaurant concept Barakah Cafe. The milestone combines a React application
with a report about an individual restaurant. The application is intended to
make campus food ordering easier by letting a customer view vendors and menus,
find an item, build a cart, and submit an order with pickup details.

Barakah Cafe is the restaurant name supplied for this draft. The business
description below is a **proposed concept, not confirmed personal or
operational information**: an affordable campus cafe serving halal Malaysian
meals, snacks, and drinks to students and staff. Please replace or confirm
this description using the restaurant you registered and your actual plans.
In particular, its real location, menu, opening hours, prices, and distinctive
features have not yet been provided.

The current code and the proposed restaurant must not be confused. The app
currently loads sample vendors named Kafe Mahallah Ali and Campus Coffee
Corner. The vendor data does not yet identify Barakah Cafe. The report
therefore explains both the proposed restaurant and what the present React
version actually demonstrates.

## 2. Restaurant profile and customer needs

### 2.1 Proposed concept

For the purpose of this draft, Barakah Cafe is positioned as a convenient,
student-friendly cafe for people who need a meal or drink between classes.
The proposed focus is familiar halal food at accessible prices, with a simple
menu that is easy to browse and order for pickup. This positioning should be
revised if it does not accurately describe the registered restaurant.

**Confirm or replace these details before submission:**

- Registered restaurant name and spelling: [Confirm]
- Campus/location and service area: [Add the actual location]
- Main customer groups: [Confirm target customers]
- Cuisine and menu specialties: [Add your restaurant's actual offer]
- Opening hours: [Add actual or planned hours]
- What makes the restaurant different: [Add a real distinguishing feature]

### 2.2 Customer problem

Campus customers may have limited time between classes and may need to decide
quickly what to eat and where to collect it. A menu presented in one place can
reduce the effort of asking about available choices. Search helps a customer
locate an item by name, while a cart gives a visible summary before an order is
submitted. Providing pickup details also makes the intended collection
arrangement explicit.

These are the needs addressed by the current prototype: browse vendor choices,
search the selected vendor's menu, add and adjust items, and provide a name,
mahallah, and pickup time when submitting an order. The prototype does not
currently accept payment or send an order to a restaurant system.

### 2.3 Proposed menu and service

The actual Barakah Cafe menu has not been supplied. Do not treat the sample
items in the application as Barakah Cafe products: they are attached to the
sample vendors in `public/api/vendors.json`. Add the real menu here, including
accurate item names and prices:

| Category | Example items | Price range |
|---|---|---|
| [Category] | [Actual menu items] | [RM range] |
| [Category] | [Actual menu items] | [RM range] |
| [Category] | [Actual menu items] | [RM range] |

The intended service workflow is for a customer to browse the menu, select
items, review the cart, enter pickup details, and place an order. Any claims
about payment, online confirmation, or live availability should only be added
if those functions are implemented and tested.

## 3. Application requirements and design

### 3.1 Main requirements

The React application aims to support these customer tasks:

1. View the available vendor cards and select a vendor.
2. Browse the selected vendor's menu and search by item name.
3. Add menu items to a cart, increase or decrease quantities, and remove
   items.
4. See the cart quantity and order total.
5. Enter checkout details and receive a summary after a valid order is
   submitted.
6. Receive visible feedback when data is loading, cannot be loaded, or an item
   or vendor is unavailable.

### 3.2 Interface and component structure

The main `App` component manages the selected vendor, loading and error
conditions, search text, cart contents, current view, and the last submitted
order. The page is separated into components, including `Header`, `Footer`,
`VendorCard`, `MenuItemCard`, and `CartPage`. The cart page uses `CartItem` and
`CheckoutForm`, while `Status` provides loading and error presentations.
Separating these interface areas makes the main application easier to follow
and lets each component focus on a specific part of the experience.

The vendor data is requested from `/api/vendors.json` when the app loads.
Loading and error state are displayed while this request is handled, and the
error view offers a retry action. The request uses an abort controller so that
an obsolete request can be cancelled when the effect is cleaned up.

### 3.3 Search, cart, and checkout

The menu search field is controlled by React state. Its query is trimmed and
compared to menu item names without regard to letter case. Selecting another
vendor clears the previous search query. The interface shows the number of
matching items and a message when there are no matches.

Cart data is also held in React state. Adding an item already in the cart
increments its quantity rather than creating a duplicate line. Quantity
changes update the relevant line, and a line is removed when its quantity
falls to zero. The cart count and total are calculated from the current cart
contents.

The checkout form collects a customer's name, mahallah, and pickup time. It
checks that the name has at least three characters, that a mahallah is
selected, and that the time is between 07:00 and 22:00. On a valid submission,
the application stores the order details and a summary in React state, clears
the cart, and displays a success view.

**Payment limitation:** The current application does not collect payment
details, connect to a payment service, or confirm a financial transaction.
The button submits a pickup order in the local interface; it should not be
described as online payment.

## 4. React implementation

The app uses functional React components and hooks. `useState` stores
interactive values, and `useEffect` loads the vendor data. State updates for
the cart use the previous state value, which supports consistent updates when
items are added or quantities change. Lists are rendered from the data using
`.map()` and use item or vendor IDs as React keys.

The menu view disables adding an item when its vendor is closed or the item is
marked unavailable. The data-loading path checks the HTTP response and
verifies that the returned vendor data is an array before using it. If loading
fails, the application shows an error message and provides a retry control.

The project is structured as a Vite React application. The UI's sample vendor
data is in `public/api/vendors.json`; it currently contains Kafe Mahallah Ali
and Campus Coffee Corner. To make the submitted code accurately represent
Barakah Cafe, confirm whether the assignment expects the personal restaurant
to appear in that data, and then update the vendor and menu details accordingly.
Do not replace the sample data until you have confirmed the required scope and
have the real Barakah Cafe information.

## 5. Verification and known limitations

The following checks are suitable for verifying the milestone in a browser.
Record the actual outcome and date when you perform them; this draft does not
claim that these checks have already been run.

| Check | Expected result | Outcome / date |
|---|---|---|
| Load the application with vendor data available | Vendor cards and the selected menu appear | [Record result] |
| Search for an existing item name | Matching menu item(s) are shown | [Record result] |
| Search for text with no match | No-results message appears | [Record result] |
| Add the same item more than once | Cart quantity and total increase correctly | [Record result] |
| Decrease quantity to zero or remove an item | The item is removed from the cart | [Record result] |
| Submit checkout with missing or invalid values | Relevant validation messages appear | [Record result] |
| Submit checkout with valid values | Order summary appears and cart is cleared | [Record result] |
| Simulate a vendor-data loading failure | Error message and retry action appear | [Record result] |

The current milestone is a client-side demonstration. Vendor and cart state
are not connected to a persistent database or restaurant ordering backend.
Order data is kept in the running React application and is not shown to be
saved between page reloads. Payment processing is not implemented. The vendor
data is sample data and does not yet describe Barakah Cafe. These limitations
should be addressed in later project work only as required by the course
milestones.

## 6. Reflection and next steps

The React work brings together state-driven rendering, reusable components,
form handling, list rendering, and asynchronous data loading. A useful design
lesson is that the interface should reflect the current application state:
the selected vendor determines the menu, the search query determines visible
items, and cart state determines the quantity and total shown to the customer.
Handling loading, empty, unavailable, and error states also makes the
prototype clearer than showing only the successful menu view.

The next steps are to transfer this draft into the official report template,
confirm the Barakah Cafe business details, and verify whether the vendor data
must be updated to match the restaurant. The implementation should then be
tested in the browser using the checks in Section 5. Any final code tag or
commit reference should point to the exact code submitted for M1. Future
features such as persistent orders, live availability, or online payment
should only be described as completed after they have actually been
implemented and verified.

## 7. Conclusion

The current React prototype demonstrates a campus food-ordering flow from
vendor and menu browsing through cart management and pickup-order submission.
It includes searchable menu items, quantity controls, checkout validation,
loading and error feedback, and a local order confirmation. It does not yet
process payment or use Barakah Cafe as its vendor data. Completing the
restaurant-specific details, aligning the sample data if required, and
recording real verification results will make the report accurately represent
the final M1 submission.

## References

- CampusEats React project source: `src/App.jsx` and `src/components/`.
- Sample vendor data: `public/api/vendors.json`.
- Course M1 instructions and official report template: [Add the exact course
  resource title or link].
