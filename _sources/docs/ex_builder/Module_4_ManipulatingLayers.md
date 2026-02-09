# Module 4: Manipulating Layers (Replicating Your Widgets)

> **Goal**: Programmatically turn layers on and off. This is the exact logic inside your `layer-toggle-button` vs `layer-focus-button`.

This is the "meat" of your custom widgets. Once you have the `jimuMapView` (from Module 3), you can start controlling layers.

---

## 1. Accessing Layers (`jimuLayerViews`)

The `jimuMapView` object has a property called `jimuLayerViews`. This is a dictionary of all the layers the map knows about.

**Format**:
```typescript
{
    "layer-123": JimuLayerView,
    "layer-456": JimuLayerView,
    // ...
}
```

To loop through them, we use a standard `for...in` loop:

```typescript
const jimuLayerViews = jimuMapView.jimuLayerViews;

for (const viewId in jimuLayerViews) {
    const layerView = jimuLayerViews[viewId];
    console.log("Found layer: " + layerView.layer.title);
}
```

---

## 2. The `layer-focus-button` Logic

Your "Focus" button logic is: **"Turn specific layers ON, and everyone else OFF"**.

Let's break down the code you already have:

```typescript
const handleFocusClick = () => {
    // 1. Get the list of IDs we want to see (e.g., from config)
    const targetLayerIds = ["layer-A", "layer-B"]; 

    // 2. Loop through every layer in the map
    const allViews = jimuMapView.jimuLayerViews;
    
    for (const id in allViews) {
        const jimuLayerView = allViews[id];
        
        // Safety check: Does it have an actual layer?
        if (jimuLayerView && jimuLayerView.layer) {
            
            // 3. The Logic
            if (targetLayerIds.includes(id)) {
                // It is one of our targets -> SHOW IT
                jimuLayerView.layer.visible = true; 
            } else {
                // It is NOT a target -> HIDE IT
                jimuLayerView.layer.visible = false;
            }
        }
    }
}
```

---

## 3. The `layer-toggle-button` Logic

Your "Toggle" button logic is different: **"Flip the status for specific layers, but force others OFF"**.

```typescript
const handleToggleClick = () => {
    const targetLayerIds = ["layer-A"];
    
    // 1. Determine direction (Should we turn them ON or OFF?)
    // Check the transparency/visibility of the first target layer to decide
    const firstTarget = jimuMapView.jimuLayerViews[targetLayerIds[0]];
    const shouldTurnOn = !firstTarget.layer.visible; // Flip it

    // 2. Loop and Apply
    for (const id in jimuMapView.jimuLayerViews) {
        const jimuLayerView = jimuMapView.jimuLayerViews[id];
        
        if (targetLayerIds.includes(id)) {
            // Target: Apply the new "flip" state
            jimuLayerView.layer.visible = shouldTurnOn;
        } else {
            // Non-Target: Always hide (Focus behavior)
            jimuLayerView.layer.visible = false;
        }
    }
}
```

---

## 4. Key Property: `layer.visible`

The ArcGIS JS API is very simple here.
*   `layer.visible = true` (Shows)
*   `layer.visible = false` (Hides)

That's it. You don't need to call `.refresh()` or `.redraw()`. The map reacts immediately.

---

## 🎓 Quiz: Module 4

**Q1: How do you access the list of layers from the JimuMapView?**
A) `jimuMapView.layers`
B) `jimuMapView.jimuLayerViews`
C) `window.layers`

**Q2: What is the correct way to hide a layer?**
A) `layer.opacity = 0`
B) `layer.hide()`
C) `layer.visible = false`

**Q3: In the Focus Button logic, what happens to layers that are NOT in your "target" list?**
A) Nothing, they stay as they are.
B) They are turned off (`visible = false`).
C) They are deleted from the map.

---

### Reference Answers
*   **Q1: B**. ExB wraps layers in `JimuLayerView` objects, accessible via that dictionary.
*   **Q2: C**. Setting the boolean `visible` property is the standard way.
*   **Q3: B**. The specific goal of a "Focus" button is to isolate content, so it actively hides non-target layers.
