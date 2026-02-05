# ES6 Module 2: Data Handling & Structures

## 1. Destructuring Assignment
Destructuring allows you to unpack values from arrays or properties from objects into distinct variables.

### Object Destructuring
```javascript
const user = { 
  id: 42, 
  name: "Alice", 
  role: "Admin" 
};

// Extracting properties
const { name, role } = user;
console.log(name); // "Alice"

// Aliasing
const { name: userName } = user;
console.log(userName); // "Alice"

// Default values
const { active = true } = user;
```

### Array Destructuring
```javascript
const rgb = [255, 200, 0];
const [red, green, blue] = rgb;

// Skipping items
const [first, , third] = ["a", "b", "c"];
```

### Destructuring in React Components
Destructuring is particularly useful in React for working with props, hooks, and API responses. It helps make your code more concise and easier to read.

#### Props Destructuring
When a component receives props, you can use destructuring to extract the values you need.

Check out the difference between using and not using destructuring:

```javascript
// Using destructuring:
function Greeting({ name, age }) {
  return <h1>Hello, {name}! You are {age} years old.</h1>;
}

// NOT using destructuring:
function Greeting(props) {
  return <h1>Hello, {props.name}! You are {props.age} years old.</h1>;
}
```

**Example:** Using destructuring to extract props:

```javascript
import { createRoot } from 'react-dom/client';

function Greeting({ name, age }) {
  return <h1>Hello, {name}! You are {age} years old.</h1>;
}
  
createRoot(document.getElementById('root')).render(
  <Greeting name="John" age={25} />
);
```

#### useState Hook Destructuring
When a component uses the `useState` hook, we use destructuring to extract the values from it.

**Example:** Using destructuring to extract values from useState:

```javascript
import { createRoot } from 'react-dom/client';
import { useState } from 'react';

function Counter() {
  // Destructuring the array returned by useState
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

createRoot(document.getElementById('root')).render(
  <Counter />
);
```

#### Nested Destructuring in React
You can also destructure nested objects, which is common when working with API responses:

```javascript
function UserProfile({ user }) {
  // Nested destructuring
  const { 
    name, 
    address: { city, country } 
  } = user;
  
  return (
    <div>
      <h2>{name}</h2>
      <p>{city}, {country}</p>
    </div>
  );
}

// Usage
const userData = {
  name: "Alice",
  address: {
    city: "New York",
    country: "USA"
  }
};

<UserProfile user={userData} />
```

#### Destructuring with Default Values in React
Provide fallback values for props that might be undefined:

```javascript
function Button({ text = "Click me", variant = "primary" }) {
  return <button className={variant}>{text}</button>;
}

// If no props are passed, defaults will be used
<Button /> // Renders: <button class="primary">Click me</button>
```

---

## 2. Spread and Rest Operators (`...`)
The "three dots" operator behaves differently depending on context.

### Spread (Expand elements)
Used to expand an array/object into individual elements.

```javascript
// Arrays
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

// Objects (ES2018, often grouped with ES6 learning)
const defaults = { theme: "dark", showNav: true };
const userSettings = { ...defaults, showNav: false }; 
// { theme: "dark", showNav: false } (overrides match)
```

### Rest (Collect elements)
Used to collect multiple elements into a single array.

```javascript
// Function parameters
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4); // 10

// Destructuring leftovers
const [head, ...tail] = [1, 2, 3, 4];
// head = 1, tail = [2, 3, 4]
```

---

## 3. New String & Number Methods
ES6 added convenient helper methods.

- **String**: `startsWith()`, `endsWith()`, `includes()`, `repeat()`.
- **Number**: `Number.isNaN()`, `Number.isFinite()`, `Number.isInteger()`.

```javascript
"Hello World".includes("World"); // true
"abc".repeat(3); // "abcabcabc"
```

---

## 4. `for...of` Loop
A new loop syntax for iterating over iterable objects (Arrays, Strings, Maps, Sets).

```javascript
const fruits = ["apple", "banana"];

for (const fruit of fruits) {
  console.log(fruit);
}
// Unlike for...in, this iterates values, not keys/indices.
```

---

## 5. Maps and Sets
New built-in data structures.

### `Map`
A collection of keyed data items, similar to an Object, but keys can be of **any** type.

```javascript
const map = new Map();
map.set('1', 'str1');   // string key
map.set(1, 'num1');     // numeric key
map.set(true, 'bool1'); // boolean key

console.log(map.get(1)); // 'num1'
console.log(map.size);   // 3
```

### `Set`
A collection of **unique** values.

```javascript
const set = new Set([1, 2, 2, 3]);
console.log(set); // Set { 1, 2, 3 } (duplicates removed)
```

---

## 🔴 Quiz: Data Handling

**Q1: What is the value of `b` in: `const [a, ...b] = [1, 2, 3, 4]`?**
A) `2`
B) `[2, 3, 4]`
C) `[1, 2, 3, 4]`

**Q2: Which operator allows you to merge two objects?**
A) `combine`
B) `...` (Spread)
C) `&&`

**Q3: Can a `Map` use an object as a key?**
A) Yes
B) No, only strings
C) No, only numbers and strings

<details>
<summary><strong>See Answers</strong></summary>

**A1: B.** The rest operator collects the remaining elements into an array.
**A2: B.** `const merged = { ...obj1, ...obj2 };`
**A3: A.** Yes, Maps allow keys of any type, including objects.
</details>
