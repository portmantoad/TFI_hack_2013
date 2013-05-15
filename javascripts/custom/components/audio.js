
            var currentFrameAudio = null,
                currentPageAudio;

            // page background audio
            function changePageSound() { 
              if (currentPageAudio)
                currentPageAudio.fadeOut(0, 400);
              var soundinfo = _pages.getPageSound(_pageIndex);
              if (!soundinfo) return; 

              currentPageAudio = new Howl(soundinfo);
              currentPageAudio.fadeIn(1, soundinfo.fadein || 800); 
            }

            // frame background audio
            function changeFrameSound() { 
              if (currentFrameAudio) {
                if (Array.isArray(currentFrameAudio)) {
                  for (var i=0; i< currentFrameAudio.length; i++)
                    currentFrameAudio[i].fadeOut(0,400);
                }
                else {
                  currentFrameAudio.fadeOut(0, 400);
                }
              }
              var soundinfo = _pages.getFrameSound(_pageIndex, _frameIndex);
              if (!soundinfo) return; 

              if (Array.isArray(soundinfo)) {
                currentFrameAudio = [];
                for (var i=0; i< soundinfo.length; i++) {
                  currentFrameAudio[i] = new Howl(soundinfo[i]);
                  currentFrameAudio[i].fadeIn(1, soundinfo[i].fadein || 800); 
                }
              }
              else {
                currentFrameAudio = new Howl(soundinfo);
                currentFrameAudio.fadeIn(1, soundinfo.fadein || 800); 
              }
            }

            function toggleSound(){
              if (soundEnabled) {
                soundEnabled = false;
                Howler.mute();
                $('.audio').text('Enable Audio');
              } else{
                soundEnabled = true;
                Howler.unmute();
                $('.audio').text('Disable Audio')
              };
            }