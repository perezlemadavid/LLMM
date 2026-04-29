let questions = [];
let currentIdx = 0;
let score = 0;
let seconds = 0;
let timerInterval;
let language = 'es';

const uiText = {
    es: { title: "Cuestionario de Cultura General", next: "Siguiente", finish: "Finalizar", score: "Tu puntuación" },
    en: { title: "General Knowledge Quiz", next: "Next", finish: "Finish", score: "Your score" }
};

function loadQuestions(lang) {
    language = lang;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `preguntas_${lang}.xml`, true);
    xhr.onload = function() {
        if (this.status === 200) {
            questions = this.responseXML.getElementsByTagName("question");
            resetQuiz();
        } else {
            console.error("Error cargando el XML");
        }
    };
    xhr.send();
}

function resetQuiz() {
    currentIdx = 0;
    score = 0;
    seconds = 0;
    document.getElementById("timer").innerText = `Tiempo: 0s`;
    startTimer();
    renderQuestion();
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds++;
        document.getElementById("timer").innerText = `Tiempo: ${seconds}s`;
    }, 1000);
}

function renderQuestion() {
    const q = questions[currentIdx];
    document.getElementById("ui-title").innerText = uiText[language].title;
    
    let html = `<h3>${currentIdx + 1}. ${q.getElementsByTagName("wording")[0].textContent}</h3>`;
    const choices = q.getElementsByTagName("choice");
    
    for (let i = 0; i < choices.length; i++) {
        html += `
            <div class="option" onclick="this.querySelector('input').click()">
                <input type="radio" name="q" id="opt${i}" value="${choices[i].getAttribute('correct')}">
                <label for="opt${i}">${choices[i].textContent}</label>
            </div>`;
    }
    
    document.getElementById("quiz-content").innerHTML = html;
    document.getElementById("btn-next").style.display = (currentIdx < questions.length - 1) ? "block" : "none";
    document.getElementById("btn-finish").style.display = (currentIdx === questions.length - 1) ? "block" : "none";
}

function handleNext() {
    const selected = document.querySelector('input[name="q"]:checked');
    if (!selected) {
        alert(language === 'es' ? "Por favor, selecciona una respuesta" : "Please select an answer");
        return;
    }
    if (selected.value === "yes") score++;
    currentIdx++;
    renderQuestion();
}

function showFinalScore() {
    const selected = document.querySelector('input[name="q"]:checked');
    if (selected && selected.value === "yes") score++;
    
    clearInterval(timerInterval);
    
    // Cambiamos el contenido principal por los resultados
    const mainArea = document.querySelector(".quiz-app");
    mainArea.innerHTML = `
        <div class="result-card">
            <h2>¡Test Finalizado!</h2>
            <hr>
            <h3>${uiText[language].score}: ${score} / ${questions.length}</h3>
            <p>Tiempo total: ${seconds} segundos</p>
            <br>
            <button onclick="location.reload()" style="background:#3182ce; color:white; padding:10px 20px; border-radius:8px; border:none; cursor:pointer;">
                Intentar de nuevo
            </button>
        </div>
    `;
}

function changeLanguage(lang) {
    loadQuestions(lang);
}

window.onload = () => loadQuestions('es');