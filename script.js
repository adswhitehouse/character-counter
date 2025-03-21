// Variables
let characterCount = document.querySelector(".jsCharacterCount");
let wordCount = document.querySelector(".jsWordCount");
let sentenceCount = document.querySelector(".jsSentenceCount");
let textarea = document.querySelector("textarea");

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

function displayCounts(unit, count) {
  count.textContent = unit < 10 ? `0${unit}` : unit;
}
