(function(global){

  global.util = global.util || {};

  var __waiters = {
    IMG: function (image, onLoaded, onError) {
      if (!image.complete) {
        image.addEventListener('load', function internalOnLoaded (e) {
          image.removeEventListener('load', internalOnLoaded, false);
          onLoaded.call(image, e);
        }, false);
        image.addEventListener('error', function internalOnError (e) {
          image.removeEventListener('error', internalOnError, false);
          onError.call(image, e);
        }, false);
      }
      else {
        setTimeout(onLoaded(), 0);
      }
    },
    VIDEO: function (video, onLoaded, onError) {
      video.addEventListener('canplaythrough', function internalOnCanPlayThrough (e) {
        video.removeEventListener('canplaythrough', internalOnCanPlayThrough, false);
        onLoaded.call(video, e);
      }, false);
      video.addEventListener('error', function internalOnError (e) {
        video.removeEventListener('error', internalOnError, false);
        onError.call(video, e);
      }, false);
    },
    AUDIO: function (audio, onLoaded, onError) {
      audio.addEventListener('canplaythrough', function internalOnCanPlayThrough (e) {
        audio.removeEventListener('canplaythrough', internalOnCanPlayThrough, false);
        onLoaded.call(audio, e);
      }, false);
      audio.addEventListener('error', function internalOnError (e) {
        audio.removeEventListener('error', internalOnError, false);
        onError.call(audio, e);
      }, false);
    }
  };

  var __loader = {
    ensureLoaded: function (assets, callback) {
      if (Number(assets.length) !== assets.length) {
        __loader.ensureLoaded([assets], function () {
          callback(assets);
        });
        return;
      }

      var itemsFinished = 0;

      function checkItems () {
        if (itemsFinished === assets.length) {
          callback(assets);
        }
      }

      function itemErrorCallback () {
        ++itemsFinished;
        checkItems();
      }

      function itemLoadedCallback () {
        ++itemsFinished;
        checkItems();
      }

      assets.forEach(function (asset) {
        if (__waiters[asset.nodeName]) {
          __waiters[asset.nodeName](asset, itemLoadedCallback, itemErrorCallback);
        }
      });
    }
  };

  global.util.loader = __loader;

}(window));