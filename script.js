let currentQuestion = 0;
const questions = [
  {
    question: "What type of weather do you prefer?",
    options: ["Hot", "Cold", "Rainy"]
  },
  {
    question: "Do you like working with people or data?",
    options: ["People", "Data"]
  },
  {
    question: "What motivates you the most: impact, growth, or discovery?",
    options: ["Impact", "Growth", "Discovery"]
  },
  {
    question: "What are you studying?",
    options: ["Business Administration", "Economics", "Marketing", "Computer Science", "Finance"]
  },
  {
    question: "What year are you in University?",
    options: ["1st - 3rd Year", "4th Year", "Post-graduate"]
  }
];

function startQuiz() {
  document.getElementById("startButton").style.display = "none";  // Hide the "Let's Go" button
  showNextQuestion();  // Start the quiz
}

function showNextQuestion() {
  if (currentQuestion >= questions.length) {
    displayResult();
    return;
  }

  const question = questions[currentQuestion];
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = `
    <h2>${question.question}</h2>
    <div class="button-group">
      ${question.options.map(option => 
        `<button class="option-button" type="button" onclick="performAction('${option}')">${option}</button>`
      ).join('')}
    </div>
  `;
}

function performAction(answer) {
  // If the user selects "1st - 3rd Year", show the "better luck next year" message
  if (currentQuestion === 4 && answer === "1st - 3rd Year") {
    document.getElementById('quiz').innerHTML = `
      <h2>You are a kid, better luck next year!</h2>
      <p>You can try <a href="https://aiesec.gr/volunteer/" target="_blank">Global Volunteer</a></p>
    `;
    return;
  }

  // If the user selects "4th Year" or "Post-graduate", show the internship match result
  if (currentQuestion === 4 && (answer === "4th Year" || answer === "Post-graduate")) {
    displayResult();
    return;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showNextQuestion();
  }
}

function displayResult() {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <h2>Your Perfect Match: Global Talent</h2>
    <p>Suggested Internship: Global Talent</p>
    <a href="https://aiesec.gr/intern/" class="apply-button">Apply Now</a>
  `;
}


// Function to show the hint modal
function showModal() {
  document.getElementById("myModal").style.display = "block";
}

// Function to close the hint modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
  displayResult(); // Show the final result after closing the hint modal
}
