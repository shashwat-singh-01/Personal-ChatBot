import google.generativeai as genai
from fastapi import FastAPI
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

# Define request model
class ChatRequest(BaseModel):
    message: str

# Define chatbot response function
@app.post("/chat/")
def chat_with_gemini(request: ChatRequest):
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(request.message)
    return {"response": response.text}

# Run FastAPI server with:
# uvicorn chatbot_api:app --host 0.0.0.0 --port 8000 --reload
