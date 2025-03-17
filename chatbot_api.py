import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://shashwat-personal-chatbot.vercel.app/"],  # Replace "*" with your Vercel frontend URL for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

# Check if API key exists
if not API_KEY:
    raise ValueError("⚠️ API Key for Gemini is missing. Set GEMINI_API_KEY in the environment.")

# Configure Gemini API
genai.configure(api_key=API_KEY)

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (for frontend requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model
class ChatRequest(BaseModel):
    message: str

# Define chatbot response function
@app.post("/chat/")
def chat_with_gemini(request: ChatRequest):
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(request.message)

        response_text = response.text if hasattr(response, "text") else None

        if not response_text:
            raise HTTPException(status_code=500, detail="Gemini API did not return a response.")

        return {"response": response_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# Health Check Endpoint
@app.get("/")
def read_root():
    return {"message": "🚀 Chatbot API is running!"}

#uvicorn chatbot_api:app --host 0.0.0.0 --port 8000
