
            var currentFrameBackground = null,
                currentPageBackground;

            // page background audio
            function changePageSound() { 
              if (currentPageBackground)
                currentPageBackground.fadeOut(0, 400);
              var soundinfo = _pages.getPageSound(_pageIndex);
              currentPageBackground = new Howl(soundinfo);
              currentPageBackground.fadeIn(1, soundinfo.fadein || 800); 
            }

            // frame background audio
            function changeFrameSound() { 
              if (currentFrameBackground)
                currentFrameBackground.fadeOut(0, 400);
              var soundinfo = _pages.getFrameSound(_pageIndex, _frameIndex);
              currentFrameBackground = new Howl(soundinfo);
              currentFrameBackground.fadeIn(1, soundinfo.fadein || 800); 
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