import {test, module} from 'admin/tests/helpers/qunit';
import issues from 'admin/vendor/fixtures/issues';
import IssueDeserializer from 'admin/deserializers/issue';
import registration from 'admin/tests/helpers/registration';

var store;

module('unit: issue deserializer test', {
    beforeEach() {
        store = registration(this.container, this.registry, ['model:issue']);
    }
});

test('api response deserialized into issue models', function(assert) {
    var subject = IssueDeserializer.create({store: store});
    subject.deserialize(issues.list());
    var models = store.find('issue');
    assert.equal(models.get('length'), 3);
    assert.equal(models.objectAt(0).get('subject'), issues.list()[0].subject);
});
