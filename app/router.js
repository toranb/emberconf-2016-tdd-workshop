import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('users', function() {
    this.route('detail', { path: "/:user_id" });
  });
  this.route('issues', function() {
    this.route('detail', { path: "/:issue_id" });
  });
});

export default Router;
