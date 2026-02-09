# React Module 7: Conditionals & Lists

## 1. Conditional Rendering
React allows you to render different components or elements based on certain conditions. This works the same way conditions work in JavaScript.

### Using `if` Statements
You can use `if` statements to decide which JSX to return.

```javascript
function Goal({ isGoal }) {
  if (isGoal) {
    return <MadeGoal />;
  }
  return <MissedGoal />;
}
```

### Logical `&&` Operator
Use `&&` when you want to render something **only if** a condition is true.
- If true: renders the element.
- If false: renders nothing (ignores it).

```javascript
function Garage({ cars }) {
  return (
    <div>
      <h1>Garage</h1>
      {cars.length > 0 &&
        <h2>You have {cars.length} cars in your garage.</h2>
      }
    </div>
  );
}
```

### Ternary Operator (`condition ? true : false`)
The most common way to handle "if-else" logic inline within JSX.

```javascript
function LoginStatus({ isLoggedIn }) {
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

---

## 2. Rendering Lists
In React, you render lists by iterating over arrays, usually using the `.map()` function.

### Basic List
```javascript
function CarList() {
  const cars = ['Ford', 'BMW', 'Audi'];
  return (
    <ul>
      {cars.map((car) => <li key={car}>{car}</li>)}
    </ul>
  );
}
```

### Keys
A "key" is a special string attribute you need to include when creating lists of elements. Keys help React identify which items have changed, are added, or are removed.

- **Best Practice**: Use unique IDs from your data.
- **Fallback**: Use the array index (only if the list is static and won't be reordered).

```javascript
const todos = [
  { id: 1, text: 'Learn React' },
  { id: 2, text: 'Build App' }
];

// Correct usage of keys
const listItems = todos.map((todo) =>
  <li key={todo.id}>{todo.text}</li>
);
```

### ❌ Wrong: Missing Key Warning
React will throw a console warning if you forget `key`.

---

## 3. Best Practices
- **Don't use indexes as keys** if the list order might change (e.g., sorting, filtering, adding/removing items), as this can cause bugs and performance issues.
- Keep render logic clean. If a conditional block is too complex, extract it into a separate component or function.

---

## 🔴 Quiz: Conditionals & Lists

**Q1: Which operator helps render an element ONLY if a condition is true?**
A) `||`
B) `&&`
C) `??`

**Q2: Why do lists need keys in React?**
A) To style the elements.
B) To help React effectively update and re-render the list.
C) To make the HTML valid.

**Q3: Is it recommended to use the array index as a key?**
A) Yes, always.
B) Only if the list is static, won't change order, and items have no IDs.
C) No, never under any circumstances.

**Q4: How does the ternary operator work in JSX?**
A) `if (condition) { true } else { false }`
B) `condition ? true : false`
C) `condition && true || false`

**Q5: What is the correct way to render a list of items?**
A) Using a `for` loop inside JSX.
B) Using `.forEach()` inside JSX.
C) Using `.map()` to return an array of elements.

<details>
<summary><strong>See Answers</strong></summary>

**A1: B.** 
The logical AND `&&` operator renders the right side only if the left side is truthy.

**A2: B.** 
Keys allow React to track element identity, minimizing DOM operations during updates.

**A3: B.** 
Indexes are acceptable only for static lists; otherwise, they can cause state issues.

**A4: B.** 
The ternary operator is the standard inline if-else replacement in JSX.

**A5: C.** 
`map()` returns a new array of elements, which React can render. `forEach` returns undefined.
</details>
