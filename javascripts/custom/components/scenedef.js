

var Pages = function () {
  var pageinfo = [
    { 
      url: "pages/1.html", 
      title: "Introduction", 
      transition: 'fade', // 'fade', 'horizontal', 'vertical'
      sound: { // 'background'
        urls: ['assets/1/sound/1.background_audio_track_full.mp3'],
        loop: true,
        buffer:true,
        autoplay: false,
        fadein:800
      },

      frames: [
        { 
          url: "pages/1/1.html", 
          sound: {
            urls: ['assets/1/sound/1.background.1.mp3'], // 'assets/1/sound/1.background.1.ogg'],
            loop: false,
            buffer:true,
            autoplay: false,
            fadein:800
          },
          narration: [
            {
              urls: ['assets/1/sound/1.narrative.2.mp3'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 4000
            },
            {
              urls: ['assets/1/sound/1.narrative.3.mp3'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 4000
            }            
          ]
        },
        { 
          url: "pages/1/2.html", 
          sound: {
            urls: ['assets/1/sound/1.background.2.mp3'],
            loop: false,
            buffer:true,
            autoplay: false,
            fadein:800
          },
        },
        { 
          url: "pages/1/3.html", 
          sound: {
              urls: ['assets/1/sound/1.background.3.mp3'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:800
            },
        },
        { 
          url: "pages/1/4.html", 
          sound: {
              urls: ['assets/1/sound/1.background.4.mp3'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:800
            },
          narration: {
              urls: ['assets/1/sound/1.narrative.4.mp3'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 4000
            }
        },
        { 
          url: "pages/1/5.html", 
          sound: {
              urls: ['assets/1/sound/1.background.5.mp3'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:800
            },/*
            {
              urls: ['assets/1/sound/1.narrative.5.mp3'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 4000
            }

          ]*/
        },
        { 
          url: "pages/1/6.html", 
          sound: {
            //urls: ['assets/1/sound/1.background.6.mp3'],
            // temp, bad audio file
            urls: ['assets/1/sound/1.background.3.mp3'],
            loop: false,
            buffer:true,
            autoplay: false,
            fadein:800
          },/*
          {
            urls: ['assets/1/sound/1.narrative.6.final.mp3'],
            loop: false,
            buffer:true,
            autoplay: false,
            fadein:0,
              delay: 4000
          }
          ]*/
        },
        { 
          url: "pages/1/7.html", 
          sound: {
              urls: ['assets/1/sound/1.background.7.mp3'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:800
            },
        },
        { 
          url: "pages/1/8.html", 
          sound: {
            urls: ['assets/1/sound/1.background.8.mp3'],
            loop: false,
            buffer:true,
            autoplay: false,
            fadein:0
          }
        },
        { 
          url: "pages/1/9.html", 
          sound: {
            urls: ['assets/1/sound/1.background.9.mp3'],
            loop: false,
            buffer:true,
            autoplay: false,
            fadein:800
          }
        },
      ] 
    },
    { url: "pages/5.html", title: "Tile", 
      frames: [
        { 
          url: "pages/5/1.html", 
        },
        { 
          url: "pages/5/2.html",  
        },
        { 
          url: "pages/5/3.html", 
        },
        ] 
    },

    ];

  // todo add ajax loader if needed,
  // possibly add _pageIndex and _frameIndex to this

  this.pageCount = function () { return pageinfo.length; }
  this.getPageTitle = function (page)  { return pageinfo[page].title; }
  this.getTransition = function (page)  { return pageinfo[page].transition || 'fade'; }

  this.getPageUrl = function (page) { return pageinfo[page].url; }
  this.getFrameSound = function (page, frame) { return pageinfo[page].frames[frame].sound; }
  this.getPageSound = function (page, frame) { return pageinfo[page].sound; }
  this.getFrameNarration = function (page, frame) { return pageinfo[page].frames[frame].narration; }

  this.getFrames = function (page) {
    return pageinfo[page].frames;
  }

  this.getFrameCount = function (page) {
    return pageinfo[page].frames.length;
  };
};

var _pages = new Pages();


function getCurrentFrameUrl() { return _pages.getFrames(_pageIndex)[_frameIndex].url; }

