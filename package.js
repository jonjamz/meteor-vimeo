Package.describe({
  summary: "Easily get videos from the Vimeo API, with Deps support for loading"
});

Package.on_use(function (api, where) {
  api.use(["deps", "check"], ["client"]);
  api.export && api.export('ReactiveObject');
  api.add_files('vimeo.js', ['client']);
});

Package.on_test(function (api) {
  api.use('vimeo');

  api.add_files('vimeo_tests.js', ['client', 'server']);
});
