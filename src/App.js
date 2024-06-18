import { Canvas } from "@react-three/fiber";
import "./App.css";
import Globe from "./components/globe";
import { Suspense, useState } from "react";

function App() {
  const [popup, setPopup] = useState({
    visible: false,
    label: "",
    position: { x: 0, y: 0, z: 0 },
  });

  return (
    <div className="canvas-container">
      <Canvas>
        <Suspense fallback={null}>
          <Globe popup={popup} setPopup={setPopup}/>
        </Suspense>
      </Canvas>
      {popup.visible && (
        <div
          style={{
            position: "absolute",
            top: `${popup.position.y}px`,
            left: `${popup.position.x}px`,

            
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            pointerEvents: "none",
          }}
        >
          {popup.label}
        </div>
      )}
    </div>
  );
}

export default App;
