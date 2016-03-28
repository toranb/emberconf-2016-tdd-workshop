import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import registration from 'admin/tests/helpers/registration';

var store;

moduleForComponent('issue-detail', 'integration: issue-detail test', {
    integration: true,
    setup() {
        store = registration(this.container, this.registry, ['model:issue', 'model:status']);
    }
});

test('each status should be option in the status select box', function(assert) {
    var issue = store.push('issue', {id: 1});
    store.push('status', {id: 8, name: 'Open'});
    store.push('status', {id: 9, name: 'Closed'});
    var statuses = store.find('status');
    this.set('model', issue);
    this.set('statuses', statuses);
    this.render(hbs`{{issue-detail model=model statuses=statuses}}`);
    var component = this.$('.detail-status');
    assert.equal(component.find('option').length, 2);
    assert.equal(component.find('option:eq(0)').val(), 8);
    assert.equal(component.find('option:eq(1)').val(), 9);
    assert.equal(component.find('option:eq(0)').text(), 'Open');
    assert.equal(component.find('option:eq(1)').text(), 'Closed');
});

test('selected status will match the status of the user', function(assert) {
    var issue = store.push('issue', {id: 1});
    store.push('status', {id: 8, name: 'Open', issues: []});
    store.push('status', {id: 9, name: 'Closed', issues: [1]});
    var statuses = store.find('status');
    this.set('model', issue);
    this.set('statuses', statuses);
    this.render(hbs`{{issue-detail model=model statuses=statuses}}`);
    var component = this.$('.detail-status');
    assert.equal(component.find('option:selected').text(), 'Closed');
});

test('onchange will alter the issues status property', function(assert) {
    var issue = store.push('issue', {id: 1});
    store.push('status', {id: 8, name: 'Open', issues: []});
    store.push('status', {id: 9, name: 'Closed', issues: [1]});
    var statuses = store.find('status');
    this.set('model', issue);
    this.set('statuses', statuses);
    this.render(hbs`{{issue-detail model=model statuses=statuses}}`);
    var component = this.$('.detail-status');
    assert.equal(component.find('option:selected').text(), 'Closed');
    component.val(8).trigger('change');
    assert.equal(component.find('option:selected').text(), 'Open');
    assert.equal(issue.get('status.id'), 8);
});
