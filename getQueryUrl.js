 // 获取 url 参数
    function getQueryStr(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var ind = window.location.search.lastIndexOf("?");
      var r = window.location.search.substr(ind + 1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    }