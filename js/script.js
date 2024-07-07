let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enableDarkMode();
}

toggleBtn.onclick = (e) =>{
   darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enableDarkMode();
   }else{
      disableDarkMode();
   }
}

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   search.classList.remove('active');
}

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
   search.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () =>{
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () =>{
   profile.classList.remove('active');
   search.classList.remove('active');

   if(window.innerWidth < 1200){
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}
const quizQuestions = [
   {
     question: "What does HTML stand for?",
     options: [" Hyper Text Markup Language","Hyperlinks and Text Manipulation Language","Home Tool Markup Language","Hyper Transfer Mode Language"],
     correctAnswer: "Hyper Text Markup Language"
   },
   {
     question: "2. Which CSS property is used to change the text color of an element?",
     options: ["color", "text-color", "font-color", "text-style"],
     correctAnswer: "color"
   },
   {
     question: " Which HTML attribute is used to define inline styles?",
     options: ["class", "style", "font", "design"],
     correctAnswer: "style"
   }
 ];
 
 // Variables to track quiz state
 let currentQuestionIndex = 0;
 let score = 0;
 let timeLeft = 30;
 let timerInterval;
 
 // Function to start the quiz
 function startQuiz() {
   // Hide the start button and display the first question
   document.getElementById("start-button").style.display = "none";
   displayQuestion();
   startTimer();
 }
 
 // Function to display a question and its options
 function displayQuestion() {
   const currentQuestion = quizQuestions[currentQuestionIndex];
   const questionText = document.getElementById("question-text");
   const answerButtons = document.getElementById("answer-buttons");
 
   // Clear previous question and answer options
   questionText.innerHTML = "";
   answerButtons.innerHTML = "";
 
   // Display the current question
   questionText.innerHTML = currentQuestion.question;
 
   // Create answer buttons for each option
   currentQuestion.options.forEach(option => {
     const button = document.createElement("button");
     button.innerText = option;
     button.classList.add("answer-button");
     answerButtons.appendChild(button);
 
     // Add click event listener to check the answer
     button.addEventListener("click", function() {
       checkAnswer(option);
     });
   });
 }
 
 // Function to check the selected answer
 function checkAnswer(selectedOption) {
   const currentQuestion = quizQuestions[currentQuestionIndex];
 
   // Check if the selected answer is correct
   if (selectedOption === currentQuestion.correctAnswer) {
     score++;
   }
 
   // Move to the next question or end the quiz if all questions are answered
   currentQuestionIndex++;
 
   if (currentQuestionIndex < quizQuestions.length) {
     displayQuestion();
   } else {
     endQuiz();
   }
 }
 
 // Function to start the timer
 function startTimer() {
   timerInterval = setInterval(function() {
     timeLeft--;
 
     // Update the timer text
     document.getElementById("timer").textContent = timeLeft;
 
     // End the quiz if time runs out
     if (timeLeft <= 0) {
       endQuiz();
     }
   }, 1000);
 }
 
 // Function to end the quiz
 function endQuiz() {
   // Stop the timer
   clearInterval(timerInterval);
 
   // Calculate the score percentage
   const scorePercentage = (score / quizQuestions.length) * 100;
 
   // Display the final score
   const questionContainer = document.getElementById("question-container");
   questionContainer.innerHTML = `
     <h2>Quiz Completed!</h2>
     <h1>Your Score: ${score} out of ${quizQuestions.length}</h1>
     <h1>Score Percentage: ${scorePercentage}%</h1>
   `;
 }
 
 // Add event listener to start the quiz when the start button is clicked
 document.getElementById("start-button").addEventListener("click", startQuiz);