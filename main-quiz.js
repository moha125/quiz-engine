function initNafidaQuiz(data) {
    const container = document.getElementById('quiz-container-nafida');
    if (!container) return;

    let html = '<div class="quiz-wrapper" style="direction:rtl; text-align:right; font-family:Arial, sans-serif;">';
    
    data.forEach((item, index) => {
        html += `
            <div class="question-card" style="background:#fff; border:1px solid #eee; padding:15px; margin-bottom:20px; border-radius:10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                <p style="font-weight:bold; font-size:18px; color:#333;">${index + 1}. ${item.q}</p>
                <div class="options-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                    ${item.options.map((opt, i) => `
                        <button onclick="verify(${index}, ${i}, ${item.correct}, this)" 
                                style="padding:10px; border:1px solid #3498db; background:none; border-radius:5px; cursor:pointer; transition:0.3s;">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
                <div id="feedback-${index}" style="margin-top:10px; font-weight:bold;"></div>
            </div>`;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function verify(qIndex, choice, correct, btn) {
    const feedback = document.getElementById(`feedback-${qIndex}`);
    const parent = btn.parentElement;
    const buttons = parent.querySelectorAll('button');

    // تعطيل الأزرار بعد الإجابة
    buttons.forEach(b => b.disabled = true);

    if(choice === correct) {
        btn.style.background = "#2ecc71";
        btn.style.color = "white";
        feedback.innerHTML = "✅ إجابة صحيحة!";
        feedback.style.color = "#27ae60";
    } else {
        btn.style.background = "#e74c3c";
        btn.style.color = "white";
        feedback.innerHTML = "❌ إجابة خاطئة! الجواب الصحيح هو: " + buttons[correct].innerText;
        feedback.style.color = "#c0392b";
    }
} 
