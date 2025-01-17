 
const questions = [
    {
        question: "Welche Sicherheitsmaßnahme reduziert die Auswirkungen von Phishing-Angriffen auf Unternehmensdaten am besten?",
        options: ["Keine Netzwerkverbindungen zulassen", "Jeden Benutzer und jede Aktion unabhängig von Standort oder Berechtigungen überprüfen", "E-Mail-Kommunikation vollständig deaktivieren", "Sich ausschließlich auf Firewalls und Antivirenprogramme konzentrieren"],
        answer: "Jeden Benutzer und jede Aktion unabhängig von Standort oder Berechtigungen überprüfen"
    },
    {
        question: "Was ist die beste Maßnahme gegen Phishing-Angriffe?",
        options: ["Ein starkes Passwort", "Regelmäßige Mitarbeiterschulungen und Multi-Faktor-Authentifizierung (MFA)", "Eine größere IT-Abteilung", "Die Social-Media-Profile aller Mitarbeiter deaktivieren"],
        answer: "Regelmäßige Mitarbeiterschulungen und Multi-Faktor-Authentifizierung (MFA)"
    },
    {
        question: "Wie können Sie überprüfen, ob eine erhaltene E-Mail echt ist?",
        options: ["Durch Überprüfung der Plausibilität von Absender und Domain", "Öffnen des Anhangs zur Analyse des Inhalts", "Antworten auf die E-Mail und um weitere Informationen bitten", "Weiterleiten der E-Mail an Freunde zur Überprüfung"],
        answer: "Durch Überprüfung der Plausibilität von Absender und Domain"
    },
    {
        question: "Woran können Sie erkennen, dass eine Website möglicherweise eine Phishing-Seite ist?",
        options: ["Die Website verwendet kein HTTPS-Protokoll oder hat ein ungültiges Zertifikat", "Die Website lädt langsam", "Die Website hat ein minimalistisches Design", "Die Website ist schwer in einer Suchmaschine zu finden"],
        answer: "Die Website verwendet kein HTTPS-Protokoll oder hat ein ungültiges Zertifikat"
    },
    {
        question: "Was sollten Sie tun, wenn Sie versehentlich Ihre Zugangsdaten auf einer Phishing-Seite eingegeben haben?",
        options: ["Das Passwort sofort ändern und an die legitime Website melden", "Die E-Mail ignorieren und warten, bis sich der Angreifer meldet", "Den Browser schließen und nichts weiter unternehmen", "Die Zugangsdaten auf anderen Plattformen ändern"],
        answer: "Das Passwort sofort ändern und an die legitime Website melden"
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
