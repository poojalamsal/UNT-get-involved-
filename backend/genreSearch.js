const express = require("express");

const router = express.Router();

const clubs = [
    { id: 1, name: "Coding Club", category: "technology" },
    { id: 2, name: "Music Society", category: "music" },
    { id: 3, name: "Volunteer Club", category: "community" }
];

router.get("/search", (req, res) => {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({ message: "Category query is required" });
        }

        const results = clubs.filter(
            club => club.category.toLowerCase() === category.toLowerCase()
        );

        res.status(200).json(results);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
