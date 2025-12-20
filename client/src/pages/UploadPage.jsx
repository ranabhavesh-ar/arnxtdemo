import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function UploadPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("model", file);

    const res = await fetch("https://arnxtdemo.onrender.com/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

  
    fileInputRef.current.value = "";


    navigate(`/model/${data.id}`);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Upload 3D Model</h1>
      <input
        type="file"
        accept=".glb,.gltf"
        onChange={handleUpload}
        ref={fileInputRef}
      />
    </div>
  );
}

export default UploadPage;
