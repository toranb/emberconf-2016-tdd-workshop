var ADMIN_ISSUE_FIXTURE = (function() {
    var factory = function() {
    };
    factory.prototype.list = function() {
        return [
            {id: 1, subject: 'Broken', tags: [{id: 20, name: 'bug'}, {id: 21, name: 'milestone'}]},
            {id: 2, subject: 'Missing', tags: [{id: 20, name: 'bug'}]},
            {id: 3, subject: 'Random', tags: [{id: 21, name: 'milestone'}]}
        ];
    };
    return factory;
})();

if (typeof window === 'undefined') {
    module.exports = new ADMIN_ISSUE_FIXTURE();
} else {
    define('admin/vendor/fixtures/issues', ['exports'], function (exports) {
        'use strict';
        return new ADMIN_ISSUE_FIXTURE();
    });
}
