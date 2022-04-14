var levelNumber = 1;
var correct = true;
const numberColorMap = {
  "0": "green-button",
  "1": "red-button",
  "2": "yellow-button",
  "3": "blue-button"
}
var buttonsToPress = [];
var clickedClass;
var counter;


document.addEventListener("keydown", startGame, {
  once: true
});

function updateHeading(mode) {
  if (mode === "next_round"){
  console.log("Update Heading called");
  document.querySelector("h1").textContent = "Level " + levelNumber;
  }
  else if (mode === "game_over") {
    console.log("Update Heading called");
    document.querySelector("h1").textContent = "Game Over. Click any key to start again";
    }
  }


function playButtonSound(button) {
  console.log("playButtonSound called with " + button)
  switch (button) {
    case "green-button":
      var greenButton = new Audio("sounds/green.mp3");
      greenButton.play();
      break;

    case "red-button":
      var redButton = new Audio("sounds/red.mp3");
      redButton.play();
      break;

    case "yellow-button":
      var yellowButton = new Audio("sounds/yellow.mp3");
      yellowButton.play();
      break;

    case "blue-button":
      var blueButton = new Audio("sounds/blue.mp3");
      blueButton.play();
      break;

    case "wrong":
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      break;

    default:
      console.log("No default value")
  }
}

function highlightButton(buttonClass, className) {
  document.getElementsByClassName(buttonClass)[0].classList.add(className);
  window.setTimeout(function() {
    document.getElementsByClassName(buttonClass)[0].classList.remove(className);
  }, 300)
}

function addButtonToList() {
  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber.toString());
  console.log(numberColorMap[randomNumber.toString()]);

  buttonsToPress.push(numberColorMap[randomNumber.toString()]);
  console.log(buttonsToPress);
  console.log(buttonsToPress.length)

  playButtonSound(buttonsToPress[buttonsToPress.length - 1]);
  highlightButton(buttonsToPress[buttonsToPress.length - 1], "highlight-button");
}

function evaluateClick() {
  clickedClass = this.className;

  if (clickedClass === buttonsToPress[counter] && counter < buttonsToPress.length - 1) {
    correct = true;
    playButtonSound(clickedClass);
    highlightButton(clickedClass, "highlight-button");
    counter += 1;
    console.log("Correct, go ahead.");
  }

  else if (clickedClass === buttonsToPress[counter] && counter === buttonsToPress.length - 1) {
   correct = true;
   playButtonSound(clickedClass);
   highlightButton(clickedClass, "highlight-button");
   console.log("Correct, next round.");
   counter = 0;
   levelNumber ++;
   updateHeading("next_round");
   window.setTimeout(addButtonToList, 300);
 }

  else if (clickedClass !== buttonsToPress[counter]) {
   console.log("Wrong click");
   console.log(clickedClass);
   playButtonSound("wrong");
   updateHeading("game_over")
   counter = 0;
   for (var x = 0; x < 4; x++) {
     document.querySelectorAll("button")[x].removeEventListener("click", evaluateClick);
     console.log("Click EventListener successfully removed.");
   }
   document.addEventListener("keydown", startGame, {
     once: true
   });
   levelNumber = 1;
   buttonsToPress = [];

 }
}

function startGame() {
  counter = 0;
  console.log("Game started")

  updateHeading("next_round");
  addButtonToList();

  for (var x = 0; x < 4; x++) {
    document.querySelectorAll("button")[x].addEventListener("click", evaluateClick);
    console.log("Click EventListener successfully added.");
  }



}
