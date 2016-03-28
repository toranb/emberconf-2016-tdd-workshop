import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

export default Ember.Service.extend({
    store: Ember.computed(function() {
        return getOwner(this).lookup('store:main');
    }),
    init: function() {
        this._super(...arguments);
        var store = this.get('store');
        for (var method in store) {
            if (typeof store[method] === 'function') {
                this.proxyMethod(method);
            }
        }
    },
    proxyMethod: function(method) {
        var store = this.get('store');
        this[method] = function() {
            return store[method](...arguments);
        };
    }
});
