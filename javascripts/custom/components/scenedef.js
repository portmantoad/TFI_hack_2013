

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
            urls: ['assets/1/sound/1.1_background.wav.mp3', 'assets/1/sound/1.1_background.oga'],
            loop: false,
            buffer:true,
            autoplay: false,
            fadein:800
          },
          narration: []
        },
        { 
          url: "pages/1/2.html", 
          sound: {
            urls: ['assets/1/sound/1.2_background.wav.mp3', 'assets/1/sound/1.2_background.oga'],
            loop: false,
            buffer:true,
            autoplay: false,
            fadein:800
          },
          narration: []
        },
        { 
          url: "pages/1/3.html", 
          sound: {
            urls: ['assets/1/sound/1.3_background.wav.mp3', 'assets/1/sound/1.3_background.oga'],
            loop: false,
            buffer:true,
            autoplay: false,
            fadein:800
          },
          narration: [
            {
              urls: ['assets/1/sound/1.3_narrative.wav.mp3', 'assets/1/sound/1.3_narrative.oga'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000
            }
          ]
        },
        { 
          url: "pages/1/4.html", 
          sound: {
            urls: ['assets/1/sound/1.4_background.wav.mp3', 'assets/1/sound/1.4_background.oga'],
            loop: false,
            buffer:true,
            autoplay: false,
            fadein:800
          },
          narration: []
        },
        { 
          url: "pages/1/5.html", 
          sound: {
            urls: ['assets/1/sound/1.5_background.wav.mp3', 'assets/1/sound/1.5_background.oga'],
            loop: false,
            buffer:true,
            autoplay: false,
            fadein:800
          },
          narration: [
            {
              urls: ['assets/1/sound/1.5_narrative.wav.mp3', 'assets/1/sound/1.5_narrative.oga'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000
            }
          ]
        },
        { 
          url: "pages/1/6.html", 
          sound: {
            urls: ['assets/1/sound/1.6_background.wav.mp3', 'assets/1/sound/1.6_background.oga'],
            loop: false,
            buffer:true,
            autoplay: false,
            fadein:800
          },
        },
        { 
          url: "pages/1/7.html", 
          sound: {
            urls: ['assets/1/sound/1.7_background.wav.mp3', 'assets/1/sound/1.7_background.oga'],
            loop: false,
            buffer:true,
            autoplay: false,
            fadein:800
          },
          narration: [
            {
              urls: ['assets/1/sound/1.7_narrative_a.wav.mp3', 'assets/1/sound/1.7_narrative_a.oga'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000
            },
            {
              urls: ['assets/1/sound/1.7_narrative_b.wav.mp3', 'assets/1/sound/1.7_narrative_b.oga'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000,
              // well now this is not json encodable
              onend: function () {
                setTimeout( function () { console.log('go to next scene'); next(); }, 2000); // wait 2 sec, go next page
              }
              /*onstart: function () { // we do this one
                setTimeout( function () { console.log('narration start, go to next scene'); changePage('next'); }, 5000); 
              }*/
            }
          ]
        },
        { 
          url: "pages/1/8.html", 
          sound: {
            urls: ['assets/1/sound/1.8_background.wav.mp3', 'assets/1/sound/1.8_background.oga'],
            loop: false,
            buffer:true,
            autoplay: false,
            fadein:800
          },
        },
        { 
          url: "pages/1/9.html", 
          sound: {
            urls: ['assets/1/sound/1.9_background.wav.mp3', 'assets/1/sound/1.9_background.oga'],
            loop: false,
            buffer:true,
            autoplay: false,
            fadein:800
          },
          narration: [
            {
              urls: ['assets/1/sound/1.9_narrative.wav.mp3', 'assets/1/sound/1.9_narrative.oga'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000
            }
          ]
        },
      ] 
    },
    { 
      url: "pages/2.html", title: "The Stairs", 
      frames: [
        { 
          url: "pages/2/1.html", 
        },
      ]
    },
    { 
      url: "pages/4.html", title: "Apartment", 
      frames: [
        { 
          url: "pages/4/1.html", 
        },
      ]
    },

    { 
      url: "pages/5.html", title: "Tile", 
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
  this.getPageInfo = function (page)  { return pageinfo[page]; }
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

