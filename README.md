# 🤖 Personal AI Chatbot

An intelligent, responsive chatbot powered by **Gemini AI**, built using **Next.js** and **FastAPI**. This chatbot is designed for seamless, natural conversations and can be easily integrated into any personal portfolio or web app.

## 🚀 Live Demo

👉 [Visit Chatbot](https://shashwat-personal-chatbot.vercel.app/)  
*(Frontend hosted on Vercel | Backend hosted on Render)*

---

## 🧠 Features

- 🔗 **AI-Powered Conversations** – Uses Google’s Gemini API for real-time, intelligent responses.
- 🧑‍💻 **Modern Tech Stack** – Built using FastAPI (Python) for backend and Next.js (React + Tailwind CSS) for frontend.
- 💬 **Chat Interface** – Clean, animated UI with Markdown support for better response formatting.
- 🌐 **Deployed & Scalable** – Frontend on Vercel, Backend on Render for seamless full-stack deployment.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js**
- **Tailwind CSS**
- **Markdown React Renderer**
- **Vercel** (Hosting)

### Backend
- **FastAPI**
- **Google Generative AI (Gemini 2.0 Flash)**
- **Python**
- **Render** (Hosting)

---

## 📦 Installation & Setup

> Make sure you have **Node.js** and **Python** installed.

### Backend (FastAPI)
```bash
# Clone and enter the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Set your Google Gemini API key
touch .env
# Add to .env:
# GEMINI_API_KEY=your_api_key_here

# Run server
uvicorn chatbot_api:app --host 0.0.0.0 --port 8000
