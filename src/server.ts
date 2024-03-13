import express from "express";
import path from "path";
import router from "./router";

import morgan from "morgan";
import { protect } from "./modules/auth";
import { createUser, login } from "./handlers/user";

const app = express();

app.use(express.static("static"));

app.use(morgan("dev"));

// allows user to send json data
app.use(express.json());

// allows us to encode and decode url strings
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.sendFile(path.resolve("src/index.html"));
});

app.use("/api", protect, router);

app.post("/signup", createUser);

app.post("/login", login);

app.get("*", (req, res) => {
  res.status(404);
  res.json({ message: "The requested page not found" });
});

app.use((err, req, res, next) => {
  console.log("error.type => ", err.type);
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "Oooops, that's on us" });
  }
});

export default app;
