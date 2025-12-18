import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import QRCode from "react-qr-code";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={0.5} />;
}

function App() {
  const [modelURL, setModelURL] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setModelURL(url);
      setShowQR(false);
    }
  };

  const handleViewInRoom = () => {
    setShowQR(true);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>3D Model Viewer</h1>
      <input type="file" accept=".glb,.gltf" onChange={handleUpload} />
      {modelURL && (
        <>
          <div style={{ width: "800px", height: "600px", margin: "20px auto" }}>
            <Canvas>
              <ambientLight intensity={0.5} />
              <directionalLight position={[0, 5, 5]} />
              <Model url={modelURL} />
              <OrbitControls />
            </Canvas>
          </div>
          <button onClick={handleViewInRoom}>View in Your Room</button>
        </>
      )}
      {showQR && (
        <div style={{ marginTop: "20px" }}>
          <p>Scan this QR code to view the model in AR:</p>
          <QRCode
            value={modelURL}
            size={256}
            style={{ margin: "0 auto" }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
