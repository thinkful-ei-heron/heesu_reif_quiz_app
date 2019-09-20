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
  currentPosition: `Question ${this.currentQuestion}/${qA.questions.length}`,
  currentScore: 0
};

// Starting screen with 'start' button
function renderWelcome() {
  let target = $('#quiz-container');
  // checking target
  console.log(target);
  // Render Welcome screen
  target.innerHTML = `
    <div class="welcome">
      <div class="welcomeHeading">
        <h1>test heading</h1>
      </div>
      <div id="welcomeImage">
        <p>this will be an image</p>
      </div>
      <div id="welcomeTagline">
        <p>this will be a tagline</p>
      </div>
      <div id="start-button">
        button will go here
      </div>
    </div>
  `;
  // click start button -> startQuiz();
  $('#start-button').on('click', e => {
    let clicked = e.target;
    // logging to make sure button was clicked
    console.log(clicked);
    startQuiz();
  });
}

// This will render the current question and socre
function renderStatus() {
  console.log(currentStatus.currentPosition);
}

// This will show question
function renderQuestion() {

}

// This will show answers
function renderAnswers() {

}

// 
function startQuiz() {
  renderStatus();
  renderQuestion();
  renderAnswers();
}

// calls all needed functions
renderWelcome();
