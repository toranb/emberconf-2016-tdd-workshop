import Ember from 'ember';
import inject from 'admin/utilities/inject';

export default Ember.Route.extend({
    service: Ember.inject.service('transition'),
    repository: inject('user'),
    model: function(params) {
        var repository = this.get('repository');
        var model = repository.fetchById(params.user_id);
        return model;
    },
    actions: {
        willTransition: function(transition) {
            var model = this.currentModel.model;
            if(model && model.get('isDirty')) {
                Ember.$('.x-modal').show();
                Ember.$('.x-modal-backdrop').show();
                var service = this.get('service');
                service.attempt = transition;
                service.model = model;
                transition.abort();
            }
        }
    }
});
