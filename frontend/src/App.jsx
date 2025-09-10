import { useState } from "react";
import ResumeUploader from "./components/ResumeUploader";
import JobDescriptionInput from "./components/JobDescriptionInput";
import CoverLetterOutput from "./components/CoverLetterOutput";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCoverLetter = async () => {
    setLoading(true);
    try {
      console.log("Sending request with:", { resumeText: resumeText.substring(0, 100) + "...", jobDescription: jobDescription.substring(0, 100) + "..." });
      
      const res = await fetch("http://localhost:8000/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_text: resumeText, job_description: jobDescription }),
      });

      console.log("Response status:", res.status);
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        alert(`Error generating cover letter: ${errorData.detail || 'Unknown error'}`);
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);
      setCoverLetter(data.cover_letter);
    } catch (err) {
      console.error("Network error:", err);
      alert("Error generating cover letter: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Smart Resume & Cover Letter Generator
          </h1>
          <p className="text-gray-600">
            Upload your resume and job description to generate a tailored cover letter
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Input Information</h2>
              
              <ResumeUploader setResumeText={setResumeText} />
              <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />

              <button
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
                onClick={generateCoverLetter}
                disabled={loading || !resumeText || !jobDescription}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Cover Letter...
                  </span>
                ) : (
                  "Generate Cover Letter"
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Output Section */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <CoverLetterOutput coverLetter={coverLetter} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
