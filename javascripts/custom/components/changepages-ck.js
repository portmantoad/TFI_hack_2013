// page navigation code
function hideNavNext(){nextbutton.addClass("hidden")}function showNavNext(){nextbutton.removeClass("hidden")}function hideNavPrev(){prevbutton.addClass("hidden")}function showNavPrev(){prevbutton.removeClass("hidden")}function hideNav(){nextbutton.addClass("hidden");prevbutton.addClass("hidden")}function showNav(){nextbutton.removeClass("hidden");prevbutton.removeClass("hidden")}function changeSlider(e){var t=$("ul.slider"),n=t.children("li"),r=n.length,i=t.children(".counter");e==="next"?slideIndex<r-1?slideIndex++:slideIndex=0:e==="prev"?slideIndex>0?slideIndex--:slideIndex=r-1:e==="first"?slideIndex=0:e==="last"?slideIndex=r-1:slideIndex=Math.min(r-1,Math.max(0,parseInt(e)));n.removeClass("active");n.eq(slideIndex).addClass("active");i.text(slideIndex+1+"/"+r)}function changeFrame(e){frameview=$(".frameview").first();var t=_pages.getFrameCount(_pageIndex);e==="next"?_frameIndex<t-1&&_frameIndex++:e==="prev"?_frameIndex>0&&_frameIndex--:e==="first"?_frameIndex=0:e==="last"?_frameIndex=t-1:_frameIndex=Math.min(t-1,Math.max(0,parseInt(e)));var n=_pages.getTransition(_pageIndex);n=="fade"?frameview.fadeOut("fast",function(){frameview.removeClass("loaded").load(getCurrentFrameUrl(),function(){changeSlider("0");frameview.show()})}):n!=="horizontal"&&n==="vertical";changeFrameBackground(_pages.getFrameSound(_pageIndex,_frameIndex));changeFrameNarration(_pages.getFrameNarration(_pageIndex,_frameIndex));framecounter.text(_frameIndex+1+"/"+t);var r=_pages.pageCount()-1,i=_pages.getFrameCount(_pageIndex)-1;if(_pageIndex===r&&_frameIndex===i){hideNavNext();showNavPrev()}else if(_pageIndex===0&&_frameIndex===0){showNavNext();hideNavPrev()}else showNav()}function changePage(e,t){var n=_pages.pageCount();e==="next"?_pageIndex<n-1&&_pageIndex++:e==="prev"?_pageIndex>0&&_pageIndex--:e==="first"?_pageIndex=0:e==="last"?_pageIndex=n-1:_pageIndex=Math.max(0,Math.min(n-1,parseInt(e)));pageview.fadeOut("fast",function(){pageview.removeClass("loaded").load(_pages.getPageUrl(_pageIndex),function(){t?changeFrame(t):changeFrame("0");pageview.fadeIn()})});changePageBackground(_pages.getPageSound(_pageIndex));pagetitle.text(_pages.getPageTitle(_pageIndex))}function next(){_frameIndex<_pages.getFrameCount(_pageIndex)?changeFrame("next"):_pageIndex<_pages.pageCount()-1&&changePage("next")}function prev(){_frameIndex!==0?changeFrame("prev"):_pageIndex>0&&changePage("prev","last")}var _pageIndex=0,_frameIndex=0,slideIndex=0,pageview=$(".pageview"),pageview_width=0,frameview=$(".frameview").first(),nextbutton=$("#nextbutton"),prevbutton=$("#prevbutton"),chapters=$(".chapters"),pagecounter=$(".pagecounter"),pagetitle=$(".pagetitle"),framecounter=$(".framecounter"),overlay=$(".overlay"),body=$("body"),navList=$("#mainnav");for(var i=0;i<_pages.pageCount();i++){var navPage=$("<li/>").appendTo(navList),navPageLink=$("<a/>").text(_pages.getPageTitle(i)).attr("onClick","changePage("+i+")").appendTo(navPage);if(_pages.getFrameCount(i)>1){navPage.addClass("has-dropdown");var navPageList=$("<ul />").addClass("dropdown").appendTo(navPage),fr=_pages.getFrames(i);$.each(fr,function(e){var t=$("<li/>").appendTo(navPageList),n=$("<a/>").text("Page "+(e+1)).attr("onClick","changePage("+i+", "+e+")").appendTo(t)})}};