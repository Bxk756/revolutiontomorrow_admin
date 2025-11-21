import React, { useEffect, useState } from "react";

export default function UserProfileCard({ ip }) {
  const [profile, setProfile] = useState(null);

  async function loadProfile() {
    if (!ip) return;
    try {
      const res = await fetch(`/api/user_profile?ip=${ip}`);
      const json = await res.json();
      setProfile(json);
    } catch (err) {
      console.error("User profile load error:", err);
    }
  }

  useEffect(() => {
    loadProfile();
  }, [ip]);

  if (!ip) {
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow">
        <p className="text-gray-400 text-sm">No IP available for this event.</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow">
        <p className="text-gray-400 text-sm">Loading IP profile…</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        User / IP Profile
      </h2>

      <p className="text-sm text-gray-300">
        IP: <span className="text-gray-400">{ip}</span>
      </p>

      <p className="text-sm text-gray-300">
        Geo: <span className="text-gray-400">{profile.geo || "N/A"}</span>
      </p>

      <p className="text-sm text-gray-300">
        ASN: <span className="text-gray-400">{profile.asn || "N/A"}</span>
      </p>

      <p className="text-sm text-gray-300">
        Reputation:{" "}
        <span className="text-gray-400">{profile.reputation || "unknown"}</span>
      </p>

      <p className="text-sm text-gray-300">
        Total Events:{" "}
        <span className="text-gray-400">{profile.total_events || 0}</span>
      </p>

      <p className="text-xs text-gray-500 mt-3">
        Last seen: {profile.last_seen || "—"}
      </p>
    </div>
  );
}
