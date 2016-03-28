import Ember from 'ember';
import QUnit from 'qunit';
import { test, module } from 'qunit';
import users from 'admin/vendor/fixtures/users';
import startApp from 'admin/tests/helpers/start-app';

var application;

module('Acceptance: Users', {
    beforeEach: function() {
        application = startApp();
    },
    afterEach: function() {
        Ember.run(application, 'destroy');
    }
});

QUnit.skip('when model is dirty a prompt allows user to cancel or rollback', function(assert) {
    server.get('/users', (db, request) => {
      return users.list();
    });
    visit('/users/1');
    fillIn('.detail-name', 'wat');
    click('.list-detail-link:eq(1)');
    andThen(function() {
        assert.equal(currentURL(), '/users/1');
        assert.ok(find('.x-modal').is(':visible'));
    });
    click('.x-modal-cancel');
    andThen(function() {
        assert.equal(currentURL(), '/users/1');
        assert.ok(find('.x-modal').is(':hidden'));
    });
});

test('users url will show list of users including each name', function(assert) {
    server.get('/users', (db, request) => {
      return users.list();
    });
    visit('/users');
    andThen(function() {
        assert.equal(currentURL(), '/users');
        assert.equal(find('.user-list-item').length, 3);
        assert.equal(find('.list-detail-link:eq(0)').text(), users.list()[0].name);
        assert.equal(find('.list-detail-link:eq(1)').text(), users.list()[1].name);
        assert.equal(find('.list-detail-link:eq(2)').text(), users.list()[2].name);
    });
});

test('clicking the details link should load up the detail view', function(assert) {
    server.get('/users', (db, request) => {
        return users.list();
    });
    visit('/users');
    click('.list-detail-link:eq(0)');
    andThen(function() {
        assert.equal(currentURL(), '/users/1');
        assert.equal(find('.detail-name').val(), users.list()[0].name);
        assert.equal(find('.save-btn').text(), 'Save');
    });
});

test('clicking save will fire ajax request and redirect', function(assert) {
    var GUEST_ROLE_PRIMARY_KEY = 3;
    server.get('/users', (db, request) => {
        return users.list();
    });
    visit('/users/1');
    fillIn('.detail-name', 'wat');
    fillIn('.detail-role', GUEST_ROLE_PRIMARY_KEY);
    server.put('/users/1', (db, request) => {
        assert.equal(request.requestBody, Ember.$.param({name: 'wat', role: GUEST_ROLE_PRIMARY_KEY}));
    });
    click('.save-btn');
    andThen(function() {
        assert.equal(currentURL(), '/users');
    });
});
