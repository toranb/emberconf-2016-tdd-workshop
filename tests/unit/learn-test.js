import Ember from 'ember';
import {test, module} from 'qunit';

var Person = Ember.Object.extend({
    number: 2,
    init: function() {
        this.set('number', 9);
    }
});

module('one learning to test');

test('equals 2 right?', function(assert) {
    var a1 = [1, 2, 3];
    var b1 = [1, 2, 3];
    assert.deepEqual(a1, b1);
});
