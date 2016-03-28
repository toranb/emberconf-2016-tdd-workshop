import Ember from 'ember';
import inject from 'admin/utilities/inject';

export default Ember.Route.extend({
    repository: inject('issue'),
    statusRepository: inject('status'),
    model: function(params) {
        var repository = this.get('repository');
        var statusRepository = this.get('statusRepository');
        var model = repository.fetchById(params.issue_id);
        var statuses = statusRepository.fetch();
        return {model, statuses};
    },
    setupController: function(controller, hash) {
        controller.setProperties(hash);
    }
});
