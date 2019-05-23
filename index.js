//variables
let score = 0;
let currentQuestion = 0;
let questions = [
  {
    title:
      "All of the following are examples of excellent leadership skills except:",
    answers: [
      "Influencing other to do what the leader wants",
      "Influencing others to achieve worthwhile goals",
      "Bringing about positive changes",
      "Attracting the support of others"
    ],
    correct: 0
  },
  {
    title:
      "All of the following are traits and characteristics of excellent leaders except:",
    answers: [
      "Charisma",
      "Strong motivation and high energy",
      "Trustworthiness and character",
      "Being so self-confident they believe they can handle anything"
    ],
    correct: 3
  },
  {
    title:
      "A manager who show consistency between his or her words and actions develops a reputation for:",
    answers: [
      "Self-confidence",
      "Walking the talk",
      "Emotional intelligence",
      "High Energy"
    ],
    correct: 1
  },
  {
    title:
      "Strong motivation and high energy and characteristics of effective leaders. Successful leaders often works ________ hours per week.",
    answers: ["40", "50", "60", "70+"],
    correct: 1
  },
  {
    title:
      "All of the following are examples of problem solving and intellectual skills, are referred to as cognitive skills, except:",
    answers: [
      "Problem solving",
      "Street smarts",
      "Serious demeanor",
      "Knowledge of the business"
    ],
    correct: 1
  }
];

//event listeners

$(document).ready(function() {
  $(".start button").click(function(e) {
    e.preventDefault();
    $(".start").hide();
    $(".quiz").show();
    showQuestion();
    scoreCount();
    questionCount();
  });

  //check answer and validation
  $(".quiz .quizForm").submit(function(e) {
    e.preventDefault();
    if ($("input[type='radio']:checked").length) {
      let guess = parseInt($("input[type='radio']:checked").attr("id"));
      checkAnswer(guess);
    } else {
      alert("please select and answer");
    }
  });

  //next button
  $(".feedback button").click(function(e) {
    e.preventDefault();
    $(".quiz").show();
    $(".answerCorrect").hide();
    $(".answerWrong").hide();
    showQuestion();
  });

  //restart quiz
  $(".summary button").click(function(e) {
    e.preventDefault();
    restartQuiz();
  });
});

//functions

//loads radio btns
function showQuestion() {
  if (currentQuestion >= questions.length) {
    showSummary();
  } else {
    questionCount();
    let question = questions[currentQuestion];
    $(".quiz h2").text(question.title);
    $(".quiz .answers").html("");
    for (var i = 0; i < question.answers.length; i++) {
      $(".quiz .answers").append(`<label>
      <input id="${i}" class="answerOption" type="radio" name="answer" required></input>
      <span>${question.answers[i]}</span>
      </label>`);
    }
  }
}

//function with injecting feedback screens
function checkAnswer(guess) {
  let question = questions[currentQuestion];
  if (question.correct === guess) {
    score++;
    scoreCount();
    showAnswerCorrect();
  }
  if (question.correct != guess) {
    showAnswerWrong();
  }
  currentQuestion++;
}

function questionCount() {
  $(".questionCount p").text(
    "Question: " + (currentQuestion + 1) + " / " + questions.length
  );
}

function scoreCount() {
  $(".scoreCount p").text("Score: " + score);
}

function showAnswerCorrect() {
  $(".quiz").hide();
  $(".answerCorrect").show();
}

function showAnswerWrong() {
  $(".quiz").hide();
  $(".answerWrong").show();
  let question = questions[currentQuestion];
  let correct = question.answers[question.correct];
  $(".answerWrong p").text("The correct answer is " + correct);
}

function showSummary() {
  $(".quiz").hide();
  $(".summary").show();
  $(".summary p").text(
    "You answered " +
      score +
      " out of " +
      questions.length +
      " questions correct"
  );
}

function restartQuiz() {
  $(".summary").hide();
  $(".quiz").show();
  score = 0;
  currentQuestion = 0;
  showQuestion();
  scoreCount();
}
