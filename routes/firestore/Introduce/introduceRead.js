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

  //   for await (const id of introduceIdArr) {
  //     const introduceDataDescDoc = await db
  //       .collection("data")
  //       .doc(id)
  //       .collection("desc")
  //       .doc("desc")
  //       .get();

  //     introduceData.push({
  //       ...introduceArr[idx],
  //       desc: introduceDataDescDoc.data(),
  //     });
  //   }

  for (let idx = 0; idx < introduceIdArr.length; idx++) {
    const id = introduceIdArr[idx];

    const introduceDataDescDoc = await db
      .collection("data")
      .doc(id)
      .collection("desc")
      .doc("desc")
      .get();

    let descArr = [];

    // introduceDataDescDoc.forEach((doc) => {
    //   descArr.push(doc.data());
    // });

    // console.log(introduceDataDescDoc.data());

    const introduceDataDescObj = introduceDataDescDoc.data();

    for (let objKey in introduceDataDescObj) {
      if (introduceDataDescObj.hasOwnProperty(objKey)) {
        descArr.push(introduceDataDescObj[objKey]);
      }
    }

    introduceData.push({
      ...introduceArr[idx],
      //   desc: introduceDataDescDoc.data(),
      desc: descArr,
    });
  }

  // desc 데이터
  //   await introduceIdArr.map(async (id, idx) => {
  //     const introduceDataDescDoc = await db
  //       .collection("data")
  //       .doc(id)
  //       .collection("desc")
  //       .doc("desc")
  //       .get();

  //     console.log(introduceDataDescDoc.data());

  //     introduceData.push({
  //       ...introduceArr[idx],
  //       desc: introduceDataDescDoc.data(),
  //     });
  //   });

  snapshot2.forEach((doc) => {
    aboutData.push({ id: doc.id, ...doc.data() });
  });

  snapshot3.forEach((doc) => {
    etcData.push({ id: doc.id, ...doc.data() });
  });

  //   console.log(introduceArr, introduceData);

  return [introduceData, aboutData, etcData];
};
