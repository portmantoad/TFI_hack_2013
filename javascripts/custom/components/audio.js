
            var currentSound = null;
            function changeSound(){ 

              if (currentSound)
                currentSound.fadeOut(0, 400);
              var soundinfo = _pages.getSound(_pageIndex, _frameIndex);
              currentSound = new Howl(soundinfo);
              currentSound.fadeIn(1, soundinfo.fadein || 800); 
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