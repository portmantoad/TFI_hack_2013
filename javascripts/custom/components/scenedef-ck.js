function getCurrentFrameUrl(){return _pages.getFrames(_pageIndex)[_frameIndex].url}var Pages=function(){var e=[{url:"pages/1.html",title:"Introduction",transition:"fade",sound:{urls:["assets/1/sound/1.background_audio_track_full.mp3"],loop:!0,buffer:!0,autoplay:!1,fadein:800},frames:[{url:"pages/1/1.html",sound:{urls:["assets/1/sound/1.background.1.mp3"],loop:!1,buffer:!0,autoplay:!1,fadein:800},narration:[{urls:["assets/1/sound/1.narrative.2.mp3"],loop:!1,buffer:!0,autoplay:!1,fadein:0,delay:4e3},{urls:["assets/1/sound/1.narrative.3.mp3"],loop:!1,buffer:!0,autoplay:!1,fadein:0,delay:4e3}]},{url:"pages/1/2.html",sound:{urls:["assets/1/sound/1.background.2.mp3"],loop:!1,buffer:!0,autoplay:!1,fadein:800}},{url:"pages/1/3.html",sound:{urls:["assets/1/sound/1.background.3.mp3"],loop:!1,buffer:!0,autoplay:!1,fadein:800}},{url:"pages/1/4.html",sound:{urls:["assets/1/sound/1.background.4.mp3"],loop:!1,buffer:!0,autoplay:!1,fadein:800}},{url:"pages/1/5.html",sound:{urls:["assets/1/sound/1.background.5.mp3"],loop:!1,buffer:!0,autoplay:!1,fadein:800}},{url:"pages/1/6.html",sound:{urls:["assets/1/sound/1.background.3.mp3"],loop:!1,buffer:!0,autoplay:!1,fadein:800}},{url:"pages/1/7.html",sound:{urls:["assets/1/sound/1.background.7.mp3"],loop:!1,buffer:!0,autoplay:!1,fadein:800}},{url:"pages/1/8.html",sound:{urls:["assets/1/sound/1.background.8.mp3"],loop:!1,buffer:!0,autoplay:!1,fadein:0}},{url:"pages/1/9.html",sound:{urls:["assets/1/sound/1.background.9.mp3"],loop:!1,buffer:!0,autoplay:!1,fadein:800}}]},{url:"pages/5.html",title:"Tile",frames:[{url:"pages/2/1.html"},{url:"pages/2/2.html"},{url:"pages/2/3.html"}]}];this.pageCount=function(){return e.length};this.getPageTitle=function(t){return e[t].title};this.getTransition=function(t){return e[t].transition||"fade"};this.getPageUrl=function(t){return e[t].url};this.getFrameSound=function(t,n){return e[t].frames[n].sound};this.getPageSound=function(t,n){return e[t].sound};this.getFrameNarration=function(t,n){return e[t].narration};this.getFrames=function(t){return e[t].frames};this.getFrameCount=function(t){return e[t].frames.length}},_pages=new Pages;