$(document).ready(function()
{
	var numberOfCorrectAnswers = 0
	var numberOfWrongAnswers = 0;
	var questionIntervalID;
	var questionCounter = 0;
	var shuffledTriviaArray = [];
	var counter = 0;
	var currentAnswer;

	//trivia object with questions and answers
	var triviaArray =
	[
		{
			question: 'The Roman numeral "D" stands for what number?',
			answers: ['5', '50', '500', '5000'],
			answer: '500'
		},
		{
			question: 'Canada is made up of how many provinces?',
			answers: ['5', '10', '15', '20'],
			answer: '10'
		},
		{
			question: 'Which hockey player has won the most Stanley Cups with 11 wins?',
			answers: ['Wayne Gretzki', 'Henri Richard', 'Thomas Heinrich', 'Chad Bosnek'],
			answer: 'Henri Richard'
		},
		{
			question: 'What is a group of owls called?',
			answers: ['An owlet', 'Oowlpls', 'Owls', 'A parliament'],
			answer: 'A parliament'
		},
		{
			question: 'A person able to use both hands with equal skill is called what?',
			answers: ['Two Hander', 'Bi-Hand', 'Ambidextrous', 'Double Handable'],
			answer: 'Ambidextrous'
		}
	]

	// initializes all global variables, clears the timer in case it hasn't been cleared and sets up the action to be performed when the start button is clicked
	var initGame = function()
	{
		// creates new shuffled array to display questions in random order
		shuffledTriviaArray = knuthShuffle(triviaArray);
		// shows the intro message and displays start button
		$('#message').show();
		$('#start').show();

		// hides trivia container that displays questions and answer buttons
		$('#triviaContainer').hide();

		// inits variables to 0 and clears timer
		numberOfCorrectAnswers = 0;
		numberOfWrongAnswers = 0;
		questionCounter = 0;
		clearTimer();

		// sets up start button click event
	}

	initGame();

	//assigns the clicking behavior for the restart button which is to call the init function to restart the game without reloading the page
	$('#restart').click(function()
	{
		initGame();
	});

	//assigns the clicking behavior for the start button that is initially displayed at the start of a game
	$('#startButton').click(function()
	{
		// hides the intro message and start button and shows the trivia container
		$('#message').hide();
		$('#start').hide();
		$('#triviaContainer').show();

		// calls setQuestion to display the question and answer buttons
		setQuestion();
	});

	function setQuestion()
	{
		// console.log('question ' + ++counter);
		// detects if there are no more questions
		if(questionCounter == shuffledTriviaArray.length)
		{
			console.log('in IF questionCounter = ' + questionCounter);
			// hides the result div that displays after each question and shows the results div with number right and wrong
			$('#result').hide();
			$('#results').show();
			// sets the text of the rigth and wrong h1s with the tracked number of questions right and wrong
			$('#right').text(numberOfCorrectAnswers);
			$('#wrong').text(numberOfWrongAnswers);
		}
		// 
		else
		{
			console.log('in ELSE questionCounter = ' + questionCounter);
			// hides any result/results divs and shows the trivia div
			$('#trivia').show();
			$('#result').hide();
			$('#results').hide();

			// sets a new trivia object from the shuffled array and incrementing the counter to be used for the next round
			var triviaObject = shuffledTriviaArray[questionCounter++];
			// sets text of trivia quetion h1
			$('#triviaQuestion').text(triviaObject.question);
			// sets the text for all the buttons from the trivaObject answers array
			for(var i = 0; i < 4; i++)
			{
				$('#answerList button:nth-child('+(i+1)+')').text(triviaObject.answers[i]);
			}
			currentAnswer = triviaObject.answer;

			// starts count down timer after everything is set
			startTimer();
		}
		console.log('end of setQuestion');
	}

	// determines what to do when an answer button is clicked
	$('#answerList button').click(function()
	{
		// clears the timer
		clearTimer();
		// if button that was clicked contains text that matches the triviaObjects answer run rightAnswerEvent
		if($(this).text() === currentAnswer)
		{
			console.log('RIGHT answer');
			rightAnswerEvent();
		}
		// else run wrongAnswerEvent
		else
		{
			console.log('wrong answer ' + ++counter);
			wrongAnswerEvent();
		}
	});

	function rightAnswerEvent()
	{
		// hides the trivia div and shows the result div and populates the child h1 with text
		$('#trivia').hide();
		$('#result').show();
		$('#result h1').text('YEAH YOU GOT IT!!!');

		// increments number of correct answers
		numberOfCorrectAnswers++;
		// starts count down to display next question
		console.log('running start countdown from RIGHT answer event');
		startCountDown();
	}

	function wrongAnswerEvent()
	{
		// clears timer as this could have occurred from a timeout so the clearTimer in the else of setQuestion may not have been run
		clearTimer();

		// hides the trivia div and shows the result div and populates the child h1 with text
		$('#trivia').hide();
		$('#result').show();
		$('#result h1').text('aw sorry you didn\'t get it...');

		// increments number of wrong answers
		numberOfWrongAnswers++;
		// starts count down to display next question
		console.log('running start countdown from WRONG answer event');
		startCountDown();
	}

	function startTimer()
	{
		// time variable
	    var time = 30;

	    // clear any rogue timers that might've not been cleared but are still tracked by the global variable
	    if(questionIntervalID !== undefined)
	    	clearTimer();

	    // sets intervalId global variable
	    questionIntervalID = setInterval(function()
	    {
	    	// sets timer element text to time
	        $('#timer').text(time);

	        // if timer is 0, run wrongAnswerEvent
	        if (--time == 0)
	        {
	        	console.log('timer ran out');
	            wrongAnswerEvent();
	        }
	    }, 1000);
	}

	function startCountDown()
	{
		// runs setQuestion to load next question after timeout is reached
		window.setTimeout(setQuestion, 5000);
		// console.log('ran start count down and set question ' + ++counter);
	}

	function clearTimer()
	{
		// clearInterval convenience function
		window.clearInterval(questionIntervalID);
	}
});