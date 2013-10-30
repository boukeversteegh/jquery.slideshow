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

