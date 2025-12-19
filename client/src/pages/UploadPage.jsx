import { useNavigate } from "react-router-dom";

function UploadPage() {
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("model", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    // 🔥 Redirect to model page
    navigate(`/model/${data.id}`);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Upload 3D Model</h1>
      <input type="file" accept=".glb,.gltf" onChange={handleUpload} />
    </div>
  );
}

export default UploadPage;
