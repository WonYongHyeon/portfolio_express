import express from "express";
import cors from "cors";
import { projectList } from "./data/project_list.js";

import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "firebase-admin/firestore";
import serviceAccount from "./portfolio-44617-firebase-adminsdk-xipqk-1034efcf46.json" assert { type: "json" };

import { tilListRead } from "./controls/firestore/TIL/tilListRead.js";
import { tilListWrite } from "./controls/firestore/TIL/tilListWrite.js";

// firebase 관련 세팅
initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

// express 관련 세팅
const app = express();
const port = 3002;

// 모든 도메인에 대해 cors 개방
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/TIL", async (req, res) => {
  const search = req.query.search ? req.query.search.toLowerCase() : "";
  const page = req.query.page ? req.query.page : 1;

  // 검색어로 배열 필터링
  const [sliceList, pageLength] = await tilListRead(search, page, db);

  res.json({ pageLength: pageLength, tilList: sliceList });
});

app.post("/TIL/registration", (req, res) => {
  if (!req.body.title || !req.body.url) {
    res.json({
      success: false,
    });
    return;
  }

  const til = {
    title: req.body.title,
    link: req.body.url,
  };

  tilListWrite(til);

  res.json({
    success: true,
  });
});

app.get("/project", (req, res) => {
  res.send(projectList);
});

app.listen(port, () => {
  console.log(`서버 실행, http://localhost:${port}`);
});
