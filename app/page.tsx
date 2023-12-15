"use client";

import React, { useState } from "react";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";

// Navbar component
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Make the logo clickable */}
        <a
          href="https://neuralnovel.com"
          className="text-white font-bold text-lg"
        >
          Neural Novel
        </a>

        {/* Add additional navigation items as needed */}

        {/* Donate button */}
        <a
          href="https://streamlabs.com/neuralnovels/tip"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Donate
        </a>
      </div>
    </nav>
  );
};

// Chat component
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [showLabel, setShowLabel] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [showULA, setShowULA] = useState(false);

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowLabel(false);
      setShowTitle(false);
    }
  };

  const handleULAClick = () => {
    setShowULA(true);
  };

  const handleULAClose = () => {
    setShowULA(false);
  };

  return (
    <div>
      {/* Include the Navbar component */}
      <Navbar />

      {/* Rest of your Chat component */}
      <div className="mx-auto w-full max-w-md py-24 flex flex-col items-center">
        {/* User License Agreement Link */}
        <a href="#" onClick={handleULAClick} className="DG">
          User License Agreement
        </a>

        <h1
          style={{
            opacity: showTitle ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Mixtral Chat
        </h1>

        {/* Messages display */}
        {messages.map((m) => (
          <div key={m.id} className="my-2">
            <span
              style={{ fontWeight: "bold" }}
              className={m.role === "user" ? "text-blue-500" : "text-green-500"}
            >
              {m.role === "user" ? "User: " : "Mixtral: "}
            </span>
            <ReactMarkdown>{m.content}</ReactMarkdown>{" "}
            {/* Render content as Markdown */}
          </div>
        ))}

        {/* User input form */}
        <form onSubmit={handleSubmit}>
          <label>
            <span
              className={`${
                showLabel ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500 ease-in-out`}
            >
              Say something...
            </span>
            <input
              className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2 md:mx-auto md:w-1/2 lg:w-1/3"
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => handleEnterPress(e)}
            />
          </label>
          <button type="submit">Send</button>
        </form>

        {/* User License Agreement Modal */}
        {showULA && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg">
              <h2 className="text-lg font-bold mb-4">User License Agreement</h2>
              <p>
                By using this website and its components, you agree that it is
                for testing purposes only. You are not allowed to use this
                website for any illegal purpose, or in violation of any laws. By
                using this website you agree to our terms & conditions.
              </p>
              <div className="text-center mt-4">
                <button
                  onClick={handleULAClose}
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
