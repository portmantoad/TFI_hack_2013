    // page navigation code

    var _pageIndex = 0,
    _frameIndex = 0,
    slideIndex = 0,
    // lightboxIndex = 0,

    // frameEnd = frames.length - 1,
    pageview = $(".pageview"),
    pageview_width = 0,
    frameview = $(".frameview").first(),
    nextbutton = $("#nextbutton"),
    prevbutton = $("#prevbutton"),
    chapters = $(".chapters"),
    pagecounter = $(".pagecounter"),
    pagetitle = $(".pagetitle"),
    framecounter = $(".framecounter"),
    overlay = $('.overlay'),
    body = $("body"),
    navList = $("#mainnav");
    



    function hideNavNext() {nextbutton.addClass('hidden');}
    function showNavNext() {nextbutton.removeClass('hidden');}
    function hideNavPrev() {prevbutton.addClass('hidden');}
    function showNavPrev() {prevbutton.removeClass('hidden');}
    function hideNav() {nextbutton.addClass('hidden'); prevbutton.addClass('hidden');}
    function showNav() {nextbutton.removeClass('hidden'); prevbutton.removeClass('hidden');}


// Fills the navigation with the appropriate links and dropdowns
//$.each(pages, function(pageNumber){

  for (var i=0; i < _pages.pageCount(); i++) {
      var navPage = $('<li/>').appendTo(navList);
      var navPageLink = $('<a/>').text(_pages.getPageTitle(i)).attr('onClick', 'changePage('+ i +')').appendTo(navPage);

      if (_pages.getFrameCount(i) > 1) {
        navPage.addClass('has-dropdown');
        var navPageList = $('<ul />').addClass('dropdown').appendTo(navPage);

        var fr = _pages.getFrames(i);
        $.each(fr, function(frameNumber){
              var navFrame = $('<li/>').appendTo(navPageList);
              var navFrameLink = $('<a/>').text('Page ' + (frameNumber + 1)).attr('onClick', 'changePage('+ i +', ' +frameNumber +')').appendTo(navFrame);
        });
      };  
  };
//});

/////////////////////////////////////////////////////////////////////////////////
// Sliders ///////////////
/////////////////////////////////////////////////////////////////////////////////

function changeSlider(value) {
  var slider = $("ul.slider"),
  slides = slider.children('li'),
  slideCount = slides.length, 
  slidecounter = slider.children('.counter');
  
  if (value==="next") {
    slideIndex < slideCount-1 ? slideIndex++ : slideIndex = 0;
  } 
  else if (value==="prev") { 
    slideIndex > 0 ? slideIndex-- : slideIndex = slideCount-1;
  } 
  else if (value==="first") { 
    slideIndex = 0;
  } 
  else if (value==="last") {
    slideIndex = slideCount - 1;
  } 
  else { 
    slideIndex = Math.min(slideCount-1, Math.max(0, parseInt(value)));
  }

  slides.removeClass('active');
  slides.eq(slideIndex).addClass('active');

    // slideview.fadeOut('fast', function() { 
    //     slideview.removeClass('loaded').load(getCurrentslideUrl(), function() { 
    //         slideview.show();
    //     }); 
    // });

  // changeslideBackground(_pages.getslideSound(_pageIndex, slideIndex));
  // changeslideNarration(_pages.getslideNarration(_pageIndex, slideIndex));
  
  slidecounter.text((slideIndex+1) + "/" + (slideCount));
}

/////////////////////////////////////////////////////////////////////////////////
// FRAMES ///////////////
/////////////////////////////////////////////////////////////////////////////////

function changeFrame(value) {
  frameview = $(".frameview").first();

  var frameCount = _pages.getFrameCount(_pageIndex);
  
  if (value==="next") {
    if (_frameIndex < frameCount-1) _frameIndex++;
  } 
  else if (value==="prev") { 
    if (_frameIndex > 0) _frameIndex--;
  } 
  else if (value==="first") { 
    _frameIndex = 0;
  } 
  else if (value==="last") {
    _frameIndex = frameCount - 1;
  } 
  else { 
    _frameIndex = Math.min(frameCount-1, Math.max(0, parseInt(value)));
  }

  var trans = _pages.getTransition(_pageIndex);

  // if (trans == 'fade') {
  //   frameview.fadeOut('fast', function() { 
  //       frameview.removeClass('loaded').load(getCurrentFrameUrl(), function() { 
  //           changeSlider('0');
  //           frameview.show();
  //       }); 
  //   });
  // }


frameview.children().wrapAll('<div class="old slideLeft" />');
frameview.prepend('<div class="new slideLeft" />');

$('.new').eq(0).load(getCurrentFrameUrl(), function() {

            $('.new').addClass('animate');
            $('.old').addClass('animate');
            changeSlider('0');

            
}); 


frameview.children().wrapAll('<div class="old slideLeft" />');
frameview.prepend('<div class="new slideLeft" />');

var frameNew = $('.new'),
frameOld = $('.old');

frameNew.load(getCurrentFrameUrl(), function() {
            $(this).imagesLoaded(function(){
              focalpoint(function() {
                frameNew.addClass('animate');
                frameOld.addClass('animate');
                changeSlider('0');

                setTimeout(function(){
                frameOld.remove();
                frameNew.children().unwrap();
                },1000)
              });
            });
}); 





  // else if (trans === 'horizontal') {
  //   // 
  // }
  // else if (trans === 'vertical') {
  //   // 
  // }

  changeFrameBackground(_pages.getFrameSound(_pageIndex, _frameIndex));
  changeFrameNarration(_pages.getFrameNarration(_pageIndex, _frameIndex));
  
  framecounter.text((_frameIndex+1) + "/" + (frameCount));

  var end = _pages.pageCount() - 1;
  var frameEnd = _pages.getFrameCount(_pageIndex) - 1;
  if(_pageIndex === end && _frameIndex === frameEnd){ hideNavNext(); showNavPrev(); }
  else if (_pageIndex === 0 && _frameIndex === 0)   { showNavNext(); hideNavPrev(); }
  else                                            { showNav(); }
}

/////////////////////////////////////////////////////////////////////////////////
// PAGES ///////////////
/////////////////////////////////////////////////////////////////////////////////

function changePage(value, frame) {
    var pagect = _pages.pageCount();

    if (value==="next") { if (_pageIndex < pagect-1) _pageIndex++; }
    else if (value==="prev") { if (_pageIndex > 0) _pageIndex--; } 
    else if (value==="first") { _pageIndex = 0; } 
    else if (value==="last"){ _pageIndex = pagect - 1; } 
    else { _pageIndex = Math.max(0, Math.min(pagect - 1, parseInt(value))); }

    pageview.fadeOut('fast', function() { 
        pageview.removeClass('loaded').load(_pages.getPageUrl(_pageIndex), function() {
            frame ? changeFrame(frame) : changeFrame('0');
            pageview.fadeIn();
        }); 
    });

    changePageBackground(_pages.getPageSound(_pageIndex));

    pagetitle.text(_pages.getPageTitle(_pageIndex));
  
}

/////////////////////////////////////////////////////////////////////////////////
//  COMBO FUNCTIONS ///////////////
/////////////////////////////////////////////////////////////////////////////////

function next() { 
    if (_frameIndex < _pages.getFrameCount(_pageIndex)-1) { changeFrame('next'); } 
    else if(_pageIndex < _pages.pageCount()-1){ changePage('next'); }
}; 

function prev() { 
    if (_frameIndex > 0) { changeFrame('prev'); } 
    else if(_pageIndex > 0) { changePage('prev', 'last');}
};
