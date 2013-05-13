var pages=[];

            pages[0]="pages/1.html";
            // pages[1]="pages/2.html";
            // pages[2]="pages/3.html";
            // pages[3]="pages/4.html";
            // pages[4]="pages/5.html";

            var pagetitles=[];

            pagetitles[0]="Introduction";
            // pagetitles[1]="Tile";
            // pagetitles[2]="Tile";
            // pagetitles[3]="Tile";
            // pagetitles[4]="Tile";

            var frames = [];

            function framesList(value){
              frames.length = 0;

              if (value === 0){

                  frames[0]="pages/1/1.html";
                  frames[1]="pages/1/2.html";
                  frames[2]="pages/1/3.html";

              } else if (value === 1){

                  // frames[0]="pages/2/1.html";
                  // frames[1]="pages/2/2.html";
                  // frames[2]="pages/2/3.html";
                  // frames[3]="pages/2/4.html";
                  // frames[4]="pages/2/5.html";
                  // frames[5]="pages/2/6.html";
                  // frames[6]="pages/2/7.html";

              } else {
                  frames[0]="";
              }
            };


            // page navigation code

            var pageIndex = 0,
            frameIndex = 0,
            // lightboxIndex = 0,
            end = pages.length - 1,
            // frameEnd = frames.length - 1,
            pageview = $(".pageview"),
            pageview_width = 0,
            frameview = $(".frameview").first(),
            nextbutton = $(".nextbutton"),
            prevbutton = $(".prevbutton"),
            chapters = $(".chapters"),
            pagecounter = $(".pagecounter"),
            pagetitle = $(".pagetitle"),
            framecounter = $(".framecounter"),
            overlay = $('.overlay'),
            body = $("body"),
            navList = $("#mainnav"),
            filmStripLooping = false;




// ----------------------------------------------------------------
// Used for title text – makes text fill a predictable percentage of the parent container
// ----------------------------------------------------------------

function fitText() {
    $( ".fittext" ).each(function(){

      // Store the object
      var $this = $(this),
          compressor = $this.data('font-scale') || 1,
          minFontSize = $this.data('min-font-size') || Number.NEGATIVE_INFINITY,
          maxFontSize = $this.data('max-font-size') || Number.POSITIVE_INFINITY;

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', 
          Math.max(
            Math.min(
              ($this.width() * compressor) / 10, //inverted from fittext plugin
              parseFloat(maxFontSize)
            ), 
            parseFloat(minFontSize)
          )
        );
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize orientationchange', resizer);

    });

};

// ----------------------------------------------------------------
// preloads array of images
// ----------------------------------------------------------------

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}


// ----------------------------------------------------------------
// Used to position things around a certain focal point, with the option to scale the object to 'cover' or 'contain'
// ----------------------------------------------------------------
function focalpoint() {
    $( ".focalpoint" ).each(function( ) {
      var block = $(this), 
      container = block.parent(),
      containerWidth = container.innerWidth(),
      containerHeight = container.innerHeight(),
      blockWidth = block.outerWidth(),
      blockHeight = block.outerHeight(),
      scaleMode = block.data('focus-scale'),
      flVal = block.data('focus-left'),
      focusLeft = typeof flVal !== 'undefined' ? flVal : .5,
      ftVal = block.data('focus-top') || .5,
      focusTop = typeof ftVal !== 'undefined' ? ftVal : .5;

      if (scaleMode == 'cover' || scaleMode == 'contain') {

          if (scaleMode == 'cover') {
            var scale = Math.max( (containerWidth / blockWidth), (containerHeight / blockHeight) );
          } else {
            var scale = Math.min( (containerWidth / blockWidth), (containerHeight / blockHeight) );
          }

          if (scale == false) { scale = 1 };

          blockWidth = blockWidth * scale,
          blockHeight = blockHeight * scale;

          block.css({
            mozTransform: 'scale(' + scale + ')',
            msTransform:  'scale(' + scale + ')',
            webkitTransform: 'scale(' + scale + ')',
            oTransform: 'scale(' + scale + ')',
            transform: 'scale(' + scale + ')'
          });

      }

        block.css({
          top: 'initial',
          left: 'initial',
          right: 'initial',
          bottom: 'initial',
          marginLeft: 0,
          marginTop:0
        });

            if (containerWidth > blockWidth) {
              if (focusLeft < 0.01) { block.css('left', 0); }
              else{ block.css('left', Math.round((containerWidth - blockWidth) * focusLeft) ) } 

            } else{

              if (focusLeft < .5) { block.css('left', 0); }
              else if (focusLeft > .5) { block.css('right', 0); }
              else { block.css({left: '50%', marginLeft: (blockWidth/-2)}); }

            }
            
            if (containerHeight > blockHeight) {
                if (focusTop < 0.01) { block.css('top', 0); }
                else{ block.css('top', Math.round((containerHeight - blockHeight) * focusTop) ) }; 
            } else{

              if (focusTop < .5) { block.css('top', 0); }
              else if (focusTop > .5) { block.css('bottom', 0); }
              else { block.css({top: '50%', marginTop: (blockHeight/-2)}); }

            }

  });

};


