// DB에서 tilList 가져오기
export const tilListRead = async (search, page, db) => {
  const snapshot = await db
    .collection("tilList")
    .orderBy("createAt", "desc")
    .get();

  const tilList = [];

  snapshot.forEach((doc) => {
    console.log({ id: doc.id, ...doc.data() });
    tilList.push({ id: doc.id, ...doc.data() });
  });

  // 검색어로 tilList 필터링
  if (search !== "") {
    const filterList = tilList.filter((el) => {
      return el.title.toLowerCase().indexOf(search) != -1;
    });
    return [
      filterList.slice((page - 1) * 10, page * 10),
      Math.ceil(filterList.length / 10),
    ];
  } else {
    return [
      tilList.slice((page - 1) * 10, page * 10),
      Math.ceil(tilList.length / 10),
    ];
  }
};
