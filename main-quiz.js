function initNafidaQuiz(data) {
    const container = document.getElementById('quiz-container-nafida');
    if (!container) return;

    // إضافة التنسيق (CSS) مباشرة من الملف لضمان الجمالية في قالب SeoPlus
    const style = document.createElement('style');
    style.innerHTML = `
        .quiz-wrapper { direction: rtl; font-family: 'Tajawal', sans-serif; max-width: 100%; margin: 20px auto; }
        .question-card { background: #f9f9f9; border: 1px solid #ececec; padding: 20px; margin-bottom: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        .question-text { font-weight: bold; font-size: 1.1rem; color: #333; margin-bottom: 15px; display: block; }
        .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .quiz-btn { padding: 12px; border: 2px solid #3498db; background: #fff; color: #3498db; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; font-size: 0.95rem; }
        .quiz-btn:hover { background: #3498db; color: #fff; }
        .quiz-btn:disabled { cursor: not-allowed; opacity: 0.8; }
        .feedback-msg { margin-top: 12px; padding: 10px; border-radius: 6px; font-weight: bold; font-size: 0.9rem; display: none; }
        @media (max-width: 480px) { .options-grid { grid-template-columns: 1fr; } }
    `;
    document.head.appendChild(style);

    let html = '<div class="quiz-wrapper">';
    data.forEach((item, index) => {
        html += `
            <div class="question-card">
                <span class="question-text">${index + 1}. ${item.q}</span>
                <div class="options-grid">
                    ${item.options.map((opt, i) => `
                        <button class="quiz-btn" onclick="verify(${index}, ${i}, ${item.correct}, this)">${opt}</button>
                    `).join('')}
                </div>
                <div id="feedback-${index}" class="feedback-msg"></div>
            </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

function verify(qIndex, choice, correct, btn) {
    const feedback = document.getElementById(`feedback-${qIndex}`);
    const parent = btn.parentElement;
    const buttons = parent.querySelectorAll('button');

    buttons.forEach(b => b.disabled = true);
    feedback.style.display = "block";

    if(choice === correct) {
        btn.style.background = "#2ecc71";
        btn.style.borderColor = "#2ecc71";
        btn.style.color = "white";
        feedback.innerHTML = "✅ إجابة صحيحة! أحسنت.";
        feedback.style.color = "#155724";
        feedback.style.background = "#d4edda";
    } else {
        btn.style.background = "#e74c3c";
        btn.style.borderColor = "#e74c3c";
        btn.style.color = "white";
        feedback.innerHTML = "❌ إجابة خاطئة! الجواب الصحيح: " + buttons[correct].innerText;
        feedback.style.color = "#721c24";
        feedback.style.background = "#f8d7da";
    }
}
