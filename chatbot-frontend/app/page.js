"use client";

import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setOutput(""); // Clear previous output

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat/", {
        message: input,
      });

      setOutput(response.data.response);
    } catch (error) {
      console.error("Error:", error);
      setOutput("❌ Error generating response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-between relative">
      {/* Header with Typing Effect */}
      <header className="w-full bg-gray-800 py-4 px-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <img src="/favicon.ico" alt="Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#432DD7] via-[#5B3FEA] to-[#7A5AFF] text-transparent bg-clip-text">
            <Typewriter
              words={["SHASHWAT SINGH"]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={120}
              deleteSpeed={80}
              delaySpeed={1000}
            />
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 w-full">
        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-[#432DD7] via-[#5B3FEA] to-[#7A5AFF] text-transparent bg-clip-text">
          AI Chatbot
        </h1>

        <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-[#432DD7] outline-none transition-all duration-300 hover:border-[#5740E3]"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="w-full mt-3 p-3 bg-[#432DD7] rounded-lg font-bold text-white hover:bg-[#5740E3] transition-all duration-300"
            >
              Generate
            </button>
          </form>

          {/* Output Section */}
          <div className="bg-gray-700 p-4 rounded-lg max-h-60 overflow-y-auto border border-gray-600 custom-scrollbar">
            {loading ? (
              <p className="text-yellow-400 text-lg animate-pulse">
                Generating response...
              </p>
            ) : (
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => (
                    <p className="text-white text-lg leading-relaxed" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="text-[#5B3FEA] font-semibold" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside text-white" {...props} />
                  ),
                  li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                }}
              >
                {output || "Your AI-generated response will appear here."}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </main>

      {/* Floating Contact Button */}
      <a
        href="mailto:singhshashwat521@gmail.com"
        className="fixed bottom-20 right-6 bg-[#432DD7] text-white px-5 py-3 rounded-full font-semibold shadow-xl shadow-[#2E1DA6] hover:bg-[#5740E3] transition-all duration-300 hover:shadow-2xl hover:shadow-[#5B3FEA]"
      >
        Contact Me
      </a>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-center py-4 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} SHASHWAT. All rights reserved.
      </footer>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #444;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #5B3FEA, #432DD7);
          border-radius: 10px;
          transition: all 0.3s ease-in-out;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #7A5AFF, #5B3FEA);
        }
      `}</style>
    </div>
  );
}
