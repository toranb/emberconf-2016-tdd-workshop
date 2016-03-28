import Ember from 'ember';

export default Ember.Component.extend({
    service: Ember.inject.service('transition'),
    actions: {
        cancel: function() {
            Ember.$('.x-modal').hide();
            Ember.$('.x-modal-backdrop').hide();
        },
        rollback: function() {
            var service = this.get('service');
            var attempt = service.attempt;
            var model = service.model;
            this.send('cancel');
            model.rollback();
        }
    }
});
