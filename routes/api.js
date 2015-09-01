var express = require('express');
var Mock = require('mockjs');
var redis = require('redis');
var router = express.Router();
var data = require('../data/data');
var client = redis.createClient();

client.on('error', function(e) {
  console.log('ERROR: ' + e);
})

router.get('/', function(req, res, next) {
  res.send('This is index page');
});

router.get(/^(.*)$/, function(req, res, next) {
  var path = req.params[0];
  var query = req.query;

  client.get(path, function(e, data) {
    res.json({
      path: path,
      data: data
    });
  })
});

router.post('/create', function(req, res, next) {
  var query = req.body;

  client.set(query.path, query.data, function(e, r) {
    res.json(r);
  })
});

module.exports = router;
