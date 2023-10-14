import express from "express";
import cors from "cors";
import { tilList } from "./data/til_list.js";
import { projectList } from "./data/project_list.js";

const app = express();
const port = 3000;

// 모든 도메인에 대해 cors 개방
app.use(cors());

app.get("/TIL", (req, res) => {
  res.send(tilList);
});

app.get("/project", (req, res) => {
  res.send(projectList);
});

app.listen(port, () => {
  console.log(`서버 실행, http://localhost:${port}`);
});

app.post("/til");
