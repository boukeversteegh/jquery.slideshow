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

    /* default options */
    var defaults = {
        duration:   200,
        direction:  'horizontal'
    };

    /* plugin methods */
    var methods = {
        /**
         * Creates a slideshow from element
         * @param {object} options Array of options.
         */
        init: function(options) {
            if( !options ) {
                options = {};
            }
            $(this).each(function() {
                var $slideshow = $(this);

                var settings = $.extend({}, defaults);
                $.extend(settings, options);
                
                $slideshow.data('settings', settings);

                var fontsize = $slideshow.find('> .slides > .slide').css('font-size');
                fontsize = fontsize ? fontsize : 'inherit';
                
                var position = $slideshow.css('position');

                // Slideshow css-position must be relative or absolute
                if( $.inArray(position, ['relative', 'absolute']) < 0 ) {
                    position = 'relative';
                }
                $slideshow.addClass('slideshow').css({
                    'position':    position
                }).find('> .slides').css({
                    'overflow':    'hidden'
                }).find('> .slide').css({
                    
                });

                $slideshow.find('> .slide-controls').find('.btn, .btn-next, .btn-prev').css({
                    'cursor':     'pointer'
                });
                
                if( settings.direction == 'horizontal' ) {
                    $slideshow.find('> .slides').css({
                        'white-space': 'nowrap',
                        'font-size':   0
                    }).find('> .slide').css({
                        'display':     'inline-block',
                        'font-size':   fontsize,
                        'width':       '100%',
                        'white-space': 'normal',
                        'vertical-align': 'top'
                    })
                } else {
                    $slideshow.css({
                        'overflow':     'hidden'
                    }).find('> .slides').css({
                        'position':     'relative',
                        'height':       '100%'
                    }).find('> .slide').css({
                        'display':      'block',
                        'height':       '100%'
                    });
                }

                // Bind slide-controls buttons directly under current slideshow
                $('> .slide-controls .btn', $slideshow).click(function() {
                    var index = $(this).closest('.slide-controls').find('> .btn').index(this);
                    var $slideshow = $(this).closest('.slideshow');
                    methods.showslide.apply($slideshow, [index]);
                });

                $('> .slide-controls .btn-prev, > .slide-controls .btn-next', $slideshow).click(function() {
                    var $slideshow = $(this).closest('.slideshow');
                    var index = $slideshow.data('index');

                    if( index === undefined ) {
                        index = 0;
                    }
                    var delta = $(this).is('.btn-prev') ? -1 : 1;
                    methods.showslide.apply($slideshow, [index + delta]);
                });
            });
            

        },
        /**
         * Show a slide with given index.
         * @param {number} index Slide index. Starts with 0.
         * @param {number} animate Slide animation duration. False or 0 for no animation.
         */
        showslide: function(index, animate) {
            $(this).each(function() {
                var $slideshow = $(this);
                var $slides = $slideshow.children('.slides');
                var settings = $slideshow.data('settings');

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
            })
            
        },
        option: function(key, value) {
            if( !value ) {
                return $(this).eq(0).data('settings')[key];
            } else {
                $(this).each(function() {
                    $(this).data('settings')[key] = value;
                });
            }
        }
    };
    $.fn.slideshow = function(method_options) {
        if( methods[method_options] ) {
            return methods[method_options].apply(this, Array.prototype.slice.call( arguments, 1 ));
        } else if( typeof method_options === 'object' || !method_options ) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( '"' + method_options + '" is not a method of jquery.slideshow');
        } 
    };
})(jQuery);
