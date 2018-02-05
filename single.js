// 单例模式

var getSingle = function(fn){
    var result;
    return function(){
        return result || (result = fn.apply(this, arguments));
    }
};
var createDiv = function(){
    var div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.background = 'red';
    div.style.marginBottom = '10px';
    document.body.appendChild(div);
    return div;
};
var createSingleDiv = getSingle(createDiv);
createSingleDiv();
createSingleDiv();
createSingleDiv();