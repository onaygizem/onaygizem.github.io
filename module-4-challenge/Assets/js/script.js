
// Declare all the html element variables
var timer = document.querySelector(".timer");
var cardHeader = document.querySelector(".card-header");
var cardBody = document.querySelector(".card-body");
var viewScores = document.querySelector(".viewScores");

// Assign an event listener to view scores button
viewScores.addEventListener("click", displayViewScores)

// Declare variables
var questionCount;
var initialTimeCount;
var intervalTimer;
var rightAnswerCount = 0

// Create an array for questions
var questionArray = [
    {
        "id": 0,
        "question": "Inside which HTML element do we put the JavaScript?",
        "options": ["<javascript>", "<script>", "<js>", "<scripting>"],
        "answer": "<script>"
    },
    {
        "id": 1,
        "question": "An HTML document can contain _____",
        "options": ["Attributes", "Tags", "Raw text", "All the answers are true"],
        "answer": "All the answers are true"
    },
    {
        "id": 2,
        "question": "A page designed in HTML is called _____",
        "options": ["Application", "Cover page", "Front-end", "Web Page"],
        "answer": "Web Page"
    },
    {
        "id": 3,
        "question": "An HTML document is saved with the ____ extension.",
        "options": [".htl", ".html", ".hml", ".htnl"],
        "answer": ".html"
    }, {
        "id": 4,
        "question": "The HTML document contains a root tag called ____",
        "options": ["HEAD", "Title", "Body", "HTML"],
        "answer": "HTML"
    }, {
        "id": 5,
        "question": "If we want to place text around an image, which CSS property should we use?",
        "options": ["push", "float", "align", "wrap"],
        "answer": "float"
    }, {
        "id": 6,
        "question": "Suppose we want to arrange three DIVs so that DIV 3 is placed above DIV1. Now, which CSS property are we going to use to control the stack order?",
        "options": ["d-index", "s-index", "x-index", "z-index"],
        "answer": "z-index"
    }, {
        "id": 7,
        "question": "Choose the correct HTML tag for a large title.",
        "options": ["H1", "Heading", "Head", "H6"],
        "answer": "H1"
    }
];


// Start quiz page function
function quizStart() {

    questionCount = 0;
    initialTimeCount = 100;

    // Clear all the content
    clearContent(cardHeader);
    clearContent(cardBody);

    // Create html elements
    let titleh2 = document.createElement("h2");
    titleh2.className = "question";
    cardHeader.appendChild(titleh2);

    titleh2.textContent = "Coding Quiz Challenge";

    let quizStartTextParag = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect aftivers will penalize yout score/time by ten seconds!";
    
    let quizStartText = document.createElement("h1");
    quizStartText.textContent = quizStartTextParag;
    quizStartText.style.fontSize = "20px";
    cardBody.appendChild(quizStartText);

    let startQuizButtonDiv = document.createElement("div");
    startQuizButtonDiv.style.display = "flex";
    startQuizButtonDiv.style.alignItems = "center";
    startQuizButtonDiv.style.justifyContent = "center";
    cardBody.appendChild(startQuizButtonDiv);

    var startQuizButton = document.createElement("button");
    startQuizButton.textContent = "Start Quiz";
    startQuizButton.id = "startQuizButton";
    startQuizButtonDiv.appendChild(startQuizButton);

    // Assign an event listener to the start button
    startQuizButton.addEventListener("click", function () {
        // Start the timer
        quizTimer()
        // Start displaying questions
        displayNextQuestion()
    });
}

// Timer function
function quizTimer() {

    // Set 1 second time interval
    intervalTimer = setInterval(function () {

        initialTimeCount--

        // If the timer is equal to or less than 0
        if(initialTimeCount <= 0){
            // call the function to end the quiz
            quizEnd()
            timer.innerHTML = "Timer: " + 0;
        } else {
            // update the timer on the page
            timer.innerHTML = "Timer: " + initialTimeCount;
        }
        
    }, 1000);
}



function displayNextQuestion() {
    // clear the page content
    clearContent(cardHeader);

    // Create html elements
    let titleh2 = document.createElement("h2");
    titleh2.className = "question";
    cardHeader.appendChild(titleh2);

    if (questionCount === 0) {
        clearContent(cardBody);
        // Create question options
        for (let questionOptionCount = 0; questionOptionCount < 4; questionOptionCount++) {
            this[`questionOption${questionOptionCount}`] = document.createElement("button");
            this[`questionOption${questionOptionCount}`].id = `questionOption${questionOptionCount}`;
            this[`questionOption${questionOptionCount}`].className = "btn";
            cardBody.appendChild(this[`questionOption${questionOptionCount}`]);
        }
    }

    // Check if the question is the last question
    // If yes: end the quiz
    if (questionCount === questionArray.length) {
        quizEnd()
    } else {
        // Set the question
        titleh2.textContent = questionArray[questionCount]["question"];

        for (let x = 0; x < 4; x++) {
            this["questionOption" + x].textContent = questionArray[questionCount]["options"][x]
        }

        if (questionCount === 0) {

            for (let y = 0; y < 4; y++) {
                this["questionOption" + y].addEventListener("click", function (event) {

                    if (event.target.textContent === questionArray[questionCount]["answer"]) {
                        rightAnswerCount++;
                    } else {
                        initialTimeCount = initialTimeCount - 10
                        timer.innerHTML = "Timer: " + initialTimeCount;
                    }

                    questionCount++
                    displayNextQuestion()
                })
            }
        }


    }
}

