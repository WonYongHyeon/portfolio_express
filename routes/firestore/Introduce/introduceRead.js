// DB에서 가져오기
export const introduceRead = async (db) => {
  const snapshot1 = await db
    .collection("data")
    .orderBy("createAt", "asc")
    .get();

  const snapshot2 = await db
    .collection("aboutData")
    .orderBy("createAt", "asc")
    .get();

  const snapshot3 = await db
    .collection("etcData")
    .orderBy("createAt", "asc")
    .get();

  const data = [];
  const aboutData = [];
  const etcData = [];

  snapshot1.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  snapshot2.forEach((doc) => {
    aboutData.push({ id: doc.id, ...doc.data() });
  });
  snapshot3.forEach((doc) => {
    etcData.push({ id: doc.id, ...doc.data() });
  });

  return [data, aboutData, etcData];
};
