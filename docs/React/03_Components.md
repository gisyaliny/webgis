# React Module 3: Components

## 1. What are Components?

Components are the building blocks of any React application. They are independent, reusable bits of code that serve the same purpose as JavaScript functions but work in isolation and return HTML.

Components come in two types:
1. **Class Components** (Older, verbose)
2. **Function Components** (Modern, recommended)

In this tutorial, we will focus on **Function Components**, which are the standard for modern React development.

---

## 2. Creating Your First Component

A Function Component is simply a JavaScript function that returns JSX.

**Rules:**
- Component names **MUST** start with an uppercase letter (e.g., `Car`, not `car`).
- The component must return JSX (HTML-like syntax).

### Example: Basic Component

```javascript
// Define the component
function Car() {
  return <h2>Hi, I am a Car!</h2>;
}
```

### Rendering the Component

To use this component in your application, you verify it like an HTML tag: `<Car />`.

```javascript
import { createRoot } from 'react-dom/client';

function Car() {
  return <h2>Hi, I am a Car!</h2>;
}

const root = createRoot(document.getElementById('root'));
root.render(<Car />);
```

---

## 3. Component Props (Properties)

Props allow you to pass data from a parent component to existence child component, making your components dynamic and reusable.

Think of props as **arguments** passed to a function.

### Example: Passing Props

```javascript
// Child Component
function Car(props) {
  // Access attributes via the props object
  return <h2>I am a {props.color} Car!</h2>;
}

// Parent Rendering
const root = createRoot(document.getElementById('root'));

// Pass "color" as an attribute
root.render(<Car color="red" />);
```

**Output:** `I am a red Car!`

---

## 4. Components inside Components

You can nest components inside other components to build complex UIs from simple building blocks.

### Example: Garage containing a Car

```javascript
function Car() {
  return <h2>I am a Car!</h2>;
}

function Garage() {
  return (
    <>
      <h1>Who lives in my Garage?</h1>
      {/* Rendering the Car component inside Garage */}
      <Car />
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<Garage />);
```

---

## 5. Reusing Components

You can render the same component multiple times with different props.

```javascript
function Car(props) {
  return <h2>I am a {props.brand}!</h2>; // Uses 'brand' prop
}

function Garage() {
  return (
    <>
      <h1>My Garage contents:</h1>
      <Car brand="Ford" />
      <Car brand="BMW" />
      <Car brand="Tesla" />
    </>
  );
}
```

**Output:**
- My Garage contents:
- I am a Ford!
- I am a BMW!
- I am a Tesla!

---

## 6. Components in Separate Files

In real-world applications, it's best practice to split your components into separate files.

**Rules:**
1. The file name must start with an uppercase letter (e.g., `Car.jsx`).
2. Use the `.jsx` (or `.js`) extension.
3. You must **export** the component from its file.
4. You must **import** the component where you want to use it.

### Step 1: Create `Car.jsx`

```javascript
// /src/Car.jsx
function Car() {
  return <h2>Hi, I am a Car!</h2>;
}

export default Car; // Exporting the component
```

### Step 2: Import and Use in `App.jsx`

```javascript
// /src/App.jsx
import Car from './Car.jsx'; // Importing the component

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Car />
    </div>
  );
}

export default App;
```

---

## 🔴 Quiz: React Components

**Q1: What is the correct way to name a React component?**
A) `myComponent`
B) `MyComponent`
C) `my-component`

**Q2: How do you pass data to a component?**
A) Using `state`
B) Using `props`
C) Using global variables

**Q3: Which syntax is correct for importing a component from `Car.jsx`?**
A) `import Car from 'Car'`
B) `import Car from './Car.jsx'`
C) `include Car from './Car.jsx'`

**Q4: Can a component be used multiple times in the same application?**
A) No, only once
B) Yes, but only with the same props
C) Yes, as many times as needed with different props

**Q5: What is the output of this code?**
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
<Welcome name="Sara" />
```
A) `Hello, props.name`
B) `Hello, Sara`
C) `Hello, undefined`

<details>
<summary><strong>See Answers</strong></summary>

**A1: B.** React components must start with an uppercase letter.

**A2: B.** Props (properties) are used to pass data from parent to child components.

**A3: B.** You use the `import` keyword and specify the relative path to the file.

**A4: C.** Components are reusable and can be rendered multiple times with different data.

**A5: B.** The component receives `{name: "Sara"}` as props, so it renders "Hello, Sara".

</details>
