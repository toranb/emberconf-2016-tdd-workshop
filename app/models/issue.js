import Ember from 'ember';
import { attr, Model } from 'ember-cli-simple-store/model';

var Issue = Model.extend({
    subject: attr(),
    store: Ember.inject.service('store'),
    status: Ember.computed.alias('belongs_to.firstObject'),
    belongs_to: Ember.computed(function() {
        let issue_id = this.get('id');
        let store = this.get('store');
        let filter = function(status) {
            let issues = status.get('issues');
            return Ember.$.inArray(issue_id, issues) > -1;
        };
        return store.find('status', filter, ['issues']);
    }),
    change_status: function(new_status_id) {
        const issue_id = this.get('id');
        const store = this.get('store');
        const old_status = this.get('status');
        if(old_status) {
            const old_status_issues = old_status.get('issues') || [];
            const updated_old_status_issues = old_status_issues.filter(function(id) {
                return id !== issue_id;
            });
            old_status.set('issues', updated_old_status_issues);
        }
        const new_status = store.find('status', new_status_id);
        const new_status_issues = new_status.get('issues') || [];
        new_status.set('issues', new_status_issues.concat(issue_id));
    },
    serialize: function() {
        return {
            subject: this.get('subject'),
            status: this.get('status.id')
        };
    }
});

export default Issue;
