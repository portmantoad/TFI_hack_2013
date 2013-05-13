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


function extractFilmStrip(){

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

}