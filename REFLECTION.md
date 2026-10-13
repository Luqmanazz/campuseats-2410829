# Week 1 Reflection

**1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?**

Imperative programming tells the browser step by step how to change the page. React uses a declarative approach, where I describe what the UI should look like based on the current data and state.

**2. Why must a component name start with a capital letter?**

React uses capitalized names to identify custom React components. Lowercase names are generally interpreted as built-in HTML elements, such as `div` and `h1`.

**3. What does a fragment `<>...</>` do, and why not just use a `div`?**

A fragment lets a component return multiple elements without adding an extra DOM element. This keeps the page structure cleaner when an additional wrapper is unnecessary.

**4. Name one benefit of splitting the UI into small components.**

Small components make the code easier to understand, maintain, test, and reuse. For example, I can update the header separately without rewriting the entire `App` component.