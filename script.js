// Variables
let characterCount = document.querySelector(".jsCharacterCount");
let wordCount = document.querySelector(".jsWordCount");
let sentenceCount = document.querySelector(".jsSentenceCount");
let textarea = document.querySelector("textarea");
let excludeSpaces = document.querySelector(".jsExcludeSpaces");
let totalCharacters = document.querySelector(".jsTotalCharacters");
let readingTime = document.querySelector(".jsReadingTime");
let charLimit = document.querySelector(".jsCharLimit");
let charLimitBtn = document.querySelector(".jsCharLimitBtn");
let limit = document.querySelector(".jsLimit");
let exceededLimit = document.querySelector(".jsExceededLimit");

// Displays relative count numbers
function displayCounts(unit, count) {
  count.textContent = unit < 10 ? `0${unit}` : unit;
}

// Checks if character limit is reached
function isCharLimitReached() {
  let text = textarea.value;
  let charLimitNumber = Number(charLimit.value);
  if (
    charLimit.classList.contains("char-limit-active") &&
    text.length > charLimitNumber &&
    charLimitNumber > 0
  ) {
    exceededLimit.classList.add("exceeded-limit-active");
    limit.textContent = charLimitNumber;
    textarea.classList.add("char-limit-border");
  } else {
    exceededLimit.classList.remove("exceeded-limit-active");
    textarea.classList.remove("char-limit-border");
  }
}

// On textarea keyup...
textarea.addEventListener("keyup", () => {
  let text = textarea.value;

  // Display Character count
  displayCounts(text.length, characterCount);

  // Display word count
  let words = text.trim().split(/\s+/).length;
  displayCounts(words, wordCount);
  if (text.length === 0) {
    wordCount.textContent = "00";
  }

  // Display Sentence count
  let sentences = text
    .trim()
    .split(/[.!?]+/)
    .filter(Boolean).length;
  displayCounts(sentences, sentenceCount);

  // Display reading time
  let minutesReading = Math.floor(text.length / 1000);
  if (text.length === 0) {
    readingTime.textContent = "0 minutes";
  } else if (minutesReading < 1) {
    readingTime.textContent = "< 1 minute";
  } else if (minutesReading < 2) {
    readingTime.textContent = "1 minute";
  } else {
    readingTime.textContent = `${minutesReading} minutes`;
  }

  // Is character limit reached when updating textarea
  isCharLimitReached();

  // Display letter densities
  
});

let excludeSpacesActive = false;
// On exclude spaces button click
excludeSpaces.addEventListener("click", () => {
  // Define textarea value and textarea value without spaces
  let text = textarea.value;
  let textNoSpaces = textarea.value.replace(/\s+/g, "");

  // If not active - toggle exclude spaces on and update display... else revert to normal
  if (!excludeSpacesActive) {
    excludeSpacesActive = true;
    excludeSpaces.classList.add("setting-btn-active");
    totalCharacters.textContent += " (no-space)";
    displayCounts(textNoSpaces.length, characterCount);
  } else {
    excludeSpacesActive = false;
    excludeSpaces.classList.remove("setting-btn-active");
    totalCharacters.textContent = "Total Characters";
    displayCounts(text.length, characterCount);
  }
});

// Displays character limit
let charLimitActive = false;
charLimitBtn.addEventListener("click", () => {
  if (!charLimitActive) {
    charLimitActive = true;
    charLimitBtn.classList.add("setting-btn-active");
    charLimit.classList.add("char-limit-active");
    charLimit.value = "300";
  } else {
    charLimitActive = false;
    charLimitBtn.classList.remove("setting-btn-active");
    charLimit.classList.remove("char-limit-active");
    exceededLimit.classList.remove("exceeded-limit-active");
    textarea.classList.remove("char-limit-border");
    charLimit.value = "";
  }
});

// Is character limit reached when updating character limit
charLimit.addEventListener("keyup", () => {
  isCharLimitReached();
});
