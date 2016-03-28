import Ember from 'ember';

var IssueDeserializer = Ember.Object.extend({
    deserialize(response) {
        let store = this.get('store');
        response.forEach(function(json) {
            store.push('issue', json);
        });
    }
});

export default IssueDeserializer;
