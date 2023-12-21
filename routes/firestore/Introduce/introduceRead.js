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

  const introduceData = [];
  const aboutData = [];
  const etcData = [];

  //   for await (const doc of snapshot1) {
  //     const introduceDataDescDoc = await db
  //       .collection("data")
  //       .doc(doc.id)
  //       .collection("desc")
  //       .doc("desc")
  //       .get();

  //     // desc 데이터 배열로 변경
  //     const descObj = await introduceDataDescDoc.data();
  //     const descArr = Object.keys(descObj).map((item) => descObj[item]);

  //     const obj = {
  //       id: doc.id,
  //       ...doc.data(),
  //       desc: descArr,
  //     };

  //     introduceData.push(obj);
  //   }
  console.log(snapshot1);
  await snapshot1.forEach(async (doc) => {
    // desc 데이터
    const introduceDataDescDoc = await db
      .collection("data")
      .doc(doc.id)
      .collection("desc")
      .doc("desc")
      .get();

    // desc 데이터 배열로 변경
    const descObj = await introduceDataDescDoc.data();
    const descArr = Object.keys(descObj).map((item) => descObj[item]);

    const obj = {
      id: doc.id,
      ...doc.data(),
      desc: descArr,
    };

    introduceData.push(obj);
  });

  snapshot2.forEach((doc) => {
    aboutData.push({ id: doc.id, ...doc.data() });
  });

  snapshot3.forEach((doc) => {
    etcData.push({ id: doc.id, ...doc.data() });
  });

  return [introduceData, aboutData, etcData];
};
