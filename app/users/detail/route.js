import Ember from 'ember';
import inject from 'admin/utilities/inject';

export default Ember.Route.extend({
    service: Ember.inject.service('transition'),
    repository: inject('user'),
    roleRepository: inject('role'),
    model: function(params) {
        var repository = this.get('repository');
        var roleRepository = this.get('roleRepository');
        var roles = roleRepository.fetch();
        var model = repository.fetchById(params.user_id);
        return {model, roles};
    },
    setupController: function(controller, hash) {
        // controller.set('model', hash.model);
        // controller.set('roles', hash.roles);
        controller.setProperties(hash);
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
