/*
 * @fileOverview Slideshow - jQuery Plugin
 * @version 1.0
 *
 * @author Bouke Versteegh http://www.github.com/boukeversteegh
 * @see https://www.github.com/boukeversteegh/jquery.slideshow
 *
 * Licence: GPL Version 2
 */
(function($) {
    $.fn.slideshow = function(options) {

        var settings = $.extend({
            duration:   200,
            direction:  'horizontal'
        }, options );
        
        var fontsize = this.find('.slide').css('font-size');
        fontsize = fontsize ? fontsize : 'inherit';
        
        var position = $(this).css('position');

        // Slideshow css-position must be relative or absolute
        if( !$.inArray(position, ['relative', 'absolute']) ) {
            position = 'relative';
        }
        this.addClass('slideshow').css({
            'position':    position
        }).find('.slides').css({
            'overflow':    'hidden'
        }).find('.slide').css({
            
        });

        this.find('.slide-controls').find('.btn, .btn-next, .btn-prev').css({
            'cursor':     'pointer'
        });
        
        if( settings.direction == 'horizontal' ) {
            this.find('.slides').css({
                'white-space': 'nowrap',
                'font-size':   0
            }).find('.slide').css({
                'display':     'inline-block',
                'font-size':   fontsize,
                'width':       '100%',
                'white-space': 'normal',
                'vertical-align': 'top'
            })
        } else {
            this.css({
                'overflow':     'hidden'
            }).find('.slides').css({
                'position':     'relative',
                'height':       '100%'
            }).find('.slide').css({
                'display':      'block',
                'height':       '100%'
            });
        }

        var showslide = function($slideshow, index, animate) {
            
            var $slides = $slideshow.children('.slides');
            animate = (animate === undefined ? true: animate);
            if( index < 0 ) {
                return false;
            }
            if( index >= $slides.children().length ) {
                return false;
            }
            
            var duration = (animate ? settings.duration : 0);
            
            var $slide  = $slides.find('> .slide').eq(index);
            var $btn    = $slideshow.find('> .slide-controls > .btn').eq(index);
            
            var offset = null;
            
            if( settings.direction == 'horizontal' ) {
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