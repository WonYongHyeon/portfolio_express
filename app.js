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

const tilListRef = db.collection("tilList").doc("tilList");

const tilListRead = async () => {
  const snapshot = await db.collection("tilList").get();
  console.log("aaa");
  console.log(snapshot);
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
};

// express 관련 세팅
const app = express();
const port = 3002;

// 모든 도메인에 대해 cors 개방
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/aaa", async (req, res) => {
  tilListRead();
  const snapshot = await db.collection("tilList").get();
  console.log("aaa");
  console.log(snapshot);
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
  res.send("aaa");
});

app.get("/TIL", (req, res) => {
  const search = req.query.search ? req.query.search.toLowerCase() : "";
  const page = req.query.page ? req.query.page : 1;

  // 검색어로 배열 필터링
  let filterList = [];
  if (search === "") {
    filterList = tilList;
  } else if (search !== "") {
    filterList = tilList.filter(
      (el) => el.title.toLowerCase().indexOf(search) != -1
    );
  }
  // 필터링 된 배열 길이로 page 수 전송
  const pageLength = Math.ceil(filterList.length / 10);
  // 필터링 된 배열로 page 구분 후 전송
  const sliceList = filterList.slice((page - 1) * 10, page * 10);

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
