// tilList에 추가하기
export const tilListWrite = async (til, db) => {
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
