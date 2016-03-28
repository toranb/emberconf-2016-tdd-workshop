import Ember from 'ember';
import inject from 'admin/utilities/inject';

export default Ember.Route.extend({
    repository: inject('issue'),
    model: function() {
        var repository = this.get('repository');
        return repository.find();
    }
});
