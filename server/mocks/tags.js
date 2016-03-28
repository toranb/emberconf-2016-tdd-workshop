var tags = require('../../vendor/fixtures/tags.js');

module.exports = function(app) {
  var express = require('express');
  var tagsRouter = express.Router();

  tagsRouter.get('/', function(req, res) {
    res.send(tags.list());
  });

  app.use('/api/tags', tagsRouter);
};
