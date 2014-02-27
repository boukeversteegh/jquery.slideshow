Jquery Slideshow
----------------

How to use:

```html
<div id="myslideshow">
    <div class="slide-controls">
        <span class="btn-prev">Previous</span>
        <span class="btn">1</span>
        <span class="btn">2</span>
        <span class="btn">3</span>
        <span class="btn">4</span>
        <span class="btn-next">Next</span>
    </div>
    <div class="slides">
        <div class="slide">A</div>
        <div class="slide">B</div>
        <div class="slide">C</div>
        <div class="slide">D</div>
    </div>
</div>
```

```css
#myslideshow {
    height:   100px;
    width:    300px;
    border:   1px solid red;
}
.slide-controls .active {
    color: red;
}
```


```javascript
$('#myslideshow').slideshow();
```

Options
-------

 *  <code>**direction**</code> (default: <code>horizontal</code>)  
    Type: *String*  
    Direction the slides will move. 
   *  <code>horizontal</code>  
   *  <code>vertical</code>
 *  <code>**duration**</code> (default: <code>200</code>)  
    Type: *Number*  
    Duration of slide animation.
 *  <code>**autoplay**</code> (default: <code>false</code>)  
    Type: *Bool*  
    If true, the slideshow will play automatically, but pause while the user hovers over it.
 *  <code>**interval**</code> (default: <code>5000</code>)  
    Type: *Number*  
    Specifies the delay at which the slideshow progresses, while playing.
 *  <code>**loop**</code> (default: <code>false</code>)  
    Type: *Bool*  
    Whether the slideshow starts over after the last slide.  
    If true, *previous* and *next* will always work, even at the start and end.


Methods
-------

 * <code>**showslide(index, [duration])**</code>  
   *  <code>index</code>  
      Type: *Number*  
      Index of the slide to show
   *  <code>duration</code> (default: <code>options.duration</code>, <code>200</code>)  
      Type: *Number*  
      Duration of slide animation  
      Type: *Bool* (<code>false</code>)  
      No animation
 * <code>**jump(delta)**</code>  
   Jump a certain number of slides forward or backward  
   *  <code>delta</code>  
      Type: *Number*  
      How many slides to jump. 1 for next, -1 for previous.
 * <code>**next()**</code>  
   Jump to the next slide
 * <code>**previous()**</code>  
   Jump to the previous slide
 * <code>**play()**</code>  
   Automatically go to the next slide, at specified **interval**.
 * <code>**pause()**</code>  
   Interupt playback of the slideshow.

```javascript
// Show second slide of #myslideshow
$('#myslideshow').slideshow('showslide', 1);
```
