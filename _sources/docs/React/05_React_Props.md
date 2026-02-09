# React Module 5: React Props

## 1. What are Props?
**Props** (short for properties) are arguments passed to React components.
- They are passed to components via HTML attributes.
- React Props are like function arguments in JavaScript and attributes in HTML.
- **Props are Read-Only**: A component can never modify its own props.

## 2. Basic Usage

### Sending Props
To send props to a component, use the same syntax as HTML attributes.

```javascript
/* Usage in parent component */
<Car brand="Ford" />
```

### Receiving Props
The component receives the argument as a `props` object.

```javascript
function Car(props) {
  return <h2>I am a {props.brand}!</h2>; // "I am a Ford!"
}
```

---

## 3. Passing Data Types
You can pass different types of data, but unlike strings, other types must be wrapped in curly braces `{}`.

### Variables
```javascript
function Garage() {
  const carName = "Tesla";
  return <Car brand={carName} />;
}
```

### Objects
```javascript
function Car(props) {
  return <h2>I am a {props.brand.model}!</h2>;
}

function Garage() {
  const carInfo = { name: "Ford", model: "Mustang" };
  return <Car brand={carInfo} />;
}
```

---

## 4. Props Destructuring (Modern)
Instead of using `props.something`, you can destructure them directly in the function arguments. This is cleaner and standard in modern React.

### ❌ Old Way (Verbose)
```javascript
function User(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.email}</p>
    </div>
  );
}
```

### ✅ New Way (Destructuring)
```javascript
function User({ name, email }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{email}</p>
    </div>
  );
}
```

---

## 5. Props are Read-Only (Immutable)
React components must act like pure functions with respect to their props. You cannot change a prop inside the component.

### ❌ Wrong: Modifying Props
```javascript
function Sum(props) {
  props.total = props.a + props.b; // Error! Props are read-only
  return <h1>{props.total}</h1>;
}
```

### ✅ Correct: Using New Variables
```javascript
function Sum({ a, b }) {
  const total = a + b;
  return <h1>{total}</h1>;
}
```

---

## 6. Passing Functions as Props
Props aren't just for data; you can pass functions too. This is how child components communicate with parents.

```javascript
function Button({ handleClick }) {
  return <button onClick={handleClick}>Click me</button>;
}

function App() {
  const alertUser = () => {
    alert("Button clicked!");
  };

  return <Button handleClick={alertUser} />;
}
```

---

## 7. Props Children
React has a special prop called `children`. It contains the content passed *between* the opening and closing tags of a component.

### Usage
This is useful for creating "wrapper" components like cards, modals, or layout containers.

```javascript
function Card({ children }) {
  return (
    <div className="card-style">
      {children}
    </div>
  );
}

function App() {
  return (
    <Card>
      <h2>Title</h2>
      <p>This content is passed as children!</p>
    </Card>
  );
}
```

---

## 🔴 Quiz: React Props

**Q1: What are "Props" short for?**
A) Propositions
B) Properties
C) Proper

**Q2: Can a component change its own props?**
A) Yes, freely.
B) No, props are read-only.
C) Only if declared as `let`.

**Q3: How do you pass a number `10` as a prop named `count`?**
A) `count="10"`
B) `count={10}`
C) `count=(10)`

**Q4: What is `props.children` used for?**
A) To pass data to child components only.
B) To access content nested between the component's tags.
C) To define the inheritance of the component.

<details>
<summary><strong>See Answers</strong></summary>

**A1: B.** Props stands for Properties.
**A2: B.** Props are immutable (read-only) within the receiving component.
**A3: B.** Numbers (and other non-string types) must be wrapped in curly braces `{}`.
**A4: B.** `children` captures everything inside `<Component>...</Component>`.
</details>
