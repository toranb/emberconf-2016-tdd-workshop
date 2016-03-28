var ADMIN_TAG_FIXTURE = (function() {
    var factory = function() {
    };
    factory.prototype.list = function() {
        return [
            {id: 22, name: 'go'},
            {id: 23, name: 'gone'},
            {id: 24, name: 'gonzo'},
            {id: 25, name: 'gondi'},
            {id: 27, name: 'google'},
            {id: 26, name: 'gosh'},
            {id: 28, name: 'gossip'}
        ];
    };
    return factory;
})();

if (typeof window === 'undefined') {
    module.exports = new ADMIN_TAG_FIXTURE();
} else {
    define('admin/vendor/fixtures/tags', ['exports'], function (exports) {
        'use strict';
        return new ADMIN_TAG_FIXTURE();
    });
}
