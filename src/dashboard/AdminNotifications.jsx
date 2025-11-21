import React, { createContext, useContext, useState } from "react";

const NotifyContext = createContext();

export function useNotify() {
  return useContext(NotifyContext);
}

export function AdminNotificationsProvider({ children }) {
  const [messages, setMessages] = useState([]);

  function notify(text, type = "info") {
    const id = crypto.randomUUID();
    setMessages((prev) => [...prev, { id, text, type }]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }, 3000);
  }

  return (
    <NotifyContext.Provider value={{ notify }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 space-y-3 z-50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`px-4 py-2 rounded-lg shadow text-sm text-white animate-fadeIn 
              ${
                m.type === "success"
                  ? "bg-green-600"
                  : m.type === "error"
                  ? "bg-red-600"
                  : "bg-blue-600"
              }`}
          >
            {m.text}
          </div>
        ))}
      </div>
    </NotifyContext.Provider>
  );
}
