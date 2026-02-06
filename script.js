// Family vocabulary array with English words, Russian translations, examples and explanations
const vocabulary = [
    {
        english: "mother",
        russian: "мама",
        example: "My mother is a teacher.",
        explanation: "Mother — это мама, самый близкий родственник женского пола."
    },
    {
        english: "father",
        russian: "папа",
        example: "My father works in an office.",
        explanation: "Father — это папа, родитель мужского пола."
    },
    {
        english: "parents",
        russian: "родители",
        example: "My parents live in Moscow.",
        explanation: "Parents — это оба родителя, мама и папа вместе."
    },
    {
        english: "sister",
        russian: "сестра",
        example: "I have one younger sister.",
        explanation: "Sister — это сестра, дочь тех же родителей."
    },
    {
        english: "brother",
        russian: "брат",
        example: "My brother plays football.",
        explanation: "Brother — это брат, сын тех же родителей."
    },
    {
        english: "siblings",
        russian: "братья и сёстры",
        example: "I have three siblings.",
        explanation: "Siblings — это братья и сёстры, общий термин."
    },
    {
        english: "son",
        russian: "сын",
        example: "Their son is five years old.",
        explanation: "Son — это сын, ребёнок мужского пола."
    },
    {
        english: "daughter",
        russian: "дочь",
        example: "My daughter goes to school.",
        explanation: "Daughter — это дочь, ребёнок женского пола."
    },
    {
        english: "children",
        russian: "дети",
        example: "They have two children.",
        explanation: "Children — это дети (сыновья и дочери)."
    },
    {
        english: "husband",
        russian: "муж",
        example: "Her husband is a doctor.",
        explanation: "Husband — это муж, супруг мужского пола."
    },
    {
        english: "wife",
        russian: "жена",
        example: "His wife is from France.",
        explanation: "Wife — это жена, супруга женского пола."
    },
    {
        english: "grandparents",
        russian: "бабушка и дедушка",
        example: "My grandparents live in the countryside.",
        explanation: "Grandparents — это бабушка и дедушка вместе."
    },
    {
        english: "grandmother",
        russian: "бабушка",
        example: "My grandmother bakes delicious pies.",
        explanation: "Grandmother — это бабушка, мама одного из родителей."
    },
    {
        english: "grandfather",
        russian: "дедушка",
        example: "My grandfather tells interesting stories.",
        explanation: "Grandfather — это дедушка, папа одного из родителей."
    },
    {
        english: "aunt",
        russian: "тётя",
        example: "My aunt is my mother's sister.",
        explanation: "Aunt — это тётя, сестра одного из родителей."
    },
    {
        english: "uncle",
        russian: "дядя",
        example: "My uncle works as an engineer.",
        explanation: "Uncle — это дядя, брат одного из родителей."
    },
    {
        english: "cousin",
        russian: "двоюродный брат / сестра",
        example: "My cousin lives in London.",
        explanation: "Cousin — это и двоюродный брат, и двоюродная сестра."
    }
];

// Game state variables
let currentWordIndex = 0;
let score = 0;
let gameStarted = false;
let currentOptions = [];

// DOM elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const englishWordEl = document.getElementById('english-word');
const exampleSentenceEl = document.getElementById('example-sentence');
const optionsContainer = document.getElementById('options-container');
const feedbackSection = document.getElementById('feedback-section');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackExplanation = document.getElementById('feedback-explanation');
const nextBtn = document.getElementById('next-btn');
const progressEl = document.getElementById('progress');
const progressFill = document.getElementById('progress-fill');
const scoreEl = document.getElementById('score');
const finalScoreEl = document.getElementById('final-score');
const resultMessageEl = document.getElementById('result-message');

// Initialize the game
function initGame() {
    // Reset game state
    currentWordIndex = 0;
    score = 0;
    gameStarted = true;
    
    // Update UI
    scoreEl.textContent = score;
    updateProgress();
    
    // Show first word
    showWord();
    
    // Switch to game screen
    startScreen.classList.remove('active');
    resultsScreen.classList.remove('active');
    gameScreen.classList.add('active');
}

