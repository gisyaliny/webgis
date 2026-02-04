# ES6 Module 4: Async & Advanced Concepts

## 1. Promises
Promises provide a cleaner way to handle asynchronous operations compared to callback hell. A Promise represents a value that may be available now, in the future, or never.

### States
- **Pending**: Initial state.
- **Fulfilled**: Operation completed successfully.
- **Rejected**: Operation failed.

### Usage
```javascript
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) resolve("Data received!");
    else reject("Connection error.");
  }, 1000);
});

fetchData
  .then(data => console.log(data))
  .catch(error => console.error(error))
  .finally(() => console.log("Done."));
```

### Promise.all()
Waits for all promises to resolve, or fails if any one fails.
```javascript
Promise.all([p1, p2, p3]).then(values => { ... });
```

---

## 2. Symbols
`Symbol` is a new primitive type that is **unique**. It is often used to add unique property keys to objects that won't collide with other keys.

```javascript
const id = Symbol("id");
const user = {
  [id]: 12345,
  name: "Alice"
};

// Symbols are ignored in for...in loops and Object.keys()
console.log(Object.keys(user)); // ["name"]
```

---

## 3. Best Practices & Evolution

### `let` vs `const`
**Rule**: Always use `const`. Only use `let` if you explicitly need to reassign the variable.

### Arrow Functions
Use them for callbacks and array methods (`map`, `filter`). Use regular functions when you need dynamic `this` (e.g., inside object methods or event handlers if relying on `this`).

### Object Shorthand
```javascript
const x = 10, y = 20;
// Bad
const point = { x: x, y: y };
// Good (ES6)
const point = { x, y };
```

### Looking Ahead: `async` / `await` (ES2017)
While not strictly ES6, `async/await` is the modern standard for consuming Promises. It makes async code look synchronous.

```javascript
// Instead of .then() chains:
async function getData() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}
```

---

## 🔴 Quiz: Async & Advanced

**Q1: What creates a microtask in the event loop?**
A) `setTimeout`
B) `Promise.resolve().then(...)`
C) `setInterval`

**Q2: If `Promise.all([A, B])` runs, and A rejects, what happens?**
A) It waits for B, then catches.
B) It immediately catches/rejects.
C) It ignores A and returns B.

**Q3: Are Symbols unique?**
A) No, `Symbol("x") === Symbol("x")` is true.
B) Yes, `Symbol("x") === Symbol("x")` is false.

<details>
<summary><strong>See Answers</strong></summary>

**A1: B.** Promises use the Microtask queue, which has higher priority than Macrotasks (timers).
**A2: B.** `Promise.all` maps to "fail-fast" behavior. It rejects as soon as one promise rejects.
**A3: B.** Every Symbol created is unique, even with the same description.
</details>
