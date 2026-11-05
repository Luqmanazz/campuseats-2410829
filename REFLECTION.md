# CampusEats - Weekly Reflection

## Week 1: Introduction to React

**1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?**

Imperative programming requires me to tell the browser step by step how to create or update elements. React uses a declarative approach: I describe what the interface should look like based on the current data and state, and React updates the UI when those values change.

**2. Why must a component name start with a capital letter?**

React uses a capital letter to distinguish custom components from built-in HTML elements. For example, `Header` is treated as a React component, while `header` is treated as an HTML element.

**3. What does a fragment `<>...</>` do, and why not just use a `div`?**

A fragment allows a component to return multiple elements without adding an extra element to the HTML DOM. This keeps the page structure cleaner when a wrapper is not needed.

**4. Name one benefit of splitting the UI into small components.**

Small components make the code easier to understand, maintain, and reuse. For example, the header can be updated separately without changing the whole application.

**My reflection**

In Week 1, I learned the basic structure of a React application and how to divide the interface into components. I understood that React encourages a declarative way of building interfaces instead of manually changing the DOM. This gave me a better foundation for developing CampusEats.

## Week 2: Props, State and Rendering Data

**1. What is the difference between props and state in React?**

Props are values passed from a parent component to a child component. State is data managed by a component that can change over time. In CampusEats, props can be used to pass vendor or menu information to reusable components, while state can manage interactions such as the selected vendor or cart count.

**2. Why is `.map()` useful when displaying a list of menu items?**

The `.map()` method allows me to transform each item in an array into a React element. This means I can display menu items dynamically from vendor data instead of writing repeated JSX for every item.

**3. Why should each item in a rendered list have a unique key?**

A unique key helps React identify which items have changed, been added, or been removed. It makes list updates more reliable and helps React update the correct elements.

**4. How does state help update the cart counter?**

When the cart state changes, React re-renders the parts of the interface that depend on that state. For example, adding an item can update the cart count shown in the header without manually changing the HTML.

**My reflection**

In Week 2, I learned how to pass data using props and manage changing information using state. I applied these concepts to display vendor and menu data dynamically and to update the cart counter. I also learned that reusable components and correct CSS class names are important for keeping the interface consistent.

## Week 3: Effects, JSON Data and Forms

**1. What is the purpose of `useEffect` in React?**

The `useEffect` Hook is used to perform side effects in a component, such as fetching data after a component renders. It allows the application to work with data or operations outside the normal rendering process.

**2. Why load vendor information from a JSON file instead of hard-coding every vendor in the component?**

Keeping vendor information in a JSON file separates data from presentation. It makes the data easier to manage and allows the application to render vendors and menus dynamically.

**3. Why should an application show loading and error states when fetching data?**

A loading state tells users that the application is still retrieving information. An error state gives feedback when the request fails, instead of leaving users with an empty or confusing screen.

**4. Why is checkout form validation important?**

Validation checks that required information has been entered correctly before an order is submitted. It helps prevent incomplete form submissions and gives users a chance to correct mistakes.

**My reflection**

In Week 3, I learned how to retrieve vendor data from `public/api/vendors.json` and manage the different states involved in loading that data. I also worked on cart quantities, calculating the total price, and validating the checkout form. I found that separating data from UI code makes the project easier to maintain and understand.

## Week 4: Custom Hooks, Context, Routing and Persistence

**1. What is a custom Hook in React, and why is it useful?**

A custom Hook is a JavaScript function that uses React Hooks to share reusable stateful logic between components. It helps keep components simpler by moving repeated logic into a separate function.

**2. What problem does React Context solve in an application like CampusEats?**

Context allows data to be shared by multiple components without passing props through every level of the component tree. In CampusEats, Cart Context helps different pages and components access shared cart information.

**3. What is the purpose of React Router?**

React Router allows users to navigate between different pages or views in a React application without manually managing page changes. In CampusEats, routes are used for the home page, vendor menu page, cart, and order history.

**4. What is the purpose of localStorage, and what should I consider when using it?**

localStorage stores data in the browser so that it can remain available after a page refresh. In CampusEats, it is used to persist information such as cart data, orders, and recently viewed menu items. I should consider that localStorage stores data in the user's browser and should not be used for sensitive information.

**5. What does the Recently Viewed feature do?**

The Recently Viewed feature keeps track of menu items that a user has viewed and displays them on the home page. In my implementation, the custom Hook stores the items in localStorage, removes duplicate entries, and keeps up to five recent items.

**My reflection**

In Week 4, I learned how custom Hooks, Context, routing, and localStorage can work together to organize a larger React application. I implemented the Recently Viewed feature using a custom Hook and localStorage, while React Router supports navigation between the application pages. I also learned to test navigation and styling in the browser, because a component can render correctly but still need adjustments to its behaviour or appearance.

## Overall Reflection

Across Weeks 1 to 4, I progressed from understanding basic React components to building a multi-page CampusEats application with shared state and browser storage. The most important lesson for me was to break the application into smaller components and keep data, reusable logic, and presentation organized. I also learned that AI suggestions should not be copied blindly. I need to compare them with the assignment requirements, check the actual project code, run the application, and test the features in the browser.
