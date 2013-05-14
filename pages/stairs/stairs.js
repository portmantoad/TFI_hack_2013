(function() {
  var FADE_TRANSITION_DURATION = 1000;

  var stairCounterSpan, floorCounterSpan;
  var video;
  var popcorn;
  var numFloors = 1;
  var numSteps = 0;
  var currentFloorAudioIndex = 0;
  var backgroundAudio;

  function positionVideo () {
    var width, height;
    var aspectRatio = video.videoWidth / video.videoHeight;

    if (window.innerWidth > window.innerHeight * aspectRatio) {
      width = window.innerWidth;
      height = width / aspectRatio;
    }
    else {
      height = window.innerHeight;
      width = height * aspectRatio;
    }

    video.style.width = width + 'px';
    video.style.height = height + 'px';

    video.style.top = window.innerHeight / 2 - height / 2 + 'px';
    video.style.left = window.innerWidth / 2 - width / 2 + 'px';
  }

  function init(e) {
    stairCounterSpan = document.querySelector('#stair-counter > span');
    floorCounterSpan = document.querySelector('#floor-counter > span');
    video = document.querySelector('video');

    var stepData = JSON.parse(document.querySelector('#step-data').innerText);
    var floorData = JSON.parse(document.querySelector('#floor-data').innerText);

    Popcorn.plugin('step', {
      start: function () {
        ++numSteps;
        stairCounterSpan.innerHTML = numSteps;
      }
    });

    Popcorn.plugin('floor', {
      start: function () {
        ++numFloors;
        currentFloorAudioIndex = 0;
        floorCounterSpan.innerHTML = numFloors;
      }
    });

    var assets = [].concat(document.querySelector('audio')).concat(document.querySelector('video'));

    util.loader.ensureLoaded(assets, function(){
      window.addEventListener('resize', positionVideo, false);
      positionVideo();

      popcorn = Popcorn(video, {
        frameAnimation: true
      });

      stepData.forEach(function (step) {
        // Attempt to force a float for time, wrt 24 fps.
        popcorn.step({ start: Popcorn.util.toSeconds(step, 24) });
      });

      floorData.forEach(function (step) {
        popcorn.floor({ start: step });
      });

      video.classList.add('full-opacity');

      var currentFloorAudio = null;
      var audioOnFloors = [];
      Array.prototype.forEach.call(document.querySelectorAll('audio[data-floor]'), function (element) {
        var floorIndex = Number(element.getAttribute('data-floor'));
        audioOnFloors[floorIndex] = audioOnFloors[floorIndex] || [];
        audioOnFloors[floorIndex].push(element);
        prepareVolumeTweenForElement(element, 0);
      });

      function prepareVolumeTweenForElement (element, startVolume) {
        var _targetVolume, _realVolume;
        element.volume = _targetVolume = _realVolume = startVolume || 0;
        element.processVolumeTween = function () {
          _realVolume -= (_realVolume - element.targetVolume) * .1;
          var newVolume = Math.round(_realVolume * 1000) / 1000; // quick decimal truncate
          if (newVolume !== element.volume) {
            element.volume = newVolume;
            return true;
          }
          volumeTweenElements.splice(volumeTweenElements.indexOf(element), 1);
          return false;
        }
        Object.defineProperty(element, 'targetVolume', {
          get: function() {
            return _targetVolume;
          },
          set: function (val) {
            if (volumeTweenElements.indexOf(element) === -1) {
              volumeTweenElements.push(element);              
            }
            _targetVolume = val;
          }
        });
      }

      var volumeTweenElements = [];
      var volumeLoopTimeout = -1;
      function volumeLoop () {
        var changed = false;

        volumeTweenElements.forEach(function (obj) {
          if (obj) {
            changed = obj.processVolumeTween() ? true : changed;
          }
        });

        setTimeout(volumeLoop, 10);
      }
      volumeLoop();

      var playing = false;
      var keyUpTimeout = -1;
      function attemptToPlayVideo (e) {
        e.preventDefault();
        if (!playing) {
          playing = true;
          video.play();
          video.classList.remove('paused');
          backgroundAudio.targetVolume = 0;
          if (currentFloorAudio) {
            currentFloorAudio.targetVolume = 0;
            setTimeout(function(){
              if (currentFloorAudio) {
                currentFloorAudio.pause();
                currentFloorAudio = null;
              }
            }, FADE_TRANSITION_DURATION);
          }
        }
      }

      function attemptToPauseVideo (e) {
        e.preventDefault();
        if (keyUpTimeout === -1) {
          video.classList.add('paused');
          keyUpTimeout = setTimeout(function(){
            playing = false;
            video.pause();
            keyUpTimeout = -1;

            backgroundAudio.targetVolume = 1;

            if (!currentFloorAudio) {
              currentFloorAudio = audioOnFloors[numFloors][currentFloorAudioIndex++];

              if (currentFloorAudio) {
                currentFloorAudio.volume = 0;
                currentFloorAudio.targetVolume = 1;
                currentFloorAudio.play();
                currentFloorAudio.addEventListener('ended', function (e) {
                  currentFloorAudio = null;
                }, false);
              }
            }
          }, FADE_TRANSITION_DURATION);
        }
      }

      window.addEventListener('keydown', attemptToPlayVideo, false);
      window.addEventListener('keyup', attemptToPauseVideo, false);

      var progressButton = document.querySelector('#progress-button');
      
      progressButton.addEventListener('mousedown', function (e) {
        attemptToPlayVideo(e);
        function onMouseUp (e) {
          attemptToPauseVideo(e);
          window.removeEventListener('mouseup', onMouseUp, false);
        }
        window.addEventListener('mouseup', onMouseUp, false);
      }, false);

      var backgroundAudioClones = [
        document.querySelector('audio[data-background]'),
        document.querySelector('audio[data-background]').cloneNode(true)
      ];

      var currentBackgroundAudioIndex = 0;

      prepareVolumeTweenForElement(backgroundAudioClones[0], 0);
      prepareVolumeTweenForElement(backgroundAudioClones[1], 0);

      function backgroundAudioLoop () {
        if (backgroundAudio.currentTime > backgroundAudio.duration - .2) {
          var lastTargetVolume = backgroundAudio.targetVolume;
          var lastVolume = backgroundAudio.volume;
          var lastBackgroundAudio = backgroundAudio;
          setTimeout(function(){
            lastBackgroundAudio.currentTime = 0;
          }, 100);
          currentBackgroundAudioIndex = (currentBackgroundAudioIndex + 1) % 2;
          backgroundAudio = backgroundAudioClones[currentBackgroundAudioIndex];
          backgroundAudio.volume = lastVolume;
          backgroundAudio.targetVolume = lastTargetVolume;
          backgroundAudio.play();
        }
        setTimeout(backgroundAudioLoop, 100);
      }

      backgroundAudio = backgroundAudioClones[0];
      backgroundAudioClones[0].play();
      backgroundAudioLoop();

    });
  }

  document.addEventListener('DOMContentLoaded', init, false);
}());