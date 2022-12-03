import { Router } from "express";
import Questions from "./Schema.js";
import QuestionsRes from "./SchemaRes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const router = new Router();

const SECRET_KEY = process.env.SECRET_KEY;

router.post("/auth", (req, res) => {
  if (req.body.password === SECRET_KEY) {
    res.json("Authorized");
  } else {
    res.status(400).json("Not authorized");
  }
});

router.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

router.get("/questions", async (req, res) => {
  try {
    if (req.headers.authorization === SECRET_KEY) {
      const data = await Questions.find();
      res.json(data);
    } else {
      res.status(400).json({ status: false });
    }
  } catch (e) {
    res.status(400).json({ status: false });
  }
});

router.post("/questions", async (req, res) => {
  try {
    await Questions.create(req.body);
    await QuestionsRes.create(req.body);
    res.json("true");
  } catch (e) {
    res.status(400).json({ status: false });
  }
});

router.delete("/questions/:id", async (req, res) => {
  try {
    if (req.headers.authorization === SECRET_KEY) {
      await Questions.deleteOne({ _id: req.params.id });
      const data = await Questions.find();
      res.json(data);
    } else {
      res.status(400).json({ status: false });
    }
  } catch (e) {
    res.status(400).json({ status: false });
  }
});

export default router;
