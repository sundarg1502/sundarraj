// @codekit-prepend "/vendor/hammer-2.0.8.js";

$( document ).ready(function() {

  // DOMMouseScroll included for firefox support
  var canScroll = true,
      scrollController = null;
  $(this).on('mousewheel DOMMouseScroll', function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {

      e.preventDefault();

      var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;

      if (delta > 50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(1);
      }
      else if (delta < -50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(-1);
      }

    }

  });

  $('.side-nav li, .outer-nav li').click(function(){

    if (!($(this).hasClass('is-active'))) {

      var $this = $(this),
          curActive = $this.parent().find('.is-active'),
          curPos = $this.parent().children().index(curActive),
          nextPos = $this.parent().children().index($this),
          lastItem = $(this).parent().children().length - 1;

      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);

    }

  });

  $('.cta').click(function(){

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = lastItem;

    updateNavs(lastItem);
    updateContent(curPos, nextPos, lastItem);

  });

  // swipe support for touch devices
  var targetElement = document.getElementById('viewport'),
      mc = new Hammer(targetElement);
  mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  mc.on('swipeup swipedown', function(e) {

    updateHelper(e);

  });

  $(document).keyup(function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {
      e.preventDefault();
      updateHelper(e);
    }

  });

  // determine scroll, swipe, and arrow key direction
  function updateHelper(param) {

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = 0;

    if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
      if (curPos !== lastItem) {
        nextPos = curPos + 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }
    else if (param.type === "swipedown" || param.keyCode === 38 || param < 0){
      if (curPos !== 0){
        nextPos = curPos - 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        nextPos = lastItem;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }

  }

  // sync side and outer navigations
  function updateNavs(nextPos) {

    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.outer-nav').children().eq(nextPos).addClass('is-active');

  }

  // update main content area
  function updateContent(curPos, nextPos, lastItem) {

    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');

    if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    }
    else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    }
    else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }

    if (nextPos !== 0 && nextPos !== lastItem) {
      $('.header--cta').addClass('is-active');
    }
    else {
      $('.header--cta').removeClass('is-active');
    }

  }

  function outerNav() {

    $('.header--nav-toggle').click(function(){

      $('.perspective').addClass('perspective--modalview');
      setTimeout(function(){
        $('.perspective').addClass('effect-rotate-left--animate');
      }, 25);
      $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');

    });

    $('.outer-nav--return, .outer-nav li').click(function(){

      $('.perspective').removeClass('effect-rotate-left--animate');
      setTimeout(function(){
        $('.perspective').removeClass('perspective--modalview');
      }, 400);
      $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');

    });

  }

  function workSlider() {

    $('.slider--prev, .slider--next').click(function() {

      var $this = $(this),
          curLeft = $('.slider').find('.slider--item-left'),
          curLeftPos = $('.slider').children().index(curLeft),
          curCenter = $('.slider').find('.slider--item-center'),
          curCenterPos = $('.slider').children().index(curCenter),
          curRight = $('.slider').find('.slider--item-right'),
          curRightPos = $('.slider').children().index(curRight),
          totalWorks = $('.slider').children().length,
          $left = $('.slider--item-left'),
          $center = $('.slider--item-center'),
          $right = $('.slider--item-right'),
          $item = $('.slider--item');

      $('.slider').animate({ opacity : 0 }, 400);

      setTimeout(function(){

      if ($this.hasClass('slider--next')) {
        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
          $left.removeClass('slider--item-left').next().addClass('slider--item-left');
          $center.removeClass('slider--item-center').next().addClass('slider--item-center');
          $right.removeClass('slider--item-right').next().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === totalWorks - 1) {
            $item.removeClass('slider--item-left').first().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else if (curCenterPos === totalWorks - 1) {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $item.removeClass('slider--item-center').first().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $item.removeClass('slider--item-right').first().addClass('slider--item-right');
          }
        }
      }
      else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
          $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
          $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === 0) {
            $item.removeClass('slider--item-left').last().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else if (curCenterPos === 0) {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $item.removeClass('slider--item-center').last().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $item.removeClass('slider--item-right').last().addClass('slider--item-right');
          }
        }
      }

    }, 400);

    $('.slider').animate({ opacity : 1 }, 400);

    });

  }

  function transitionLabels() {

    $('.work-request--information input').focusout(function(){

      var textVal = $(this).val();

      if (textVal === "") {
        $(this).removeClass('has-value');
      }
      else {
        $(this).addClass('has-value');
      }

      // correct mobile device window position
      window.scrollTo(0, 0);

    });

  }

  outerNav();
  workSlider();
  transitionLabels();

});



