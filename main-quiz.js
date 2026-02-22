let userScore = 0;
let answeredQuestions = 0;

function initNafidaQuiz(data) {
    const container = document.getElementById('quiz-container-nafida');
    if (!container) return;

    // إضافة التنسيق CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .quiz-wrapper { direction: rtl; font-family: 'Tajawal', sans-serif; max-width: 100%; margin: 20px auto; }
        .question-card { background: #f9f9f9; border: 1px solid #ececec; padding: 20px; margin-bottom: 20px; border-radius: 12px; }
        .question-text { font-weight: bold; font-size: 1.1rem; color: #333; margin-bottom: 15px; display: block; }
        .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .quiz-btn { padding: 12px; border: 2px solid #3498db; background: #fff; color: #3498db; border-radius: 8px; cursor: pointer; font-weight: 600; transition: 0.3s; }
        .quiz-btn:hover { background: #3498db; color: #fff; }
        .quiz-btn:disabled { opacity: 0.8; cursor: not-allowed; }
        .result-box { display:none; text-align:center; padding:30px; background:#e8f4fd; border-radius:12px; border:2px solid #3498db; margin-top:20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .feedback-msg { margin-top: 10px; padding: 8px; border-radius: 6px; font-weight: bold; font-size: 0.9rem; display: none; }
        @media (max-width: 480px) { .options-grid { grid-template-columns: 1fr; } }
    `;
    document.head.appendChild(style);

    userScore = 0; // إعادة تصفير النتيجة عند التحميل
    answeredQuestions = 0;

    let html = '<div class="quiz-wrapper">';
    data.forEach((item, index) => {
        html += `
            <div class="question-card">
                <span class="question-text">${index + 1}. ${item.q}</span>
                <div class="options-grid">
                    ${item.options.map((opt, i) => `
                        <button class="quiz-btn" onclick="verify(${index}, ${i}, ${item.correct}, this, ${data.length})">${opt}</button>
                    `).join('')}
                </div>
                <div id="feedback-${index}" class="feedback-msg"></div>
            </div>`;
    });
    html += `<div id="quiz-result" class="result-box"></div></div>`;
    container.innerHTML = html;
}

function verify(qIndex, choice, correct, btn, total) {
    const feedback = document.getElementById(`feedback-${qIndex}`);
    const buttons = btn.parentElement.querySelectorAll('button');
    buttons.forEach(b => b.disabled = true);
    feedback.style.display = "block";

    if(choice === correct) {
        userScore++;
        btn.style.background = "#2ecc71"; btn.style.color = "white"; btn.style.borderColor = "#2ecc71";
        feedback.innerHTML = "✅ إجابة صحيحة!";
        feedback.style.color = "#155724"; feedback.style.background = "#d4edda";
    } else {
        btn.style.background = "#e74c3c"; btn.style.color = "white"; btn.style.borderColor = "#e74c3c";
        feedback.innerHTML = "❌ خطأ! الجواب: " + buttons[correct].innerText;
        feedback.style.color = "#721c24"; feedback.style.background = "#f8d7da";
    }

    answeredQuestions++;
    if(answeredQuestions === total) {
        const resBox = document.getElementById('quiz-result');
        resBox.style.display = "block";
        resBox.innerHTML = `
            <h2 style="color:#2c3e50;">النتيجة النهائية</h2>
            <p style="font-size:24px; font-weight:bold; color:#3498db;">لقد حصلت على: ${userScore} من ${total}</p>
            <p style="font-size:18px;">نسبة نجاحك: ${(userScore/total * 100).toFixed(0)}%</p>
            <button onclick="location.reload()" style="padding:12px 25px; background:#3498db; color:#fff; border:none; border-radius:5px; cursor:pointer; font-size:16px; margin-top:15px;">إعادة الاختبار 🔄</button>
        `;
        resBox.scrollIntoView({ behavior: 'smooth' });
    }
}
