import {test, module} from 'admin/tests/helpers/qunit';
import registration from 'admin/tests/helpers/registration';

var store;

module('unit: issue model test', {
    beforeEach() {
        store = registration(this.container, this.registry, ['model:issue', 'model:status', 'service:store']);
    }
});

test('status property returns associated model or undefined', function(assert) {
    var issue = store.push('issue', {id: 1});
    store.push('status', {id: 8, name: 'Open', issues: [1]});
    var status = issue.get('status');
    assert.equal(status.get('id'), 8);
    assert.equal(status.get('name'), 'Open');
    status.set('issues', []);
    status = issue.get('status');
    assert.equal(status, undefined);
});

test('change_status will append the issue id to the statuses issues array', function(assert) {
    var issue = store.push('issue', {id: 1});
    var status = store.push('status', {id: 8, name: 'Open', issues: [9]});
    issue.change_status(8);
    assert.deepEqual(status.get('issues'), [9, 1]);
});

test('change_status will remove the issue id from the current statuses issues array', function(assert) {
    var issue = store.push('issue', {id: 1});
    var status = store.push('status', {id: 8, name: 'Open', issues: [9, 1, 7]});
    store.push('status', {id: 9, name: 'Closed', issues: []});
    issue.change_status(9);
    assert.deepEqual(status.get('issues'), [9, 7]);
});
