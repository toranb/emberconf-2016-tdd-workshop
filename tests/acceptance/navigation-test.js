import Ember from 'ember';
import { test, module } from 'qunit';
import users from 'admin/vendor/fixtures/users';
import startApp from 'admin/tests/helpers/start-app';

var application;

module('Acceptance: Navigation', {
    beforeEach: function() {
        application = startApp();
    },
    afterEach: function() {
        Ember.run(application, 'destroy');
    }
});

test('should redirect to users when end user visits the root url', function(assert) {
    server.get('/users', (db, request) => {
      return users.list();
    });
    visit('/');
    andThen(function() {
        assert.equal(currentURL(), '/users');
    });
});