// ----------------------------------------------------------------
// Filmstriiip
// ----------------------------------------------------------------

function filmstripLoop() {
  filmStrip = $(".framewrap .filmstrip");
  if (filmStrip.length !== 0) {
    filmStrip.each(function() {
      var $this = $(this),
      frameCount = $this.data('framecount') || $this.prev().data('framecount'),
      // offset = $this.outerHeight()/frameCount,
      fps = $this.data('fps') || $this.prev().data('fps') || 24,
      now,
      then = Date.now(),
      interval = 1000/fps,
      delta;

      // $(window).stopFilmstrip = false;

      var i = 1;
      function draw() {
       
          filmStripLooping = window.requestAnimationFrame(draw);
           
          now = Date.now();
          delta = now - then;
           
          if (delta > interval) {
              then = now - (delta % interval);
              $this.css("top", (100 * -i) + "%" );
              if(i < frameCount - 1) { i++; } else { i = 0; }
          }
      }
      draw();
    });
  };
}

function playFilmstrip() {
    if (!filmStripLooping) {
       filmstripLoop();
    }
}

function stopFilmstrip() {
    if (filmStripLooping) {
       window.cancelAnimationFrame(filmStripLooping);
       filmStripLooping = undefined;
    }
}




// ----------------------------------------------------------------
// custom fake blend modes
// ----------------------------------------------------------------

function screenBlend(v,c,bc,w,h,l) {
    if(v.paused || v.ended) return false;

    bc.drawImage(v,0,0,w,h);

    var idata = bc.getImageData(0,0,w,h);
    var data = idata.data;

    for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var t = Math.max(r,g,b);
        data[i] = (r*255)/t;
        data[i+1] = (g*255)/t;
        data[i+2] = (b*255)/t;
        data[i+3] = t;
    }
    idata.data = data;

    c.putImageData(idata,0,0);


    if(l) {requestAnimationFrame(function(){ screenBlend(v,c,bc,w,h,l); });}
}

function multiplyBlend(v,c,bc,w,h,l) {
    if(v.paused || v.ended) return false;

    bc.drawImage(v,0,0,w,h);

    var idata = bc.getImageData(0,0,w,h);
    var data = idata.data;

    for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var t = 255 - (Math.min(r,g,b));
        data[i] = 255 * (r - (255 - t)) / t;
        data[i+1] = 255 * (g - (255 - t)) / t;
        data[i+2] = 255 * (b - (255 - t)) / t;
        data[i+3] = t;
    }
    idata.data = data;

    c.putImageData(idata,0,0);

    if(l) {requestAnimationFrame(function(){ multiplyBlend(v,c,bc,w,h,l); });}
}

function screenBlendBW(v,c,bc,w,h,l) {
    if(v.paused || v.ended) return false;

    bc.drawImage(v,0,0,w,h);

    var idata = bc.getImageData(0,0,w,h);
    var data = idata.data;

    for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        data[i] = 255;
        data[i+1] = 255;
        data[i+2] = 255;
        data[i+3] = r;
    }
    idata.data = data;

    c.putImageData(idata,0,0);


    if(l) {requestAnimationFrame(function(){ screenBlend(v,c,bc,w,h,l); });}
}

