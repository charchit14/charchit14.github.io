// Selecting all the slides
const slides = document.querySelectorAll(".slide");

// Select the radio buttons
const radioButtons = document.querySelectorAll('.radio');


// Loop through slides and set each slide's translateX
// Loops through each slide and sets its initial position using transform to ensure they are side by side horizontally
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});


// Current slide counter (Keeps track of the currently displayed slide)
let curSlide = 0;


// Maximum number of slides (stores the maximum index of the slides (total slides - 1))
const maxSlide = slides.length - 1;


// Move to the next slide function
// ? (ternary operator) checks if current slide is the last slide (max slide)
// If current slide is last slide then next slide is first slide so, 0 else move to next slide so, 1
function nextSlide() {
  curSlide = (curSlide === maxSlide) ? 0 : curSlide + 1;
  moveSlide();
}


// Function to move slides
/* Adjusting slide position (this calculation shifts the slides horizontally to display the current slide in the view, 
making other slides move left or right depending on their position relative to the curSlide) */
function moveSlide() {
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });

  // Update the checked status of the radio buttons based on the slide
  radioButtons.forEach((radio, index) => {
    radio.checked = index === curSlide;
  });
}


// Automatic slide change interval
const intervalTime = 2000; // In milliseconds
let slideInterval;  // To store reference to the interval created by setInterval, initially it's declared without a value


// Start automatic slide change
function startSlideInterval() {
  slideInterval = setInterval(nextSlide, intervalTime);
}


// Stop automatic slide change
function stopSlideInterval() {
  clearInterval(slideInterval); // Clears the interval store in the slideInterval and hence, stops the execution of next slide
}


// Add event listener to each radio button
radioButtons.forEach((radio, index) => {  // Iterate over each radio button
  radio.addEventListener('change', () => {  // For each radio button adds event listener for the 'change' event. (This even fires when radio button selection changes)
    curSlide = index; // When radio button's state changes sets the value of cuurent slide to the index (index refers to the index of currently iterated radio button)
    moveSlide();  // Calls the moveSlide function
    stopSlideInterval(); // To halt the auto sliding (to let user manually control selection of slide )
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
  curSlide = (curSlide === 0) ? maxSlide : curSlide - 1;  // Checks if current slide is first slide, if yes then that's the max slide else, reduce by 1
  moveSlide();
  stopSlideInterval();
});
