function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('show');
}

//site Title

document.addEventListener("DOMContentLoaded", () => {
  const siteTitle = document.getElementById('siteTitle');
  const bottomRight = document.querySelector('.bottom-right');

  if (siteTitle) {
    // ✅ Add click event for redirect
    siteTitle.addEventListener("click", function () {
      window.location.href = this.dataset.href;
    });
  }

  if (siteTitle && bottomRight) {
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (window.scrollY > 50) {
        siteTitle.style.opacity = '0';
        siteTitle.style.pointerEvents = 'none';

        bottomRight.style.opacity = '0';
        bottomRight.style.pointerEvents = 'none';
      } else {
        siteTitle.style.opacity = '1';
        siteTitle.style.pointerEvents = 'auto';

        bottomRight.style.opacity = '1';
        bottomRight.style.pointerEvents = 'auto';
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }
});


// ✅ Lightbox
function openLightbox(img) {
  if (!img || !img.src) return;

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (lightbox && lightboxImg) {
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) lightbox.style.display = "none";
}

// DOT AUTO SLIDE INDICATORS

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("gallerySlider");
  const dotsContainer = document.getElementById("dotsContainer");

    // ✅ Exit if gallery elements are not found (prevents 'null.children' error)
  if (!slider || !dotsContainer) return;

  const slides = Array.from(slider.children).filter(el =>
    el.classList.contains("gallery-slide") && el.querySelector("img")
  );

  dotsContainer.innerHTML = "";

  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      scrollToSlide(index);
    });

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  function scrollToSlide(index) {
    slider.scrollTo({
      left: slides[index].offsetLeft - slider.offsetLeft,
      behavior: "smooth"
    });
    updateActiveDot(index);
    currentIndex = index; // Sync with auto-slider
  }

  function updateActiveDot(index) {
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  slider.addEventListener("scroll", () => {
    let activeIndex = 0;
    const scrollLeft = slider.scrollLeft;

    slides.forEach((slide, i) => {
      const slideCenter = slide.offsetLeft - slider.offsetLeft + slide.offsetWidth / 2;
      if (scrollLeft + slider.offsetWidth / 2 >= slideCenter) {
        activeIndex = i;
      }
    });

    updateActiveDot(activeIndex);
  });

  // ✅ Auto-slide setup
  let currentIndex = 0;
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    scrollToSlide(currentIndex);
  }, 4000);
});

// Show/hide the scroll-up image on scroll
window.addEventListener("scroll", () => {
  const scrollImg = document.getElementById("scrollTopImg");
  if (scrollImg) {
    scrollImg.style.display = window.scrollY > 200 ? "block" : "none";
  }
});

// Smooth scroll to top on click
document.addEventListener("DOMContentLoaded", () => {
  const scrollImg = document.getElementById("scrollTopImg");
  if (scrollImg) {
    scrollImg.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
