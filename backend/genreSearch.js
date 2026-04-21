const express = require("express");
const router = express.Router();

/*
  Clubs data (in-memory)
  Note: this resets when the server restarts. That's okay for a class prototype.
*/
const clubs = [
  {
    id: 1,
    name: "Coding Club",
    category: "technology",
    description: "A club for students interested in coding projects and learning together.",
    joinRequests: []
  },
  {
    id: 2,
    name: "Music Society",
    category: "music",
    description: "A community for musicians and music lovers to connect and collaborate.",
    joinRequests: []
  },
  {
    id: 3,
    name: "Volunteer Club",
    category: "community",
    description: "Join volunteer events and give back to the local community.",
    joinRequests: []
  }
];

/*
  1) GET /clubs
  Returns the full list of clubs.
*/
router.get("/", (req, res) => {
  // Don’t expose joinRequests in the list view (optional but cleaner)
  const list = clubs.map(({ joinRequests, ...club }) => club);
  res.json(list);
});

/*
  2) GET /clubs/search?category=technology
  Returns clubs filtered by category (keeps your existing functionality).
*/
router.get("/search", (req, res) => {
  const category = (req.query.category || "").toLowerCase().trim();

  if (!category) {
    return res.status(400).json({ message: "category query param is required" });
  }

  const results = clubs.filter(
    (club) => club.category.toLowerCase() === category
  );

  res.json(results.map(({ joinRequests, ...club }) => club));
});

/*
  3) GET /clubs/:id
  Returns details for a single club.
*/
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const club = clubs.find((c) => c.id === id);

  if (!club) {
    return res.status(404).json({ message: "Club not found" });
  }

  // For details, you can include description and other fields
  // Still optional whether you include joinRequests in response:
  const { joinRequests, ...clubDetails } = club;
  res.json(clubDetails);
});

/*
  4) POST /clubs/:id/join-requests
  Creates a join request for a club (stored in memory).
  Body example: { "message": "I'd like to join!" }
*/
router.post("/:id/join-requests", (req, res) => {
  const id = Number(req.params.id);
  const club = clubs.find((c) => c.id === id);

  if (!club) {
    return res.status(404).json({ message: "Club not found" });
  }

  const message = (req.body.message || "").toString().trim();

  const newRequest = {
    requestId: Date.now(),
    message: message,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  club.joinRequests.push(newRequest);

  res.json({
    message: "Join request created",
    status: newRequest.status,
    request: newRequest
  });
});

module.exports = router;
