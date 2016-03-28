import {test, module} from 'admin/tests/helpers/qunit';
import registration from 'admin/tests/helpers/registration';

var store;

module('unit: user model test', {
    beforeEach() {
        store = registration(this.container, this.registry, ['model:user', 'model:role', 'service:store']);
    }
});

test('role property returns the associated model or undefined', function(assert) {
    var user = store.push('user', {id: 1});
    store.push('role', {id: 2, name: 'Admin', users: [1]});
    var role = user.get('role');
    assert.equal(role.get('id'), 2);
    assert.equal(role.get('name'), 'Admin');
    role.set('users', []);
    role = user.get('role');
    assert.equal(role, undefined);
});

test('the user id will be appended to the (new) role users array', function(assert) {
    var user = store.push('user', {id: 1});
    var role = store.push('role', {id: 2, name: 'Admin', users: [9, 8]});
    user.change_role(2);
    assert.deepEqual(role.get('users'), [9, 8, 1]);
});

test('the user id will be removed from the (current) role users array', function(assert) {
    var user = store.push('user', {id: 1});
    var admin_role = store.push('role', {id: 2, name: 'Admin', users: [9, 1, 8]});
    store.push('role', {id: 3, name: 'Guest', users: []});
    user.change_role(3);
    assert.deepEqual(admin_role.get('users'), [9, 8]);
});
