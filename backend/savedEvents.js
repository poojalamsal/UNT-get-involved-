const express = require("express");

const router = express.Router();

let savedEvents = [];

router.post("/save",(req,res)=>{

const event = req.body;

savedEvents.push(event);

res.json({
message:"Event saved"
});

});

router.get("/saved",(req,res)=>{

res.json(savedEvents);

});

module.exports = router;
