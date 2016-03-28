import Ember from 'ember';
import inject from 'admin/utilities/inject';

export default Ember.Controller.extend({
    repository: inject('user'),
    actions: {
        saveUser() {
            var model = this.get('model');
            var repository = this.get('repository');
            repository.update(model).then(() => {
                this.transitionToRoute('users');
            });
        }
    }
});
