var express = require('express')
var superagent = require('superagent')
var charset = require('superagent-charset')
charset(superagent);
var cheerio = require('cheerio')
var app = express()
var eventproxy = require('eventproxy')
var ep = new eventproxy()
const pMap = require('p-map');
var baseUrl = 'http://db.foodmate.net/yingyang'
var topLists = []
var childObj = {}
var infos = []
var infosList = []
app.get('/', function (req, res, next) {
  var url = baseUrl
  fetchText(url).then((txt) => {
    topLists = parseText(txt)
    // 抓取子列表
    ep.emit('get_child_list')
  })

  ep.after('get_child_list', 1, function () {
    let hrefs = []
    // 遍历子级列表 href
    topLists.forEach((one, ind, arr) => {
      hrefs.push(one.href)
    })
    const mapper = href => fetchText(href).then(txt => parseChildText(txt))
    // Promise-all
    pMap(hrefs, mapper, {concurrency: 5}).then(() => {
      ep.emit('get_second_child_list', infos)
    });
  })

  ep.after('get_second_child_list', 1, function (content) {
    const mapper = obj => fetchText(obj.href, obj.ind).then(({res, params}) => parseInfo(res, params))
    // Promise-all
    pMap(content[0], mapper, {concurrency: 5}).then(() => {
      ep.emit('get_second_child_info')
    });
   
  })
  ep.after('get_second_child_info', 1, function() {
     const obj = {
      topLists,
      childObj
      // infosList
    }
    console.log(infosList)
    res.send(obj)
  })
})

// 解析营养成分节点
function parseInfo(text, index) {
  var $ = cheerio.load(text)
  $('#rightlist .list').each((ind, ele) => {
    var obj = {
      index,
      info: $(ele).text()
    }
    infosList.push(obj)
  })
}

// 解析一级节点,获取信息
function parseText(text) {
  var baseUrl = 'http://db.foodmate.net/yingyang/'
  var $ = cheerio.load(text)
  var items = []
  // 遍历页面节点
  $('#top a').each(function (ind, ele) {
    var $ele = $(ele)
    items.push({
      title: $ele.text(),
      href: baseUrl + $ele.attr('href'),
      ind: $ele.attr('href').slice(0, -5)
    })
  })
  return items
}
// 解析二级节点,获取信息
function parseChildText(text) {
  var baseUrl = 'http://db.foodmate.net/yingyang/'
  var $ = cheerio.load(text)
  var items = []
  // 遍历页面节点
  $('#dibu li a').each(function (ind, ele) {
    var $ele = $(ele)
    var title = $ele.text()
    var path = $ele.attr('href')
    var ind = path && path.split('_')[2].slice(0, -5)
    var childInd = path.slice(0, -5)
    var href = baseUrl + path
    items.push({
      title,
      href,
      ind: childInd
    })
    childObj['type_' + ind] = items
  })
  infos = infos.concat(items)
}

// 抓取页面
function fetchText(url, params) {
  return new Promise((resolve) => {
    superagent.get(url)
      .charset('gb2312')
      .end(function (err, res) {
        if (err) {
          console.log(err)
        }
        if (res && res.text) {
          if (params) {
            resolve({
              res: res.text,
              params
            })
          } else {
            resolve(res.text)
          }
        }
      })
  })
}

app.listen(3000, function () {
  console.log('app is listening at port 3000')
})