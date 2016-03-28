import Ember from 'ember';
import { test, module } from 'qunit';
import users from 'admin/vendor/fixtures/users';
import startApp from 'admin/tests/helpers/start-app';

var application, store;

module('Acceptance: Bootstrap configuration test', {
    beforeEach: function() {
        application = startApp();
        store = application.__container__.lookup('store:main');
    },
    afterEach: function() {
        Ember.run(application, 'destroy');
    }
});

test('toran role configuration data is loaded on boot', function(assert) {
    server.get('/users', (db, request) => {
      return users.list();
    });
    visit('/');
    andThen(function() {
        assert.equal(store.find('role').get('length'), 2);
    });
});
