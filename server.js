var express = require('express')
var axios = require('axios')

var port = 5000

var app = express()

var apiRoutes = express.Router()
var HOST = 'https://news-at.zhihu.com';

// 列表信息
apiRoutes.get('/4/themes', function (req, res) {
  var url = HOST+'/api/4/themes'
  axios.get(url).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/4/news/latest', function (req, res) {
  var url = HOST+'/api/4/news/latest'
  axios.get(url).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/4/news/', function (req, res) {
  var url = HOST+'/api/4/news/'+id
  axios.get(url).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/4/theme/:id', function (req, res) {
  var url = HOST+'/api/4/theme/'+req.params.id
  axios.get(url).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/4/news/:id', function (req, res) {
  var url = HOST+'/api/4/news/'+req.params.id
  axios.get(url).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/4/news/before/:id', function (req, res) {
  var url = HOST+'/api/4/news/before/'+req.params.id
  axios.get(url).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
