# Module 2: Hello Experience Builder

> **Goal**: Understand the file structure and create your first visible widget.

Now that we speak the language, let's look at the engine. An Experience Builder widget isn't just one file; it's a small folder of files working together.

---

## 1. The Anatomy of a Widget

Every widget needs at least these files:

```text
my-widget/
├── manifest.json       <-- The ID Card
├── config.json         <-- The Default Settings
└── src/
    ├── runtime/
    │   └── widget.tsx  <-- The Brain (React Code)
    └── setting/
        └── setting.tsx <-- The Settings Panel (Optional but good)
```

### `manifest.json`
This tells ExB "I exist." It defines your widget's name, version, and what other libraries it needs (like `jimu-arcgis`).
**Critical field**: `dependency`. If you use maps, you usually need `"jimu-arcgis"`.

### `src/runtime/widget.tsx`
This is the entry point. ExB looks for a default exporT component here to put on the page.

---

## 2. Creating Your First Widget ("Simple Button")

Let's walk through creating a widget from scratch.

### Step 1: The Folder
Create a folder named `simple-button` in your `client/your-extensions/widgets/` directory.

### Step 2: The Manifest
Create `manifest.json` inside that folder:

```json
{
  "name": "simple-button",
  "label": "My First Button",
  "type": "widget",
  "version": "1.0.0",
  "exbVersion": "1.16.0",
  "author": "You",
  "description": "A simple button widget",
  "license": "Apache-2.0",
  "properties": {},
  "translatedLocales": ["en"],
  "defaultSize": { "width": 100, "height": 40 }
}
```

### Step 3: The Code
Create the folder path `src/runtime/` and then `widget.tsx`:

```tsx
import { React, type AllWidgetProps } from 'jimu-core';
import { Button } from 'jimu-ui'; // Using ExB's UI library

const Widget = (props: AllWidgetProps<any>) => {
  
  const handleClick = () => {
    console.log("You clicked the button!");
    alert("Hello from Experience Builder!");
  }

  return (
    <div className="widget-demo jimu-widget p-2">
      <p>My Custom Widget</p>
      <Button type="primary" onClick={handleClick}>
        Click Me
      </Button>
    </div>
  );
}

export default Widget;
```

### Step 4: Restart
**Important**: Whenever you add a *new* widget folder, you must restart your `npm start` server for ExB to recognize it. After that, you can just save files to hot-reload.

---

## 3. Using `jimu-ui`
You noticed we imported `Button` from `jimu-ui`.
ExB comes with a massive library of pre-built components (Buttons, Dropdowns, Inputs) that look like ArcGIS.
**Tip**: Always try to use `jimu-ui` components instead of standard HTML tags (`<button>`) to ensure your widget looks consistent with the rest of the app themes.

---

## 🎓 Quiz: Module 2

**Q1: Which file is absolutely mandatory for ExB to recognize your widget folder?**
A) style.css
B) widget.tsx
C) manifest.json

**Q2: If you create a new widget folder but it doesn't show up in the builder, what should you do?**
A) Restart the computer.
B) Restart the `npm start` watcher process.
C) Delete the folder and try again.

**Q3: Why use `Button` from `jimu-ui` instead of a regular HTML `<button>`?**
A) It handles themes and styling automatically to match ArcGIS.
B) HTML buttons don't work in React.
C) It is the only way to make a button clickable.

---

### Reference Answers
*   **Q1: C**. `manifest.json` is the ID card. Without it, the system ignores the folder.
*   **Q2: B**. The heavy "webpack" process needs to scan for new folders on startup.
*   **Q3: A**. `jimu-ui` components are theme-aware. If the user changes the app theme to "Dark Mode", your button automatically updates. HTML buttons would require you to write all that CSS yourself.
