let currentStep = 0;
let userScore = 0;
let quizQuestions = [];

function initNafidaQuiz(data) {
    quizQuestions = data;
    const container = document.getElementById('quiz-container-nafida');
    if (!container) return;

    const style = document.createElement('style');
    style.innerHTML = `
        .quiz-wrapper { direction: rtl; font-family: 'Tajawal', sans-serif; max-width: 100%; margin: 20px auto; min-height: 300px; }
        .question-card { background: #fff; border: 2px solid #3498db; padding: 25px; border-radius: 15px; display: none; box-shadow: 0 10px 20px rgba(0,0,0,0.05); animation: fadeIn 0.5s; }
        .question-card.active { display: block; }
        .question-text { font-weight: bold; font-size: 1.2rem; color: #2c3e50; margin-bottom: 20px; display: block; }
        .options-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
        .quiz-btn { padding: 15px; border: 1px solid #ddd; background: #f8f9fa; border-radius: 10px; cursor: pointer; font-weight: 600; text-align: right; transition: 0.3s; }
        .quiz-btn:hover:not(:disabled) { background: #eef7ff; border-color: #3498db; }
        .quiz-btn.correct { background: #2ecc71 !important; color: white; border-color: #2ecc71; }
        .quiz-btn.wrong { background: #e74c3c !important; color: white; border-color: #e74c3c; }
        .next-btn { margin-top: 20px; padding: 12px 30px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; display: none; font-weight: bold; width: 100%; }
        .result-box { display:none; text-align:center; padding:40px; background:#fff; border-radius:15px; border:3px dashed #3498db; }
        .progress-bar { height: 8px; background: #eee; border-radius: 10px; margin-bottom: 20px; overflow: hidden; }
        .progress-fill { height: 100%; background: #3498db; width: 0%; transition: 0.5s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);

    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById('quiz-container-nafida');
    let html = `<div class="quiz-wrapper">
        <div class="progress-bar"><div class="progress-fill" id="progressFill"></div></div>`;
    
    quizQuestions.forEach((item, index) => {
        html += `
            <div class="question-card" id="step-${index}">
                <span class="question-text">السؤال ${index + 1} من ${quizQuestions.length}: ${item.q}</span>
                <div class="options-grid">
                    ${item.options.map((opt, i) => `
                        <button class="quiz-btn" onclick="checkChoice(${index}, ${i}, ${item.correct}, this)">${opt}</button>
                    `).join('')}
                </div>
                <button class="next-btn" id="next-${index}" onclick="nextStep()">السؤال التالي ←</button>
            </div>`;
    });

    html += `<div id="quiz-result" class="result-box"></div></div>`;
    container.innerHTML = html;
    showStep(0);
}

function showStep(step) {
    document.querySelectorAll('.question-card').forEach(card => card.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
    document.getElementById('progressFill').style.width = `${((step) / quizQuestions.length) * 100}%`;
}

function checkChoice(qIndex, choice, correct, btn) {
    const buttons = btn.parentElement.querySelectorAll('.quiz-btn');
    buttons.forEach(b => b.disabled = true);

    if (choice === correct) {
        userScore++;
        btn.classList.add('correct');
    } else {
        btn.classList.add('wrong');
        buttons[correct].classList.add('correct');
    }

    const nextBtn = document.getElementById(`next-${qIndex}`);
    if (qIndex === quizQuestions.length - 1) {
        nextBtn.innerHTML = "إظهار النتيجة النهائية 📊";
    }
    nextBtn.style.display = "block";
}

function nextStep() {
    currentStep++;
    if (currentStep < quizQuestions.length) {
        showStep(currentStep);
    } else {
        showResult();
    }
}

function showResult() {
    document.querySelectorAll('.question-card').forEach(card => card.style.display = 'none');
    document.getElementById('progressFill').style.width = '100%';
    const resBox = document.getElementById('quiz-result');
    resBox.style.display = "block";
    
    let message = userScore >= quizQuestions.length / 2 ? "عمل رائع! 🎉" : "حاول مرة أخرى! 📚";
    
    resBox.innerHTML = `
        <h2 style="color:#2c3e50;">${message}</h2>
        <div style="font-size:50px; margin:20px 0;">🎯 ${userScore} / ${quizQuestions.length}</div>
        <p style="font-size:18px;">لقد أجبت بشكل صحيح على ${(userScore/quizQuestions.length*100).toFixed(0)}% من الأسئلة.</p>
        <button onclick="location.reload()" style="padding:15px 30px; background:#3498db; color:#fff; border:none; border-radius:10px; cursor:pointer; font-size:18px; margin-top:20px; font-family:'Tajawal'">إعادة الاختبار 🔄</button>
    `;
}
