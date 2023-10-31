import express from "express";
import cors from "cors";
import { tilList } from "./data/til_list.js";
import { projectList } from "./data/project_list.js";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port = 3002;

// 모든 도메인에 대해 cors 개방
app.use(cors());

// 새로고침 시 Cannot Get 오류 방지
app.use(
  createProxyMiddleware("/project", {
    target: "http://localhost:3002",
    changeOrigin: true,
    ws: true,
  })
);

app.get("/TIL", (req, res) => {
  const search = req.query.search ? req.query.search.toLowerCase() : "";
  const page = req.query.page ? req.query.page : 1;
  if (search === "") {
    res.send(tilList);
  } else if (search !== "") {
    const filterList = tilList.filter(
      (el) => el.title.toLowerCase().indexOf(search) != -1
    );
    res.send(filterList);
  }
});

app.get("/project", (req, res) => {
  res.send(projectList);
});

app.listen(port, () => {
  console.log(`서버 실행, http://localhost:${port}`);
});

app.post("/TIL");
