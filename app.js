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

// setting global variables object
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
        <imageHolder class='welcomeImageContainer'>  
          <img src='${welcomeImg}'
          alt='math symbols' id='welcomeImg'/>
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
      <statusBlock id='position-and-score'>
        ${status}
      </statusBlo>
      <questionBlock id='current-question'>
        ${question}
      </questionBlock>
      <form class='answers-test'>
        ${answer}
      <input type='submit' class='the-button'/>
      </form>
    </section>
  `);
  currentStatus.currentQuestionIndex += 1;
}

// This will render the current question and socre
function createStatus() {
  return (`
    <span class='current-position'>Question: ${currentStatus.currentQuestionIndex}/${qA.questions.length}</span>
    </br>
    <span class='current-score'>Score: ${currentStatus.currentScore}</span>
  `);
}

function clickedTheButton() {
  $('#quiz-container').on('submit', e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    // console.log('the-button clicked');
    if (e.target.className === 'answers-test' && ($('input:radio:checked').length > 0)) {
      // console.log('answers submitted');
      // console.log('clicked the-button');
      if (e.target.closest('section')) {
        // console.log('current-quiz');
        checkAnswer();
      }
    }

    if (e.target.className === 'answer-correct') {
      // console.log('answer-correct submitted');
      currentStatus.currentScore += 1;
      if (currentStatus.currentQuestionIndex > qA.questions.length) {
        finalScreen();
      } else {
        renderQuiz();
      }
    }
    // 
    if (e.target.className === 'answer-incorrect') {
      if (currentStatus.currentQuestionIndex > qA.questions.length) {
        finalScreen();
      } else {
        // console.log('answer-incorrect submitted');
        renderQuiz();
      }
    }

    if (e.target.className === 'retry-button') {
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
      <div class='answer-inline'>
        <input type='radio' name='answerOptions' value='${answerValue}'/>
        <label class='answer-text'>${answerValue}</label>
      </div>
      `);
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
  <form class='answer-correct'>
    <label>Correct!</label>
    <input type='submit' value='Next' class='continue-correct'/>
  </form>
  `);
}

function renderIncorrect() {
  $('#quiz-current').html(`
  <form class='answer-incorrect'>
    <label>Incorrect!</label>
    <input type='submit' value='Next' class='continue-incorrect'/>
  </form>
  `);
}

function finalScreen() {
  let target = $('#quiz-current');
  let scoreText;
  let retryBlock;
  if (currentStatus.currentScore > 3) {
    scoreText = 'Good Job!';
    retryBlock = `
      <img src='img/well-done.png' alt='results image' class='results-image'/>
      <form class='retry-button'>
        <input type='submit' value='Restart!' class='final-submit'/>
      </form>
    `;
  }

  if (currentStatus.currentScore < 4) {
    scoreText = 'You Suck!';
    retryBlock = `
      <form class='retry-button'>
        <input type='image' src='img/try-again.png' alt='Start Over!' class='results-image'/>
      </form>
    `;
  }
  target.html(`
    <finalBlock id='final-block' class='finalBlock'>
      <h3>${scoreText}</h3>
      <h2>You got ${currentStatus.currentScore} out of ${qA.questions.length} correct</h2>
      ${retryBlock}
    </finalBlock>
  `);
}

// generates welcome screen
renderWelcome();
// need to call this to watch for clicks on the-button
clickedTheButton();