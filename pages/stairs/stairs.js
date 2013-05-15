(function() {
  var FADE_TRANSITION_DURATION = 1000;
  var FLOOR_SOUND_DELAY = 500;

  var video;
  var popcorn;
  
  var numFloors = 1;
  var numSteps = 0;

  var volumeTweenController;
  var backgroundAudioController;
  var floorAudioController;

  function positionVideo () {
    var width, height;
    var aspectRatio = video.videoWidth / video.videoHeight;

    // TODO: fix this scaling
    if (window.innerHeight * aspectRatio < window.innerWidth) {
      width = window.innerWidth;
      height = width / aspectRatio;      
    }
    else {
      height = window.innerHeight;
      width = height * aspectRatio;      
    }

    video.width = width;
    video.height = height;

    video.style.width = width + 'px';
    video.style.height = height + 'px';

    video.style.top = window.innerHeight / 2 - height / 2 + 'px';
    video.style.left = window.innerWidth / 2 - width / 2 + 'px';
  }

  function prepareVolumeTweening () {
    var volumeTweenElements = [];
    var volumeLoopTimeout = -1;

    function volumeLoop () {
      var changed = false;

      volumeTweenElements.forEach(function (obj) {
        if (obj) {
          changed = obj.processVolumeTween() ? true : changed;
        }
      });

      volumeLoopTimeout = setTimeout(volumeLoop, 10);
    }

    return {
      start: function () {
        volumeLoop();
      },
      stop: function () {
        clearTimeout(volumeLoopTimeout);
      },
      prepareVolumeTweenForElement: function (element, startVolume) {
        var _targetVolume, _realVolume;
        element.volume = _targetVolume = _realVolume = startVolume || 0;
        element.processVolumeTween = function () {
          _realVolume -= (_realVolume - element.targetVolume) * .15;
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
    }
  }

  function prepareBackgroundAudio () {
    var stopFlag = false;
    var loopTimeout;
    var currentBackgroundAudioIndex = 0;
    var currentBackgroundAudio;

    var backgroundAudioClones = [
      document.querySelector('audio[data-background]'),
      document.querySelector('audio[data-background]').cloneNode(true)
    ];

    volumeTweenController.prepareVolumeTweenForElement(backgroundAudioClones[0], 0);
    volumeTweenController.prepareVolumeTweenForElement(backgroundAudioClones[1], 0);

    function backgroundAudioLoop () {
      if (currentBackgroundAudio.currentTime > currentBackgroundAudio.duration - .2) {
        var lastTargetVolume = currentBackgroundAudio.targetVolume;
        var lastVolume = currentBackgroundAudio.volume;
        var lastBackgroundAudio = currentBackgroundAudio;
        setTimeout(function(){
          lastBackgroundAudio.pause();
          lastBackgroundAudio.currentTime = 0;
        }, 100);
        currentBackgroundAudioIndex = (currentBackgroundAudioIndex + 1) % 2;
        currentBackgroundAudio = backgroundAudioClones[currentBackgroundAudioIndex];
        currentBackgroundAudio.volume = lastVolume;
        currentBackgroundAudio.targetVolume = lastTargetVolume;
        currentBackgroundAudio.play();
      }
      if (!stopFlag) {
        loopTimeout = setTimeout(backgroundAudioLoop, 100);
      }
    }

    currentBackgroundAudio = backgroundAudioClones[0];

    return {
      start: function () {
        currentBackgroundAudio.play();
        backgroundAudioLoop();
        stopFlag = false;
      },
      stop: function () {
        clearTimeout(loopTimeout);
        currentBackgroundAudio.pause();
        stopFlag = true;
      },
      fadeOut: function () {
        currentBackgroundAudio.targetVolume = 0;
      },
      fadeIn: function () {
        currentBackgroundAudio.targetVolume = 1;
      }
    }
  }

  function prepareFloorAudio () {
    var currentFloorAudioIndex = 0;

    var currentFloorAudio = null;
    var audioOnFloors = [];
    Array.prototype.forEach.call(document.querySelectorAll('audio[data-floor]'), function (element) {
      var floorIndex = Number(element.getAttribute('data-floor'));
      audioOnFloors[floorIndex] = audioOnFloors[floorIndex] || [];
      audioOnFloors[floorIndex].push(element);
      volumeTweenController.prepareVolumeTweenForElement(element, 0);
    });

    return {
      resetFloorIndex: function () {
        currentFloorAudioIndex = 0;
      },
      playFloorAudio: function () {
        if (!currentFloorAudio && audioOnFloors[numFloors]) {
          currentFloorAudio = audioOnFloors[numFloors][currentFloorAudioIndex++];

          if (currentFloorAudio) {
            setTimeout(function(){
              currentFloorAudio.volume = 0;
              currentFloorAudio.targetVolume = 1;
              currentFloorAudio.play();
              currentFloorAudio.addEventListener('ended', function (e) {
                currentFloorAudio = null;
              }, false);
            }, FLOOR_SOUND_DELAY);
          }
        }
      }
    }
  }

  function init(e) {
    var progressButton = document.querySelector('#progress-button');
    var progressExplanation = document.querySelector('#progress-explanation');
    var stairCounter = document.querySelector('#stair-counter');
    var floorCounter = document.querySelector('#floor-counter');
    var stairCounterSpan = stairCounter.querySelector('span');
    var floorCounterSpan = floorCounter.querySelector('span');
    video = document.querySelector('video');

    var stepData = JSON.parse(document.querySelector('#step-data').innerHTML);
    var floorData = JSON.parse(document.querySelector('#floor-data').innerHTML);

    Popcorn.plugin('step', {
      start: function () {
        ++numSteps;
        stairCounterSpan.innerHTML = numSteps;
      }
    });

    Popcorn.plugin('floor', {
      start: function () {
        ++numFloors;
        floorAudioController.resetFloorIndex();
        floorCounterSpan.innerHTML = numFloors;
      }
    });

    var assets = [].concat(document.querySelector('audio')).concat(document.querySelector('video'));

    util.loader.ensureLoaded(assets, function(){
      window.addEventListener('resize', positionVideo, false);
      positionVideo();

      popcorn = Popcorn(video, {
        // frameAnimation: true
      });

      // start stairway interaction
      popcorn.cue(17, function () {
        stairCounter.classList.remove('hidden');
        floorCounter.classList.remove('hidden');
        video.classList.add('paused');
        setTimeout(function () {
          progressButton.addEventListener('mousedown', onProgressButtonMouseDown, false);
          video.pause();
          progressButton.classList.remove('hidden');
          setTimeout(function(){
            progressExplanation.classList.remove('hidden');
          }, 500);
        }, 1000);
      });

      // stop stairway interaction
      popcorn.cue(98, function () {
        progressButton.classList.add('hidden');
        setTimeout(function () {
          stairCounter.classList.add('hidden');
          floorCounter.classList.add('hidden');
        }, 2000);
        progressButton.removeEventListener('mousedown', onProgressButtonMouseDown, false);
        window.removeEventListener('mouseup', onProgressButtonMouseUp, false);
        video.play();
        video.classList.remove('paused');
      });

      stepData.forEach(function (step) {
        // Attempt to force a float for time, wrt 24 fps.
        popcorn.step({ start: Popcorn.util.toSeconds(step, 24) });
      });

      floorData.forEach(function (step) {
        popcorn.floor({ start: step });
      });

      video.classList.add('full-opacity');

      var playing = false;
      var keyUpTimeout = -1;
      function attemptToPlayVideo (e) {
        e.preventDefault();
        if (!playing) {
          playing = true;
          video.play();
          video.classList.remove('paused');
          backgroundAudioController.fadeOut();
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
            backgroundAudioController.fadeIn();
            floorAudioController.playFloorAudio();
          }, FADE_TRANSITION_DURATION);
        }
      }
      
      function onProgressButtonMouseUp (e) {
        attemptToPauseVideo(e);
        window.removeEventListener('mouseup', onProgressButtonMouseUp, false);
      }

      function onProgressButtonMouseDown (e) {
        progressExplanation.classList.add('hidden');
        attemptToPlayVideo(e);
        window.addEventListener('mouseup', onProgressButtonMouseUp, false);
      }

      var recordingStepsData = [];
      window.onkeydown = function (e) {
        if (String.fromCharCode(e.which) == 'Q') {
          recordingStepsData.push(video.currentTime);
          console.log(video.currentTime);
        }
        else if (String.fromCharCode(e.which) == 'W') {
          console.log(JSON.stringify(recordingStepsData));
        }
      };

      volumeTweenController = prepareVolumeTweening();
      floorAudioController = prepareFloorAudio();
      backgroundAudioController = prepareBackgroundAudio();

      volumeTweenController.start();
      backgroundAudioController.start();

      video.play();
    });
  }

  document.addEventListener('DOMContentLoaded', init, false);
}());