function multiplyBlendBW(v,c,bc,w,h,l) {
    if(v.paused || v.ended) return false;

    bc.drawImage(v,0,0,w,h);

    var idata = bc.getImageData(0,0,w,h);
    var data = idata.data;

    for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        data[i] = 0;
        data[i+1] = 0;
        data[i+2] = 0;
        data[i+3] = 255-r;
    }
    idata.data = data;

    c.putImageData(idata,0,0);

    if(l) {requestAnimationFrame(function(){ multiplyBlend(v,c,bc,w,h,l); });}
}

            function hideNavNext() {nextbutton.addClass('hidden');}
            function showNavNext() {nextbutton.removeClass('hidden');}
            function hideNavPrev() {prevbutton.addClass('hidden');}
            function showNavPrev() {prevbutton.removeClass('hidden');}
            function hideNav() {nextbutton.addClass('hidden'); prevbutton.addClass('hidden');}
            function showNav() {nextbutton.removeClass('hidden'); prevbutton.removeClass('hidden');}

            $.each(pages, function(pageNumber){
                  framesList(pageNumber);
                  var navPage = $('<li/>').appendTo(navList);
                  var navPageLink = $('<a/>').text(pagetitles[pageNumber]).attr('onClick', 'changePage('+ pageNumber +')').appendTo(navPage);

                  if (frames.length > 1) {
                    navPage.addClass('has-dropdown');
                    var navPageList = $('<ul />').addClass('dropdown').appendTo(navPage);

                    $.each(frames, function(frameNumber){
                          var navFrame = $('<li/>').appendTo(navPageList);
                          var navFrameLink = $('<a/>').text('Page ' + (frameNumber + 1)).attr('onClick', 'changePage('+ pageNumber +', ' +frameNumber +')').appendTo(navFrame);
                    });
                  };  
            });


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


            function changeLightbox(value) {
              window.lightboxList = $(".modal-photo li"),
              lightboxEnd = lightboxList.length - 1;
              
                if (value==="next") { window.lightboxIndex++;
                } else if (value==="prev") { window.lightboxIndex--;
                } else { 
                    if (value==="first"){        window.lightboxIndex = 0;
                    } else if (value==="last"){  window.lightboxIndex = lightboxEnd;
                    } else {                     window.lightboxIndex = parseInt(value) - 1;
                    }
                }

                lightboxList.addClass("hidden");

                // alert(lightboxList + ", " + lightboxEnd + ", " + lightboxIndex + $(lightboxList[lightboxIndex]))

                $(lightboxList[lightboxIndex]).removeClass("hidden");


                // if(lightboxIndex === end)    { $("#modal .prevbutton").removeClass("hidden"); $("#modal .nextbutton").addClass("hidden"); }
                // else if (lightboxIndex === 0){ $("#modal .nextbutton").removeClass("hidden"); $("#modal .prevbutton").addClass("hidden"); }
                // else                         { $("#modal .prevbutton").removeClass("hidden"); $("#modal .nextbutton").removeClass("hidden"); }

            }

            function changeFrame(value) {
              frameview = $(".frameview").first();
    
              framesList(pageIndex);

              frameEnd = 0;
              if (frames.length > 1) { frameEnd = frames.length - 1; };

              
                if (value==="next") {        frameIndex===frameEnd ? frameIndex=0 : frameIndex++;
                } else if (value==="prev") { frameIndex===0 ? frameIndex=frameEnd : frameIndex--;
                } else if (value==="first"){ frameIndex = 0
                } else if (value==="last"){  frameIndex = frameEnd
                } else {                     frameIndex = parseInt(value);
                }


                frameview.fadeOut('fast', function() { 
                  changeSound();
                    frameview.removeClass('loaded').load(frames[frameIndex], function() { 
                        frameview.show();
                    }); 
                });

                framecounter.text((frameIndex+1) + "/" + (frameEnd+1));

                if(pageIndex === end && frameIndex === frameEnd){ hideNavNext(); showNavPrev(); }
                else if (pageIndex === 0 && frameIndex === 0)   { showNavNext(); hideNavPrev(); }
                else                                            { showNav(); }

            }


            function changePage(value, frame) {

                if (value==="next") {        pageIndex===end ? pageIndex=0 : pageIndex++;
                } else if (value==="prev") { pageIndex===0 ? pageIndex=end : pageIndex--;
                } else if (value==="first"){ pageIndex = 0
                } else if (value==="last"){  pageIndex = end
                } else {                     pageIndex = parseInt(value);
                }

                framesList(pageIndex);
                
                pageview.fadeOut('fast', function() { 
                    pageview.removeClass('loaded').load(pages[pageIndex], function() {
                        frame ? changeFrame(frame) : changeFrame('0');
                        pageview.fadeIn();
                    }); 
                });

                pagetitle.text(pagetitles[pageIndex]);
              
            }

        function next() { 
            if (frameIndex !== frameEnd) { changeFrame('next'); } 
            else if(pageIndex < end){ changePage('next'); }
        }; 

        function prev() { 
            if (frameIndex !== 0) { changeFrame('prev'); } 
            else if(pageIndex > 0){ changePage('prev', 'last');}
        };

        function showElementsOnFrame(){
          $('.show-frames').each(function(){
            var $tempObject = $(this),
            frames = $tempObject.data('show-frames');
            $tempObject.addClass('hidden'); 
            frames = frames + ","
            frames = frames.split(",");
            
            
              
              for (a in frames ) {
                frames[a] = parseInt(frames[a], 10);
              }

            if ( $.inArray((frameIndex+1), frames) > -1) { 
              $tempObject.removeClass('hidden');  
            };
            

          });
        }


            
