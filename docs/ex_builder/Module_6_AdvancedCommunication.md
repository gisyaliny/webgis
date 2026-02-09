# Module 6: Advanced Communications (Bonus)

> **Goal**: How widgets talk to each other without a central brain.

You might notice your `layer-focus-button` has some "magic" code involving `LAYER_FOCUS_MESSAGE`. This allows multiple buttons to coordinate.

**Scenario**: You have 3 buttons: "Water", "land", "Air".
*   If I click "Water", the "Water" layer turns ON.
*   But "Land" and "Air" should also know to turn OFF their active state (make their buttons grey).

---

## 1. The Problem: Isolation
Widget A doesn't know Widget B exists. They are separate React components.

## 2. The Solution: Global Events
We use the browser window as a town square. Widget A shouts "I WAS CLICKED!" and Widget B listens.

### The Shout (Dispatch)
```typescript
const LAYER_FOCUS_MESSAGE = 'LAYER_FOCUS_ACTIVATED';

const handleClick = () => {
    // 1. Update my own state
    setIsActive(true);

    // 2. Shout to the world
    const event = new CustomEvent(LAYER_FOCUS_MESSAGE, {
        detail: { widgetId: props.id } // "I am widget #123"
    });
    window.dispatchEvent(event);
}
```

### The Listener (useEffect)
```typescript
useEffect(() => {
    
    // The handler function
    const handleCustomEvent = (e: CustomEvent) => {
        // "Wait, someone shouted... was it me?"
        if (e.detail.widgetId !== props.id) {
            // "It wasn't me! It was someone else."
            // "I should step down."
            setIsActive(false);
        }
    };

    // Start listening
    window.addEventListener(LAYER_FOCUS_MESSAGE, handleCustomEvent);

    // CLEANUP: Stop listening when this widget is destroyed
    return () => {
        window.removeEventListener(LAYER_FOCUS_MESSAGE, handleCustomEvent);
    };

}, [props.id]);
```

**Why Cleanup (`return () => ...`)?**
If you don't remove the listener, every time you open/close the page, you create a *new* listener. Eventually, you'll have 100 ghosts listening to the same event, crashing the browser. This is a "Memory Leak".

---

## 3. Storage Events (Browser Tabs)
Your code also uses `window.addEventListener('storage')`.
This is even cooler: it works across **Browser Tabs**. If you have the same map open in two tabs, clicking a button in Tab 1 can actually update Tab 2!
(Note: This is rarely needed for standard widgets, but `layer-focus-button` includes it for robustness).

---

## 🎓 Quiz: Module 6

**Q1: Why can't Widget A just call `WidgetB.turnOff()`?**
A) Because they are in different files.
B) Because React Components are isolated and don't have direct references to each other by default.
C) Because TypeScript forbids it.

**Q2: What is the `CustomEvent` used for?**
A) Creating custom map layers.
B) Broadcasting a message to the entire browser window so other widgets can hear it.
C) Saving config data.

**Q3: What happens if you forget the "cleanup" function in `useEffect`?**
A) Nothing.
B) The widget won't work.
C) You create "Zombie" listeners (Memory Leaks) that keep running even after the widget is gone.

---

### Reference Answers
*   **Q1: B**. In component-based architecture, siblings don't know about siblings. They communicate via parents or global events.
*   **Q2: B**. It acts as a global radio broadcast.
*   **Q3: C**. This leads to performance issues and weird bugs (like an event firing 10 times for one click).
