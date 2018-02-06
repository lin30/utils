// 「JavaScript 正则表达式匹配汉字」
var oldRex = /[\u4e00-\u9fa5]/ // 适用于1992-1999年前的汉字
// 99年后新加入的文字,比如元素周期表元素,  鿏  不适用.
var rex = /[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}]/u;