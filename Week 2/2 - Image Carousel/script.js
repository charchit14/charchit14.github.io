// Selecting all the slides
const slides = document.querySelectorAll(".slide");

// Loop through slides and set each slide's translateX
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

// Current slide counter
let curSlide = 0;

// Maximum number of slides
const maxSlide = slides.length - 1;

// Select the radio buttons
const radioButtons = document.querySelectorAll('.radio');

// Move to the next slide function
function nextSlide() {
  curSlide = (curSlide === maxSlide) ? 0 : curSlide + 1;
  moveSlide();
}

// Function to move slides
function moveSlide() {
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });

  // Update the checked status of the radio buttons
  radioButtons.forEach((radio, index) => {
    radio.checked = index === curSlide;
  });
}

// Automatic slide change interval (adjust this value to change slide duration)
const intervalTime = 2000; // in milliseconds
let slideInterval;

// Start automatic slide change
function startSlideInterval() {
  slideInterval = setInterval(nextSlide, intervalTime);
}

// Stop automatic slide change
function stopSlideInterval() {
  clearInterval(slideInterval);
}

// Add event listener to each radio button
radioButtons.forEach((radio, index) => {
  radio.addEventListener('change', () => {
    curSlide = index;
    moveSlide();
    stopSlideInterval();
  });
});

// Start automatic sliding initially
startSlideInterval();

// Listen for mouseover and mouseout events to stop/start automatic sliding
const slider = document.querySelector('.slider');
slider.addEventListener('mouseover', stopSlideInterval);
slider.addEventListener('mouseout', startSlideInterval);


// For the working of side buttons
// Select the next slide button
const nextSlideBtn = document.querySelector(".btn-next");

// Adding event listener for the next slide button
nextSlideBtn.addEventListener("click", () => {
  nextSlide();
  stopSlideInterval();
});

// Select the previous slide button
const prevSlideBtn = document.querySelector(".btn-prev");

// Adding event listener for the previous slide button
prevSlideBtn.addEventListener("click", () => {
  curSlide = (curSlide === 0) ? maxSlide : curSlide - 1;
  moveSlide();
  stopSlideInterval();
});
