(function() {
  /*
  <div class="js-simple-slider">
    <ul class="js-ss">
      <li>Slide content</li>
    </ul>
    <div class="js-ss-prev" tabindex="0" aria-label="Previous slide">Prev</div>
    <div class="js-ss-next" tabindex="0" aria-label="Next slide">Next</div>
  </div>
  */
  function simsl(arr) {
    var len = arr.length;
    $.each(arr, function(index, el) {
      el.removeAttr('class').attr('aria-hidden', true);
      if (index === 0) { el.addClass('js-ss-sl-current').removeAttr('aria-hidden');
      } else if (index === 1) { el.addClass('js-ss-sl-right');
      } else if (index === (len - 1)) { el.addClass('js-ss-sl-left');
      } else { el.addClass('js-ss-sl'); }
    });
  }
  function simslNext(arr) {
    arr.push(arr.shift());
    simsl(arr);
  }
  function simslPrev(arr) {
    arr.unshift(arr.pop());
    simsl(arr);
  }
  // sliders
  $('.js-simple-slider').each(function() {
    var ss = $('.js-ss', this);
    var elm = $('.js-ss li', this);
    var arr = [];
    elm.each(function() { arr.push($(this)); });
    // clone (for placeholder purposes)
    ss.wrap('<div class="js-ss-wrap"></div>');
    ss.clone().removeClass('js-ss').addClass('js-ss-placeholder').attr('aria-hidden', true).insertAfter(ss);
    // init
    simsl(arr);
    // click / keyboard focus
    $('.js-ss-next', this).click(function() { simslNext(arr); }).on('keydown', function(e) { if (e.which == 13) { simslNext(arr); } });
    $('.js-ss-prev', this).click(function() { simslPrev(arr); }).on('keydown', function(e) { if (e.which == 13) { simslPrev(arr); } });
    // keyboard arrows
    $('body').on('keydown', function(e) {
      if (e.which == 39) { simslNext(arr); }
      if (e.which == 37) { simslPrev(arr); }
    });
    // swipe (require pure-swipe addon)
    ss[0].addEventListener('swiped-left', function() { simslNext(arr); });
    ss[0].addEventListener('swiped-right', function() { simslPrev(arr); });
  });
})();