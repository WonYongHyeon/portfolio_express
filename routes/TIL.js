const til = [
  {
    title: "TIL.1 | 프론트엔드 클라이언트 AWS 배포",
    link: "https://velog.io/@quin1392/프론트엔드-클라이언트-AWS-배포",
  },
  {
    title: "TIL.2 | 탐욕 알고리즘(Greedy Algorithm)",
    link: "https://velog.io/@quin1392/TIL.2-알고리즘-탐욕-알고리즘",
  },
  {
    title: "TIL.3 | Union-Find 알고리즘",
    link: "https://velog.io/@quin1392/TIL.3-Union-Find-알고리즘",
  },
];

// 라우터 체인 : 하나의 라우트 경로로 각 라우트 메소드 처리
app
  .route("/til")
  .get((req, res) => {
    // HTTP 메소드 GET 요청에 대한 조회 처리
    res.send("고객 정보 조회");
  })
  .post((req, res) => {
    // HTTP 메소드 POST 요청에 대한 저장 처리
    res.send("신규 고객 추가");
  });
