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

  await snapshot1.forEach(async (doc) => {
    const obj = {
      id: doc.id,
      ...doc.data(),
    };

    introduceIdArr.push(doc.id);
    introduceArr.push(obj);
  });

  for (let idx = 0; idx < introduceIdArr.length; idx++) {
    const id = introduceIdArr[idx];
    const introduceDataDescDoc = await db
      .collection("data")
      .doc(id)
      .collection("desc")
      .doc("desc")
      .get();
    const introduceDataDescObj = introduceDataDescDoc.data();
    const descArr = [];

    for (let objKey in introduceDataDescObj) {
      if (introduceDataDescObj.hasOwnProperty(objKey)) {
        descArr.push(introduceDataDescObj[objKey]);
      }
    }

    introduceData.push({
      ...introduceArr[idx],
      desc: descArr,
    });
  }

  snapshot2.forEach((doc) => {
    aboutData.push({ id: doc.id, ...doc.data() });
  });

  snapshot3.forEach((doc) => {
    etcData.push({ id: doc.id, ...doc.data() });
  });

  return [introduceData, aboutData, etcData];
};
