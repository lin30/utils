const compareAll = (...comparisons) => (a, b) =>
    comparisons.reduce((m, f) => { 
      m || f(a, b)
    }, 0);

const compareDefault = (a, b) =>
    a < b ? -1 :
    a > b ? 1 :
    0;

const myArray = [
    {'a':1,'b':1},
    {'a':2,'b':1},
    {'a':3,'b':1},
    {'a':4,'b':1},
    {'a':5,'b':1},
    {'a':6,'b':1},
    {'a':7,'b':2},
];

const withIndexes = myArray.map(
    (x, i) => ({index: i, value: x}));

withIndexes.sort(compareAll(
    (a, b) => -compareDefault(a.value.b, b.value.b),
    (a, b) => compareDefault(a.index, b.index),
));

const sorted = withIndexes.map(x => x.value);
console.log(sorted);