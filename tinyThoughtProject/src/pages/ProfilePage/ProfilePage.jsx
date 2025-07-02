import React, { useState, useEffect } from "react";
import JournalProfile from "../../components/JournalProfile/JournalProfile";

function ProfilePage() {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/journal", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setEntries(res.ok ? data : []);
  };

  const deleteEntry = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`http://localhost:5000/journal/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) fetchEntries();
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", padding: "1rem" }}>
      <JournalProfile entries={entries} onDelete={deleteEntry} />
    </div>
  );
}

export default ProfilePage;
