"use client";
import React, { useState, useEffect } from "react";
import { useChat, Message } from "ai/react";
import ReactMarkdown from "react-markdown";

// Navbar component
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a
          href="https://neuralnovel.com"
          className="text-white font-bold text-lg"
        >
          Neural Novel
        </a>

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
const Chat = () => {
  // Use the useChat hook to manage chat state
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [showLabel, setShowLabel] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [showULA, setShowULA] = useState(false);

  // Handle Enter key press
  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowLabel(false);
      setShowTitle(false);
    }
  };

  // Handle click on User License Agreement
  const handleULAClick = () => {
    setShowULA(true);
  };

  // Handle closing User License Agreement
  const handleULAClose = () => {
    setShowULA(false);
  };

  // Parallax scroll effect for my-2 class
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll<HTMLElement>(".my-2");
      elements.forEach((element) => {
        const scrollY = window.pageYOffset;
        element.style.transform = `translateY(${scrollY * -0.2}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Render Navbar component */}
      <Navbar />

      <div className="mx-auto w-full max-w-md py-24 flex flex-col items-center">
        {/* User License Agreement link */}
        <a href="#" onClick={handleULAClick} className="DG">
          User License Agreement
        </a>

        {/* Chat title */}
        <h1
          style={{
            opacity: showTitle ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          What&apos;s on your mind?
        </h1>

        {/* Render chat messages */}
        {messages.map(
          (m: Message & { isCode?: boolean; language?: string }) => (
            <div key={m.id} className="my-2">
              <span
                style={{ fontWeight: "bold" }}
                className={
                  m.role === "user" ? "text-blue-500" : "text-green-500"
                }
              >
                {m.role === "user" ? "User: " : "Astra: "}
              </span>
              {m.isCode ? (
                <pre>
                  <code className={`language-${m.language || "text"}`}>
                    {m.content}
                  </code>
                </pre>
              ) : (
                <ReactMarkdown>{m.content}</ReactMarkdown>
              )}
            </div>
          ),
        )}

        {/* Chat input form */}
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

        {/* User License Agreement modal */}
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
};

// Export the Chat component
export default Chat;
