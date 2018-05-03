let _dete='20180408000000'
function formatStr(str,type){
    let i = 0,_type = type||"xxxx-xx-xx xx:xx:xx";
    return _type .replace(/x/g, () => str[i++])
}
formatStr(_dete);
result:"2018-04-08 00:00:00"