import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel() {
        var store = this.get('store');
        var roles = Ember.$('[preload-roles]').data('configuration');
        roles.forEach(function(role) {
            store.push('role', role);
        });
        var statuses = Ember.$('[preload-status]').data('configuration');
        statuses.forEach(function(status) {
            store.push('status', status);
        });
    }
});
