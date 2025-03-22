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
let letterDensities = document.querySelector(".jsLetterDensities");
let noCharacters = document.querySelector(".jsNoCharacters");
let showMore = document.querySelector(".jsShowMore");
let showMoreText = document.querySelector(".jsShowMoreText");
let chevronDown = document.querySelector(".jsChevronDown");

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
  // Letters and their initial count
  const letters = [
    { char: "a", count: 0 },
    { char: "b", count: 0 },
    { char: "c", count: 0 },
    { char: "d", count: 0 },
    { char: "e", count: 0 },
    { char: "f", count: 0 },
    { char: "g", count: 0 },
    { char: "h", count: 0 },
    { char: "i", count: 0 },
    { char: "j", count: 0 },
    { char: "k", count: 0 },
    { char: "l", count: 0 },
    { char: "m", count: 0 },
    { char: "n", count: 0 },
    { char: "o", count: 0 },
    { char: "p", count: 0 },
    { char: "q", count: 0 },
    { char: "r", count: 0 },
    { char: "s", count: 0 },
    { char: "t", count: 0 },
    { char: "u", count: 0 },
    { char: "v", count: 0 },
    { char: "w", count: 0 },
    { char: "x", count: 0 },
    { char: "y", count: 0 },
    { char: "z", count: 0 },
  ];

  // Updates each letter count upon typing
  letters.forEach((letter) => {
    letter.count = text.toLowerCase().split(letter.char).length - 1;
  });

  // Sorts letters array descending from highest count
  letters.sort((a, b) => b.count - a.count);

  // Resets letter densities to empty
  while (letterDensities.firstChild) {
    letterDensities.firstChild.remove();
  }

  // For each letter with a count, create and display the letter density element
  letters.forEach((letter) => {
    if (letter.count > 0) {
      // Create elements
      let letterDensity = document.createElement("div");
      let densityHeading = document.createElement("h3");
      let densityBar = document.createElement("div");
      let densityBarFill = document.createElement("div");
      let densityDetails = document.createElement("div");
      let densityNumber = document.createElement("span");
      let densityPercent = document.createElement("span");

      // Add classes
      letterDensity.classList.add("letter-density");
      densityHeading.classList.add("tp-4", "neutral-6", "density-heading");
      densityBar.classList.add("density-bar", "neutral-2-bg");
      densityBarFill.classList.add("density-bar-fill");
      densityDetails.classList.add("neutral-4", "tp-6", "density-details");
      densityNumber.classList.add("density-number", "tp-4", "neutral-6");
      densityPercent.classList.add("density-number", "tp-4", "neutral-6");

      densityHeading.textContent = letter.char.toUpperCase();
      densityNumber.textContent = letter.count;
      let percent = (letter.count / text.length) * 100;
      densityPercent.textContent = Number.isInteger(percent)
        ? `(${percent}%)`
        : `(${percent.toFixed(2)}%)`;
      densityBarFill.style.width = `${percent}%`;

      // Append elements together
      densityBar.appendChild(densityBarFill);
      densityDetails.append(densityNumber, densityPercent);
      letterDensity.append(densityHeading, densityBar, densityDetails);
      letterDensities.appendChild(letterDensity);
    }
  });

  // If textarea is empty, display message
  if (letterDensities.firstChild) {
    noCharacters.style.display = "none";
  } else {
    noCharacters.style.display = "block";
  }

  // Displays show more is
  if (letterDensities.children.length > 5) {
    showMore.style.display = "block";
  } else {
    showMore.style.display = "none";
  }
});

// Show more is initially not toggled
let isShowMoreToggled = false;
showMore.addEventListener("click", () => {
  if (!isShowMoreToggled) {
    isShowMoreToggled = true;
    letterDensities.classList.add("animate-letter-densities");
    showMoreText.textContent = "Show Less";
    chevronDown.classList.add("rotate-chevron");
  } else {
    isShowMoreToggled = false;
    letterDensities.classList.remove("animate-letter-densities");
    showMoreText.textContent = "Show More";
    chevronDown.classList.remove("rotate-chevron");
  }
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
