# React Module 2: JSX (JavaScript XML)

## 1. What is JSX?

**JSX** stands for **JavaScript XML**. It's a syntax extension for JavaScript that allows you to write HTML-like code directly in your JavaScript files.

### Key Benefits:
- Makes React code more readable and intuitive
- Allows you to write HTML structures in the same file as JavaScript logic
- Converts HTML tags into React elements
- Provides compile-time error checking

### JSX vs. Regular JavaScript

**With JSX (Recommended):**
```javascript
import { createRoot } from 'react-dom/client';

const myElement = <h1>I Love JSX!</h1>;

createRoot(document.getElementById('root')).render(myElement);

// Output: Renders "I Love JSX!" as an h1 element
```

**Without JSX (Verbose):**
```javascript
import React from 'react';
import { createRoot } from 'react-dom/client';

const myElement = React.createElement('h1', {}, 'I do not use JSX!');

createRoot(document.getElementById('root')).render(myElement);

// Output: Renders "I do not use JSX!" as an h1 element
```

As you can see, JSX makes the code much cleaner and easier to understand!

---

## 2. Expressions in JSX

You can embed any JavaScript expression inside JSX by wrapping it in **curly braces `{}`**.

### Basic Expressions

```javascript
const myElement = <h1>React is {5 + 5} times better with JSX</h1>;

// Output: "React is 10 times better with JSX"
```

### Using Variables

```javascript
const name = "Alice";
const age = 25;

const greeting = <h1>Hello, {name}! You are {age} years old.</h1>;

// Output: "Hello, Alice! You are 25 years old."
```

### Using Functions

```javascript
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'John',
  lastName: 'Doe'
};

const element = <h1>Hello, {formatName(user)}!</h1>;

// Output: "Hello, John Doe!"
```

### Using Conditional Expressions

```javascript
const isLoggedIn = true;

const message = (
  <h1>
    {isLoggedIn ? 'Welcome back!' : 'Please sign in.'}
  </h1>
);

// Output: "Welcome back!"
```

### Using Array Methods

```javascript
const numbers = [1, 2, 3, 4, 5];

const listItems = (
  <ul>
    {numbers.map(number => <li key={number}>{number * 2}</li>)}
  </ul>
);

/* Output:
<ul>
  <li>2</li>
  <li>4</li>
  <li>6</li>
  <li>8</li>
  <li>10</li>
</ul>
*/
```

---

## 3. Multi-line JSX

When writing JSX that spans multiple lines, wrap it in **parentheses `()`** for better readability.

### Example: Creating a List

```javascript
const myElement = (
  <ul>
    <li>Apples</li>
    <li>Bananas</li>
    <li>Cherries</li>
  </ul>
);

/* Output:
• Apples
• Bananas
• Cherries
*/
```

### Example: Complex Layout

```javascript
const card = (
  <div className="card">
    <img src="profile.jpg" alt="Profile" />
    <h2>John Doe</h2>
    <p>Software Developer</p>
    <button>Contact</button>
  </div>
);
```

---

## 4. One Top-Level Element Rule

JSX expressions must have **exactly ONE parent element**. You cannot return multiple sibling elements without wrapping them.

### ❌ Wrong - Multiple Top-Level Elements

```javascript
// This will cause an error!
const myElement = (
  <p>I am a paragraph.</p>
  <p>I am a paragraph too.</p>
);
```

### ✅ Correct - Wrapped in a `<div>`

```javascript
const myElement = (
  <div>
    <p>I am a paragraph.</p>
    <p>I am a paragraph too.</p>
  </div>
);
```

### ✅ Better - Using React Fragments

React **Fragments** let you group elements without adding extra DOM nodes. Use `<>...</>` (shorthand) or `<React.Fragment>...</React.Fragment>`.

```javascript
const myElement = (
  <>
    <p>I am a paragraph.</p>
    <p>I am a paragraph too.</p>
  </>
);

// Output: Two paragraphs without an extra wrapper div in the DOM
```

**When to use Fragments:**
- When you don't want extra wrapper elements in the DOM
- When returning multiple elements from a component
- When working with CSS Grid or Flexbox layouts where extra divs can break styling

---

## 5. Elements Must Be Closed

JSX follows **XML rules**, so all elements must be properly closed.

### Self-Closing Tags

In HTML, some tags like `<input>` or `<img>` don't require closing. In JSX, they **must** be self-closed with `/>`

```javascript
// ✅ Correct
const inputElement = <input type="text" />;
const imageElement = <img src="logo.png" alt="Logo" />;
const lineBreak = <br />;

// ❌ Wrong - Will cause an error
const inputElement = <input type="text">;
```

