Jquery Slideshow
----------------

How to use:

```html
<div id="slideshow">
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
.slideshow {
    height:   100px;
    width:    300px;
    border:   1px solid red;
    position: relative
}
.slide-controls .active {
    color: red;
}
```


```javascript
$('#slideshow').slideshow();
```
