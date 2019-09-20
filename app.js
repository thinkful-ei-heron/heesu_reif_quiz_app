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
    },
    {
      question: '1000 + 350',
      options: [
        '1200',
        '1550',
        '1400',
        '1350',
        '1135'
      ],
      answer: '1350'
    },
    {
      question: '450 * 1000',
      options: [
        '450000',
        '300000',
        '350000',
        '540000',
        '435000'
      ],
      answer: '450000'
    },
    {
      question: '76580 / 10',
      options: [
        '7648',
        '7635',
        '7380',
        '7658',
        '7558'
      ],
      answer: '7658'
    },
    {
      question: '75 * 40 + 55',
      options: [
        '4055',
        '3100',
        '3045',
        '4455',
        '3055'
      ],
      answer: '3055'
    },
    {
      question: '81503 - 100 + 4291',
      options: [
        '85594',
        '85694',
        '86596',
        '84931',
        '86370'
      ],
      answer: '85694'
    },
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
    console.log(clicked);
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
  let question = qA.questions[currentStatus.currentQuestionIndex].question;
  currentStatus.currentQuestionIndex += 1;
  if (currentStatus.currentQuestionIndex === qA.length - 1) {
    finalScreen();
  } else {
    return (`<p class="current-question">${question}</p>`);
  }
}

// This will show answers
function createAnswers() {
  let target = $('#current-answers');
  // get question from qA and list answers in ul/li
  target.html(``);
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
}

function finalScreen() {
  let target = $('#quiz-current');
  target.html = 'done'; // placeholder
}

function startOver() {
  // when start over button is clicked
  // rerun startQuiz
  startQuiz();
}



// generates welcome screen
renderWelcome();
