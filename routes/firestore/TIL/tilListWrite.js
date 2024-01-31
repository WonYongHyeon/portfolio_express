// tilList에 추가하기
export const tilListWrite = async (til, db) => {
  let result = false;

  const snapshot = await db.collection("tilList").get();
  let count = 0;
  snapshot.forEach((doc) => {
    count++;
  });

  // id값 무작위로 document 생성
  await db
    .collection("tilList")
    .add({
      order: "TIL." + String(count + 1),
      title: til.title,
      link: til.link,
      createAt: new Date(),
    })
    .then((_) => {
      result = true;
    })
    .catch(() => {
      result = false;
    });

  return result;
};
