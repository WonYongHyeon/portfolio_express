// DB에서 가져오기
export const introduceRead = async (db) => {
  const snapshot1 = await db.collection("data").orderBy("createAt", "asc");
  // .get();

  const snapshot2 = await db.collection("aboutData").orderBy("createAt", "asc");
  // .get();

  const snapshot3 = await db.collection("etcData").orderBy("createAt", "asc");
  // .get();

  const data = [];
  const aboutData = [];
  const etcData = [];

  const snapshot1Doc = await snapshot1.get();
  const snapshot2Doc = await snapshot2.get();
  const snapshot3Doc = await snapshot3.get();

  snapshot1Doc.forEach(async (doc) => {
    const a = await db.collection("data").doc(doc.id).collection("desc").get();
    // const aaa = snapshot1.collection("desc").get();
    console.log(a);
    data.push({ id: doc.id, ...doc.data() });
  });
  snapshot2Doc.forEach((doc) => {
    aboutData.push({ id: doc.id, ...doc.data() });
  });
  snapshot3Doc.forEach((doc) => {
    etcData.push({ id: doc.id, ...doc.data() });
  });

  return [data, aboutData, etcData];
};
