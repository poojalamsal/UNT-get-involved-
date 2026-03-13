const express = require("express");

const router = express.Router();

const clubs = [

{
id:1,
name:"Coding Club",
category:"technology"
},

{
id:2,
name:"Music Society",
category:"music"
},

{
id:3,
name:"Volunteer Club",
category:"community"
}

];

router.get("/search",(req,res)=>{

const category = req.query.category;

const results = clubs.filter(club =>
club.category.toLowerCase() === category.toLowerCase()
);

res.json(results);

});

module.exports = router;
