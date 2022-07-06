// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordField = document.querySelector("#password");

// Write password to the #password input
function writePassword() {

  // Call the function to ask user for password length
  let passwordLengthValue = passwordLength()

  // Call the function to ask user for character types
  let characterTypesIns = new characterTypes()

  // Check the character types. If user answered at least 1 yes, generate the password
  do {
    var characterTypeResult = characterTypesIns.finalCharacterTypesFunction()
    var checker = arr => arr.every(v => v === false);
    var characterTypeFinal = checker(characterTypeResult)
    if(characterTypeFinal){
      alert(characterTypesIns.errorMessageText2);
    }
  } while (characterTypeFinal)

  // Generate the password depending on the user selections
  let result = generatePassword(passwordLengthValue, characterTypeResult[0], characterTypeResult[1], characterTypeResult[2])

  // populate password field with the randomly generated password
  passwordField.textContent = result



}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


// Ask user for the password length
function passwordLength() {

  var userInput = prompt('Enter the length of the password (8-128):')

  if (userInput > 7 && userInput < 128 && !isNaN(userInput)) {
    input = true;
    return userInput;
  }
  else {
    input = false;
    while (input === false) {
      alert('Please enter a valid number between 8 and 128.');
      passwordLength()
    }
  }
}



// ask user if the password should have lowercase, uppercase, numeric, and/or special characters
const characterTypes = function () {
  this.lowerCaseText = 'Do you want your password to have both lower case and upper case characters? (Type yes or no): ';
  this.numericText = 'Do you want your password to have numeric characters? (Type yes or no): ';
  this.specialCharactersText = 'Do you want your password to have special characters? (Type yes or no): ';
  this.errorMessageText = 'Please enter yes or no to answer the question';
  this.errorMessageText2 = 'Please answer yes to at least one field!';
  // Lowercase
  this.lowerCase = function () {
    var userInput = prompt(this.lowerCaseText);
    input = false;

    if (userInput) {
      if (userInput.toLowerCase() === "yes" || userInput.toLowerCase() === "no") {
        input = true;
        return userInput;
      }
      else {
        input = false;
        while (input === false) {
          alert(this.errorMessageText);
          this.lowerCase()
        }
      }
    } else {
      alert(this.errorMessageText);
      this.lowerCase()
    }
  }

  // numeric
  this.numeric = function () {
    var userInput = prompt(this.numericText);

    if (userInput) {
      if (userInput.toLowerCase() === "yes" || userInput.toLowerCase() === "no") {
        input = true;
        return userInput;
      }
      else {
        input = false;
        while (input === false) {
          alert(this.errorMessageText);
          this.numeric()
        }
      }
    } else {
      alert(this.errorMessageText);
      this.numeric()
    }
  }

  // special characters
  this.specialCharacter = function () {

    var userInput = prompt(this.specialCharactersText);
    if (userInput) {

      if (userInput.toLowerCase() === "yes" || userInput.toLowerCase() === "no") {
        input = true;
        return userInput;
      }
      else {
        input = false;
        while (input === false) {
          alert(this.errorMessageText);
          this.specialCharacter()
        }
      }
    } else {
      alert(this.errorMessageText);
      this.specialCharacter()
    }
  }

  // Generate an array with all the answers user selected
  this.finalCharacterTypesFunction = function () {
    let resultsArr = [];
    let lowerCaseUserInput = this.lowerCase();
    let numericUserInput = this.numeric();
    let specialCharacterUserInput = this.specialCharacter();

    if (lowerCaseUserInput === "no" && numericUserInput === "no" && specialCharacterUserInput === "no") {
      resultsArr.push(false, false, false);
      return resultsArr
    } else {
      if (lowerCaseUserInput === "yes") {
        resultsArr.push(true);
      } else {
        resultsArr.push(false);
      }

      if (numericUserInput === "yes") {
        resultsArr.push(true);
      } else {
        resultsArr.push(false);
      }

      if (specialCharacterUserInput === "yes") {
        resultsArr.push(true);
      } else {
        resultsArr.push(false);
      }
      return resultsArr;
    }
  }
}

// Generate a random password for the user
function generatePassword(length, lowerCase, numeric, special) {
  var length = (length) ? (length) : (10);
  var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
  var numericChar = '0123456789';
  var specialChar = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
  var password = "";
  var character = "";

  while (password.length < length) {
    entity1 = Math.ceil(string.length * Math.random() * Math.random());
    entity2 = Math.ceil(numericChar.length * Math.random() * Math.random());
    entity3 = Math.ceil(specialChar.length * Math.random() * Math.random());
    hold = string.charAt(entity1);

    if (lowerCase) {
      hold = (password.length % 2 == 0) ? (hold.toUpperCase()) : (hold);
    }

    character += hold;

    if (numeric) {
      character += numericChar.charAt(entity2);
    }

    if (special) {
      entity3 = Math.ceil(specialChar.length * Math.random() * Math.random());
      character += specialChar.charAt(entity3);
    }

    password = character;
  }
  
  password = password.split('').sort(function () { return 0.5 - Math.random() }).join('');
  return password.substr(0, length);
}