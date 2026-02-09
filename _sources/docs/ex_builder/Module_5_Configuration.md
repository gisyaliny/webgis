# Module 5: Making it Reusable (Configuration)

> **Goal**: Stop hardcoding Layer IDs and let the user pick them in the Builder interface.

Hardcoding IDs like `["layer-A"]` is bad practice. If you delete the layer from the webmap, your widget breaks. We want the user to pick the layer from a list in the Experience Builder settings panel.

---

## 1. The Config Interface (`config.ts`)

First, we tell TypeScript what our settings look like. This usually lives in `src/config.ts`.

```typescript
import { ImmutableObject } from 'jimu-core';

export interface Config {
  layerIds: string[];         // User can pick multiple layers
  buttonText: string;         // User can change "Focus" to "Show Water"
  activeColor: string;        // User can pick the color
  isDefaultActive: boolean;   // Should it be on by default?
}

export type IMConfig = ImmutableObject<Config>;
```
*   **ImmutableObject**: ExB uses a special data type that cannot be changed directly. This makes the app safer.

---

## 2. Using Config in Runtime (`widget.tsx`)

In your widget code, you access these settings via `props.config`.

```tsx
const Widget = (props: AllWidgetProps<IMConfig>) => {
  
  // Reading the text
  const label = props.config.buttonText || "Default Button";
  
  // Reading the color
  const style = {
      backgroundColor: props.config.activeColor
  };

  return <Button style={style}>{label}</Button>
}
```

---

## 3. The Settings Panel (`src/setting/setting.tsx`)

This is a totally separate React component that only shows up in the Builder side.

### Basic Structure
```tsx
import { React } from 'jimu-core';
import { AllWidgetSettingProps } from 'jimu-for-builder';
import { JimuMapViewSelector } from 'jimu-ui/advanced/setting-components'; // The Magic Component

const Setting = (props: AllWidgetSettingProps<IMConfig>) => {

  const onMapSelected = (useMapWidgetIds: string[]) => {
    // Save the user's choice to the widget config
    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: useMapWidgetIds
    });
  };

  return (
    <div className="widget-setting-demo">
      <p>Select Map</p>
      <JimuMapViewSelector 
        onSelect={onMapSelected}
        useMapWidgetIds={props.useMapWidgetIds}
      />
    </div>
  );
};
```

### Key Concept: `props.onSettingChange`
This is how you save data. You don't "set state" here; you tell the main ExB app "The user changed setting X to Y". ExB saves it and re-renders your widget automatically.

---

## 🎓 Quiz: Module 5

**Q1: Where do you define the *structure* or *types* of your widget's settings?**
A) `manifest.json`
B) `config.ts` (as an Interface)
C) `widget.tsx`

**Q2: How do you access the user's chosen settings inside your main widget code?**
A) `props.settings`
B) `window.config`
C) `props.config`

**Q3: What function do you call in the Settings panel to save a change?**
A) `props.onSettingChange`
B) `props.save()`
C) `props.updateConfig()`

---

### Reference Answers
*   **Q1: B**. Defining an Interface in `config.ts` ensures both your Widget and your Settings panel agree on what data exists.
*   **Q2: C**. `props.config` is the standard prop name.
*   **Q3: A**. This is the specific Jimu function to broadcast updates to the framework.
