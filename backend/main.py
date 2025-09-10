from fastapi import FastAPI,UploadFile,Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import ResumeRequest
from utils import extract_text_from_docx,extract_text_from_pdf
from pydantic import BaseModel
import google.generativeai as genai
import tempfile

app = FastAPI()

genai.configure(api_key="AIzaSyBnOYhoJis2OhQWfI7c89VvCKj5tDcv-Fo")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

model = genai.GenerativeModel("gemini-1.5-flash")

@app.post('/extract-text')
async def extrac_text(file: UploadFile):
    try:
        if file is None or not file.filename:
            raise HTTPException(status_code=400, detail="Error uploading file")

        with tempfile.NamedTemporaryFile(delete=False) as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        if file.filename.endswith('.pdf'):
            with open(tmp_path, 'rb') as f:
                text = extract_text_from_pdf(f)
        elif file.filename.endswith('.docx'):
            text = extract_text_from_docx(tmp_path)
        else:
            raise HTTPException(status_code=400, detail="Unsupported File Format")

        return {"resume_text": text}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=400, detail="Error uploading file")

@app.post("/generate-cover-letter")
async def generate_cover_letter(data: ResumeRequest):
    """
    Generate a tailored cover letter using Gemini.
    Takes resume text + job description and produces
    a professional, customized cover letter.
    """
    import logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    try:
        logger.info(f"Generating cover letter for resume length: {len(data.resume_text)}, job desc: {data.job_description}")
        
        prompt = f"""
        You are an expert career coach and recruiter.

        Task:
        Write a professional cover letter tailored to the following job description,
        using the candidates resume information. The cover letter should highlight
        the most relevant experiences, skills, and achievements that match the role.

        --- Candidate Resume ---
        {data.resume_text}

        --- Job Description ---
        {data.job_description}

        Guidelines for the Cover Letter:
        - Professional and concise (max 4 paragraphs).
        - Formal tone, but natural and confident.
        - Mention 2-3 specific skills/experiences that fit the job.
        - Avoid repeating the resume verbatim.
        - End with a polite call to action for an interview.
        - Use clear structure:
            1. Greeting
            2. Introduction (why candidate is applying)
            3. Body (skills + experiences tailored to job)
            4. Conclusion (closing and availability)
        - Do not include placeholder names like "Company XYZ" or "Hiring Manager";
          instead, write general but adaptable text (e.g., "Dear Hiring Manager").

        Now generate the complete cover letter.
        """

        logger.info("Calling Gemini API...")
        response = model.generate_content(prompt)
        logger.info(f"Gemini response received: {response.text[:100] if response.text else 'No text'}...")
        
        return {
            "cover_letter": response.text.strip() if response.text else "No response generated"
        }
    except Exception as e:
        logger.error(f"Error generating cover letter: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating cover letter: {str(e)}")
