require("dotenv").config();
const express = require("express");
const cors = require("cors");
const artistsRouter = require("./routes/artists");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/api/artists", artistsRouter);

app.get("/api/health", (_, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
