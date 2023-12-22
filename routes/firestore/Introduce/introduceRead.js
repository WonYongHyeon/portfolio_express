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

  const introduceArr = [];
  const introduceIdArr = [];

  //   for (const doc in snapshot1) {
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

  await snapshot1.forEach(async (doc) => {
    const obj = {
      id: doc.id,
      ...doc.data(),
      //   desc: descArr,
    };

    introduceIdArr.push(doc.id);
    introduceArr.push(obj);
  });
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

  introduceArr.map((doc, idx) => {
    introduceData.push({
      ...doc,
      desc: descArr[idx],
    });
  });

  snapshot2.forEach((doc) => {
    aboutData.push({ id: doc.id, ...doc.data() });
  });

  snapshot3.forEach((doc) => {
    etcData.push({ id: doc.id, ...doc.data() });
  });

  return [introduceData, aboutData, etcData];
};
