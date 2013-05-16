
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
// Used to position things around a certain focal point, with the option to scale the object to 'cover' or 'contain'
// ----------------------------------------------------------------
function focalpoint(callback) {

var elems = $( ".focalpoint" ), count = elems.length;

    elems.each(function(i) {
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

          if (!scale) { scale = 1 };
          // scale = scale.toFixed(2);

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

              if (focusLeft < 0.01) { block.css('left', 0); }
              else{ block.css('left', Math.round((containerWidth - blockWidth) * focusLeft) ) } 

                if (focusTop < 0.01) { block.css('top', 0); }
                else{ block.css('top', Math.round((containerHeight - blockHeight) * focusTop) ) }; 

        if (!--count) { 
          if (callback) callback(); 
        };

  });

};