$(function(){

        changePage(0);

        // $(window).on("load", function(){
        //         preload([
        //           'img/old-movie-title.png',
        //             'video/snowfall.jpg',
        //             'img/fakecovers/paristitle2-optim.png',
        //             'img/nimier_m.jpg'
        //         ]);
        // });


        $(window).on("load resize orientationchange", function() {
                focalpoint();
        });

      $('.audio').on('click', function(){ toggleSound();});


    $(document).ajaxComplete(function(){
        
        stopFilmstrip();

        // if (jQuery.browser.mobile) {
          if (true) {

          $( "video" ).each(function(){
            var $this = $(this),
            filmStrip = $this.children(".filmstrip").insertAfter($this),
            frameCount = filmStrip.data('framecount'),
            frameWrap = $('<div class="framewrap" />');

            if ($this.hasClass("no-swap") === false) {
            
                if ($this.hasClass("stretch")) { frameWrap.addClass("stretch"); };

                if ($this.hasClass("blend")) {
                  frameWrap.addClass("stretch");
                  if ($this.hasClass("screen")) { filmStrip.addClass("blend screen"); };
                  if ($this.hasClass("multiply")) { filmStrip.addClass("blend multiply"); };
                };

                filmStrip.imagesLoaded(function(){
                  filmStrip = $(this);
                  frameWidth = filmStrip.width();
                  frameHeight = filmStrip.height()/frameCount;
                  filmStrip.wrap( frameWrap.width(frameWidth).height(frameHeight));
                  filmStrip.parent().next('.c').insertAfter($(this));
                  playFilmstrip();
                });

                $this.remove();
            
            }
        });
        };

        $( ".blend" ).each(function(){
          var $this = $(this);

          if(!$this.next('.c').length){
            var canvas = $('<canvas class="c stretch"></canvas>').insertAfter($this);
            if ($this.hasClass("filmstrip")) { 
              $this.removeClass("filmstrip"); 
              canvas.removeClass("stretch").addClass("filmstrip"); 
            };

          var v = $this[0];
          var canvas = $this.next('.c')[0];
          var context = canvas.getContext('2d');
          var back = document.createElement('canvas');
          var backcontext = back.getContext('2d');
          var loop = false;

          var cw,ch;

          if ($this.is("video")) {
          loop = true;
            v.addEventListener('play', function(){
              cw = v.clientWidth;
              ch = v.clientHeight;
              canvas.width = cw;
              canvas.height = ch;
              back.width = cw;
              back.height = ch;
                if( $this.hasClass('screen') ){
                    screenBlend(v,context,backcontext,cw,ch,loop);
                } else if( $this.hasClass('multiply') ){
                    multiplyBlend(v,context,backcontext,cw,ch,loop);
                }
              
            });

          } else {
             $this.imagesLoaded(function(){
              cw = imgRealSize( $this ).width;
              ch = imgRealSize( $this ).height;
              $this.next('.c').width(cw);
              $this.next('.c').height(ch);
              canvas.width = cw;
              canvas.height = ch;
              back.width = cw;
              back.height = ch;
                if( $this.hasClass('screen') ){
                    $this.hasClass('bw') ? screenBlendBW(v,context,backcontext,cw,ch,loop) : screenBlend(v,context,backcontext,cw,ch,loop);
                } else if( $this.hasClass('multiply') ){
                   $this.hasClass('bw') ? multiplyBlendBW(v,context,backcontext,cw,ch,loop) : multiplyBlend(v,context,backcontext,cw,ch,loop);
                }
              });
            }
        } 

      });

      fitText();
      showElementsOnFrame();

      pageview.imagesLoaded(function(){ 
        focalpoint();
        frameview.addClass('loaded'); 
        pageview.addClass('loaded');
        $('.top-bar').removeClass('expanded').css('min-height', "").find('section li.moved, .section li.moved').removeClass('moved');
      });
  },false);
});