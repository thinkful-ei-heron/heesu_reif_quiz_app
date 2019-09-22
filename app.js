'use strict';
// quiz questions
const qA = {
  questions: [
    {
      question: '2 + 2',
      options: [
        '5',
        '20',
        '4',
        '15',
        '100'
      ],
      answer: '4'
    },
    {
      question: '100 / 5',
      options: [
        '6',
        '20',
        '30',
        '15',
        '10'
      ],
      answer: '20'
    },
    {
      question: '50 * 100',
      options: [
        '5000',
        '450',
        '1000',
        '600',
        '7500'
      ],
      answer: '5000'
    },
    {
      question: '46 + 59',
      options: [
        '125',
        '135',
        '95',
        '105',
        '60'
      ],
      answer: '105'
    },
    {
      question: '300 / 15',
      options: [
        '40',
        '30',
        '35',
        '20',
        '50'
      ],
      answer: '20'
    }
  ]
};

const currentStatus = {
  currentQuestion: 'blah?',
  currentQuestionIndex: 1,
  currentScore: 0
};

// Starting screen with 'start' button
function renderWelcome() {
  let welcomeImg = 'img/welcome.png';
  let target = $('#quiz-container');
  // checking target
  // console.log(target);
  // Render Welcome screen
  target.html(`
      <welcomeBlock class='welcome'>
        <heading class='welcomeHeading'>
          <h1>Welcome to our Math Quiz!!</h1>
        </heading>
        <imageHolder id='welcomeImage'>  
          <img src='${welcomeImg}'
          alt='numbers' id='welcomeImg'/>
        </imageHolder>
        <div id='start-button'>
          <button type='button'>Start the quiz!</button>
        </div>
      </welcomeBlock>
  `);
  // click start button -> renderQuiz();
  $('#start-button').on('click', () => {
    // logging to make sure button was clicked
    // console.log(clicked);
    renderQuiz();
  });
}

// generates quiz container with all needed divs
function renderQuiz() {
  let target = $('#quiz-container');
  let status = createStatus();
  let question = createQuestion();
  let answer = createAnswers();
  target.html(`
    <section id='quiz-current'>
      <statusBlock id='#position-and-score'>
        ${status}
      </statusBlo>
      <questionBlock id='current-question'>
        ${question}
      </questionBlock>
      <answerBlock id='current-answers'>
        <ul>${answer}</ul>
      </answerBlock>
      <button id='theButton' class='theButton'>Submit</button>
    </section>
  `);
  currentStatus.currentQuestionIndex += 1;
}

// This will render the current question and socre
function createStatus() {
  return (`
    <span id='current-position'>Question: ${currentStatus.currentQuestionIndex}/${qA.questions.length}</span>
    </br>
    <span id='current-score'>Score: ${currentStatus.currentScore}</span>
  `);
}

function clickedTheButton() {
  $('#quiz-container').on('click', e => {
    if (e.target.className === 'theButton' && ($('input:radio:checked').length > 0)) {
      // console.log('clicked theButton');
      if (e.target.closest('section')) {
        // console.log('current-quiz');
        checkAnswer();
      }
    }

    if (e.target.closest('#answercorrect')) {
      currentStatus.currentScore += 1;
      // console.log('correct');
      if (currentStatus.currentQuestionIndex > qA.questions.length) {
        finalScreen();
      } else {
        // console.log(currentStatus.currentScore);
        renderQuiz();
      }
    }

    if (e.target.closest('#answerincorrect')) {
      // console.log('incorrect');
      if (currentStatus.currentQuestionIndex > qA.questions.length) {
        finalScreen();
      } else {
        // console.log(currentStatus.currentScore);
        renderQuiz();
      }
    }

    if (e.target.closest('#final-block')) {
      currentStatus.currentQuestion = 'blah?';
      currentStatus.currentQuestionIndex = 1;
      currentStatus.currentScore = 0;
      renderWelcome();
    }
  });
}

// This will show question
function createQuestion() {
  // get question from qA and print out question
  let question = qA.questions[currentStatus.currentQuestionIndex - 1].question;
  if (currentStatus.currentQuestionIndex === qA.length + 1) {
    finalScreen();
  } else {
    return (`<p class="current-question">What is ${question}?</p>`);
  }
}

// This will show answers
function createAnswers() {
  let answersOutput = '';
  let questionPosition = qA.questions[currentStatus.currentQuestionIndex - 1].options;
  // console.log(qA.questions[currentStatus.currentQuestionIndex - 1].options);
  for (let i = 0; i < questionPosition.length; i++) {
    let answerValue = questionPosition[i];
    answersOutput += (`
    <li>
      <input type='radio' name='answerOptions' value='${answerValue}'/>
      <p id='answerText'>${answerValue}</p> 
    </li> `);

  }
  // console.log(answersOutput);
  return (answersOutput);
}

function checkAnswer() {
  let selected = $('input:checked');
  let answer = selected.val();
  let correct = qA.questions[currentStatus.currentQuestionIndex - 2].answer;
  // console.log(correct);
  if (answer === correct) {
    renderCorrect();
  } else {
    renderIncorrect();
  }
}

function renderCorrect() {
  $('#quiz-current').html(`
  <div id='answercorrect'>
    <p>Correct!</p>
    <button>Next</button>
  </div id='answercorrect'>
  `);
}

function renderIncorrect() {
  $('#quiz-current').html(`
  <div id='answerincorrect'>
    <p>Incorrect!</p>
    <button>Next</button>
  </div>
  `);
}

function finalScreen() {
  let target = $('#quiz-current');
  let wellDoneImg = 'img/well-done.png';
  let tryAgainImg = 'img/try-again.png';
  let imgSrc;
  let scoreText;
  let retryButton = '';
  if (currentStatus.currentScore > 3) {
    scoreText = 'Good Job!';
    imgSrc = wellDoneImg;
    retryButton += '<button>Start Over!</button>';
  }

  if (currentStatus.currentScore < 4) {
    scoreText = 'You Suck!';
    imgSrc = tryAgainImg;
  }
  target.html(`
    <finalBlock id='final-block'>
      <h3>${scoreText}</h3>
      <h2>You got ${currentStatus.currentScore} out of ${qA.questions.length} correct</h2>
      <img src='${imgSrc}' alt='results image' id='results-image'/> <br>
      <div>${retryButton}</div>
    </finalBlock>
  `);
}

// generates welcome screen
renderWelcome();
// need to call this to watch for clicks on theButton
clickedTheButton();