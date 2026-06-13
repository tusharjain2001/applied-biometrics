const carousels = {
  biofi: {
    imageId: "biofi-carousel-image",
    dotsId: "biofi-dots",
    images: [
      {
        src: "assets/images/carousels/biofi/redcomb.png",
        alt: "BioFi product image 1",
      },
      {
        src: "assets/images/carousels/biofi/white-pellets.jpg",
        alt: "BioFi product image 2",
      },
      {
        src: "assets/images/carousels/biofi/ramp-part.jpg",
        alt: "BioFi product image 3",
      },
      {
        src: "assets/images/carousels/biofi/grommet.jpg",
        alt: "BioFi product image 4",
      },
    ],
    index: 0,
  },
  btr: {
    imageId: "btr-carousel-image",
    dotsId: "btr-dots",
    images: [
      {
        src: "assets/images/carousels/btr/plain-jutin.jpg",
        alt: "BTR Board product image 1",
      },
      {
        src: "assets/images/carousels/btr/blue-carved-jutin.jpg",
        alt: "BTR Board product image 2",
      },
      {
        src: "assets/images/carousels/btr/mushroom.jpg",
        alt: "BTR Board product image 3",
      },
      {
        src: "assets/images/carousels/btr/green-jutin.jpg",
        alt: "BTR Board product image 4",
      },
    ],
    index: 0,
  },
};

function renderDots(name) {
  const carousel = carousels[name];
  const dotsRoot = document.getElementById(carousel.dotsId);
  const dotSpacing = 13;

  if (!dotsRoot.dataset.ready) {
    dotsRoot.innerHTML = "";

    carousel.images.forEach(() => {
      const dot = document.createElement("span");
      dot.className = "carousel-dot";
      dotsRoot.appendChild(dot);
    });

    const indicator = document.createElement("span");
    indicator.className = "carousel-dot-indicator";
    dotsRoot.appendChild(indicator);
    dotsRoot.dataset.ready = "true";
  }

  const indicator = dotsRoot.querySelector(".carousel-dot-indicator");
  indicator.style.transform = `translateX(${carousel.index * dotSpacing}px)`;
}

function updateCarousel(name) {
  const carousel = carousels[name];
  const image = document.getElementById(carousel.imageId);
  const current = carousel.images[carousel.index];
  const prevButton = document.querySelector(
    `.carousel-prev[data-carousel-target="${name}"]`
  );
  const nextButton = document.querySelector(
    `.carousel-next[data-carousel-target="${name}"]`
  );

  image.src = current.src;
  image.alt = current.alt;
  renderDots(name);

  if (prevButton) {
    prevButton.classList.toggle("is-hidden", carousel.index === 0);
  }

  if (nextButton) {
    nextButton.classList.toggle(
      "is-hidden",
      carousel.index === carousel.images.length - 1
    );
  }
}

function nextSlide(name) {
  const carousel = carousels[name];
  if (carousel.index >= carousel.images.length - 1) {
    return;
  }

  carousel.index += 1;
  updateCarousel(name);
}

function prevSlide(name) {
  const carousel = carousels[name];
  if (carousel.index <= 0) {
    return;
  }

  carousel.index -= 1;
  updateCarousel(name);
}

Object.keys(carousels).forEach((name) => updateCarousel(name));

document.querySelectorAll(".carousel-arrow").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.carouselTarget;
    const direction = button.dataset.carouselDirection;

    if (direction === "prev") {
      prevSlide(target);
      return;
    }

    nextSlide(target);
  });
});
