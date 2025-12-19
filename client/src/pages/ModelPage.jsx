import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import ModelViewer from "../components/ModelViewer";

function ModelPage() {
  const { id } = useParams();
  const [model, setModel] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/model/${id}`)
      .then((res) => res.json())
      .then((data) => setModel(data));
  }, [id]);

  if (!model) return <p>Loading...</p>;

  const pageURL = `${window.location.origin}/model/${id}`;

  const openAR = () => {
    const ua = navigator.userAgent;
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    // iOS → AR Quick Look
    if (isIOS && model.usdzUrl) {
      window.location.href = model.usdzUrl;
      return;
    }

    // Android → Scene Viewer
    if (isAndroid) {
      const sceneViewerUrl = `
intent://arvr.google.com/scene-viewer/1.0
?file=${encodeURIComponent(model.glbUrl)}
&mode=ar_only
#Intent;
scheme=https;
package=com.google.android.googlequicksearchbox;
end;
`;
      window.location.href = sceneViewerUrl;
      return;
    }

    alert("Open this page on a mobile device to view in AR");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>3D Model Viewer</h1>

      {/* Desktop / fallback viewer */}
      <ModelViewer url={model.glbUrl || model.url} />


      {/* AR Button */}
      <button
        onClick={openAR}
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        View in your room
      </button>

      {/* QR Code */}
      <div style={{ marginTop: "20px" }}>
        <p>Scan on your phone to view in AR</p>
        <QRCode value={pageURL} size={256} />
      </div>
    </div>
  );
}

export default ModelPage;
