import {test, module} from 'admin/tests/helpers/qunit';
import registration from 'admin/tests/helpers/registration';

var store, service;

module('unit: store service test', {
    beforeEach() {
        store = registration(this.container, this.registry, ['model:status', 'service:store']);
        service = this.container.lookup('service:store');
    }
});

test('will proxy any method to the actual store object', function(assert) {
    service.push('status', {id: 1, name: 'x'});
    service.push('status', {id: 2, name: 'y'});
    assert.equal(service.find('status').get('length'), 2);
    assert.equal(store.find('status').get('length'), 2);
    service.clear('status');
    assert.equal(service.find('status').get('length'), 0);
    assert.equal(store.find('status').get('length'), 0);
});
