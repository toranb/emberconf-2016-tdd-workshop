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
