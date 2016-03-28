import Ember from 'ember';
import inject from 'admin/utilities/inject';

export default Ember.Controller.extend({
    repository: inject('issue'),
    actions: {
        saveIssue() {
            var model = this.get('model');
            var repository = this.get('repository');
            repository.update(model).then(() => {
                this.transitionToRoute('issues');
            });
        }
    }
});
