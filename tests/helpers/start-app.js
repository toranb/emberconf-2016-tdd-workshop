import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';


function upload(app, action, files) {
    Ember.run(function() {
        var component = app.__container__.lookup('component:user-detail');
        var event = {target: {files: files}};
        component.send(action, event);
    });
    return app.testHelpers.wait();
};

Ember.Test.registerAsyncHelper('upload', upload);

export default function startApp(attrs) {
  let application;

  let attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
