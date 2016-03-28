import Ember from 'ember';
import inject from 'admin/utilities/deserializer';
import PromiseMixin from 'ember-promise/mixins/promise';

export default Ember.Object.extend({
    deserializer: inject('issue'),
    find: function() {
        let store = this.get('store');
        PromiseMixin.xhr('/api/issues').then(response => {
            this.get('deserializer').deserialize(response);
        });
        return store.find('issue');
    },
    update: function(model) {
        let endpoint = '/api/issues/' + model.get('id');
        return PromiseMixin.xhr(endpoint, 'PUT', {data: model.serialize()}).then(() => {
            model.save();
        });
    },
    fetchById: function(id) {
        let store = this.get('store');
        return store.find('issue', id);
    }
});
