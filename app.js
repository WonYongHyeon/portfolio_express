import express from "express";
import cors from "cors";
import { tilList } from "./data/til_list.js";
import { projectList } from "./data/project_list.js";

import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "firebase-admin/firestore";
import serviceAccount from "./portfolio-44617-firebase-adminsdk-xipqk-1034efcf46.json" assert { type: "json" };

// firebase 관련 세팅
initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();
const tilListRef = db.collection("tilList");

// DB에서 tilList 가져오기
const tilListRead = async (search, page) => {
  const snapshot = await tilListRef.get();

  let filterList = [];

  snapshot.forEach((doc) => {
    filterList.push(doc.data());
  });

  // 검색어로 tilList 필터링
  if (search !== "") {
    filterList = filterList.filter((el) => {
      el.title.toLowerCase().indexOf(search) != -1;
    });
  }

  return filterList.slice((page - 1) * 10, page * 10);
};

// tilList에 추가하기
const tilListWrite = async () => {
  const tilListWriteRef = tilListRef.doc("tilList");

  await tilListWriteRef
    .set({
      order: "TIL.2",
      title: "탐욕 알고리즘(Greedy Algorithm)",
      link: "https://velog.io/@quin1392/TIL.2-알고리즘-탐욕-알고리즘",
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

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
  const sliceList = await tilListRead(search, page);
  const pageLength = Math.ceil(sliceList.length / 10);

  res.json({ pageLength: pageLength, tilList: sliceList });
});

app.get("/project", (req, res) => {
  res.send(projectList);
});

app.post("/TIL/registration", (req, res) => {
  if (!req.body.title || !req.body.url) {
    res.json({
      success: false,
    });
    return;
  }

  const tilListLength = tilList.length;

  const til = {
    order: `TIL.` + String(tilListLength + 1),
    title: req.body.title,
    link: req.body.url,
  };
  tilList.unshift(til);
  test();

  res.json({
    success: true,
  });
});

app.listen(port, () => {
  console.log(`서버 실행, http://localhost:${port}`);
});

// 데이터 저장
async function test() {
  db.collection("portfolio").doc("tilList").set({
    order: "TIL.1",
    title: "프론트엔드 클라이언트 AWS 배포",
    link: "https://velog.io/@quin1392/프론트엔드-클라이언트-AWS-배포",
  });
}
