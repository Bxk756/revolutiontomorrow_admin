import React, { useEffect, useState } from "react";

export default function NotificationTemplateEditor() {
  const [templates, setTemplates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [body, setBody] = useState("");

  async function loadTemplates() {
    try {
      const res = await fetch("/api/notification_templates");
      const json = await res.json();
      setTemplates(json.templates || []);
    } catch (err) {
      console.error("Template load error:", err);
    }
  }

  async function loadTemplate(id) {
    setSelectedId(id);
    const t = templates.find((tpl) => tpl.id === id);
    if (t) setBody(t.body || "");
  }

  async function saveTemplate() {
    try {
      await fetch("/api/notification_templates", {
        method: "POST",
        body: JSON.stringify({ id: selectedId, body }),
      });
    } catch (err) {
      console.error("Template save error:", err);
    }
  }

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Notification Template Editor
      </h2>

      <div className="flex gap-4">
        <div className="w-1/3">
          <p className="text-xs text-gray-400 mb-2">Templates</p>
          <div className="space-y-2">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => loadTemplate(t.id)}
                className={`w-full text-left px-3 py-2 rounded text-sm ${
                  selectedId === t.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-200"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-2/3">
          <p className="text-xs text-gray-400 mb-2">
            Template Body (supports variables like {"{risk_level}"})
          </p>
          <textarea
            className="w-full h-48 bg-gray-900 border border-gray-700 text-gray-200 rounded p-3 text-sm"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button
            onClick={saveTemplate}
            disabled={!selectedId}
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm disabled:opacity-40"
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}
