import { useState } from "react";

function ResumeUploader({ setResumeText }) {
  const [fileName, setFileName] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    console.log("Uploading file:", file.name, "Size:", file.size);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/extract-text", {
        method: "POST",
        body: formData,
      });

      console.log("Upload response status:", res.status);
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Upload API Error:", errorData);
        alert(`Failed to extract text: ${errorData.detail || 'Unknown error'}`);
        return;
      }

      const data = await res.json();
      console.log("Extracted text length:", data.resume_text?.length || 0);
      
      if (data.resume_text) {
        setResumeText(data.resume_text);
        console.log("Resume text set successfully");
      } else {
        alert("Failed to extract text from resume");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading file: " + err.message);
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">Upload Resume (PDF/DOCX):</label>
      <input type="file" accept=".pdf,.docx" onChange={handleUpload} />
      {fileName && <p className="text-sm text-gray-500 mt-1">Uploaded: {fileName}</p>}
    </div>
  );
}

export default ResumeUploader;
