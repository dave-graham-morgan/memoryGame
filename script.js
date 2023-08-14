const gameContainer = document.getElementById("game");
let cardCounter = 0;
let firstCard = '';

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "gray",
  "gray"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  //change the background to the color class
  const newBackgroundColor = e.srcElement.className;
  e.target.style.backgroundColor = newBackgroundColor;

  let thisCard = e;

  if(firstCard){
    //check to see if user clicked the same card twice if they did, do nothing.
    if(firstCard === thisCard){
      return;
    }
    //use helper method to check to see if the cards match color
    let theyMatch = checkMatch(firstCard, thisCard)
    
    //if they don't match flip 'em back over
    if(theyMatch){
      //they match! leave face up and remove event listener from both first card and this card
      thisCard.srcElement.removeEventListener("click",handleCardClick);
      firstCard.srcElement.removeEventListener("click", handleCardClick);

      //null out firstCard
      firstCard = '';

    }else{
      //they don't match so flip 'em back over after a time
      setTimeout(function(){
        thisCard.target.style.backgroundColor="";
        firstCard.target.style.backgroundColor="";
        //null out firstCard
        firstCard = '';
      }, 1000);
      
    }

  }else{
    //if firstCard is null its because this is our first time through
    //set firstCard to thisCard
    firstCard = thisCard;
  }
}

function checkMatch(firstCard, secondCard){
  return firstCard.srcElement.className === secondCard.srcElement.className;
}

// when the DOM loads
createDivsForColors(shuffledColors);
