import Ember from 'ember';
import { test, module } from 'qunit';
import tags from 'admin/vendor/fixtures/tags';
import issues from 'admin/vendor/fixtures/issues';
import startApp from 'admin/tests/helpers/start-app';

var application;

module('Acceptance: Issues', {
    beforeEach: function() {
        application = startApp();
    },
    afterEach: function() {
        Ember.run(application, 'destroy');
    }
});

test('issues url will show list of issues including each subject', function(assert) {
    server.get('/issues', (db, request) => {
      return issues.list();
    });
    visit('/issues');
    andThen(function() {
        assert.equal(currentURL(), '/issues');
        assert.equal(find('.issue-list-item').length, 3);
        assert.equal(find('.list-detail-link:eq(0)').text(), issues.list()[0].subject);
        assert.equal(find('.list-detail-link:eq(1)').text(), issues.list()[1].subject);
        assert.equal(find('.list-detail-link:eq(2)').text(), issues.list()[2].subject);
    });
});

test('clicking the details link should load up the detail view', function(assert) {
    server.get('/issues', (db, request) => {
      return issues.list();
    });
    visit('/issues');
    click('.list-detail-link:eq(0)');
    andThen(function() {
        assert.equal(currentURL(), '/issues/1');
        assert.equal(find('.detail-subject').val(), issues.list()[0].subject);
        assert.equal(find('.save-btn').text(), 'Save');
    });
});

test('should fire ajax request and redirect user', function(assert) {
    server.get('/issues', () => {
        return issues.list();
    });
    visit('/issues/1');
    fillIn('.detail-subject', 'x');
    fillIn('.detail-status', 9);
    server.put('/issues/1', (db, request) => {
        assert.equal(request.requestBody, Ember.$.param({subject: 'x', status: 9}));
    });
    click('.save-btn');
    andThen(function() {
        assert.equal(currentURL(), '/issues');
    });
});
