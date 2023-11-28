// DB에서 tilList 가져오기
export const tilListDelete = async (id, page, db) => {
  await db.collection("tilList").doc(id).delete();

  const snapshot = await db
    .collection("tilList")
    .orderBy("createAt", "desc")
    .get();

  const tilList = [];

  snapshot.forEach((doc) => {
    tilList.push({ id: doc.id, ...doc.data() });
  });

  console.log("patch", page);
  console.log(tilList);

  return [
    tilList.slice((page - 1) * 10, page * 10),
    Math.ceil(tilList.length / 10),
  ];
};
