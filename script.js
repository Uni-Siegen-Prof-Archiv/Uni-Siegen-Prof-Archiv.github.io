const questions = [
    {
        question: "Was ist das sicherste Passwort?",
        options: ["123456", "Passwort", "Qw3rty!@#", "abc123"],
        answer: "Qw3rty!@#"
    },
    {
        question: "Was sollte man tun, wenn eine Phishing-E-Mail empfangen wird?",
        options: ["Antworten und nachfragen", "Anhänge öffnen", "Ignorieren und löschen", "An Kollegen weiterleiten"],
        answer: "Ignorieren und löschen"
    },
    {
        question: "Was ist ein sicheres Verhalten im öffentlichen WLAN?",
        options: ["Online-Banking durchführen", "Verbindung ohne VPN vermeiden", "Persönliche Daten eingeben", "Dateien hochladen"],
        answer: "Verbindung ohne VPN vermeiden"
    },
    {
        question: "Was ist ein Hinweis auf eine gefälschte Website?",
        options: ["HTTPS in der URL", "Rechtschreibfehler und schlechtes Design", "Professionelles Aussehen", "Viele Bilder"],
        answer: "Rechtschreibfehler und schlechtes Design"
    },
    {
        question: "Wie oft sollte man seine Software aktualisieren?",
        options: ["Nur wenn es Probleme gibt", "Nie", "Regelmäßig, sobald Updates verfügbar sind", "Einmal im Jahr"],
        answer: "Regelmäßig, sobald Updates verfügbar sind"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("answers");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const resultList = document.getElementById("results-list");

startButton.addEventListener("click", startGame);

function startGame() {
    startButton.parentElement.classList.add("hidden"); 
    questionContainer.classList.remove("hidden"); 
    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => selectAnswer(option, button));
        optionsElement.appendChild(button);
    });
    nextButton.classList.add("hidden"); 
}

function selectAnswer(selectedOption, button) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = optionsElement.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);

    if (selectedOption === currentQuestion.answer) {
        score++;
        button.style.backgroundColor = "green";
    } else {
        button.style.backgroundColor = "red";
    }

    nextButton.classList.remove("hidden"); 
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    questionContainer.classList.add("hidden"); 
    resultContainer.classList.remove("hidden");

    questions.forEach((q, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${q.question} - Richtige Antwort: ${q.answer}`;
        resultList.appendChild(li);
    });

    const scoreItem = document.createElement("li");
    scoreItem.textContent = `Gesamtpunktzahl: ${score} von ${questions.length}`;
    resultList.appendChild(scoreItem);
}
