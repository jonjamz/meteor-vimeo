Vimeo = function(arrayOfVideoIds, callback) {
  var getAndAddMetaData, id, runCallbackIfDone, self, _i, _len;
  self = this;
  check(arrayOfVideoIds, Match.Where(function(arr) {
    var item, _i, _len, _results;
    check(arr, Array);
    _results = [];
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      item = arr[_i];
      _results.push(check(item, String));
    }
    return _results;
  }));
  this._dep = new Deps.Dependency();
  this._len = arrayOfVideoIds.length;
  this._done = 0;
  this.videos = [];
  this.getVideos = function() {
    self._dep.depend();
    return self.videos;
  };
  runCallbackIfDone = function() {
    if (self._done === self._len) {
      if (callback != null) {
        callback();
      }
      return self._dep.changed();
    }
  };
  getAndAddMetaData = function(id,idx) {
    return HTTP.get("http://vimeo.com/api/v2/video/" + id + ".json", function(err, res) {
      if ((err != null) && ((typeof console !== "undefined" && console !== null ? console.error : void 0) != null)) {
        return console.error(err);
      } else {
        self.videos.splice(idx,0,{
          preview: res.data[0].thumbnail_large,
          src: "//player.vimeo.com/video/" + id,
          summary: res.data[0].description,
          title: res.data[0].title
        });
        self._done++;
        return runCallbackIfDone();
      }
    });
  };
  for (_i = 0, _len = arrayOfVideoIds.length; _i < _len; _i++) {
    id = arrayOfVideoIds[_i];
    getAndAddMetaData(id,_i);
  }
  return void 0;
};
