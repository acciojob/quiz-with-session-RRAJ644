// Your JS code here
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Function to render questions and retain user progress
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  const userProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

  questions.forEach((question, questionIndex) => {
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("question-container");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionContainer.appendChild(questionText);

    question.choices.forEach((choice) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${questionIndex}`;
      input.value = choice;

      // Retain progress
      if (userProgress[questionIndex] === choice) {
        input.checked = true;
      }

      // Save progress on change
      input.addEventListener("change", () => {
        userProgress[questionIndex] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userProgress));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionContainer.appendChild(label);
    });

    questionsElement.appendChild(questionContainer);
  });
}

// Function to calculate and display the score
function calculateScore() {
  const userProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  let score = 0;

  questions.forEach((question, questionIndex) => {
    if (userProgress[questionIndex] === question.answer) {
      score++;
    }
  });

  // Display score
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // Store score in localStorage
  localStorage.setItem("score", score);
}

// Initialize the quiz
document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();

  // Handle submit button
  document.getElementById("submit").addEventListener("click", calculateScore);
});
