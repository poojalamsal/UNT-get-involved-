const express = require("express");

const router = express.Router();

let savedEvents = [];

// SAVE EVENT
router.post("/save", (req, res) => {
    try {
        const event = req.body;

        if (!event || Object.keys(event).length === 0) {
            return res.status(400).json({ message: "Event data is required" });
        }

        savedEvents.push(event);

        res.status(201).json({ message: "Event saved", event });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// GET EVENTS
router.get("/saved", (req, res) => {
    try {
        res.status(200).json(savedEvents);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
