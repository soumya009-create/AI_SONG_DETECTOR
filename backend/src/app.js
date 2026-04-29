const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const app = express();
const cookieParser = require("cookie-parser");
const AuthRouter = require("./routes/auth.routes");
const SongRouter = require("./routes/song.routes");

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");

app.use(express.json());
app.use(
  cors({
    origin(origin, callback) {
      const isAllowedRenderPreview = origin && /^https:\/\/.*\.onrender\.com$/i.test(origin);

      if (!origin || allowedOrigins.includes(origin) || isAllowedRenderPreview) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/health", (req, res) => {
  return res.status(200).json({
    message: "Moodify API is running",
  });
});

app.use("/api", AuthRouter);
app.use("/song", SongRouter);

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  app.get(/^(?!\/api|\/song).*/, (req, res) => {
    return res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

module.exports = app;
