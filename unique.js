/**
 * 数组去重
 */
var newArr = arr.reduce((res, cur, i, arr) => {
	if (arr.indexOf(cur, i+1) < 0) {
		res.push(cur)
	}
	return res
}, [])
console.log(newArr)