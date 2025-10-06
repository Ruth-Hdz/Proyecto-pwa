// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('SW registrado:', reg))
      .catch(err => console.error('SW no registrado:', err));
  });
}

// Splash Screen
window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  const app = document.getElementById('app');

  setTimeout(() => {
    splash.style.display = 'none';
    app.style.display = 'flex';
  }, 1500);
});

// Navegación
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    const target = btn.dataset.target;
    document.getElementById(target).style.display = 'block';
    btn.classList.add('active');
  });
});

// -----------------------
// Mini Quiz Interactivo
// -----------------------
const quizData = [
  { question: "¿Cuál es la capital de Francia?", answers: ["Madrid","París","Berlín","Roma"], correct:1 },
  { question: "¿Cuántos planetas hay en el sistema solar?", answers:["7","8","9","10"], correct:1 },
  { question: "¿Qué lenguaje usamos para construir páginas web?", answers:["Python","HTML/CSS/JS","C++","Java"], correct:1 }
];

let currentQuestion = 0;
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = '';
  resultEl.textContent = '';
  nextBtn.style.display = 'none';
  restartBtn.style.display = 'none';

  q.answers.forEach((ans, idx) => {
    const btn = document.createElement('button');
    btn.textContent = ans;
    btn.addEventListener('click', () => {
      Array.from(answersEl.children).forEach(b => b.disabled = true);
      if(idx === q.correct){ btn.style.backgroundColor = '#4CAF50'; resultEl.textContent = '✅ Correcto!'; }
      else { btn.style.backgroundColor = '#F44336'; resultEl.textContent = `❌ Incorrecto! La respuesta correcta es: ${q.answers[q.correct]}`; }
      nextBtn.style.display = 'inline-block';
    });
    answersEl.appendChild(btn);
  });
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if(currentQuestion >= quizData.length){
    questionEl.textContent = "¡Quiz terminado!";
    answersEl.innerHTML = '';
    resultEl.textContent = '';
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
  } else {
    loadQuestion();
  }
});

restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  loadQuestion();
});
loadQuestion();
