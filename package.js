Package.describe({
  summary: "Easily get videos from the Vimeo API, with Deps support for loading",
  version: "0.1.2",
  name: "mrt:vimeo",
  git: "https://github.com/jonjamz/meteor-vimeo"
});

Package.onUse(function (api, where) {
  api.versionsFrom('METEOR@0.9.1');
  api.use(["deps", "check", "http"], ["client"]);
  api.export && api.export('Vimeo');
  api.addFiles('vimeo.js', ['client']);
});

Package.onTest(function (api) {
  api.use('mrt:vimeo');
  api.addFiles('vimeo_tests.js', ['client', 'server']);
});
