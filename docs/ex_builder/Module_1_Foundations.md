# Module 1: The Foundations (Prerequisites)

> **Goal**: Understand the language (TypeScript) and the engine (React) before driving the car (Experience Builder).

If you are new to Experience Builder (ExB), you are essentially learning three things at once:
1.  **TypeScript**: The language we write in.
2.  **React**: The library that builds the User Interface (UI).
3.  **Jimu**: The specific framework that powers ExB.

This module focuses on the first two. You cannot build a solid house (Widget) without good bricks (TypeScript) and mortar (React).

---

## 1. TypeScript Basics for ExB

TypeScript is just JavaScript with **Types**. It stops you from making silly mistakes, like trying to multiply "hello" by 5.

### Key Concept: Types
In normal JavaScript, variables can be anything. In TypeScript, we tell the computer what they are.

```typescript
// JavaScript
let name = "John";
name = 5; // Valid in JS, but might crash your app later

// TypeScript
let name: string = "John";
name = 5; // Error! The computer catches this immediately.
```

**Common Types in ExB:**
*   `string`: Text ("Hello")
*   `boolean`: True/False (`isActive`, `isVisible`)
*   `number`: Math (1, 3.14)
*   `any`: The "I don't care" type (Try to avoid this!)

### Key Concept: Interfaces
Interfaces are blueprints for objects. They are CRITICAL in ExB, especially for `config.json`.

**Example:**
Imagine you have a car.
```typescript
interface Car {
    make: string;
    model: string;
    year: number;
    isElectric: boolean;
}

const myCar: Car = {
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    isElectric: true
};
```
If you forget `year`, TypeScript will yell at you. This ensures your code always has the data it expects.

### Key Concept: Generics (`<Type>`)
You will see `< >` arrows everywhere in ExB code. This is a **Generic**. It tells a function exactly what type of data it's working with.

*   `Array<string>`: A list of ONLY text strings.
*   `useState<boolean>`: A state variable that can ONLY be true/false.

---




---

## 🎓 Quiz: Module 1

**Q1: What is the benefit of using an Interface?**
A) It makes the code run faster.
B) It defines the required structure of an object so you don't miss properties.
C) It converts TypeScript to Python.

**Q2: In `const [active, setActive] = useState(false)`, what does `active` represent?**
A) The function to change the value.
B) The current value (true or false).
C) The initial value only.

**Q3: When does code inside `useEffect(() => { ... }, [taskId])` run?**
A) Only once when the app starts.
B) Every millisecond.
C) Whenever the `taskId` variable changes value.

---

### Reference Answers
*   **Q1: B**. Interfaces act as a contract, ensuring your data (like `config`) matches what your code expects.
*   **Q2: B**. The first item in the array is always the *current* value. The second (`setActive`) is the tool to change it.
*   **Q3: C**. The array `[taskId]` tells React "Only run this code if `taskId` is different from the last render."
