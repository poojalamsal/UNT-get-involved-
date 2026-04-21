// integrations.js
const API_BASE = "http://localhost:3000";

// -------- Clubs (category search) --------
async function fetchClubsByCategory(category) {
  const res = await fetch(`${API_BASE}/clubs/search?category=${encodeURIComponent(category)}`);
  return res.json();
}

// -------- Events --------
async function saveEvent(eventObj) {
  const res = await fetch(`${API_BASE}/events/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventObj),
  });
  return res.json();
}

async function fetchSavedEvents() {
  const res = await fetch(`${API_BASE}/events/saved`);
  return res.json();
}

// -------- Auth (optional for later) --------
async function signup(email, password) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}
