// SVPG Book Exam System - JavaScript
// This file provides shared functionality for exam pages

let lastResult = null;

function showQuestion() {
    const q = EXAM_DATA.questions[window.currentQuestion];
    const total = EXAM_DATA.questions.length;

    document.getElementById('current-q').textContent = window.currentQuestion + 1;
    document.getElementById('progress').style.width = ((window.currentQuestion) / total * 100) + '%';

    let html = `<div><p style="font-size:1.1rem;margin-bottom:1rem"><strong>Q${window.currentQuestion + 1}:</strong> ${q.text}</p><div class="options">`;

    for (const [letter, text] of Object.entries(q.options)) {
        const checked = window.studentAnswers[window.currentQuestion] === letter ? 'checked' : '';
        html += `<label class="option">
            <input type="radio" name="answer" value="${letter}" ${checked} onchange="selectAnswer('${letter}')">
            <span class="option-letter">${letter}</span>
            <span>${text}</span>
        </label>`;
    }

    html += `</div><div class="nav-buttons">`;

    if (window.currentQuestion > 0) {
        html += `<button class="btn btn-secondary" onclick="prevQuestion()">&larr; Previous</button>`;
    }

    if (window.currentQuestion < total - 1) {
        html += `<button class="btn btn-primary" onclick="nextQuestion()">Next &rarr;</button>`;
    } else {
        html += `<button class="btn btn-primary" onclick="submitExam()">Submit Exam</button>`;
    }

    html += `</div></div>`;
    document.getElementById('question-container').innerHTML = html;
}

function selectAnswer(letter) {
    window.studentAnswers[window.currentQuestion] = letter;
}

function nextQuestion() {
    if (!window.studentAnswers[window.currentQuestion]) {
        alert('Please select an answer.');
        return;
    }
    window.currentQuestion++;
    showQuestion();
}

function prevQuestion() {
    window.currentQuestion--;
    showQuestion();
}

function submitExam() {
    if (!window.studentAnswers[window.currentQuestion]) {
        alert('Please select an answer.');
        return;
    }

    let correct = 0;
    const missed = [];

    for (let i = 0; i < EXAM_DATA.answers.length; i++) {
        if (window.studentAnswers[i] === EXAM_DATA.answers[i]) {
            correct++;
        } else {
            missed.push({
                question: i + 1,
                text: EXAM_DATA.questions[i].text,
                yours: window.studentAnswers[i] || '(none)',
                correct: EXAM_DATA.answers[i]
            });
        }
    }

    const score = Math.round((correct / EXAM_DATA.answers.length) * 100);
    const passed = score >= 70;

    lastResult = {
        submission: {
            exam_id: EXAM_DATA.id,
            student_name: window.studentName,
            responses: window.studentAnswers,
            timestamp: new Date().toISOString()
        },
        grade_result: {
            exam_id: EXAM_DATA.id,
            exam_title: EXAM_DATA.title,
            student_name: window.studentName,
            score_percentage: score,
            passed: passed,
            correct_answers: correct,
            total_questions: EXAM_DATA.answers.length,
            missed_questions: missed
        }
    };

    // Display results
    document.getElementById('result-info').innerHTML = `
        <p><strong>Student:</strong> ${window.studentName}</p>
        <p><strong>Exam:</strong> ${EXAM_DATA.title}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    `;

    const circle = document.getElementById('score-circle');
    circle.textContent = score + '%';
    circle.className = 'score-circle ' + (passed ? 'passed' : 'failed');

    document.getElementById('result-details').innerHTML = `
        <p>Correct: ${correct} / ${EXAM_DATA.answers.length}</p>
        <p><strong>${passed ? '&#10003; PASSED' : 'NOT PASSED'}</strong></p>
    `;

    let missedHtml = '';
    if (missed.length > 0) {
        missedHtml = '<h3>Missed Questions:</h3>';
        missed.forEach(m => {
            missedHtml += `<div class="missed-item">
                <strong>Q${m.question}:</strong> ${m.text}<br>
                <small>Your answer: ${m.yours} | Correct: ${m.correct}</small>
            </div>`;
        });
    }
    document.getElementById('missed-questions').innerHTML = missedHtml;

    // Save to localStorage
    const results = JSON.parse(localStorage.getItem('svpg_exam_results') || '[]');
    results.push(lastResult.grade_result);
    localStorage.setItem('svpg_exam_results', JSON.stringify(results));

    // Show results section
    document.getElementById('exam-container').classList.add('hidden');
    document.getElementById('exam-results').classList.remove('hidden');
}

function downloadResults() {
    if (!lastResult) return;

    const blob = new Blob([JSON.stringify(lastResult, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam_result_${window.studentName.replace(/\s+/g, '_')}_${EXAM_DATA.id}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}
