//Star Wars Trivia Game

//Psuedocode and Game Logic

//Create a game object to hold :
	//data variables (time, answer, number counters)
	//array of questions
	//array of answers
	//array of the correct answer index to compare the conditionals
//create logical functions to execute
	//create a start function
	//create a print to screen function that displays the questions and answers from the arrays (must have a variable to set the setTimeout to 1 second)
	//create a function to count down from 30 and clear the timeout if it reaches 0
	//create functions for unanswered, correct, and incorrect make sure to clear the timeout and add the perspective count to the counter
	//create a function for game over - show a game over message and allow the player to reset the game
	//create a reset function - reset all the values to the original state go back to the start of the questions array empty any html and add a click function to start the game

//create something to start the game - a click function on something and call the game object with the start function

//Document.ready - 
$(document).ready(function () {
//variables for time limit and number of answers
var questionTime = 30;
var answer = 4;

//Main game object to hold the data of questions, answers, correct index locations
var game = {
	//counters
	correctNum: 0,
	incorrectNum: 0,
	unanswered: 0,
	//array for questions
	questions: ["What planet does Luke live on at the begining of Episode IV?",
				"To create the clones the process required DNA, who's DNA was used?",
				"In Episode VI who leads the Rebel Fleet to attack the Death Star?",
				"In Episode III Obi-Wan gives baby Leia to which person?",
				"Who is Obi-Wan's Master in Episode I?",
				"What is the animal that Han Solo rides to find Luke in Episode V?",
				"What is the name of the run that the Millenium Falcon finished in 13 parsecs?"
				],
	//array of answers
	answers: [	["Yavin IV", "Hoth", "Alderaan", "Tatooine"],
				["Luke Skywalker", "Qui-Gon-Gin", "Jango Fett", "Wedge Antillies"],
				["Admiral Akbar", "Princess Leia", "Lando Calrissian", "C-3PO"],
				["Yoda", "Bail Organa", "Chewbacca", "Emperor Palpatine"],
				["Mace Windu", "Plo Koon", "Qui-Gon-Gin", "Kit Fisto"],
				["Bantha", "Tauntaun", "Rancor", "Ewok"],
				["Kessel Run", "The Gauntlet", "Boonta Eve Classic", "Mar Dan Run"]
			],
	//array of gifs to access on the correct, incorrect, unanswered, start, and game over screens
	gifs: ["tatooine.gif", "jangofett.gif", "admiralakbar.gif", "bailorgana.gif", "quigongin.gif", "tauntaun.gif", "milleniumfalcon.gif"],
	//array of correct answer index
	key: [3, 2, 0, 1, 2, 1, 0],
	//always start at the first question
	currentQ: -1,
	//function to start the game and empty out any questions, then to call the first question (references the game object)
	start: function () {
		$("#press-start").html("");
  		this.question();
	},

	question: function () {
		//Set the time for each question at 30 seconds and answer count to 4
		timeQuestion = 30;
		answer = 4;
		//move forward in the array of questions
		this.currentQ++;
		var displayQ = this.currentQ + 1;
		//need a location in the html to display the countdown
		$("#qspace").html('<p id="timeLeft">Time: 30 seconds</p>');
		//print the question to the screen
		$("#qspace").append('<p id="question">' + displayQ + '. ' + this.questions[this.currentQ] + '</p>');

		//need a loop for each of the answers, to basically loop through and print all four answers to the screen.
		for(var i = 0; i < 4; i++)
  		{
  			if(i===0)
  			{
  				$("#qspace").append('<div class="aspace" id="zero"><p class="answer" id="' + this.currentQ + '">' + this.answers[this.currentQ][i] + '</p></div>');
  			}
  			if(i===1)
  			{
  				$("#qspace").append('<div class="aspace" id="one"><p class="answer" id="' + this.currentQ + '">' + this.answers[this.currentQ][i] + '</p></div>');
  			}
  			if(i===2)
  			{
  				$("#qspace").append('<div class="aspace" id="two"><p class="answer" id="' + this.currentQ + '">' + this.answers[this.currentQ][i] + '</p></div>');
  			}
  			if(i===3)
  			{
  				$("#qspace").append('<div class="aspace" id="three"><p class="answer" id="' + this.currentQ + '">' + this.answers[this.currentQ][i] + '</p></div>');
  			}
  		}
  		//set an interval for the game of 1 second
  		timerQuestion = setInterval(game.countQuestion, 1000);

  		//need to create a set of conditionals to check if the answer clicked is the correct key #.
 
  		$("#zero").click(function() {
  			if(game.key[game.currentQ] === 0)
  			{
  				game.correct();
  			}
  			else
  			{
  				game.incorrect();
  			}
			});
			$("#one").click(function() {
  			if(game.key[game.currentQ] === 1)
  			{
  				game.correct();
  			}
  			else
  			{
  				game.incorrect();
  			}
			});
			$("#two").click(function() {
  			if(game.key[game.currentQ] === 2)
  			{
  				game.correct();
  			}
  			else
  			{
  				game.incorrect();
  			}
			});
			$("#three").click(function() {
  			if(game.key[game.currentQ] === 3)
  			{
  				game.correct();
  			}
  			else
  			{
  				game.incorrect();
  			}
			});
	},

	//create a function that counts the time down and checks if the time has run out
	countQuestion: function () {
		timeQuestion--;
		$("#timeLeft").text("Time: " + timeQuestion + " seconds");
		//console.log(timeQuestion);
		if(timeQuestion === 0) {
			clearTimeout(timerQuestion);
			game.questionUnanswered();
		}
	},

	//create a function to respond when an answer is clicked
	countAnswer: function() {
  		answer--;
  		//console.log(answer);
  		if(answer === 0)
  		{
  			clearTimeout(timerAnswer);
  			if(game.currentQ < game.questions.length - 1)
  			{
  				game.question();
  			}
  			else
  			{
  				game.over();
  			}
  		}
  	},

  	//create a function to show time is up when time runs out
  	questionUnanswered: function() {
  		//show the correct answer
  		$("#qspace").html('<p id="question">Time\'s up!  The correct answer is ' + this.answers[this.currentQ][this.key[this.currentQ]] + '</p>');
  		//append the gif of the correct answer
  		$("#qspace").append('<img id="gif" src="assets/images/' + this.gifs[this.currentQ] + '">');
  		//set the timer to count down
  		timerAnswer = setInterval(game.countAnswer, 1000);
  		//increment the unanswered by 1
  		this.unanswered++;
  	},

  	//create a function to print a correct message and clear the countdown on the question also to record the question as a correct answer
  	correct: function() {
  		clearTimeout(timerQuestion);
  		$("#qspace").html('<p id="question">Correct!  It\'s ' + this.answers[this.currentQ][this.key[this.currentQ]]);
  		$("#qspace").append('<img id="gif" src="assets/images/' + this.gifs[this.currentQ] + '">');
  		if(this.currentQ === 5)
  		{
  			$("#qspace").html('<p id="question">Correct!  It\'s ' + this.answers[this.currentQ][this.key[this.currentQ]]);
  			$("#qspace").append('<img id="gif2" src="assets/images/' + this.gifs[this.currentQ] + '">');

  		}
  		timerAnswer = setInterval(game.countAnswer, 1000);
  		this.correctNum++;
  	},

  	//same as above but inversely for incorrect answers
  	incorrect: function() {
  		clearTimeout(timerQuestion);
  		$("#qspace").html('<p id="question">Sorry!  The answer is ' + this.answers[this.currentQ][this.key[this.currentQ]]);
  		$("#qspace").append('<img id="gif" src="assets/images/' + this.gifs[this.currentQ] + '">');
  		timerAnswer = setInterval(game.countAnswer, 1000);
  		this.incorrectNum++;
  	},

  	//create a game over function that shows up when the player gets through all of the questions, then shows the number of each answered, incorrect, not answered
  	over: function() {
  		$("#qspace").html('<p id="title">Game Over<p><br><p>You got ' + this.correctNum + ' questions right.</p><br><p>You got '
  			 + this.incorrectNum + ' questions wrong.</p><br><p>You left ' + this.unanswered + ' questions unanswered.');
  		$("#qspace").append('<img id="gif3" src="assets/images/thumbsup.gif">');
  		$("#qspace").append('<p>Click the image to start over</p>');
  		$("#gif3").click(function() {
				game.reset();
			});
  	},

  	//create a function to reset the game back to the original point
  	reset: function() {
  		timeQuestion = 30;
  		timeAnswer = 4;
  		this.correctNum = 0;
  		this.incorrectNum = 0;
  		this.unanswered = 0;
  		this.currentQ = -1;
  		$("#qspace").html("");
  		$("#press-start").html('<p id="title">Star Wars Trivia</p><img id="dance" src="assets/images/vader.gif"><p id="start">Click Vader to start</p>');
			$("#dance").click(function() {
				game.start();
			});
  	}
}

//on click to start the game
 $("#dance").click(function() {
		game.start();
	});

});