// Display current word with options
function showWord() {
    const currentWord = vocabulary[currentWordIndex];
    
    // Update English word and example
    englishWordEl.textContent = currentWord.english;
    exampleSentenceEl.textContent = currentWord.example;
    
    // Hide feedback section
    feedbackSection.classList.add('hidden');
    
    // Generate options (correct answer + 2 random wrong answers)
    generateOptions(currentWord);
    
    // Update progress
    updateProgress();
}

// Generate 3 options for the current word
function generateOptions(currentWord) {
    // Clear previous options
    optionsContainer.innerHTML = '';
    currentOptions = [];
    
    // Add correct answer
    currentOptions.push(currentWord.russian);
    
    // Add 2 random wrong answers from other words
    while (currentOptions.length < 3) {
        const randomIndex = Math.floor(Math.random() * vocabulary.length);
        const randomRussian = vocabulary[randomIndex].russian;
        
        // Make sure it's not the correct answer and not already in options
        if (randomRussian !== currentWord.russian && !currentOptions.includes(randomRussian)) {
            currentOptions.push(randomRussian);
        }
    }
    
    // Shuffle options
    shuffleArray(currentOptions);
    
    // Create buttons for each option
    currentOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, currentWord.russian));
        optionsContainer.appendChild(button);
    });
}

// Check if the selected answer is correct
function checkAnswer(selectedAnswer, correctAnswer) {
    // Disable all option buttons
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => {
        btn.disabled = true;
        
        // Mark correct and wrong answers
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        } else if (btn.textContent === selectedAnswer && selectedAnswer !== correctAnswer) {
            btn.classList.add('wrong');
        }
    });
    
    // Get current word for explanation
    const currentWord = vocabulary[currentWordIndex];
    
    // Check if answer is correct
    if (selectedAnswer === correctAnswer) {
        score++;
        scoreEl.textContent = score;
        
        // Show positive feedback
        feedbackIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        feedbackIcon.className = 'feedback-icon correct';
        feedbackTitle.textContent = 'Правильно!';
        feedbackTitle.style.color = '#28a745';
    } else {
        // Show negative feedback
        feedbackIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
        feedbackIcon.className = 'feedback-icon wrong';
        feedbackTitle.textContent = 'Не совсем...';
        feedbackTitle.style.color = '#dc3545';
    }
    
    // Show explanation
    feedbackExplanation.textContent = currentWord.explanation;
    
    // Show feedback section
    feedbackSection.classList.remove('hidden');
}

// Move to the next word or finish the game
function nextWord() {
    currentWordIndex++;
    
    if (currentWordIndex < vocabulary.length) {
        showWord();
    } else {
        finishGame();
    }
}

// Update progress bar and counter
function updateProgress() {
    const progress = ((currentWordIndex + 1) / vocabulary.length) * 100;
    progressEl.textContent = `${currentWordIndex + 1}/${vocabulary.length}`;
    progressFill.style.width = `${progress}%`;
}

// Finish the game and show results
function finishGame() {
    // Calculate final score
    const percentage = Math.round((score / vocabulary.length) * 100);
    
    // Update final score
    finalScoreEl.textContent = `${score}/${vocabulary.length}`;
    
    // Set result message based on score
    let message = '';
    if (percentage === 100) {
        message = 'Идеально! Ты отлично знаешь семейную лексику! 🎉';
    } else if (percentage >= 80) {
        message = 'Отлично! Ты хорошо знаешь семейную лексику! 👍';
    } else if (percentage >= 60) {
        message = 'Хорошо! Ты знаешь основные семейные слова! 👏';
    } else if (percentage >= 40) {
        message = 'Неплохо! Есть что повторить, но ты на верном пути! 💪';
    } else {
        message = 'Есть над чем поработать! Повтори слова и попробуй снова! 📚';
    }
    
    resultMessageEl.textContent = message;
    
    // Switch to results screen
    gameScreen.classList.remove('active');
    resultsScreen.classList.add('active');
}

// Utility function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Event listeners
startBtn.addEventListener('click', initGame);
restartBtn.addEventListener('click', initGame);
nextBtn.addEventListener('click', nextWord);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Start screen is already active
    console.log('Family Members game loaded. Vocabulary size:', vocabulary.length);
});
