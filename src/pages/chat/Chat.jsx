import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import "./chat.css";

function Chat() {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const [data, setData] = useState(undefined);
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(false);
  
    async function fetchDataFromGeminiProAPI() {
      try {
        // ONLY TEXT
        if (!inputText) {
          alert("Please enter text!");
          return;
        }
        setLoading(true);
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
        const result = await model.generateContent(inputText);
        const text = result.response.text();
        setLoading(false);
        setData(text);
      } catch (error) {
        setLoading(false);
        console.error("fetchDataFromGeminiAPI error: ", error);
      }
    }
  
    async function fetchDataFromGeminiProVisionAPI() {
      try {
        // TEXT AND FILE
        if (!inputText) {
          alert("Please enter text!");
          return;
        }
        setLoading(true);
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  
        const fileInputEl = document.querySelector("input[type=file]");
        const imageParts = await Promise.all(
          [...fileInputEl.files].map(fileToGenerativePart)
        );
        const result = await model.generateContent([inputText, ...imageParts]);
        const text = result.response.text();
  
        setLoading(false);
        setData(text);
      } catch (error) {
        setLoading(false);
        console.error("fetchDataFromGeminiAPI error: ", error);
      }
    }
  
    async function fileToGenerativePart(file) {
      const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(file);
      });
      return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
      };
    }
  
    return (
     <div className="card">
      <top>
          <h1>Chat with AI</h1>
          <img className="chat-image" src="assets/chat.png" alt="" />
      </top>
         

          <input type="file" />
          <input
            placeholder="Message AI..."
            type="text"
            style={{ width: 350 }}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="ai-btn" disabled={loading} onClick={() => fetchDataFromGeminiProAPI()}>
            {loading ? "Loading..." : "Get data"}
          </button>
          <button
            className="ai-btn"
            disabled={loading}
            onClick={() => fetchDataFromGeminiProVisionAPI()}
          >
            {loading ? "Loading..." : "Get data about image"}
          </button>
          <hr />
          <div className="scrolling-div">Response:<br/><br/> {data}</div>
        </div>
    );
  }
  export default Chat;
