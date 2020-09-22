/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'In which book of the Republic does Socrates, speaking about astronomy, suggest that we should "leave the things in the sky alone"?',
      answers: [
        'X',
        'IX',
        'I',
        'VII'
      ],
      correctAnswer: 'VII'
    },
    {
      question: 'In which book of The Republic is the Cave Allegory?',
      answers: [
        'VII',
        'IV',
        'III',
        'I'
      ],
      correctAnswer: 'VII'
    },

    {
      question: 'In which dialogue are squares drawn in the sand?',
      answers: [
        'Timaeus', 'Republic', 'Gorgias', 'Meno'
      ],
      correctAnswer: 'Meno'
    },

    {
      question: 'In which dialogue does Socrates suggest that trying to describe justice without reference to "the right, the beneficial, the profitable, the gainful, or the advantageous is akin to characterizing the number 12 without recourse to explanations such as "twelve is twice six, or three times four, or six times two or four times three"?',
      answers: [
        'Euthydemus', 'Republic', 'Charmides', 'Alcibiades'
      ],
      correctAnswer: 'Republic'
    },
    {
      question: 'In which dialogue does Socrates warn against misology, comparing it to misanthropy?',
      answers: [
        'Cratylus', 'Laws', 'Phaedo', 'Crito'
      ],
      correctAnswer: 'Phaedo'
    },
    {
      question: 'In which dialogue does Socrates say "I would contend at all costs both in word and in deed as far as I could that we will be better men, braver and less idle if we believe that one must search for the things one does not know, rather than if we believe that it is not possible to find out what we do not know and that we must not look for it."?',
      answers: [
        'Charmides', 'Phaedrus', 'Phaedo', 'Meno'
      ],
      correctAnswer: 'Meno'
    },
    {
      question: 'Which dialogue centers on the events of the day preceding Socrates death?',
      answers: [
        'Apology', 'Euthyphro', 'Phaedo', 'Protagoras'
      ],
      correctAnswer: 'Phaedo'
    },
    {
      question: 'In which dialogue does Socrates, after a night of heavy drinking, report on a conversation about love with a wise woman named Diotima?',
      answers: [
        'Symposium', 'Cratylus', 'Sophist', 'Alcibiades'
      ],
      correctAnswer: 'Symposium'
    },
    {
      question: 'Who charges Socrates with corrupting the youth?',
      answers: [
        'Thrasymachus', 'Sophocles', 'Gorgias', 'Meletus'
      ],
      correctAnswer: 'Meletus'
    },
    

  ],

  questionNumber: 0,
  score: 0,
  view: "landing",
  responseCorrect: true
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

  //This function when called will return a form with a button to start the quiz.
function generateTitleTemplate() {
  return `<h2>Start of Quiz</h2>
  <p>This quiz will test your knowledge of Plato's dialogues. Press 'Start' to begin.</p>
  <button id="start-button" type="button" name="start">Start</button>
  
`

}

//returns the radio buttons for a quiz question
function generateAnswerOptions(state) {
  
  let generated = '';
  for (let i = 0; i < 4; i++) {
    generated += `<div class="option-div">
    <input type="radio" name="options" id="option${i}" value=${state.questions[state.questionNumber].answers[i]}  required> 
    <label for="option${i}">${state.questions[state.questionNumber].answers[i]}</label>
    </div>`
  }
  return generated
}

  //this function will return html that has a heading including the score and the question number 
  //and a form that includes a question and answer options (buttons)
function generateQuestionTemplate(state) {
  return `
  <ul id="score-display">
  <li>Score: ${store.score}</li>
  <li>Question: ${store.questionNumber+1}/${store.questions.length}</li>
  </ul>
  <form id="question-form">
  <fieldset>
  <legend>${store.questions[state.questionNumber].question}</legend>
  ${generateAnswerOptions(store)}
  <button id="answer-button" type="submit" name="answer-button">Submit</button>
  </fieldset>
  <form>`

}

//generates html for feedback view
function generateFeedbackTemplate(state) {
  
  if (state.responseCorrect){
    return `<h2>Your answer is correct!</h2>
    <button id="next-button" type="button">Next</button>
    `
  }
  return `<h2>Incorrect. The correct answer is ${state.questions[state.questionNumber].correctAnswer}.</h2>
          <button id="next-button" type="button">Next</button>        
  `
  console.log('generateFeedbackTemplate ran')


}

//generates function for 'results' view
function generateResultsTemplate(state) {
  
  console.log('generateResultsTemplate ran')
  return `<h2>You got ${store.score} questions right out of ${store.questions.length}. Press 'Start Over' to try again.</h2>
        <button id="restart-button" type="button">Start Over</button>
  `

}
// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render() {
  let bigString;
  console.log('render fxn ran')
  if (store.view === 'landing') {
    bigString = generateTitleTemplate(store);

  }
  else if (store.view === 'question') {
    bigString = generateQuestionTemplate(store);

  }
  else if (store.view === 'feedback') {
    bigString = generateFeedbackTemplate(store)

  }
  else if (store.view === 'results') {
    bigString = generateResultsTemplate(store);

  }
  $('main').html(bigString);

  //attach event listeners


}
/********** EVENT HANDLER FUNCTIONS **********/
//this function will be called when the start button is clicked.  
  //It will update the view property of store to question
  //And call render
function handleStart() {
  console.log('handleStart ran')
  $('body').on('click',"#start-button", (e) => {
    
    store.view = 'question'
    
    render()
  }
  )
  
}

//get response
  //if answer is correct increment score by 1
  //increment questionNumber by 1
  //change view to feedback
  //call render
function handleAnswer() {
  console.log('handleAnswer ran')
  $('body').on('submit', '#question-form', (e) => {
    e.preventDefault();

    const guess = e.target.options.value

    if (guess === store.questions[store.questionNumber].correctAnswer) {
      store.responseCorrect = true;
      store.score += 1;
    }
    else {
      store.responseCorrect = false;
    }
    
    store.view = "feedback";
    render();

  })
  
}
//move to next question when 'next' button is clicked (or results if last question)
function handleFeedback() {
  $('body').on('click', '#next-button', (e) => {
    console.log('clicked!')
    if (store.questionNumber === store.questions.length-1) {

      store.view = 'results'
    }
    else {
      store.view = 'question'
      store.questionNumber+=1;

    }
    render()
  })
  

}
//move to landing view if restart is clicked w/question number and score set to 0.
function handleStartOver() {
  $('body').on('click', '#restart-button', (e) => {
    
    store.view = 'landing';
    store.questionNumber = 0;
    store.score = 0;
    render()
  })

}

function main() {
  handleStart();
  handleAnswer();
  handleFeedback();
  handleStartOver();
  render();
}
// These functions handle events (submit, click, etc)

$(main);
