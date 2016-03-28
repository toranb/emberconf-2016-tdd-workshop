import Ember from 'ember';
import {ValidationMixin, validate} from 'ember-cli-simple-validation/mixins/validate';

export default Ember.Component.extend(ValidationMixin, {
    subjectValidation: validate('model.subject'),
    actions: {
        subjectDidChange: function(value) {
            this.get('model').set('subject', value);
        },
        save: function() {
            this.set('submitted', true);
            if(this.get('valid')) {
                this.attrs['on-save']();
            }
        }
    }
});
