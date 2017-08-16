/* sort Array<Object> by property in object, return a new array.
*  usage :
*     var infoArr = [{ age: 18, name: 'jl' }, 
                  { age: 28, name: 'jlg' }, 
                  { age: 18, name: 'aga' }, 
                  { name: 'fsfsdf' }]
*     console.log(sortBy(comparator('age'))(infoArr))
*/
function sortBy(fn) {
  return function(arr) {
    return arr.slice().sort(fn);
  };
}
function comparator(property) {
  return function(a, b) {
    if (!a[property]) {
      return 1;
    }
    var p1 = a[property];
    var p2 = b[property];
    return p1 > p2 ? -1 : p2 > p1 ? 1 : 0;
  };
}
