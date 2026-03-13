const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

let users = [];

router.post("/signup", async (req, res) => {

    const { email, password } = req.body;

    if (!email.endsWith("@unt.edu")) {
        return res.status(400).json({
            message: "Use UNT email"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
        email: email,
        password: hashedPassword
    });

    res.json({
        message: "Signup successful"
    });

});

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({
            message: "User not found"
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(401).json({
            message: "Wrong password"
        });
    }

    res.json({
        message: "Login successful"
    });

});

module.exports = router;
