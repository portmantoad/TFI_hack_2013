function changePageBackground(e){currentPageBackground&&currentPageBackground.fadeOut(0,400);if(!e)return;currentPageBackground=new Howl(e);currentPageBackground.fadeIn(1,e.fadein||800)}function changeFrameBackground(e){currentFrameBackground&&currentFrameBackground.fadeOut(0,400);if(!e)return;currentFrameBackground=new Howl(e);currentFrameBackground.fadeIn(1,e.fadein||800)}function delayAudio(e,t){setTimeout(function(){e.fadeIn(1,t.fadein||0)},t.delay)}function changeFrameNarration(e){currentFrameNarration&&currentFrameNarration.fadeOut(0,400);if(!e)return;if(Array.isArray(e))for(var t=0;t<e.length;t++){var n=e[t];if(n.played)continue;n.played=!0;currentFrameNarration=new Howl(n);n.delay?delayAudio(currentFrameNarration,n):currentFrameNarration.fadeIn(1,n.fadein||0);break}else{if(e.played)return;e.played=!0;currentFrameNarration=new Howl(e);currentFrameNarration.fadeIn(1,e.fadein||0)}}function toggleSound(){if(soundEnabled){soundEnabled=!1;Howler.mute();$(".audio").text("Enable Audio")}else{soundEnabled=!0;Howler.unmute();$(".audio").text("Disable Audio")}}var currentFrameNarration=null,currentFrameBackground=null;currentPageBackground=null;