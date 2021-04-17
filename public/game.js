const question = document.querySelector('#question');
const choices = Array.from (document.querySelectorAll('.choice-text'));
const  progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions =[
   {
      question:'What is 2 + 2 * 2?',
      choice1: '2',
      choice2: '6',
      choice3: '4',
      choice4: '8',
      answer: 2,
   },
   {
      question:'What are the longest rivers in Ukraine ?',
      choice1: 'Dniester',
      choice2: 'Southern Bug',
      choice3: 'Dnieper',
      choice4: 'Desna',
      answer: 3,
   }, {
      question:'When was Lviv founded ?',
      choice1: '1256',
      choice2: '1066',
      choice3: '1861',
      choice4: '1668',
      answer: 1,
   }, {
      question:'Which singer was known  as `The King of Pop`?',
      choice1: 'Elvis Presley',
      choice2: ' Michael Jackson',
      choice3: 'John Lennon',
      choice4: 'Freddie Mercury',
      answer: 2,
   },  {
      question:'What`s the biggest animal in the world?',
      choice1: 'Brown Bear',
      choice2: 'African Elephant',
      choice3: 'Giraffe',
      choice4: 'The blue whale',
      answer: 4,
   }, 
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
   questionCounter = 0
   score = 0
   availableQuestions = [...questions]
   getNewQuestion()
}

getNewQuestion = () => {
   if ( availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', score)

      return window.location.assign('./end.html')
   }
   questionCounter++
   progressText.innerText = `Question ${questionCounter} of  ${MAX_QUESTIONS}`
   progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
   
   const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
   currentQuestion = availableQuestions[questionsIndex]
   question.innerText = currentQuestion.question
   
   choices.forEach(choice => {
      const number = choice.dataset['number']
      choice.innerText = currentQuestion['choice' + number]
   })

   availableQuestions.splice(questionsIndex, 1)

   acceptingAnswers = true
}

choices.forEach(choice => {
   choice.addEventListener('click', e => {
      if (!acceptingAnswers) return

      acceptingAnswers = false
      const selectedChoice = e.target
      const selectedAnswer = selectedChoice.dataset['number']

      let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

      if(classToApply === 'correct') {
         incrementScore (SCORE_POINTS)
   }

      selectedChoice.parentElement.classList.add(classToApply)

      setTimeout(() => {
         selectedChoice.parentElement.classList.remove(classToApply)
         getNewQuestion()

      }, 1000)
   })
})

incrementScore = num => {
   score += num
   scoreText.innerText = score
}

startGame()