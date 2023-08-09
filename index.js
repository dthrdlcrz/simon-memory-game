//variable declaration
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var gameLevel = 0;
var highestLevel = 0;
var gameStarted = false;

//for starting the game
$("#level-title").click(function(){
    if (gameStarted != true){
        nextSequence();
        gameStarted = true;
    }
});

//user click
$(".btn").on("click", function(){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

//for checking user and game pattern
function checkAnswer(currentLevel){
    if ((gamePattern[currentLevel] == userClickedPattern[currentLevel])){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    }
    else {
        //game-over
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over"), 200;
        })

        $("#level-title").text("GAME OVER -RESTART-");

        startOver();
    }
    
}

function startOver(){
    //for highest score
    if (gameLevel >= highestLevel){
        highestLevel = gameLevel;
        if (highestLevel != 0){
            highestLevel--;
        }
    }
    $("#highest-level").html("HIGHEST LEVEL: " + highestLevel);
    gameLevel = 0;
    gamePattern = [];
    gameStarted = false;
}

function nextSequence(){
    gameLevel++;
    $("#level-title").html("LEVEL "+ gameLevel);
    userClickedPattern = [];

    //for game pattern
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}


function playSound (name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#" + currentColor).fadeOut(100).fadeIn(100);
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed"), 100;
    })
}

