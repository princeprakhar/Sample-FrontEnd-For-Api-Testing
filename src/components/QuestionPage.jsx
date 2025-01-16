import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const QuestionPage = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  // const [file, setFile] = useState(null);

  const handleAskQuestion = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://your-backend-url.com/ask",
        { question },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(res.data.answer);
    } catch (error) {
      console.error("Error asking question:", error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      await axios.post("https://your-backend-url.com/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ask a Question</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="Ask your question..."
      />
      <Button onClick={handleAskQuestion}>Ask</Button>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p>{response}</p>
        </div>
      )}

      <h1 className="text-2xl font-bold mt-8 mb-4">Upload Document</h1>
      <input
        type="file"
        onChange={handleFileUpload}
        className="mb-4"
      />
    </div>
  );
};

export default QuestionPage;