function quizEnd() {

    // Clear the time interval
    clearInterval(intervalTimer)

    // Clear the page content
    clearContent(cardHeader);
    clearContent(cardBody);

    // Create html elements
    let titleh2 = document.createElement("h2");
    titleh2.className = "question";
    cardHeader.appendChild(titleh2);

    titleh2.textContent = "Quiz is finished";

    var endOfQuizDiv = document.createElement("div");
    cardBody.appendChild(endOfQuizDiv);

    let quizScoreText = document.createElement("h1");
    quizScoreText.textContent = "This is your final score: " + rightAnswerCount;
    endOfQuizDiv.appendChild(quizScoreText);

    var initialsText = document.createElement("h1");
    initialsText.textContent = "Please enter your initials";
    endOfQuizDiv.appendChild(initialsText);

    var initialsInput = document.createElement("input");
    initialsInput.id = "initialsInputBox";
    endOfQuizDiv.appendChild(initialsInput);

    var scoreButtonsDiv = document.createElement("div");
    scoreButtonsDiv.id = "scoreButtons";
    endOfQuizDiv.appendChild(scoreButtonsDiv);

    var submitScoreButton = document.createElement("button");
    submitScoreButton.id = "submitScoreButton";
    submitScoreButton.textContent = "Submit";
    scoreButtonsDiv.appendChild(submitScoreButton);

    var cancelScoreButton = document.createElement("button");
    cancelScoreButton.id = "cancelScoreButton";
    cancelScoreButton.textContent = "Cancel";
    scoreButtonsDiv.appendChild(cancelScoreButton);


    // Assign an event listener to submit button
    submitScoreButton.addEventListener("click", function () {
        var initialsUserInput

        if (initialsInput.value === "") {
            initialsUserInput = "unknown";
        } else {
            initialsUserInput = initialsInput.value;
        }
        console.log(initialsInput.value)

        localStorage.setItem("initials", initialsUserInput);
        localStorage.setItem("score", rightAnswerCount);

        displayInitials()
    });

    // Assign an event listener to cancel button
    cancelScoreButton.addEventListener("click", function () {
        endOfQuizDiv.style.display = "none";
        location.reload();
    });
}


function displayInitials(){

    // Clear the page content
    clearContent(cardHeader);
    clearContent(cardBody);

    // Create html elements
    let titleh2 = document.createElement("h2");
    titleh2.className = "question";
    cardHeader.appendChild(titleh2);

    titleh2.textContent = "Your initials and score is:";

    var endOfQuizDiv = document.createElement("div");
    cardBody.appendChild(endOfQuizDiv);

    let titleh3 = document.createElement("h3");
    titleh3.className = "titleh3";
    endOfQuizDiv.appendChild(titleh3);


    // Get the local storage for initials and score
    let initials = localStorage.getItem("initials");
    let score = localStorage.getItem("score");

    titleh3.textContent = initials + "-" + score;

    var scoreButtonsDiv = document.createElement("div");
    scoreButtonsDiv.id = "scoreButtons";
    endOfQuizDiv.appendChild(scoreButtonsDiv);

    var backButton = document.createElement("button");
    backButton.id = "backButton";
    backButton.textContent = "Back";
    scoreButtonsDiv.appendChild(backButton);

    var clearScoreButton = document.createElement("button");
    clearScoreButton.id = "clearScoreButton";
    clearScoreButton.textContent = "Clear score";
    scoreButtonsDiv.appendChild(clearScoreButton);


     // Assign an event listener to back button
    backButton.addEventListener("click", function () {
        location.reload();
    });

    // Assign an event listener to clear score button
    clearScoreButton.addEventListener("click", function () {
        titleh3.textContent = "Score is successfully cleared.";

        localStorage.setItem("initials", "");
        localStorage.setItem("score", "");
    });

}

function displayViewScores(){
    // Clear the time
    clearInterval(intervalTimer);
    timer.innerHTML = "Timer: " + 0;
    // Clear the page content
    clearContent(cardHeader);
    clearContent(cardBody);

    // Create html elements
    let titleh2 = document.createElement("h2");
    titleh2.className = "question";
    cardHeader.appendChild(titleh2);

    titleh2.textContent = "Your last score is:";

    var endOfQuizDiv = document.createElement("div");
    cardBody.appendChild(endOfQuizDiv);

    let titleh3 = document.createElement("h3");
    titleh3.className = "titleh3";
    endOfQuizDiv.appendChild(titleh3);

    // Get the local storage for initials and score
    let initials = localStorage.getItem("initials");
    let score = localStorage.getItem("score");

    // If the local storage is empty, that means there is no score recorded (or maybe its cleared)
    if(initials != "" && score != ""){
        titleh3.textContent = initials + "-" + score;
    } else {
        titleh3.textContent = "There is no score recorded yet."
    }

    var scoreButtonsDiv = document.createElement("div");
    scoreButtonsDiv.id = "scoreButtons";
    endOfQuizDiv.appendChild(scoreButtonsDiv);

    var backButton = document.createElement("button");
    backButton.id = "backButton";
    backButton.textContent = "Back";
    scoreButtonsDiv.appendChild(backButton);

    backButton.addEventListener("click", function () {
        location.reload();
    });

}

// fucntion to create page content
const clearContent = (container) => {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}

// Start the quiz page
quizStart()