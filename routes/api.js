var express = require('express');
var Mock = require('mockjs');
var router = express.Router();
var data = require('../data/data');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('This is api for test');
});

router.get('/fun/ktv/precreateorder', function(req, res, next) {
  for (var i in data) {
    if (data[i].url == '/fun/ktv/precreateorder') {
      res.jsonp(Mock.mock(data[i].tpl));
      break;
    }
  }
});

module.exports = router;
