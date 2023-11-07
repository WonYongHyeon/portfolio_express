import express from "express";
import cors from "cors";
import { tilList } from "./data/til_list.js";
import { projectList } from "./data/project_list.js";

const app = express();
const port = 3002;

// 모든 도메인에 대해 cors 개방
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

  console.log(til, tilList);

  res.json({
    success: true,
  });
});

app.listen(port, () => {
  console.log(`서버 실행, http://localhost:${port}`);
});
