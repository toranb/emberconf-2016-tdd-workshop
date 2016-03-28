import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import registration from 'admin/tests/helpers/registration';

var store;

moduleForComponent('user-detail', 'integration: user-detail test', {
    integration: true,
    setup() {
        store = registration(this.container, this.registry, ['model:user', 'model:role']);
    }
});

test('validation works like we expect', function(assert) {
    var user = store.push('user', {id: 1});
    this.set('model', user);
    this.render(hbs`{{user-detail model=model}}`);
    var input = this.$('.detail-name');
    var validation = this.$('.name-validation-error');
    assert.equal(validation.hasClass('hidden'), true);
    input.val('x').trigger('input');
    assert.equal(validation.hasClass('hidden'), true);
    input.val('').trigger('input');
    assert.equal(validation.hasClass('hidden'), false);
});

test('each role passed in will be an option in the select', function(assert) {
    var user = store.push('user', {id: 1});
    store.push('role', {id: 2, name: 'Admin'});
    store.push('role', {id: 3, name: 'Guest'});
    var roles = store.find('role');
    this.set('model', user);
    this.set('roles', roles);
    this.render(hbs`{{user-detail model=model roles=roles}}`);
    var component = this.$('.detail-role');
    assert.equal(component.find('option').length, 2);
    assert.equal(component.find('option:eq(0)').val(), 2);
    assert.equal(component.find('option:eq(1)').val(), 3);
    assert.equal(component.find('option:eq(0)').text(), 'Admin');
    assert.equal(component.find('option:eq(1)').text(), 'Guest');
});

test('the selected role matches the users role property', function(assert) {
    var user = store.push('user', {id: 1});
    store.push('role', {id: 2, name: 'Admin', users: []});
    store.push('role', {id: 3, name: 'Guest', users: [1]});
    var roles = store.find('role');
    this.set('model', user);
    this.set('roles', roles);
    this.render(hbs`{{user-detail model=model roles=roles}}`);
    var component = this.$('.detail-role');
    assert.equal(component.find('option:selected').text(), 'Guest');
});

test('onchange should alter the users role', function(assert) {
    var ADMIN_ROLE_PRIMARY_KEY = 2;
    var user = store.push('user', {id: 1});
    store.push('role', {id: 2, name: 'Admin', users: []});
    store.push('role', {id: 3, name: 'Guest', users: [1]});
    var roles = store.find('role');
    this.set('model', user);
    this.set('roles', roles);
    this.render(hbs`{{user-detail model=model roles=roles}}`);
    var component = this.$('.detail-role');
    assert.equal(component.find('option:selected').text(), 'Guest');
    component.val(ADMIN_ROLE_PRIMARY_KEY).trigger('change');
    assert.equal(component.find('option:selected').text(), 'Admin');
    assert.equal(user.get('role.id'), ADMIN_ROLE_PRIMARY_KEY);
});
