const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const movieRoutes = require("./routes/movies");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", movieRoutes);
app.use("/api", adminRoutes);

app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
