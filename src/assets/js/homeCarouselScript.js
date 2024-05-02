document.addEventListener("DOMContentLoaded", function () {
  var multipleCardCarousel = document.querySelector("#carouselControls");

  if (window.matchMedia("(min-width: 576px)").matches) {
    var carousel = new bootstrap.Carousel(multipleCardCarousel, {
      interval: false,
      wrap: false,
    });
    var carouselInner = document.querySelector(
      "#carouselControls .carousel-inner"
    );
    var carouselWidth = carouselInner.scrollWidth;
    var cardWidth = document.querySelector(
      "#carouselControls .carousel-item"
    ).offsetWidth;
    var scrollPosition = 0;

    var nextButton = document.querySelector(
      "#carouselControls .carousel-control-next"
    );

    nextButton.addEventListener("click", function () {
      if (scrollPosition < carouselWidth - cardWidth * 3) {
        scrollPosition += cardWidth;
        carouselInner.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    });

    var prevButton = document.querySelector(
      "#carouselControls .carousel-control-prev"
    );

    prevButton.addEventListener("click", function () {
      if (scrollPosition > 1) {
        scrollPosition -= cardWidth;
        carouselInner.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    });
  } else {
    multipleCardCarousel.classList.add("slide");
  }
});
