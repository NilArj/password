const result = document.getElementById("result");
const length = document.getElementById("length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const number = document.getElementById("number");
const symbol = document.getElementById("symbol");
const form = document.getElementById("pg-form");
const clipboardIcon = document.querySelector(".clipboard");

const fieldArray = [
  {
    field: uppercase,
    getCharacter: getUppercaseLetter,
  },
  {
    field: lowercase,
    getCharacter: getLowercaseLetter,
  },
  {
    field: number,
    getCharacter: getNumber,
  },
  {
    field: symbol,
    getCharacter: getSymbol,
  },
];

function getRandomCharacter(min, max) {
  const limit = max - min + 1;

  return String.fromCharCode(Math.floor(Math.random() * limit) + min);
}

function getUppercaseLetter() {
  return getRandomCharacter(65, 90);
}

function getLowercaseLetter() {
  return getRandomCharacter(97, 122);
}

function getNumber() {
  return getRandomCharacter(48, 57);
}

function getSymbol() {
  const specialSymbol = "!$%<>&/()=#'¡?¿*+}[{]-,;.^°|¨";
  return specialSymbol[Math.floor(Math.random() * specialSymbol.length)];
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const lengthPassword = length.value;
  let generatedPassword = "";
  const checkedField = fieldArray.filter(({ field }) => field.checked);

  for (i = 0; i < lengthPassword; i++) {
    const index = Math.floor(Math.random() * checkedField.length);
    const letter = checkedField[index].getCharacter();
    generatedPassword += letter;
  }

  result.value = generatedPassword;
});

clipboardIcon.addEventListener("click", async (e) => {
  const text = result.value;
  if (text) {
    await navigator.clipboard.writeText(text);
    alert("Copied to your clipboard");
  } else {
    alert("No password to copy");
  }
});
