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
        direction:  'horizontal',
        auto:      false,
        loop:      false,
        interval:  5000,
        selectors: {
            slides:     '> .slides',
            slide:      '> .slide',
            controls:   '> .slide-controls',
            button:     '.btn',
            prev:       '.btn-prev',
            next:       '.btn-next'
        }
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
                var settings = $.extend(true, {}, defaults);
                $.extend(true, settings, options);
                
                var $slideshow  = $(this);
                $slideshow.data('settings', settings);
                var selectors = settings.selectors;

                
                var $slides     = $slideshow.find(selectors.slides);
                var $slide      = $slides.find(selectors.slide);
                var $controls   = $slideshow.find(selectors.controls);
                var $buttons    = $slideshow.find([selectors.button, selectors.prev, selectors.next].join(','));
                var position    = $slideshow.css('position');

                // Slideshow css-position must be relative or absolute
                if( $.inArray(position, ['relative', 'absolute', 'fixed']) < 0 ) {
                    position = 'relative';
                }

                $slideshow.addClass('slideshow').css({
                    'position':    position
                });

                $slides.css({
                    'overflow':    'hidden'
                });

                $buttons.css({
                    'cursor':     'pointer'
                });

                var fontsize = $slide.css('font-size');
                fontsize = fontsize ? fontsize : 'inherit';

                if( settings.direction == 'horizontal' ) {
                    $slides.css({
                        'white-space': 'nowrap',
                        'font-size':   0
                    });
                    $slide.css({
                        'display':          'inline-block',
                        'font-size':        fontsize,
                        'width':            '100%',
                        'white-space':      'normal',
                        'vertical-align':   'top'
                    })
                } else {
                    $slideshow.css({
                        'overflow':     'hidden'
                    });
                    $slides.css({
                        'position':     'relative',
                        'height':       '100%'
                    });
                    $slide.css({
                        'display':      'block',
                        'height':       '100%'
                    });
                }

                // Bind slide-controls buttons directly under current slideshow
                $(selectors.controls, $slideshow).find(selectors.button).on('touchstart click', function(e) {
                    var controls_selector = selectors.controls.match('(.*[>\\s])?(.+)').pop();
                    var index = $(this).closest(controls_selector).find('> .btn').index(this);
                    methods.showslide.apply($slideshow, [index]);
                    
                    if( e.type == 'touchstart' ) {
                        e.stopPropagation();
                        return false;
                    }
                });

                var $prevnext = $(selectors.controls, $slideshow).find([selectors.prev, selectors.next].join(','));
                $prevnext.on('touchstart click', function(e) {
                    if( $(this).is(settings.selectors.prev) ) {
                        $slideshow.slideshow('previous');
                    } else {
                        $slideshow.slideshow('next');
                    }
                    if( e.type == 'touchstart' ) {
                        e.stopPropagation();
                        return false;
                    }
                });

                // Autoplay
                if( settings.autoplay ) {
                    $slideshow.slideshow('autoplay');
                }
            });
            

        },
        /**
         * Show a slide with given index.
         * @param {number} index Slide index. Starts with 0.
         * @param {number} animate Slide animation duration. False or 0 for no animation.
         */
        showslide: function(index, animate) {
            index = ( typeof index != 'undefined' ) ? index : 0;
            $(this).each(function() {
                var $slideshow = $(this);
                var settings = $slideshow.data('settings');
                var $slides = $slideshow.find(settings.selectors.slides);

                animate = (animate === undefined ? true: animate);
                if( index < 0 ) {
                    return false;
                }
                if( index >= $slides.children().length ) {
                    return false;
                }
                
                var duration = (animate ? settings.duration : 0);
                
                var $slide  = $slides.find(settings.selectors.slide).eq(index);
                var $btn    = $slideshow.find(settings.selectors.controls).find(settings.selectors.button).eq(index);
                
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
        /**
         * Jump to slide
         * @param {number} delta Number of slides to jump forward. 1 is next, -1 previous.
         */
        jump: function(delta) {
            $(this).each(function() {
                var $slideshow = $(this);
                var index = $slideshow.data('index');
                if( index === undefined ) {
                    index = 0;
                }
                var settings = $slideshow.data('settings');
                var target = index+delta;
                var slidecount = $slideshow.find(settings.selectors.slides).children().length;
                if( settings.loop ) {
                    target = (target + slidecount) % slidecount; 
                }
                $slideshow.slideshow('showslide', target);
            });
        },
        /**
         * Jump to next slide
         */
        next: function() {
            $(this).slideshow('jump', 1);
        },
        /**
         * Jump to previous slide
         */
        previous: function() {
            $(this).slideshow('jump', -1);
        },
        autoplay: function() {
            $(this).each(function() {
                var $slideshow = $(this);
                var settings = $slideshow.data('settings');
                
                var timer = window.setInterval(
                    function() {
                        if( !settings.interupt ) {
                            $slideshow.slideshow('next');
                        }
                    },
                    settings.interval
                );
                $slideshow.data('timer', timer);

                $slideshow.hover(
                    function() {
                        $(this).slideshow('option', 'interupt', true);
                    },
                    function() {
                        $(this).slideshow('option', 'interupt', false);
                    }
                );
                $slideshow.bind('touchstart', function() {
                    $(this).slideshow('option', 'interupt', true);
                });
            });
        },
        play: function() {
            $(this).each(function() {
                var $slideshow = $(this);
                var settings = $slideshow.data('settings');
                var timer = window.setInterval(
                    function() {
                        $slideshow.slideshow('next');
                    },
                    settings.interval
                );
                $slideshow.data('timer', timer);
            });
        },
        pause: function() {
            $(this).each(function() {
                var $slideshow = $(this);
                var timer = $slideshow.data('timer');
                window.clearInterval(timer);
            });
        },
        option: function(key, value) {
            if( typeof value == 'undefined' ) {
                return $(this).eq(0).data('settings')[key];
            } else {
                $(this).each(function() {
                    $(this).data('settings')[key] = value;
                });
                return $(this);
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
