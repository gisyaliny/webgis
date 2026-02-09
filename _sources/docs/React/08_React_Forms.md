# React Module 8: React Forms

## 1. Controlled Components
In HTML, form elements like `<input>`, `<textarea>`, and `<select>` typically maintain their own state. In React, mutable state is usually kept in the state property of components, and only updated with `setState`.

We combine the two by making the React state the "single source of truth."

### Basic Example (Input)
```javascript
function MyForm() {
  const [name, setName] = React.useState("");

  return (
    <form>
      <label>Enter your name:
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
    </form>
  );
}
```

---

## 2. Handling Multiple Inputs
Instead of creating a separate state/handler for every field, you can use a single state object and a generic handler.

```javascript
function RegisterForm() {
  const [inputs, setInputs] = React.useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // Update only the changed field, keeping the rest
    setInputs(values => ({...values, [name]: value}));
  };

  return (
    <form>
      <input 
        type="text" 
        name="username" 
        value={inputs.username || ""} 
        onChange={handleChange} 
      />
      <input 
        type="number" 
        name="age" 
        value={inputs.age || ""} 
        onChange={handleChange} 
      />
    </form>
  );
}
```
*Note: We use Computed Property Names `[name]` to dynamically update the object key.*

---

## 3. Textarea and Select
React standardizes `<textarea>` and `<select>` to work just like single-line inputs: they both accept a `value` attribute.

### Textarea
```javascript
// HTML: <textarea>Content</textarea>
// React:
<textarea value={myText} onChange={handleChange} />
```

### Select (Dropdown)
React uses `value` on the root `<select>` tag instead of `selected` on `<option>`.

```javascript
const [myCar, setMyCar] = React.useState("Ford");

<select value={myCar} onChange={handleChange}>
  <option value="Ford">Ford</option>
  <option value="Volvo">Volvo</option>
  <option value="Fiat">Fiat</option>
</select>
```

---

## 4. Checkboxes and Radio Buttons
For these inputs, you typically track `checked` instead of `value`.

### Checkbox
```javascript
const [isChecked, setIsChecked] = React.useState(false);

<input 
  type="checkbox" 
  checked={isChecked} 
  onChange={(e) => setIsChecked(e.target.checked)} 
/>
```

---

## 5. Submitting Forms
ALWAYS allow React to control the submit action.

```javascript
function MyForm() {
  const [name, setName] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default browser reload
    alert(`The name you entered was: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
}
```

---

## 🔴 Quiz: React Forms

**Q1: In a "controlled component", where is the data stored?**
A) In the DOM.
B) In the React component's state.
C) In a global variable.

**Q2: How do you handle multiple inputs efficiently?**
A) Create a unique state variable for every input.
B) Use `document.getElementById` to read values.
C) Use a single state object and dynamic property names (e.g., `[e.target.name]`).

**Q3: How does React handle `<textarea>` differently from HTML?**
A) It uses a `value` attribute instead of child text.
B) It triggers `onBlur` instead of `onChange`.
C) It is self-closing.

**Q4: Which attribute is used to set the selected option in a React `<select>` tag?**
A) `selected` on the `<option>` tag.
B) `value` on the `<select>` tag.
C) `checked` on the `<select>` tag.

**Q5: How should you handle form submission in React?**
A) Use `action="/submit"` in the form tag.
B) Use an `onClick` handler on the submit button.
C) Use an `onSubmit` handler on the form tag and call `e.preventDefault()`.

<details>
<summary><strong>See Answers</strong></summary>

**A1: B.** 
React state acts as the "single source of truth."

**A2: C.** 
This pattern scales better than creating dozens of state variables.

**A3: A.** 
React unifies the interface so `<textarea>` works just like `<input type="text">`.

**A4: B.** 
React uses a root `value` attribute on the select to control the selected option.

**A5: C.** 
This allows you to validate data or send it via AJAX/Fetch before the page reloads.
</details>
