// Mock question data
const questionData = {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    correct: "Paris"
};

let timer = 30;
const timeLeftEl = document.getElementById("time-left");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submit-btn");
let selectedOption = null;

// Shuffle options
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Load question and options
function loadQuestion() {
    questionEl.textContent = questionData.question;
    const shuffledOptions = shuffleArray([...questionData.options]);
    optionsEl.innerHTML = "";

    shuffledOptions.forEach(option => {
        const li = document.createElement("li");
        li.innerHTML = `<label><input type="radio" name="option" value="${option}"> ${option}</label>`;
        optionsEl.appendChild(li);
    });

    // Listen for option selection
    optionsEl.addEventListener("change", (e) => {
        selectedOption = e.target.value;
        submitBtn.disabled = false;
    });
}

// Timer logic
function startTimer() {
    const timerInterval = setInterval(() => {
        timer--;
        timeLeftEl.textContent = timer;

        if (timer <= 0) {
            clearInterval(timerInterval);
            submitAnswer();
        }
    }, 1000);
}

// Submit answer
function submitAnswer() {
    if (!selectedOption) return;

    const result = {
        question: questionData.question,
        selected: selectedOption,
        correct: questionData.correct,
        isCorrect: selectedOption === questionData.correct,
        timeTaken: 30 - timer
    };

    saveResultToCSV(result);
    alert(`Your answer: ${result.selected}\nCorrect answer: ${result.correct}`);
    location.reload(); // Reload the quiz
}

// Save result to CSV
function saveResultToCSV(result) {
    const csvContent = `data:text/csv;charset=utf-8,Question,Selected Answer,Correct Answer,Is Correct,Time Taken\n` +
        `${result.question},${result.selected},${result.correct},${result.isCorrect},${result.timeTaken}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "quiz_result.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize the quiz
loadQuestion();
startTimer();
submitBtn.addEventListener("click", submitAnswer);
