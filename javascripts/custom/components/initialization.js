$(function(){

        changePage(0);


        $(window).on("load resize orientationchange", function() { focalpoint(); });
        $('.audio').on('click', function(){ toggleSound(); });


    $(document).ajaxComplete(function(){
        
        stopFilmstrip();

        // if (jQuery.browser.mobile) {
        if (true) { filmStripWrap(); };

      filter();
      fitText();
      showElementsOnFrame();

      pageview.imagesLoaded(function(){ 
        focalpoint();
        frameview.addClass('loaded'); 
        pageview.addClass('loaded');
      });
  },false);
});