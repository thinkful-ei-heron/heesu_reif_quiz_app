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
        <section class='welcomeImageContainer'>  
          <img src='${welcomeImg}'
          alt='math symbols' id='welcomeImg'/>
        </section>
        <form class='start-form'>
          <input role='button' type='submit' class='start-button the-button' value='Start the quiz!'/>
        <form>
      </welcomeBlock>
  `);
}

// generates quiz container with all needed divs
function renderQuiz() {
  let target = $('#quiz-container');
  let status = createStatus();
  let question = createQuestion();
  let answer = createAnswers();
  target.html(`
    <section id='quiz-current'>
      <section id='position-and-score'>
        ${status}
      </section>
      <fieldset>
        <section id='current-question'>
          <legend>${question}</legend>
        </section>
        <form class='answers-test'>
          ${answer}
        <input role='button' type='submit' class='the-button'/>
        </form>
      </fieldset>
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
    // console.log(e.target);
    e.preventDefault();
    e.stopImmediatePropagation();
    if (e.target.className === 'start-form') {
      renderQuiz();
    }
    // console.log('the-button clicked');
    if (e.target.className === 'answers-test') {
      if ($('input:radio:checked').length > 0) {
        if (e.target.closest('section')) {
          // console.log('current-quiz');
          checkAnswer();
        }
        // console.log('answers submitted');
        // console.log('clicked the-button');
      } else {
        let noAnswer = document.createElement('span');
        let breaker = document.createElement('br');
        noAnswer.className = 'alert alert-styles';
        breaker.className = 'alert';
        noAnswer.textContent = 'Please choose an answer';
        document.querySelector('.answers-test').appendChild(noAnswer);
        document.querySelector('.answers-test').appendChild(breaker);
        setTimeout(function () {
          document.querySelectorAll('.alert').forEach(aler => aler.remove());
        }, 2000);

        // alert('Please select an aswer below.');
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
        <input role='button' type='radio' name='answerOptions' value='${answerValue}'/>
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
    renderInCorrect(true);
  } else {
    renderInCorrect(false);
  }
}

// function renderCorrect() {
//   $('#quiz-current').html(`
//   <form class='answer-correct'>
//     <label>Correct!</label>
//     <input role='button' type='submit' value='Next' class='continue-correct'/>
//   </form>
//   `);
// }
// refactoered? below to only use one function instead of 2

function renderInCorrect(tOrF) {
  let classy;
  let aLabel;
  if (tOrF === true) {
    classy = 'correct';
    aLabel = 'Correct!';
  } else if (tOrF === false) {
    classy = 'incorrect';
    aLabel = 'Incorrect';
  }
  $('#quiz-current').html(`
  <form class='answer-${classy}'>
    <label>${aLabel}!</label>
    <input role='button' type='submit' value='Next' class='continue-${classy}'/>
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
      <img src='img/well-done.png' alt='Good Job' class='results-image'/>
      <form class='retry-button'>
        <input role='button' type='submit' value='Restart!' class='final-submit'/>
      </form>
    `;
  }

  if (currentStatus.currentScore < 4) {
    scoreText = 'Better luck next time!';
    retryBlock = `
      <form class='retry-button'>
        <input role='button' type='image' src='img/try-again.png' alt='Start Over' class='results-image'/>
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