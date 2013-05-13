// ----------------------------------------------------------------
// custom fake blend modes
// ----------------------------------------------------------------

function filter(){
          $( ".filter" ).each(function(){
          var $this = $(this);

          if(!$this.next('.c').length){
            var canvas = $('<canvas class="c stretch"></canvas>').insertAfter($this);
            if ($this.hasClass("filmstrip")) { 
              $this.removeClass("filmstrip"); 
              canvas.removeClass("stretch").addClass("filmstrip"); 
            };

          var v = $this[0];
          var canvas = $this.next('.c')[0];
          var context = canvas.getContext('2d');
          var back = document.createElement('canvas');
          var backcontext = back.getContext('2d');
          var loop = false;

          var cw,ch;

          if ($this.is("video")) {
          loop = true;
            v.addEventListener('play', function(){
              cw = v.clientWidth;
              ch = v.clientHeight;
              canvas.width = cw;
              canvas.height = ch;
              back.width = cw;
              back.height = ch;
                if( $this.hasClass('screen') ){
                    screenBlend(v,context,backcontext,cw,ch,loop);
                } else if( $this.hasClass('multiply') ){
                    multiplyBlend(v,context,backcontext,cw,ch,loop);
                }
              
            });

          } else {
             $this.imagesLoaded(function(){
              cw = imgRealSize( $this ).width;
              ch = imgRealSize( $this ).height;
              $this.next('.c').width(cw);
              $this.next('.c').height(ch);
              canvas.width = cw;
              canvas.height = ch;
              back.width = cw;
              back.height = ch;
                if( $this.hasClass('screen') ){
                    $this.hasClass('bw') ? screenBlendBW(v,context,backcontext,cw,ch,loop) : screenBlend(v,context,backcontext,cw,ch,loop);
                } else if( $this.hasClass('multiply') ){
                   $this.hasClass('bw') ? multiplyBlendBW(v,context,backcontext,cw,ch,loop) : multiplyBlend(v,context,backcontext,cw,ch,loop);
                }
              });
            }
        } 

      });
}



function screenBlend(v,c,bc,w,h,l) {
    if(v.paused || v.ended) return false;

    bc.drawImage(v,0,0,w,h);

    var idata = bc.getImageData(0,0,w,h);
    var data = idata.data;

    for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var t = Math.max(r,g,b);
        data[i] = (r*255)/t;
        data[i+1] = (g*255)/t;
        data[i+2] = (b*255)/t;
        data[i+3] = t;
    }
    idata.data = data;

    c.putImageData(idata,0,0);


    if(l) {requestAnimationFrame(function(){ screenBlend(v,c,bc,w,h,l); });}
}

function multiplyBlend(v,c,bc,w,h,l) {
    if(v.paused || v.ended) return false;

    bc.drawImage(v,0,0,w,h);

    var idata = bc.getImageData(0,0,w,h);
    var data = idata.data;

    for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var t = 255 - (Math.min(r,g,b));
        data[i] = 255 * (r - (255 - t)) / t;
        data[i+1] = 255 * (g - (255 - t)) / t;
        data[i+2] = 255 * (b - (255 - t)) / t;
        data[i+3] = t;
    }
    idata.data = data;

    c.putImageData(idata,0,0);

    if(l) {requestAnimationFrame(function(){ multiplyBlend(v,c,bc,w,h,l); });}
}

function screenBlendBW(v,c,bc,w,h,l) {
    if(v.paused || v.ended) return false;

    bc.drawImage(v,0,0,w,h);

    var idata = bc.getImageData(0,0,w,h);
    var data = idata.data;

    for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        data[i] = 255;
        data[i+1] = 255;
        data[i+2] = 255;
        data[i+3] = r;
    }
    idata.data = data;

    c.putImageData(idata,0,0);


    if(l) {requestAnimationFrame(function(){ screenBlend(v,c,bc,w,h,l); });}
}

function multiplyBlendBW(v,c,bc,w,h,l) {
    if(v.paused || v.ended) return false;

    bc.drawImage(v,0,0,w,h);

    var idata = bc.getImageData(0,0,w,h);
    var data = idata.data;

    for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        data[i] = 0;
        data[i+1] = 0;
        data[i+2] = 0;
        data[i+3] = 255-r;
    }
    idata.data = data;

    c.putImageData(idata,0,0);

    if(l) {requestAnimationFrame(function(){ multiplyBlend(v,c,bc,w,h,l); });}
}