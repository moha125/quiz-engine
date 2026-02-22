let currentStep = 0;
let userScore = 0;
let quizQuestions = [];

function initNafidaQuiz(data) {
    quizQuestions = data;
    const container = document.getElementById('quiz-container-nafida');
    if (!container) return;

    const style = document.createElement('style');
    style.innerHTML = `
        .quiz-wrapper { direction: rtl; font-family: 'Tajawal', sans-serif; max-width: 100%; margin: 20px auto; }
        .question-card { background: #fff; border: 2px solid #3498db; padding: 25px; border-radius: 15px; display: none; box-shadow: 0 10px 20px rgba(0,0,0,0.05); animation: fadeIn 0.4s; }
        .question-card.active { display: block; }
        .q-header { display: flex; justify-content: space-between; margin-bottom: 15px; color: #7f8c8d; font-weight: bold; font-size: 0.9rem; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        .question-text { font-weight: bold; font-size: 1.2rem; color: #2c3e50; margin-bottom: 20px; display: block; line-height: 1.6; }
        .options-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .quiz-btn { padding: 15px; border: 2px solid #edf2f7; background: #f8f9fa; border-radius: 12px; cursor: pointer; font-weight: 600; text-align: right; transition: 0.2s; font-family: 'Tajawal'; }
        .quiz-btn:hover:not(:disabled) { border-color: #3498db; background: #eef7ff; }
        .quiz-btn.correct { background: #2ecc71 !important; color: white; border-color: #2ecc71; }
        .quiz-btn.wrong { background: #e74c3c !important; color: white; border-color: #e74c3c; }
        .next-btn { margin-top: 25px; padding: 15px; background: #3498db; color: white; border: none; border-radius: 10px; cursor: pointer; display: none; width: 100%; font-weight: bold; font-size: 1.1rem; }
        .result-box { display:none; text-align:center; padding:40px; background:#fff; border-radius:20px; border:3px solid #3498db; box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
        .grade-text { font-size: 1.5rem; font-weight: bold; margin: 15px 0; color: #2c3e50; }
        .progress-bar { height: 10px; background: #edf2f7; border-radius: 10px; margin-bottom: 25px; overflow: hidden; }
        .progress-fill { height: 100%; background: #3498db; width: 0%; transition: 0.4s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById('quiz-container-nafida');
    let html = `<div class="quiz-wrapper"><div class="progress-bar"><div class="progress-fill" id="progressFill"></div></div>`;
    quizQuestions.forEach((item, index) => {
        html += `
            <div class="question-card" id="step-${index}">
                <div class="q-header"><span>السؤال ${index + 1} من ${quizQuestions.length}</span> <span>منهاج الإمارات 2026</span></div>
                <span class="question-text">${item.q}</span>
                <div class="options-grid">
                    ${item.options.map((opt, i) => `<button class="quiz-btn" onclick="checkChoice(${index}, ${i}, ${item.correct}, this)">${opt}</button>`).join('')}
                </div>
                <button class="next-btn" id="next-${index}" onclick="nextStep()">${index === quizQuestions.length - 1 ? 'عرض النتيجة النهائية 🎓' : 'السؤال التالي ←'}</button>
            </div>`;
    });
    html += `<div id="quiz-result" class="result-box"></div></div>`;
    container.innerHTML = html;
    showStep(0);
}

function showStep(step) {
    document.querySelectorAll('.question-card').forEach(c => c.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
    document.getElementById('progressFill').style.width = `${((step) / quizQuestions.length) * 100}%`;
}

function checkChoice(qIndex, choice, correct, btn) {
    const buttons = btn.parentElement.querySelectorAll('.quiz-btn');
    buttons.forEach(b => b.disabled = true);
    if (choice === correct) { userScore++; btn.classList.add('correct'); } 
    else { btn.classList.add('wrong'); buttons[correct].classList.add('correct'); }
    document.getElementById(`next-${qIndex}`).style.display = "block";
}

function nextStep() {
    currentStep++;
    if (currentStep < quizQuestions.length) { showStep(currentStep); } 
    else { showResult(); }
}

function getGrade(score, total) {
    const pct = (score / total) * 100;
    if (pct >= 90) return "ممتاز - مستوى متميز (A)";
    if (pct >= 80) return "جيد جداً - مستوى متقدم (B)";
    if (pct >= 70) return "جيد - مستوى مرضٍ (C)";
    if (pct >= 60) return "مقبول - يحتاج تطوير (D)";
    return "راسب - حاول مرة أخرى (F)";
}

function showResult() {
    document.querySelectorAll('.question-card').forEach(c => c.style.display = 'none');
    document.getElementById('progressFill').style.width = '100%';
    const resBox = document.getElementById('quiz-result');
    const grade = getGrade(userScore, quizQuestions.length);
    resBox.style.display = "block";
    resBox.innerHTML = `
        <h2 style="color:#3498db;">تم الانتهاء من الاختبار!</h2>
        <div class="grade-text">${grade}</div>
        <div style="font-size:40px; margin:15px 0;">🎯 ${userScore} / ${quizQuestions.length}</div>
        <p>نسبة الإنجاز: ${(userScore/quizQuestions.length*100).toFixed(0)}%</p>
        <button onclick="location.reload()" style="padding:15px 30px; background:#3498db; color:#fff; border:none; border-radius:10px; cursor:pointer; font-size:1.1rem; margin-top:20px; font-family:'Tajawal'">إعادة المحاولة 🔄</button>
    `;
}
