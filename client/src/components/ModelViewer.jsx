import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function GLTFModel({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={0.5} />;
}

function ModelViewer({ url }) {
  if (!url) {
    return <p>Model URL not available</p>;
  }

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} />
      <GLTFModel url={url} />
      <OrbitControls />
    </Canvas>
  );
}


export default ModelViewer;