### Regular Elements

```javascript
// ✅ Correct
const paragraph = <p>Hello World</p>;

// ❌ Wrong
const paragraph = <p>Hello World;
```

---

## 6. `className` Instead of `class`

Since `class` is a reserved keyword in JavaScript, JSX uses **`className`** instead.

```javascript
// ✅ Correct - Use className
const myElement = <h1 className="header-title">Hello World</h1>;

// ❌ Wrong - Don't use class
const myElement = <h1 class="header-title">Hello World</h1>;
```

### Multiple Classes

```javascript
const myElement = <div className="card primary-card shadow">Content</div>;

// With template literals
const cardType = "primary";
const myElement = <div className={`card ${cardType}-card shadow`}>Content</div>;
```

### Conditional Classes

```javascript
const isActive = true;
const myElement = (
  <button className={isActive ? 'btn-active' : 'btn-inactive'}>
    Click Me
  </button>
);
```

---

## 7. Other Attribute Differences

JSX uses **camelCase** for HTML attributes that have hyphens:

| HTML Attribute | JSX Attribute |
|----------------|---------------|
| `class` | `className` |
| `for` | `htmlFor` |
| `tabindex` | `tabIndex` |
| `onclick` | `onClick` |
| `onchange` | `onChange` |
| `maxlength` | `maxLength` |
| `readonly` | `readOnly` |

### Example

```javascript
const form = (
  <div>
    <label htmlFor="username">Username:</label>
    <input 
      type="text" 
      id="username"
      maxLength={20}
      readOnly={false}
      onChange={(e) => console.log(e.target.value)}
    />
  </div>
);
```

---

## 8. Comments in JSX

Comments in JSX are written using **`{/* comment */}`** syntax.

```javascript
const myElement = (
  <div>
    {/* This is a comment */}
    <h1>Hello {/* inline comment */} World</h1>
    
    {/* 
      Multi-line comment
      You can write multiple lines here
    */}
    <p>Welcome to React!</p>
  </div>
);
```

**Note:** Regular JavaScript comments `//` or `/* */` won't work inside JSX markup.

---

## 9. JSX in React Components

JSX works perfectly inside React components. Components are JavaScript functions that return JSX.

### Basic Component

```javascript
import { createRoot } from 'react-dom/client';

function Car() {
  return (
    <>
      <h2>My Car</h2>
      <p>It is a Ford Mustang.</p>
    </>
  );
}

createRoot(document.getElementById('root')).render(<Car />);

/* Output:
My Car
It is a Ford Mustang.
*/
```

### Component with Variables

```javascript
function Car() {
  const brand = "Ford";
  const model = "Mustang";
  const year = 2024;
  
  return (
    <>
      <h2>My Car</h2>
      <p>It is a {year} {brand} {model}.</p>
    </>
  );
}

/* Output:
My Car
It is a 2024 Ford Mustang.
*/
```

### Component with Logic

```javascript
function Greeting() {
  const hour = new Date().getHours();
  let message;
  
  if (hour < 12) {
    message = "Good morning!";
  } else if (hour < 18) {
    message = "Good afternoon!";
  } else {
    message = "Good evening!";
  }
  
  return <h1>{message}</h1>;
}

// Output: "Good morning!" (if before noon)
```

### Component with Props

```javascript
function UserCard({ name, role, email }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p className="role">{role}</p>
      <p className="email">{email}</p>
    </div>
  );
}

// Usage
<UserCard 
  name="Alice Johnson" 
  role="Software Engineer" 
  email="alice@example.com" 
/>

/* Output:
Alice Johnson
Software Engineer
alice@example.com
*/
```

---

## 10. Inline Styles in JSX

Styles in JSX are specified as JavaScript objects with camelCase properties.

```javascript
const divStyle = {
  color: 'blue',
  backgroundColor: 'lightgray',
  padding: '10px',
  borderRadius: '5px'
};

const myElement = <div style={divStyle}>Styled Content</div>;
```

### Inline Style Object

```javascript
const myElement = (
  <h1 style={{
    color: 'red',
    fontSize: '24px',
    textAlign: 'center'
  }}>
    Styled Heading
  </h1>
);
```

**Note:** The double curly braces `{{}}` are:
- Outer `{}`: JSX expression
- Inner `{}`: JavaScript object

---

## 11. Conditional Rendering in JSX

### Using Ternary Operator

