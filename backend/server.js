const express = require("express");
const cors = require("cors");

const loginRoutes = require("./login");
const searchRoutes = require("./genreSearch");
const savedRoutes = require("./savedEvents");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", loginRoutes);
app.use("/clubs", searchRoutes);
app.use("/events", savedRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
