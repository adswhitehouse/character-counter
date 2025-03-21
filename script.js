// Variables
let characterCount = document.querySelector(".jsCharacterCount");
let wordCount = document.querySelector(".jsWordCount");
let sentenceCount = document.querySelector(".jsSentenceCount");
let textarea = document.querySelector("textarea");
let excludeSpaces = document.querySelector(".jsExcludeSpaces");
let totalCharacters = document.querySelector(".jsTotalCharacters");

// Displays relative count numbers
function displayCounts(unit, count) {
  count.textContent = unit < 10 ? `0${unit}` : unit;
}

// On textarea keyup...
textarea.addEventListener("keyup", () => {
  let text = textarea.value;
  // Display Character count
  displayCounts(text.length, characterCount);
  // Display word count
  let words = text.trim().split(/\s+/).length;
  displayCounts(words, wordCount);
  // Display Sentence count
  let sentences = text
    .trim()
    .split(/[.!?]+/)
    .filter(Boolean).length;
  displayCounts(sentences, sentenceCount);
});

// Is exclude spaces toggled? True/false
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
    characterCount.textContent = textNoSpaces.length;
  } else {
    excludeSpacesActive = false;
    excludeSpaces.classList.remove("setting-btn-active");
    totalCharacters.textContent = "Total Characters";
    displayCounts(text.length, characterCount);
  }
});
