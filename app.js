'use strict';

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
        '500',
        '40',
        '1000',
        '600',
        '50'
      ],
      answer: '500'
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
  let target = $('#quiz-container');
  // checking target
  // console.log(target);
  // Render Welcome screen
  target.html(`
      <div class='welcome'>
        <div class='welcomeHeading'>
          <h1>Welcome to our Math Quiz!</h1>
        </div>
        <div id='welcomeImage'>  
          <img src='https://img.freepik.com/free-vector/set-number-math-icon_1639-5572.jpg?size=626&ext=jpg'
          alt='numbers' id='welcomeImg' </img>
        </div>
        <div id='start-button'>
          <button type='button'>Start the quiz!</button>
        </div>
      </div>
  `);
  // click start button -> startQuiz();
  $('#start-button').on('click', e => {
    let clicked = e.target;
    // logging to make sure button was clicked
    // console.log(clicked);
    startQuiz();
  });
}

// generates quiz container with all needed divs
function startQuiz() {
  let target = $('#quiz-container');
  let status = createStatus();
  let question = createQuestion();
  let answer = createAnswers();
  let button = createButton();
  target.html(`
    <section id="quiz-current">
      <div id='#position-and-score'>
        ${status}</br>
      </div>
      <div id='current-question'>
        ${question}</br>
      </div>
      <div id='current-answers'>
        ${answer}</br>
      </div>
      ${button}
    </section>
  `);
  currentStatus.currentQuestionIndex += 1;
}

// This will render the current question and socre
function createStatus() {
  return (`
    <span id='current-position'>Question: ${currentStatus.currentQuestionIndex}/${qA.questions.length}</span>
    </br>
    <span id='current-score'>score: ${currentStatus.currentScore}</span>
  `);
}

// This will show question
function createQuestion() {
  // get question from qA and print out question
  let question = qA.questions[currentStatus.currentQuestionIndex - 1].question;
  if (currentStatus.currentQuestionIndex === qA.length - 1) {
    finalScreen();
  } else {
    return (`<p class="current-question">What is ${question}?</p>`);
  }
}

// This will show answers
function createAnswers() {
  // get question from qA and list answers in ul/li
  let answers = qA.questions[currentStatus.currentQuestionIndex - 1].options;
  return (`<p>${answers}</p>`);
}

function createButton() {
  //   let target = $('.theButton');
  //   if target.closest('.section').id = quiz - current next {
  //     return `<button type='button' id='submitButton'>Submit</button>`;
  //   } else target.closest('.section').id = answer - screen next {
  //     return `<button type='button' id='nextButton'>Next</button>`;
  //   } else target.closest('.section').id = finalScreen next {
  //     return `<button type='button' id='startoverButton'>Start Over!</button>`;
  //   }
  return ('<button>placeholder for button</button>');
}

function finalScreen() {
  let target = $('#quiz-current');
  target.html = 'done'; // placeholder
}

function startOver() {
  // when start over button is clicked
  // rerun startQuiz
  target.html(`
  <
  `
  )
  startQuiz();
}



// generates welcome screen
renderWelcome();
