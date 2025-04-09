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
    question: "What motivates you the most: Impact, Growth, or Innovation?",
    options: ["Impact", "Growth", "Innovation"]
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
  document.getElementById("startButton").style.display = "none";
  showNextQuestion();
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
        `<button class="option-button" onclick="performAction('${option}')">${option}</button>`
      ).join('')}
    </div>
  `;
}

function performAction(answer) {
  // Special handling for the last question
  if (currentQuestion === 4) {
    if (answer === "1st - 3rd Year") {
      document.getElementById('quiz').innerHTML = `
        <h2>You are still young for an intersnhip. Consider Global Volunteer!</h2>
        <p>You can try <a href="https://aiesec.gr/volunteer/" target="_blank">Global Volunteer</a></p>`;
      return;
    } else if (answer === "4th Year" || answer === "Post-graduate") {
      document.getElementById('quiz').innerHTML = `
        <h2>Your Perfect Match: Global Talent</h2>
        <p>Suggested Internship: <a href="https://aiesec.gr/intern/" target="_blank">Global Talent</a></p>`;
      return;
    }
  }

  // Move to the next question if not the last or special condition hasn't triggered
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showNextQuestion();
  } else {
    displayResult();
  }
}

function displayResult() {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<h2>Your Perfect Match: Global Talent</h2><p>Suggested Internship: Global Talent</p>";
}

function showModal() {
  const modal = document.getElementById("myModal");
  modal.style.opacity = 0;
  modal.style.display = "block";
  setTimeout(() => modal.style.opacity = 1, 10);
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.opacity = 0;
  setTimeout(() => modal.style.display = "none", 300);
}
