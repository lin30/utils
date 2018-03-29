// https://juejin.im/post/57dcd394a22b9d00610c5ec8 文章地址
// 插入排序/冒泡排序  --- 稳定
// 快速排序 -- 不稳定

function insertSort(arr) {
  // 插入排序
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i]; // 比较值
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      // 大于比较值一直往左边插入
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key; // 比较停止,把比较值赋值给左边
  }
}
function bubbleSort1(arr) {
  // 冒泡排序
  console.time("冒泡优化前耗时");
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换元素
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  console.timeEnd("冒泡优化前耗时");
  console.log(arr);
  return arr;
}
function bubbleSort(arr) {
  // 冒泡排序
  console.time("冒泡优化后耗时");
  var i = arr.length - 1;
  while (i > 0) {
    var pos = 0;
    for (var j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        pos = j; // 记录最后比较位置
        var temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
    i = pos;
  }
  console.timeEnd("冒泡优化后耗时");
  console.log(arr);
  return arr;
}
