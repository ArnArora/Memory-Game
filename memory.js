//get a random number from min to max
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//scramble the 8 cards by swapping two cards at a time
function scramble(){
  for (let r = 0; r<30; r++){
    var x = getRandomArbitrary(1,9);
    var y = getRandomArbitrary(1,9);
    var classer = document.getElementById(String(x)).className;
    document.getElementById(String(x)).className = document.getElementById(String(y)).className;
    document.getElementById(String(y)).className = classer;
  }
}

var correct_pairs = 0;
var clicks = 0;
//refers to whether this is the second card of the guessed pair
var seconding = false;
//first and firstid refer to the class and id of the first guess of the pair
var first = "";
var firstid = "";

//create a time delay before executing the next task
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//do the appropriate action when a card is clicked
function clicked(event){
  //if a card has already been counted as correct, send an alert to inform the user
  if (event.target.style.backgroundColor=="black"){
    alert("This one has already been defined as correct!");
    seconding = false;
  //if the same card was clicked twice, inform the user and don't count the last two clicks as valid
  }else if (event.target.id==firstid){
    alert("Don't click the same one twice!");
    seconding = false;
    event.target.style.border = "1px solid black";
    clicks-=1;
    first = "";
    firstid = "";
  //if this is the user's second click in the pair, check whether the pair matches
  //if so add one to correct_pairs and send an alert
  //otherwise change the pair back to normal and inform the user
  }else if (seconding){
    if (event.target.className == first){
      seconding = false;
      event.target.style.backgroundColor = "black";
      document.getElementById(firstid).style.backgroundColor = "black";
      correct_pairs+=1;
      alert("Correct!");
      clicks+=1;
      //if the user has guessed all four pairs, inform them how many clicks they took and reload the page
      if (correct_pairs==4){
        alert("You took "+clicks+" clicks! Game over.");
        location.reload();
    }
    }else{
      event.target.style.border = "1px solid red";
      document.getElementById(firstid).style.border = "1px solid black";
      event.target.style.border = "1px solid black";
      firstid = ""
      first = ""
      seconding = false;
      alert("Wrong!");
      clicks+=1;
    }
    //if it is the user's first card of the pair, change seconding to true, turn the card's border green and change first and firstid
    }else{
      event.target.style.border = "1px solid green";
      seconding = true;
      first = event.target.className;
      firstid = event.target.id;
      clicks+=1;
  }
  //update the clicks
  document.getElementById("score").innerHTML = "Clicks = "+clicks;
}

//flip the cards over by turning them white
function flip(){
  for (var i = 1; i<9; i++){
    var el = document.getElementById(String(i));
    el.style.backgroundColor = "white";
    el.addEventListener("click", clicked, false);
}
}

//make the start button turn into a restart button after the game has started
function removeStart(){
  var start = document.getElementById("starting");
  start.removeAttribute("onclick");
  start.addEventListener("click", function(){
    location.reload();
  })
  start.innerHTML = "Restart";
}

//start the game when the start button is clicked
function startGame(){
  //scramble the cards
  scramble();
  //remove the start option so that the user cannot keep on scrambling the cards
  removeStart();
  //wait for 5 seconds before flipping the cards
  sleep(5000).then(() => flip())
}
