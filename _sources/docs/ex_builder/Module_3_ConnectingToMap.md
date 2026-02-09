# Module 3: Connecting to the Map (The Core)

> **Goal**: Connect your widget to an ArcGIS Map. This is the foundation of your `layer-focus-button`.

A widget by itself is blind. To make it "see" the map, we need to connect it. This is the most confusing part for beginners because it involves a specific component called `JimuMapViewComponent`.

---

## 1. The JimuMapViewComponent

Think of this component as a visible "plug" that goes into the map. You don't see it on the screen, but it sits in your widget's code and listens to the map.

### Import It
```tsx
import { JimuMapViewComponent, type JimuMapView } from 'jimu-arcgis';
```

### Use It in JSX
You usually place this at the top of your return statement.

```tsx
return (
  <div className="my-widget">
    <JimuMapViewComponent
      useMapWidgetId={props.useMapWidgetIds?.[0]} 
      onActiveViewChange={activeViewChangeHandler}
    />
    <Button>My Button</Button>
  </div>
);
```

**Breakdown:**
*   `useMapWidgetId`: This asks "Which map?". When you configure the widget, you pick "Map 1". That ID gets passed here.
*   `onActiveViewChange`: This is the phone line. When the map connects, it calls this function and gives you the `JimuMapView` object.

---

## 2. Capturing the Active View

We need to save that `JimuMapView` object so we can use it later (like when a button is clicked).

```tsx
const [jimuMapView, setJimuMapView] = React.useState<JimuMapView>(null);

const activeViewChangeHandler = (jmv: JimuMapView) => {
  if (jmv) {
    setJimuMapView(jmv);
  }
};
```

**Why do we need minimal `jimuMapView`?**
Because `jimuMapView` contains everything:
*   `jimuMapView.view`: The actual ArcGIS JS API MapView (camera, zoom, center).
*   `jimuMapView.jimuLayerViews`: The list of layers we want to toggle.

---

## 3. Practical Example: Zoom Button

Let's make a button that zooms the map when clicked.

```tsx
const HelperWidget = (props) => {
  const [jimuMapView, setJimuMapView] = useState<JimuMapView>();

  const activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) setJimuMapView(jmv);
  };

  const handleZoom = () => {
    if (jimuMapView) {
        // Access the ArcGIS JS API View directly
        jimuMapView.view.goTo({ zoom: 10 }); 
    }
  };

  return (
    <div>
      {props.useMapWidgetIds?.length > 0 && (
        <JimuMapViewComponent
          useMapWidgetId={props.useMapWidgetIds[0]}
          onActiveViewChange={activeViewChangeHandler}
        />
      )}
      <Button onClick={handleZoom}>Zoom to Level 10</Button>
    </div>
  );
};
```

---

## 🎓 Quiz: Module 3

**Q1: What is the purpose of `JimuMapViewComponent`?**
A) To display a second map inside your widget.
B) To act as a bridge/listener between your widget and the main Map Widget.
C) To load Esri basemaps.

**Q2: Where does `props.useMapWidgetIds` come from?**
A) You write it manually in code.
B) It is automatically passed when the user selects a Map in the widget settings panel.
C) It comes from the `manifest.json`.

**Q3: If you want to use standard ArcGIS JS API functions like `view.goTo()`, what object do you need first?**
A) `manifest.json`
B) `JimuMapView`
C) `config.json`

---

### Reference Answers
*   **Q1: B**. It listens for the map instance and passes it to your code.
*   **Q2: B**. This requires your widget to have a setting page with a Map Selector (covered in Module 5), but `props` is how that selection reaches your code.
*   **Q3: B**. The `JimuMapView` wrapper gives you access to the underlying `view` property.