// Add this JavaScript to handle scroll behavior
document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.querySelector('.terminal-body');
  const section = document.querySelector('.l-section.section');

  // Prevent scroll propagation from terminal body to window
  terminalBody.addEventListener('wheel', (e) => {
    const isAtTop = terminalBody.scrollTop === 0;
    const isAtBottom = terminalBody.scrollHeight - terminalBody.scrollTop === terminalBody.clientHeight;

    // If not at bounds or scrolling in valid direction, prevent propagation
    if (!(isAtTop && e.deltaY < 0) && !(isAtBottom && e.deltaY > 0)) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, { passive: false });

  // Additional handling for touch devices
  terminalBody.addEventListener('touchstart', (e) => {
    terminalBody.startY = e.touches[0].pageY;
  }, { passive: true });

  terminalBody.addEventListener('touchmove', (e) => {
    if (!terminalBody.startY) {
      return;
    }

    const y = e.touches[0].pageY;
    const delta = terminalBody.startY - y;
    const isAtTop = terminalBody.scrollTop === 0;
    const isAtBottom = terminalBody.scrollHeight - terminalBody.scrollTop === terminalBody.clientHeight;

    // Prevent default only if scrolling would be within bounds
    if (!(isAtTop && delta < 0) && !(isAtBottom && delta > 0)) {
      e.preventDefault();
    }
  }, { passive: false });
});

// Certificate section
/* Add JavaScript for carousel functionality */

// document.addEventListener('DOMContentLoaded', () => {
//     const track = document.querySelector('.certificates--track');
//     const items = document.querySelectorAll('.certificate-item');
//     const dots = document.querySelector('.certificates--dots');
//     const prevBtn = document.querySelector('.nav-btn.prev');
//     const nextBtn = document.querySelector('.nav-btn.next');
//     let currentIndex = 0;

//     // Create dots
//     items.forEach((_, index) => {
//         const dot = document.createElement('div');
//         dot.classList.add('dot');
//         if (index === 0) dot.classList.add('active');
//         dots.appendChild(dot);
//     });

//     // Navigation
//     function updateCarousel(index) {
//         const offset = -index * (300 + 30); // item width + gap
//         track.style.transform = `translateX(${offset}px)`;
//         document.querySelectorAll('.dot').forEach((dot, i) => {
//             dot.classList.toggle('active', i === index);
//         });
//     }

//     prevBtn.addEventListener('click', () => {
//         currentIndex = Math.max(currentIndex - 1, 0);
//         updateCarousel(currentIndex);
//     });

//     nextBtn.addEventListener('click', () => {
//         currentIndex = Math.min(currentIndex + 1, items.length - 1);
//         updateCarousel(currentIndex);
//     });
// });
// const track = document.querySelector(".certificates--track");
// let isDown = false;
// let startX;
// let scrollLeft;

// track.addEventListener("mousedown", (e) => {
//     isDown = true;
//     track.classList.add("active");
//     startX = e.pageX - track.offsetLeft;
//     scrollLeft = track.scrollLeft;
// });

// track.addEventListener("mouseleave", () => {
//     isDown = false;
//     track.classList.remove("active");
// });

// track.addEventListener("mouseup", () => {
//     isDown = false;
//     track.classList.remove("active");
// });

// track.addEventListener("mousemove", (e) => {
//     if (!isDown) return;
//     e.preventDefault();
//     const x = e.pageX - track.offsetLeft;
//     const walk = (x - startX) * 2; //scroll-fast
//     track.scrollLeft = scrollLeft - walk;
// });

const track = document.querySelector(".certificates--track");
const prevButton = document.querySelector(".nav-btn.prev");
const nextButton = document.querySelector(".nav-btn.next");
let currentIndex = 0;

// Function to update the carousel's position
function updateCarousel() {
  const trackWidth = track.offsetWidth;
  const itemWidth = track.querySelector(".certificate-item").offsetWidth;
  const visibleItems = Math.floor(trackWidth / (itemWidth + 30)); // Adjust for gap
  const totalItems = track.children.length;
  const maxIndex = totalItems - visibleItems;

  // Clamp the index within bounds
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  const translateX = -(currentIndex * (itemWidth + 30));
  track.style.transform = `translateX(${translateX}px)`;
}

// Event listeners for navigation buttons
prevButton.addEventListener("click", () => {
  currentIndex--;
  updateCarousel();
});

nextButton.addEventListener("click", () => {
  currentIndex++;
  updateCarousel();
});

// Initialize the carousel position
updateCarousel();