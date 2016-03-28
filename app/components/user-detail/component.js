import Ember from 'ember';
import {ValidationMixin, validate} from 'ember-cli-simple-validation/mixins/validate';

export default Ember.Component.extend(ValidationMixin, {
    nameValidation: validate('model.name'),
    actions: {
        changed: function(new_role_id) {
            var user = this.get('model');
            user.change_role(new_role_id);
        },
        nameDidChange: function(value) {
            this.get('model').set('name', value);
        },
        save: function() {
            this.set('submitted', true);
            if(this.get('valid')) {
                this.attrs['on-save']();
            }
        }
    }
});
