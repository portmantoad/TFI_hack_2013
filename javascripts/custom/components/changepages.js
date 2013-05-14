

var Pages = function () {
  var pageinfo = [
    { url: "pages/1.html", title: "Introduction", frames: ["pages/1/1.html", "pages/1/2.html", "pages/1/3.html"] },
    { url: "pages/2.html", title: "Tile", 
      frames: ["pages/2/1.html", "pages/2/2.html", "pages/2/3.html", "pages/2/4.html", "pages/2/5.html", "pages/2/6.html", "pages/2/7.html"] 
    },

    ];

  // todo add ajax loader if needed,
  // possibly add _pageIndex and _frameIndex to this

  this.pageCount = function () { return pageinfo.length; }
  this.getPageTitle = function (page)  { return pageinfo[page].title; }

  this.getPageUrl = function (page) { return pageinfo[page].url; }


  this.getFrames = function (page) {
    return pageinfo[page].frames;
  }

  this.getFrameCount = function (page) {
    return pageinfo[page].frames.length;
  };
};

var _pages = new Pages();


function getCurrentFrame() { return _pages.getFrames(_pageIndex)[_frameIndex]; }



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
    
              var frameCount = _pages.getFrameCount(_pageIndex), frameEnd = frameCount - 1;
              
              if (value==="next") {        _frameIndex = (_frameIndex + 1) % frameCount;
              } else if (value==="prev") { _frameIndex = (_frameIndex + frameCount - 1) % frameCount;
              } else if (value==="first"){ _frameIndex = 0;
              } else if (value==="last"){  _frameIndex = frameCount - 1;
              } else {                     _frameIndex = parseInt(value);
              }


              frameview.fadeOut('fast', function() { 
                changeSound();
                  frameview.removeClass('loaded').load(getCurrentFrame(), function() { 
                      frameview.show();
                  }); 
              });

              framecounter.text((_frameIndex+1) + "/" + (frameCount));

              var end = _pages.pageCount() - 1;
              if(_pageIndex === end && _frameIndex === frameEnd){ hideNavNext(); showNavPrev(); }
              else if (_pageIndex === 0 && _frameIndex === 0)   { showNavNext(); hideNavPrev(); }
              else                                            { showNav(); }
            }


            function changePage(value, frame) {

                if (value==="next") {        _pageIndex===end ? _pageIndex=0 : _pageIndex++;
                } else if (value==="prev") { _pageIndex===0 ? _pageIndex=end : _pageIndex--;
                } else if (value==="first"){ _pageIndex = 0
                } else if (value==="last"){  _pageIndex = end
                } else {                     _pageIndex = parseInt(value);
                }

                pageview.fadeOut('fast', function() { 
                    pageview.removeClass('loaded').load(_pages.getPageUrl(_pageIndex), function() {
                        frame ? changeFrame(frame) : changeFrame('0');
                        pageview.fadeIn();
                    }); 
                });

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


        //hacky way im showing/hiding elements located in the persistant level (page)
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

            if ( $.inArray((_frameIndex+1), frames) > -1) { 
              $tempObject.removeClass('hidden');  
            };
            

          });
        }
