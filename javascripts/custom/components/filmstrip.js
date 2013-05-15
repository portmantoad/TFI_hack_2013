var filmStripLooping = false;

function filmStripLoop() {
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

function playFilmStrip() {
    if (!filmStripLooping) {
       filmStripLoop();
    }
}

function stopFilmStrip() {
    if (filmStripLooping) {
       window.cancelAnimationFrame(filmStripLooping);
       filmStripLooping = undefined;
    }
}


function filmStripWrap(callback){

        $( ".filmstrip" ).each(function(){

            var $this = $(this);

            if ( $this.parent().hasClass('framewrap') == false ) {
              var frameCount = $this.data('framecount'),
              frameWrap = $('<div class="framewrap" />');

              //pass some stuff up to the wrapper element
              if ($this.hasClass("stretch")) { frameWrap.addClass("stretch"); };
              frameWrap.attr('style', $this.attr('style'));
              $this.attr('style', '');

                  $this.imagesLoaded(function(){
                    frameWidth = $this.width();
                    frameHeight = $this.height()/frameCount;
                    $this.wrap( frameWrap.width(frameWidth).height(frameHeight));
                    $this.parent().next('.c').insertAfter($(this));
                    callback();
              });
            };
            
        });

}