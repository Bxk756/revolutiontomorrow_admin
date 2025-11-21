import React, { useEffect, useState } from "react";

export default function EventDiffViewer({ eventId }) {
  const [diff, setDiff] = useState(null);

```jsx
  async function loadDiff() {
    if (!eventId) {
      setDiff(null);
      return;
    }

    try {
      const res = await fetch(`/api/event_diff?event_id=${eventId}`);
      const json = await res.json();
      setDiff(json);
    } catch (err) {
      console.error("Diff viewer error:", err);
    }
  }

  useEffect(() => {
    loadDiff();
  }, [eventId]);

  if (!eventId)
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 text-gray-500">
        Select an event to view diff.
      </div>
    );

  if (!diff)
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 text-gray-400">
        Loading event diff…
      </div>
    );

  return (
    <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Event Diff Viewer
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-gray-300 mb-2 font-semibold">Before</h3>
          <pre className="bg-black/20 p-4 text-xs text-gray-400 h-64 overflow-y-auto border border-gray-800 rounded">
{JSON.stringify(diff.before, null, 2)}
          </pre>
        </div>

        <div>
          <h3 className="text-gray-300 mb-2 font-semibold">After</h3>
          <pre className="bg-black/20 p-4 text-xs text-gray-400 h-64 overflow-y-auto border border-gray-800 rounded">
{JSON.stringify(diff.after, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
