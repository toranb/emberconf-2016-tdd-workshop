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
    var selector = 'select.detail-status + .selectize-control';
    var component = this.$(selector);
    assert.equal(component.find('div.option').length, 2);
    assert.equal(component.find('div.option:eq(0)').data('value'), 8);
    assert.equal(component.find('div.option:eq(1)').data('value'), 9);
    assert.equal(component.find('div.option:eq(0)').text(), 'Open');
    assert.equal(component.find('div.option:eq(1)').text(), 'Closed');
});

test('selected status will match the status of the user', function(assert) {
    var issue = store.push('issue', {id: 1});
    store.push('status', {id: 8, name: 'Open', issues: []});
    store.push('status', {id: 9, name: 'Closed', issues: [1]});
    var statuses = store.find('status');
    this.set('model', issue);
    this.set('statuses', statuses);
    this.render(hbs`{{issue-detail model=model statuses=statuses}}`);
    var selector = 'select.detail-status + .selectize-control';
    var component = this.$(selector);
    assert.equal(component.find('div.item').length, 1);
    assert.equal(component.find('div.item').text(), 'Closed');
});

test('onchange will alter the issues status property', function(assert) {
    var issue = store.push('issue', {id: 1});
    var open = store.push('status', {id: 8, name: 'Open', issues: []});
    var closed = store.push('status', {id: 9, name: 'Closed', issues: [1]});
    var statuses = store.find('status');
    this.set('model', issue);
    this.set('statuses', statuses);
    this.render(hbs`{{issue-detail model=model statuses=statuses}}`);
    var selector = 'select.detail-status + .selectize-control';
    var component = this.$(selector);
    assert.equal(component.find('div.item').text(), 'Closed');
    this.$(`${selector} > .selectize-input`).trigger('click');
    this.$(`${selector} > .selectize-dropdown div.option:eq(0)`).trigger('click').trigger('change');
    assert.equal(component.find('div.item').text(), 'Open');
    assert.equal(issue.get('status.id'), 8);
    assert.deepEqual(open.get('issues'), [1]);
    assert.deepEqual(closed.get('issues'), []);
});
