const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

let users = [];

// SIGNUP
router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        if (!email.endsWith("@unt.edu")) {
            return res.status(400).json({ message: "Use UNT email" });
        }

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        users.push({ email, password: hashedPassword });

        res.status(201).json({ message: "Signup successful" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Wrong password" });
        }

        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;

