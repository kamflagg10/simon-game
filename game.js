// Button Colors
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

//Begins the game
$(document).keydown(function(){
  $("h1").text("Level 0");
  nextSequence();
  started = true;
});

//Logs the user's clicked buttons.
$(".btn").click(function(){
  var userChosenColor = this.id;

  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

//Picks a random number between 0 and 3.
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  //return randomNumber;
  //Picks a random color and adds it to the gamePattern
  var randomChosenColor = buttonColors[randomNumber]; //[nextSequence()];
  gamePattern.push(randomChosenColor);
  //Make the corresponding box flash/blink
  $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
  //Play sound for corresponding box
  playSound(randomChosenColor);
}


function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Success");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("Wrong.");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over! Press Any Key to Restart!");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
