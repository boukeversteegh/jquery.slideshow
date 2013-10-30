(function($) {
    $.fn.slideshow = function() {

        /* Slides */
        
        var fontsize = this.find('.slide').css('font-size');
        fontsize = fontsize ? fontsize : 'inherit';
        
        this.addClass('slideshow').css({
            'position':    'relative'
        }).find('.slides').css({
            'white-space': 'nowrap',
            'font-size':   0,
            'overflow':    'hidden'
        }).find('.slide').css({
            'display':     'inline-block',
            'font-size':   fontsize,
            'width':       '100%',
            'white-space': 'normal',
            'vertical-align': 'top'
        });
        this.find('.slide-controls').find('.btn, .btn-next, .btn-prev').css({
            'cursor':     'pointer'
        });
            

        var showslide = function($slideshow, index, animate) {
            //console.log($(this));
            //var $slideshow = $(this);
            
            var $slides = $slideshow.children('.slides');
            animate = (animate===undefined ? true: animate);
            if( index < 0 ) {
                return false;
            }
            if( index >= $slides.children().length ) {
                return false;
            }
            
            var duration = (animate ? 200 : 0);
            
            var $slide  = $slides.find('> .slide').eq(index);
            var $btn    = $slideshow.find('> .slide-controls > .btn').eq(index);
            
            var horizontal = !$slideshow.is('.slideshow-v');
            var offset = null;
            
            if( horizontal ) {
                var left= $slides.scrollLeft();
                offset  = $slide.position().left;
                var scroll = offset+left;
                scroll = (index == 0 ? 0 : scroll);
                $slides.animate({
                    scrollLeft: scroll
                }, duration);
            } else {
                var top = $slides.scrollTop();
                offset  = $slide.position().top;
                var scroll = offset + top;
                scroll = (index == 0 ? 0 : scroll);
                $slides.animate({
                    scrollTop: scroll
                }, duration);
            }
            $btn.addClass('active').siblings().removeClass('active');
            $slideshow.data('index', index);
        };

        this.find('.slide-controls .btn').click(function() {
            var index = $(this).closest('.slide-controls').find('> .btn').index(this);
            var $slideshow = $(this).closest('.slideshow');
            showslide($slideshow, index);
        });

        this.find('.slide-controls .btn-prev, .slide-controls .btn-next').click(function() {
            var $slideshow = $(this).closest('.slideshow');
            var index = $slideshow.data('index');
            if( index === undefined ) {
                index = 0;
            }
            var delta = $(this).is('.btn-prev') ? -1 : 1;
            showslide($slideshow, index + delta);
        });
    }
})(jQuery);