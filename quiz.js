const questions = [
  // Easy questions
  { "question": "Two Sum", "answer": "arrays_and_hashing", "mode": "easy" },
  { "question": "Valid Parentheses", "answer": "stack", "mode": "easy" },
  { "question": "Merge Two Sorted Lists", "answer": "linked_list", "mode": "easy" },
  { "question": "Best Time to Buy and Sell Stock", "answer": "sliding_window", "mode": "easy" },
  { "question": "Valid Palindrome", "answer": "two_pointers", "mode": "easy" },
  { "question": "Invert Binary Tree", "answer": "trees", "mode": "easy" },
  { "question": "Binary Search", "answer": "binary_search", "mode": "easy" },
  { "question": "Linked List Cycle", "answer": "linked_list", "mode": "easy" },
  { "question": "Maximum Depth of Binary Tree", "answer": "trees", "mode": "easy" },
  { "question": "Contains Duplicate", "answer": "arrays_and_hashing", "mode": "easy" },

  // Medium questions
  { "question": "3Sum", "answer": "two_pointers", "mode": "medium" },
  { "question": "Longest Substring Without Repeating Characters", "answer": "sliding_window", "mode": "medium" },
  { "question": "Validate Binary Search Tree", "answer": "trees", "mode": "medium" },
  { "question": "Course Schedule", "answer": "graphs", "mode": "medium" },
  { "question": "Combination Sum", "answer": "backtracking", "mode": "medium" },
  { "question": "Min Stack", "answer": "stack", "mode": "medium" },
  { "question": "Kth Largest Element in an Array", "answer": "heap_priority_queue", "mode": "medium" },
  { "question": "House Robber", "answer": "dynamic_programming", "mode": "medium" },
  { "question": "Search in Rotated Sorted Array", "answer": "binary_search", "mode": "medium" },
  { "question": "Jump Game", "answer": "greedy", "mode": "medium" },

  // Hard questions
  { "question": "Trapping Rain Water", "answer": "two_pointers", "mode": "hard" },
  { "question": "Minimum Window Substring", "answer": "sliding_window", "mode": "hard" },
  { "question": "Binary Tree Maximum Path Sum", "answer": "trees", "mode": "hard" },
  { "question": "Word Ladder", "answer": "graphs", "mode": "hard" },
  { "question": "N-Queens", "answer": "backtracking", "mode": "hard" },
  { "question": "Longest Valid Parentheses", "answer": "stack", "mode": "hard" },
  { "question": "Find Median from Data Stream", "answer": "heap_priority_queue", "mode": "hard" },
  { "question": "Edit Distance", "answer": "dynamic_programming", "mode": "hard" },
  { "question": "Median of Two Sorted Arrays", "answer": "binary_search", "mode": "hard" },
  { "question": "Gas Station", "answer": "greedy", "mode": "hard" }
];

const categories = [
  "arrays_and_hashing",
  "two_pointers",
  "sliding_window",
  "stack",
  "binary_search",
  "linked_list",
  "trees",
  "graphs",
  "backtracking",
  "dynamic_programming",
  "greedy",
  "heap_priority_queue"
];

let currentQuestion = 0;
let score = 0;
let answered = false;
let filteredQuestions = [];
let selectedDifficulty = '';

// DOM Elements
const difficultySelector = document.getElementById('difficulty-selector');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const difficultyBadge = document.getElementById('difficulty-badge');
const categoriesGrid = document.getElementById('categories-grid');
const feedback = document.getElementById('feedback');
const progressFill = document.getElementById('progress-fill');
const currentScoreDisplay = document.getElementById('current-score');
const scoreDisplay = document.getElementById('score-display');
const restartBtn = document.getElementById('restart-btn');

// Initialize app - show difficulty selector
function initApp() {
  difficultySelector.classList.remove('hidden');
  quizContainer.classList.add('hidden');
  resultsContainer.classList.add('hidden');

  // Add event listeners to difficulty buttons
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => startQuiz(btn.dataset.difficulty));
  });
}

// Start quiz with selected difficulty
function startQuiz(difficulty) {
  selectedDifficulty = difficulty;

  // Filter questions by difficulty
  if (difficulty === 'all') {
    filteredQuestions = [...questions];
  } else {
    filteredQuestions = questions.filter(q => q.mode === difficulty);
  }

  currentQuestion = 0;
  score = 0;
  answered = false;

  difficultySelector.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  resultsContainer.classList.add('hidden');

  createCategoryButtons();
  displayQuestion();
  updateScore();
}

// Create category buttons
function createCategoryButtons() {
  categoriesGrid.innerHTML = '';

  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.className = 'category-btn';
    btn.textContent = category.replace(/_/g, ' ');
    btn.dataset.category = category;
    btn.addEventListener('click', () => selectAnswer(category, btn));
    categoriesGrid.appendChild(btn);
  });
}

// Display current question
function displayQuestion() {
  if (currentQuestion >= filteredQuestions.length) {
    showResults();
    return;
  }

  const q = filteredQuestions[currentQuestion];
  questionNumber.textContent = `Question ${currentQuestion + 1}/${filteredQuestions.length}`;
  questionText.textContent = q.question;

  // Display difficulty badge
  difficultyBadge.textContent = q.mode.toUpperCase();
  difficultyBadge.className = q.mode;

  feedback.classList.add('hidden');
  answered = false;

  // Remove selected state from all buttons
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('selected');
    btn.disabled = false;
  });

  updateProgress();
}

// Handle answer selection
function selectAnswer(selectedCategory, btn) {
  if (answered) return;

  answered = true;
  const correctAnswer = filteredQuestions[currentQuestion].answer;

  // Add selected state to clicked button
  btn.classList.add('selected');

  // Disable all buttons
  document.querySelectorAll('.category-btn').forEach(button => {
    button.disabled = true;
  });

  // Show feedback
  feedback.classList.remove('hidden');

  if (selectedCategory === correctAnswer) {
    score++;
    feedback.textContent = '✓ Correct!';
    feedback.className = 'correct';
  } else {
    feedback.textContent = `✗ Wrong! The correct answer is: ${correctAnswer.replace(/_/g, ' ')}`;
    feedback.className = 'wrong';
  }

  updateScore();

  // Move to next question after delay
  setTimeout(() => {
    currentQuestion++;
    displayQuestion();
  }, 2000);
}

// Update progress bar
function updateProgress() {
  const progress = (currentQuestion / filteredQuestions.length) * 100;
  progressFill.style.width = `${progress}%`;
}

// Update score display
function updateScore() {
  currentScoreDisplay.textContent = `Score: ${score}/${currentQuestion}`;
}

// Show final results
function showResults() {
  quizContainer.classList.add('hidden');
  resultsContainer.classList.remove('hidden');

  const percentage = Math.round((score / filteredQuestions.length) * 100);
  scoreDisplay.textContent = `${score}/${filteredQuestions.length} (${percentage}%)`;

  progressFill.style.width = '100%';
}

// Restart quiz
restartBtn.addEventListener('click', initApp);

// Start app on page load
initApp();
