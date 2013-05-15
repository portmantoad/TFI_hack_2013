    // page navigation code

    var _pageIndex = 0,
    _frameIndex = 0,
    // lightboxIndex = 0,

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

  if (trans == 'fade') {
    frameview.fadeOut('fast', function() { 
        frameview.removeClass('loaded').load(getCurrentFrameUrl(), function() { 
            frameview.show();
        }); 
    });
  }
  else if (trans === 'horizontal') {
    // 
  }
  else if (trans === 'vertical') {
    // 
  }

  changeFrameBackground(_pages.getFrameSound(_pageIndex, _frameIndex));
  changeFrameNarration(_pages.getFrameNarration(_pageIndex, _frameIndex));
  
  framecounter.text((_frameIndex+1) + "/" + (frameCount));

  var end = _pages.pageCount() - 1;
  if(_pageIndex === end && _frameIndex === frameEnd){ hideNavNext(); showNavPrev(); }
  else if (_pageIndex === 0 && _frameIndex === 0)   { showNavNext(); hideNavPrev(); }
  else                                            { showNav(); }
}


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

function next() { 
    if (_frameIndex < _pages.getFrameCount(_pageIndex)) { changeFrame('next'); } 
    else if(_pageIndex < _pages.pageCount()-1){ changePage('next'); }
}; 

function prev() { 
    if (_frameIndex !== 0) { changeFrame('prev'); } 
    else if(_pageIndex > 0){ changePage('prev', 'last');}
};
