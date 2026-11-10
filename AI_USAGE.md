# AI usage log

## Week 1
- Tool(s): ChatGPT.
- What I asked for: Help understanding the CampusEats assignment, checking my existing React components, and planning the steps to complete the requirements.
- What I kept, changed or rejected, and why: I kept the step-by-step guidance and explanations, and checked my project files against the lab checklist before making changes.
- One thing the AI got wrong and how I fixed it: I have not identified an incorrect suggestion so far. I checked the instructions against the assignment PDF and confirmed that the website runs locally.

## Week 2
- Tool(s): ChatGPT
- What I asked for:  Help understanding React props and state, creating vendor data in vendors.js, displaying menu items using .map(), implementing vendor selection, and updating the cart counter.
- What I kept, changed or rejected, and why: I used the guidance to make my components reusable, display menu items dynamically, switch between vendors, and update the cart badge. I also adjusted the component CSS class names to match the provided starter stylesheet and restore the intended interface design.
- One thing the AI got wrong and how I fixed it: The initial component updates did not use some of the CSS class names from the provided stylesheet, which caused the buttons and header to lose their intended styling. I corrected the class names and tested the production build again.

## Week 3
- Tool(s): ChatGPT
- What I asked for: Help understanding React useEffect, fetching vendor data from a JSON file, managing cart quantities, calculating the cart total, implementing checkout form validation, and handling loading and error states.
- What I kept, changed or rejected, and why: I used the guidance to load vendor data from public/api/vendors.json, manage cart items and quantities, calculate the total price dynamically, and validate the checkout form before placing an order. I also adjusted the component structure and CSS class names to match the provided starter stylesheet and maintain the intended interface design.
- One thing the AI got wrong and how I fixed it: Some initial component updates did not fully match the CSS class names used in the provided starter stylesheet, which affected the intended styling. I corrected the class names and tested the production build again.


## Week 4
- Tool(s): ChatGPT.
- What I asked for: Help understanding and implementing custom hooks, localStorage persistence, React Router, Cart Context, vendor pages, order history, menu search, and the Recently Viewed feature.
- What I kept, changed or rejected, and why: I used the step-by-step explanations to separate reusable logic into custom hooks, share cart and order state through Context, add navigation between pages, and persist cart, orders, and recently viewed menu items in localStorage. I retained menu search and improved the styling of the search input and order cards to make the interface clearer.
- One thing the AI got wrong and how I fixed it: The existing VendorCard component still used the old onSelect approach, so clicking a vendor did not navigate to its menu page. I changed it to use React Router Link and tested the navigation in the browser. I also adjusted the styling after checking the rendered interface.

## Week 5

- Tool(s): ChatGPT.
- What I asked for: Help understanding and implementing Firebase Authentication, email and password registration and login, Google sign-in, logout functionality, authentication context, Protected Routes, and user-specific Recently Viewed functionality. I also requested help debugging localStorage persistence and testing the application against the Lab 5 requirements.
- What I kept, changed or rejected, and why: I used the step-by-step guidance to configure Firebase, create reusable authentication functions using AuthContext and AuthProvider, implement login and registration pages, and protect the Cart and Orders pages from unauthenticated users. I also updated the Recently Viewed feature to use a separate localStorage key for each authenticated user based on their UID. This ensures that users have their own Recently Viewed lists and that the list is cleared when they log out. I tested the functionality by registering and logging in with different accounts, refreshing the browser, checking duplicate items, and accessing protected routes.
- One thing the AI got wrong and how I fixed it: The initial logout implementation attempted to remove a localStorage key that did not match the original key used by the Recently Viewed feature. As a result, the items were still displayed after logout. I identified the mismatch by checking the useRecentlyViewed hook and updated it to use a user-specific storage key. I also improved the useLocalStorage hook to handle changes in the storage key when users log in or log out. After making these changes, I tested the feature with two different accounts and confirmed that their Recently Viewed lists were separated.