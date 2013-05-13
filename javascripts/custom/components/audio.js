            var scene1 = new Howl({
              urls: ['sound/1.1.mp3', 'sound/1.1.ogg', 'sound/1.1.wav'],
              loop: true,
              buffer:true,
            });

            var scene2 = new Howl({
              urls: ['sound/2.1.mp3', 'sound/2.1.ogg', 'sound/2.1.wav'],
              loop: true,
              buffer:true,
            });

            var scene3 = new Howl({
              urls: ['sound/3.3.mp3', 'sound/3.3.ogg', 'sound/3.3.wav'],
              loop: true,
              buffer:true,
            });

            var scene4 = new Howl({
              urls: ['sound/4.1.mp3', 'sound/4.1.ogg', 'sound/4.1.wav'],
              loop: true,
              buffer:true,
            });

            var soundEnabled = true;
            var scenePlaying = 0;

            function changeSound(){ 

              $p = pageIndex + 1;
              $f = frameIndex + 1;


                if ($p===1 && $f===1){
                  scenePlaying = 0;
                }

             //--------------------------- SCENE 1 (Rain)
                
                if ($p===1 && $f===2 || $p===2 && $f===1 || $p===3 && $f===1){

                      if (scenePlaying !== 1) {
                        scenePlaying = 1;
                        scene1.fadeIn(1, 800); 
                      };

                };


            //--------------------------- SCENE 2 (Cafe)

                if ( $p===2 && $f>1 && $f!==7){

                      if (scenePlaying !== 2) { 
                        scenePlaying = 2;
                        scene2.fadeIn(1, 800); 
                      };

                };


            //--------------------------- SCENE 3 (Train)

                if ( $p===2 && $f===7){

                      if (scenePlaying !== 3) {
                        scenePlaying = 3; 
                        scene3.fadeIn(1, 800); 
                      };

                };


            //--------------------------- SCENE 4 (Sailor)

                if ( $p===3 && $f>1 || $p===4 || $p===5 ){

                      if (scenePlaying !== 4) { 
                        scenePlaying = 4;
                        scene4.fadeIn(1, 800); 
                      };

                }; 


                if (scenePlaying !== 1) { scene1.fadeOut(0, 400); }
                if (scenePlaying !== 2) { scene2.fadeOut(0, 400); }
                if (scenePlaying !== 3) { scene3.fadeOut(0, 400); }
                if (scenePlaying !== 4) { scene4.fadeOut(0, 400); }

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