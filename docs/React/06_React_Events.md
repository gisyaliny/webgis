# React Module 6: React Events

## 1. What are React Events?
Handling events with React elements is very similar to handling events on DOM elements. However, there are some syntax differences:

1.  React events are named using **camelCase**, rather than lowercase.
2.  With JSX, you pass a **function** as the event handler, rather than a string.

### HTML vs. React
**HTML:**
```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

**React:**
```javascript
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

---

## 2. Adding Events
You can add event listeners to any DOM element returned by JSX.

### Example: `onClick`
```javascript
function Button() {
  const shoot = () => {
    alert("Great Shot!");
  };

  return (
    <button onClick={shoot}>Take the shot!</button>
  );
}
```

---

## 3. Passing Arguments to Event Handlers
To pass an argument to an event handler, use an **arrow function** or the specific function reference.

### ❌ Wrong: Calling the Function Directly
React calls the function *immediately* upon render if you add parentheses `()`.
```javascript
<button onClick={shoot("Goal")}>Shoot</button> // Runs immediately!
```

### ✅ Correct: Using an Arrow Function wrapper
```javascript
function Football() {
  const shoot = (a) => {
    alert(a);
  };

  return (
    <button onClick={() => shoot("Goal")}>Take the shot!</button>
  );
}
```

---

## 4. The Event Object (`e`)
React event handlers represent an instance of **SyntheticEvent**. This is a cross-browser wrapper around the browser's native event. Arguments like `event` are essentially the same as in vanilla JS.

### Usage
Typically, the event object is the **last** argument if you pass others, or the **first** if you don't.

```javascript
function Football() {
  const shoot = (a, b) => {
    alert(b.type); // "click"
    console.log(b.target); // The button element
  };

  return (
    <button onClick={(event) => shoot("Goal", event)}>Take the shot!</button>
  );
}
```

If you don't pass arguments, it's passed automatically:

```javascript
const handleChange = (e) => {
  console.log(e.target.value);
};

<input onChange={handleChange} />
```

---

## 5. Preventing Default Behavior
In HTML, you can sometimes return `false` to prevent default behavior. In React, you must call `preventDefault` explicitly.

### Example: Form Submission
```javascript
function Form() {
  function handleSubmit(e) {
    e.preventDefault(); // Prevents page reload
    console.log("Form submitted!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 6. Common Event Types
React supports every standard web event. Here are a few common ones:

- **Mouse**: `onClick`, `onMouseEnter`, `onMouseLeave`
- **Form**: `onChange`, `onSubmit`, `onFocus`, `onBlur`
- **Keyboard**: `onKeyDown`, `onKeyPress`, `onKeyUp`
- **Clipboard**: `onCopy`, `onPaste`

### Example: `onChange` (For Inputs)
```javascript
function MyInput() {
  const [text, setText] = React.useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <p>You typed: {text}</p>
    </div>
  );
}
```

---

## 🔴 Quiz: React Events

**Q1: How are React events named?**
A) Lowercase (`onclick`)
B) CamelCase (`onClick`)
C) Uppercase (`ONCLICK`)

**Q2: How do you prevent the default behavior of a form submit in React?**
A) Return `false` in the handler.
B) Call `event.preventDefault()`.
C) You cannot prevent it.

**Q3: What causes a function to run immediately when the component renders, instead of waiting for the click?**
A) Passing the function name: `onClick={handleClick}`
B) Calling the function with parens: `onClick={handleClick()}`
C) Using an arrow function: `onClick={() => handleClick()}`

**Q4: Which argument represents the event object?**
A) The first argument passed to the handler by default.
B) The global `window.event` object.
C) React events do not have event objects.

<details>
<summary><strong>See Answers</strong></summary>

**A1: B.** React uses camelCase for event attributes.
**A2: B.** You must call `preventDefault()` explicitly.
**A3: B.** Adding parentheses executes the function immediately during rendering.
**A4: A.** The SyntheticEvent object is passed as the first argument (unless you wrap it and pass it elsewhere).
</details>
