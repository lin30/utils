// way1: map
var map = {},
  arr = [
    { LETTER: "a", SITEID: "21", NAME: "aii" },
    { LETTER: "a", SITEID: "213", NAME: "aff" },
    { LETTER: "b", SITEID: "213", NAME: "bff" }
  ],
  dest = [];
arr.map(one => {
  if (!map[one.LETTER]) {
    map[one.LETTER] = one;
    dest.push({
      LETTER: one.LETTER,
      data: [one]
    });
  } else {
    dest.map(item => {
      one.LETTER == item.LETTER && item.data.push(one);
    });
  }
});
console.log(dest);

// way2 : reduce
var map = {},
  rawArr = [
    { LETTER: "a", SITEID: "21", NAME: "aii" },
    { LETTER: "a", SITEID: "213", NAME: "aff" },
    { LETTER: "b", SITEID: "213", NAME: "bff" }
  ];
var resultArr = rawArr.reduce((arr, cur) => {
  if (!map[cur.LETTER]) {
    map[cur.LETTER] = cur;
    arr.push({
      LETTER: cur.LETTER,
      data: [cur]
    });
  } else {
    arr.map(item => {
      cur.LETTER == item.LETTER && item.data.push(cur);
    });
  }
  return arr;
}, []);
console.log(resultArr);
