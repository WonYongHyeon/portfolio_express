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

// firebase 관련 세팅
initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

// DB에서 tilList 가져오기
const tilListRead = async (search, page) => {
  const snapshot = await db
    .collection("tilList")
    .orderBy("createAt", "desc")
    .get();

  const tilList = [];

  snapshot.forEach((doc) => {
    tilList.push(doc.data());
  });

  // 검색어로 tilList 필터링
  if (search !== "") {
    const filterList = tilList.filter((el) => {
      return el.title.toLowerCase().indexOf(search) != -1;
    });
    return [
      filterList.slice((page - 1) * 10, page * 10),
      Math.ceil(filterList.length / 10),
    ];
  } else {
    return [
      tilList.slice((page - 1) * 10, page * 10),
      Math.ceil(tilList.length / 10),
    ];
  }
};

// tilList에 추가하기
const tilListWrite = async (til) => {
  // tilList 전체 크기 계산
  const snapshot = await db.collection("tilList").get();
  let count = 0;
  snapshot.forEach((_) => {
    count++;
  });

  // id값 무작위로 document 생성
  await db
    .collection("tilList")
    .doc("TIL." + String(count + 1))
    .set({
      order: "TIL." + String(count + 1),
      title: til.title,
      link: til.link,
      createAt: new Date(),
    })
    .then((res) => {
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
  const [sliceList, pageLength] = await tilListRead(search, page);
  // const pageLength = Math.ceil(sliceList.length / 10);
  // console.log(sliceList.length);

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

  const til = {
    title: req.body.title,
    link: req.body.url,
  };

  tilListWrite(til);

  res.json({
    success: true,
  });
});

app.listen(port, () => {
  console.log(`서버 실행, http://localhost:${port}`);
});
