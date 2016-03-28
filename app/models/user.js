import Ember from 'ember';
import { attr, Model } from 'ember-cli-simple-store/model';

var User = Model.extend({
    name: attr(),
    store: Ember.inject.service('store'),
    role: Ember.computed.alias('belongTo.firstObject'),
    belongTo: Ember.computed(function() {
        var userId = this.get('id');
        var store = this.get('store');
        var filter = function(role) {
            var users = role.get('users');
            return Ember.$.inArray(userId, users) > -1;
        };
        return store.find('role', filter, ['users']);
    }),
    change_role: function(new_role_id) {
        var userId = this.get('id');
        var store = this.get('store');
        var old_role = this.get('role');
        if(old_role) {
            var old_role_users = old_role.get('users');
            var updated_old_role_users = old_role_users.filter(function(id) {
                return id !== userId;
            });
            old_role.set('users', updated_old_role_users);
        }
        var new_role = store.find('role', new_role_id);
        var new_role_users = new_role.get('users') || [];
        new_role.set('users', new_role_users.concat(userId));
    },
    serialize: function() {
        return {
            name: this.get('name'),
            role: this.get('role.id')
        };
    }
});

export default User;
