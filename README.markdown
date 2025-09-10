# Smart Resume & Cover Letter Generator

A full-stack web application that generates professional, tailored cover letters using AI. Upload a resume (PDF/DOCX), provide a job description, and let the Google Gemini API create a customized cover letter.

## Features
- Upload PDF or DOCX resumes for automatic text extraction.
- Input job descriptions via a text area.
- AI-powered cover letter generation using Google Gemini.
- Clean and minimal user interface built with React and Tailwind CSS.
- Fast and efficient backend powered by FastAPI.
- Separate API module for streamlined frontend-backend communication.

## Tech Stack
### Frontend
- React (Vite)
- Tailwind CSS
- Fetch API (api.js)

### Backend
- FastAPI
- PyPDF2 (for PDF text extraction)
- python-docx (for DOCX text extraction)
- google-generativeai (Google Gemini API)

## Project Structure
```
.
├── backend/
│   ├── main.py          # FastAPI app and routes
│   ├── models.py        # Pydantic models for data validation
│   ├── utils.py         # Utilities for PDF/DOCX text extraction
├── frontend/
│   ├── src/
│   │   ├── api.js       # API calls to backend
│   │   ├── App.jsx      # Main React application
│   │   ├── main.jsx     # React entry point
│   │   └── components/  # Reusable UI components
│   │       ├── ResumeUploader.jsx
│   │       ├── JobDescriptionInput.jsx
│   │       └── CoverLetterOutput.jsx
```

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/siddharth-sekhar/AI_CoverLetter_Generator.git
cd AI_CoverLetter_Generator
```

### 2. Backend Setup (FastAPI)
Navigate to the backend directory and set up a virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate     # On Windows
```

Install dependencies:
```bash
pip install fastapi uvicorn pydantic PyPDF2 python-docx google-generativeai
```

Run the backend:
```bash
uvicorn main:app --reload --port 8000
```

The backend will be available at `http://localhost:8000`.

### 3. Frontend Setup (React + Vite)
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

Run the frontend:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### 4. Usage
- Open the frontend in your browser (`http://localhost:5173`).
- Upload a resume in PDF or DOCX format.
- Paste the job description into the text area.
- Click "Generate Cover Letter" to create a tailored cover letter.
- Copy or download the generated cover letter.

## Configuration
### Backend
In `backend/main.py`, configure CORS to allow requests from the frontend:
```python
allow_origins=["http://localhost:5173"]
```

Replace the Gemini API key in `backend/main.py`:
```python
genai.configure(api_key="YOUR_GEMINI_API_KEY")
```
Obtain your API key from [Google AI Studio](https://aistudio.google.com/).

## API Endpoints
The backend provides the following endpoints for testing without the frontend UI:

### 1. Extract Text from Resume
Extracts text from an uploaded PDF or DOCX resume.

**Request**:
```bash
curl -X POST "http://localhost:8000/extract-text" \
  -F "file=@/path/to/resume.pdf"
```

**Response**:
```json
{
  "extracted_text": "Resume content..."
}
```

### 2. Generate Cover Letter
Generates a cover letter based on resume text and job description.

**Request**:
```bash
curl -X POST "http://localhost:8000/generate-cover-letter" \
  -H "Content-Type: application/json" \
  -d '{
    "resume_text": "Extracted resume content...",
    "job_description": "Job description..."
  }'
```

**Response**:
```json
{
  "cover_letter": "Dear Hiring Manager,\n\n..."
}
```

## Future Improvements
- Add an endpoint to improve resume bullet points.
- Support exporting cover letters as PDF or DOCX.
- Offer multiple tone styles (e.g., formal, friendly, persuasive).
- Implement user authentication and history saving.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, reach out via [GitHub Issues](https://github.com/siddharth-sekhar/AI_CoverLetter_Generator/issues) or connect with me on [LinkedIn](https://www.linkedin.com/in/b-siddharth-sekhar-80b979326).

---

Developed by B Siddharth Sekhar, a final-year engineering student at IIITDM Kancheepuram.