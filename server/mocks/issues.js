var issues = require('../../vendor/fixtures/issues.js');

module.exports = function(app) {
  var express = require('express');
  var issuesRouter = express.Router();

  issuesRouter.get('/', function(req, res) {
    res.send(issues.list());
  });

  issuesRouter.put('/:id', function(req, res) {
    res.send({
      'issues': {
        id: req.params.id
      }
    });
  });

  app.use('/api/issues', issuesRouter);
};
