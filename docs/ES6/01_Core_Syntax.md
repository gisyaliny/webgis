# ES6 Module 1: Core Syntax Fundamentals

## 1. Introduction to ES6 (ECMAScript 2015)
ES6 was a major update to JavaScript that included dozens of new features. It standardized many coding patterns that previously required libraries or hacks. It makes code more concise, readable, and safer.

---

## 2. Variable Declarations: `let` and `const`
Before ES6, `var` was the only way to declare variables. `var` has function scope and can be hoisted, which often leads to bugs.

### `let`
- **Block Scoped**: Only available within the `{ }` block where it's defined.
- **Can be reassigned**: Just like `var` (but safer).
- **No Hoisting**: Cannot be accessed before declaration (Temporal Dead Zone).

```javascript
{
  let x = 10;
  var y = 20;
}
// console.log(x); // Error: x is not defined
console.log(y); // 20 (var leaks out of blocks)
```

### `const`
- **Block Scoped**.
- **Cannot be reassigned**: Must be initialized immediately.
- **Immutable Binding**: The *variable* cannot point to a new value, but if it holds an object/array, the *contents* can still change.

```javascript
const PI = 3.14159;
// PI = 3; // Error: Assignment to constant variable.

const user = { name: "Alice" };
user.name = "Bob"; // Allowed! (Mutating the object, not reass. binding)
```

**Best Practice:** Use `const` by default. Only use `let` when you know the value will change (like a loop counter). Avoid `var`.

---

## 3. Arrow Functions
Arrow functions provide a shorter syntax for writing function expressions and do not have their own `this`.

### Syntax
```javascript
// ES5
var add = function(a, b) {
  return a + b;
};

// ES6
const add = (a, b) => a + b; // Implicit return
const square = x => x * x;   // Single arg doesn't need parens
```

### `this` Binding
Arrow functions inherit `this` from the surrounding scope (lexical scoping).

```javascript
// ES5 Problem
function Person() {
  this.age = 0;
  setInterval(function() {
    this.age++; // 'this' refers to the global object or undefined!
  }, 1000);
}

// ES6 Solution
function Person() {
  this.age = 0;
  setInterval(() => {
    this.age++; // 'this' correctly refers to the Person instance
  }, 1000);
}
```

---

## 4. Template Literals
Template literals allow embedded expressions and multi-line strings using backticks (`` ` ``).

```javascript
const name = "World";

// Interpolation
console.log(`Hello, ${name}!`);

// Multi-line
const html = `
  <div>
    <h1>Title</h1>
  </div>
`;
```

---

## 5. Default Parameters
You can now define default values for function parameters directly in the signature.

```javascript
function greet(name = "Guest") {
  console.log(`Hello, ${name}`);
}

greet(); // "Hello, Guest"
greet("John"); // "Hello, John"
```

---

## 🔴 Quiz: Core Syntax

**Q1: What will the following code output?**
```javascript
const colors = ['red', 'green'];
colors.push('blue');
console.log(colors);
```
A) Error (Assignment to constant)
B) `['red', 'green', 'blue']`
C) `['red', 'green']`

**Q2: Which statement applies to arrow functions?**
A) They have their own `this` context.
B) They are hoisted.
C) They inherit `this` from the surrounding code.

**Q3: What happens if you try to log a `let` variable before it is declared?**
A) It logs `undefined`.
B) It throws a ReferenceError.
C) It logs `null`.

<details>
<summary><strong>See Answers</strong></summary>

**A1: B.** You can mutate the contents of a const array.
**A2: C.** Arrow functions use lexical scoping for `this`.
**A3: B.** Accessing a `let` variable in the Temporal Dead Zone throws an error.
</details>
