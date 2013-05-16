
            var currentFrameNarration = null,
                currentFrameBackground = null,
                currentPageBackground = null;

            // page background audio
            function changePageBackground(info) { 
              if (currentPageBackground)
                currentPageBackground.fadeOut(0, 400);
              if (!info) return; 

              currentPageBackground = new Howl(info);
              currentPageBackground.fadeIn(1, info.fadein || 800); 
            }

            function changeFrameBackground(info) { 
              if (currentFrameBackground)
                currentFrameBackground.fadeOut(0, 400);
              if (!info) return; 

              currentFrameBackground = new Howl(info);
              currentFrameBackground.fadeIn(1, info.fadein || 800); 
            }

            function delayAudio(cfa, si) {
              // todo track timer to cancel
              setTimeout( 
                function () { 
                  console.log('playing delayed audio');
                  cfa.fadeIn(1, si.fadein || 0); 
                },
                si.delay
              );
            }

            function changeFrameNarration(info) { 
              // cancel current frame audio instances
              if (currentFrameNarration) {
                currentFrameNarration.fadeOut(0,400);
              }

              if (!info) return; 

              // find first non played clip
              if (Array.isArray(info)) {
                for (var i=0; i< info.length; i++) {
                  var si = info[i]; 
                  if (si.played) continue;
                  si.played = true;
                  currentFrameNarration = new Howl(si);
                  if (si.delay) {
                    console.log('delayed audio to be played: ', si.delay, si.urls[0]);
                    delayAudio(currentFrameNarration, si);
                  }
                  else  
                    currentFrameNarration.fadeIn(1, si.fadein || 0); 
                  break;
                }
              }
              else {
                if (info.played) return;
                info.played = true;
                currentFrameNarration = new Howl(info);
                currentFrameNarration.fadeIn(1, info.fadein || 0); 
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