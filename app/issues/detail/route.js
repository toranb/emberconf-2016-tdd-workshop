import Ember from 'ember';
import inject from 'admin/utilities/inject';

export default Ember.Route.extend({
    repository: inject('issue'),
    model: function(params) {
        var repository = this.get('repository');
        var model = repository.fetchById(params.issue_id);
        return model;
    }
});
