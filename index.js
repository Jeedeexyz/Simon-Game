var colors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var clickedPattern = [];

var started = false;

var level = 0;
// for users to start game on mobile add touch start envet listerner
var mq = window.matchMedia("(max-width: 1000px)");
let eventlis = "touchstart";
if (mq.matches) {
    $("#level-title").text("Touch anywhere to start the game!");
  $(document).on(eventlis, function () {
    if (!started) {
      setTimeout(()=>{
        $("#level-title").text("Level " + level);
        colorSequence();
      },50)
    
      started = true;
      $(document).off(eventlis);
    }
  });
setTimeout(()=>{
    $(".btn").on(eventlis, function () {
        var userChosenColor = $(this).attr("id");
    
        clickedPattern.push(userChosenColor);
    
        playSound(userChosenColor);
    
        animatePress(userChosenColor);
    
        checkAnswer(clickedPattern.length - 1);
      });
}, 1000)
  
} else {
  eventlis = "keypress";
  $(document).on(eventlis, function () {
    if (!started) {
      $("#level-title").text("Level " + level);
      colorSequence();
      started = true;
    }
  });

  $(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");

    clickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(clickedPattern.length - 1);
  });
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === clickedPattern[currentLevel]) {
    if (clickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        colorSequence();
      }, 200);
    }
  } 
   else {
    playSound("wrong");
    $("body").addClass("game-over");
  
    $("#level-title").text("Game Over, Press Any Key to Restart");
   
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
$(".btn").off(eventlis);
   $(document).on(eventlis,()=>{
        startOver();
    })
   

    
  }
}

function colorSequence() {
  clickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomColor = Math.floor(Math.random() * 4);

  var selectedColor = colors[randomColor];

  gamePattern.push(selectedColor);

  $("#" + selectedColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(selectedColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
    $(document).on(eventlis, function () {
        if (!started) {
            setTimeout(()=>{
          $("#level-title").text("Level " + level);
         
            colorSequence();
          },500)
         
          started = true;
          $(document).off(eventlis);
         
          setTimeout(()=>{
            $(".btn").on(eventlis, function () {
                var userChosenColor = $(this).attr("id");
            
                clickedPattern.push(userChosenColor);
            
                playSound(userChosenColor);
            
                animatePress(userChosenColor);
            
                checkAnswer(clickedPattern.length - 1);
              });
        }, 1000)
        
        }
      });
  
 
}
