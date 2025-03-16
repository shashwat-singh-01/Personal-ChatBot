import google.generativeai as genai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini API
genai.configure(api_key=API_KEY)

# Initialize FastAPI app
app = FastAPI()

# Enable CORS to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin (change to frontend URL in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define request model
class ChatRequest(BaseModel):
    message: str

# Define chatbot response function
@app.post("/chat/")
def chat_with_gemini(request: ChatRequest):
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(request.message)
    return {"response": response.text}

# Run FastAPI server:
# uvicorn chatbot_api:app --host 0.0.0.0 --port 8000 --reload