```javascript
function LoginButton({ isLoggedIn }) {
  return (
    <button>
      {isLoggedIn ? 'Logout' : 'Login'}
    </button>
  );
}
```

### Using Logical AND (`&&`)

```javascript
function Notification({ hasMessages, messageCount }) {
  return (
    <div>
      <h1>Inbox</h1>
      {hasMessages && <p>You have {messageCount} new messages!</p>}
    </div>
  );
}

// If hasMessages is true: shows the paragraph
// If hasMessages is false: shows nothing
```

### Using If-Else Before Return

```javascript
function Dashboard({ user }) {
  if (!user) {
    return <h1>Please log in</h1>;
  }
  
  if (user.role === 'admin') {
    return <h1>Admin Dashboard</h1>;
  }
  
  return <h1>User Dashboard</h1>;
}
```

---

## 12. Lists and Keys

When rendering lists, each item needs a unique **`key`** prop to help React identify which items have changed.

```javascript
function FruitList() {
  const fruits = ['Apple', 'Banana', 'Cherry', 'Date'];
  
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}

/* Output:
• Apple
• Banana
• Cherry
• Date
*/
```

### Using Unique IDs as Keys (Best Practice)

```javascript
function TodoList() {
  const todos = [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Deploy app', completed: true }
  ];
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} style={{ 
          textDecoration: todo.completed ? 'line-through' : 'none' 
        }}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

/* Output:
• Learn React
• Build a project
• Deploy app (crossed out)
*/
```

---

## 🔴 Quiz: React JSX

**Q1: What does JSX stand for?**
A) JavaScript XML
B) JavaScript Extension
C) Java Syntax Extension

**Q2: How do you embed a JavaScript expression in JSX?**
A) `[expression]`
B) `{expression}`
C) `(expression)`

**Q3: Which is the correct way to create a self-closing input in JSX?**
A) `<input type="text">`
B) `<input type="text" />`
C) `<input type="text"></input>`

**Q4: What should you use instead of `class` in JSX?**
A) `class`
B) `className`
C) `classname`

**Q5: How do you write comments in JSX?**
A) `// comment`
B) `<!-- comment -->`
C) `{/* comment */}`

**Q6: What is wrong with this code?**
```javascript
const element = (
  <h1>Hello</h1>
  <p>World</p>
);
```
A) Nothing, it's correct
B) Missing parentheses
C) Multiple top-level elements without a wrapper

**Q7: What is the output of this code?**
```javascript
const x = 10;
const element = <h1>{x > 5 ? 'Big' : 'Small'}</h1>;
```
A) `<h1>Big</h1>`
B) `<h1>Small</h1>`
C) `<h1>10</h1>`

**Q8: Which is the correct way to use a Fragment?**
A) `<Fragment>...</Fragment>`
B) `<>...</>`
C) Both A and B are correct

**Q9: What attribute should you use for a label's "for" in JSX?**
A) `for`
B) `htmlFor`
C) `labelFor`

**Q10: Why do we need keys when rendering lists?**
A) For styling purposes
B) To help React identify which items have changed
C) To make the code look better

**Q11: What is the correct way to apply inline styles in JSX?**
A) `style="color: red"`
B) `style={{color: 'red'}}`
C) `style={color: 'red'}`

**Q12: What will this render?**
```javascript
const show = false;
const element = <div>{show && <p>Hello</p>}</div>;
```
A) `<div><p>Hello</p></div>`
B) `<div>false</div>`
C) `<div></div>` (empty div)

<details>
<summary><strong>See Answers</strong></summary>

**A1: A.** JSX stands for JavaScript XML, allowing you to write HTML-like syntax in JavaScript.

**A2: B.** Use curly braces `{}` to embed JavaScript expressions in JSX.

**A3: B.** Self-closing tags in JSX must end with `/>`.

**A4: B.** Use `className` instead of `class` because `class` is a reserved keyword in JavaScript.

**A5: C.** JSX comments use the syntax `{/* comment */}`.

**A6: C.** JSX must have one top-level element. Wrap multiple elements in a `<div>` or Fragment `<>`.

**A7: A.** Since `10 > 5` is true, the ternary operator returns `'Big'`.

**A8: C.** Both `<React.Fragment>` and the shorthand `<>` are valid Fragment syntax.

**A9: B.** Use `htmlFor` instead of `for` in JSX for label elements.

**A10: B.** Keys help React identify which items have changed, been added, or removed, improving performance.

**A11: B.** Inline styles use double curly braces: outer for JSX expression, inner for the style object.

**A12: C.** When using `&&`, if the left side is false, nothing is rendered. The div will be empty.

</details>
