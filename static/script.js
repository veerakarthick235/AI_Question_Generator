let generatedQuestions = [];

async function generateQuestions() {
  const topic = document.getElementById("topic").value.trim();
  const num = document.getElementById("num").value.trim();
  const loader = document.getElementById("loader");
  const quizForm = document.getElementById("quizForm");
  const resultDiv = document.getElementById("result");
  const questionsDiv = document.getElementById("questions");

  if (!topic || !num) {
    showNotification("Please enter a topic and number of questions.", "error");
    return;
  }

  // Add visual feedback
  animateButton(event.target);
  
  loader.style.display = "block";
  quizForm.style.display = "none";
  resultDiv.innerHTML = "";

  try {
    const response = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, num_questions: parseInt(num) }),
    });

    const data = await response.json();
    loader.style.display = "none";

    if (data.error) {
      resultDiv.innerHTML = `<p class="error">⚠️ Error: ${data.error}</p>`;
      return;
    }

    generatedQuestions = data.questions;
    renderQuestions(generatedQuestions);
  } catch (error) {
    loader.style.display = "none";
    resultDiv.innerHTML = `<p class="error">⚠️ ${error.message}</p>`;
  }
}

function renderQuestions(questions) {
  const quizForm = document.getElementById("quizForm");
  const questionsDiv = document.getElementById("questions");

  questionsDiv.innerHTML = "";
  questions.forEach((q, index) => {
    let optionsHTML = q.options.map((opt, i) => {
      const optionId = `q${index}_opt${i}`;
      return `
        <label class="option">
          <input type="radio" name="question${index}" value="${opt.charAt(0)}" id="${optionId}">
          <span>${opt}</span>
        </label>
      `;
    }).join("");

    const questionCard = document.createElement('div');
    questionCard.className = 'question-card';
    questionCard.style.animationDelay = `${index * 0.1}s`;
    questionCard.innerHTML = `
      <h3>Q${index + 1}. ${q.question}</h3>
      ${optionsHTML}
    `;
    
    questionsDiv.appendChild(questionCard);
  });

  quizForm.style.display = "block";
  
  // Add hover effects to options
  document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(5px)';
    });
    option.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
    });
  });
}

function submitAnswers() {
  const resultDiv = document.getElementById("result");
  let score = 0;
  let total = generatedQuestions.length;
  let resultHTML = "<h2>🎯 RESULTS</h2>";

  generatedQuestions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="question${index}"]:checked`);
    const userAnswer = selected ? selected.value : "None";

    if (userAnswer === q.answer) {
      score++;
      resultHTML += `<p>Q${index + 1}: ✅ <span style="color: #00ff88;">CORRECT</span> (Answer: ${q.answer})</p>`;
    } else {
      resultHTML += `<p>Q${index + 1}: ❌ <span style="color: #ff4444;">INCORRECT</span> (Your answer: ${userAnswer}, Correct: ${q.answer})</p>`;
    }
  });

  const percentage = Math.round((score / total) * 100);
  let emoji = percentage >= 80 ? "🏆" : percentage >= 60 ? "🎖️" : percentage >= 40 ? "📈" : "💪";
  
  resultHTML += `<h3>${emoji} FINAL SCORE: ${score}/${total} (${percentage}%)</h3>`;
  
  resultDiv.innerHTML = resultHTML;
  resultDiv.scrollIntoView({ behavior: 'smooth' });
  
  // Add celebration animation for high scores
  if (percentage >= 80) {
    celebrateSuccess();
  }
}

function animateButton(button) {
  if (!button) return;
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 200);
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'error' ? 'rgba(255, 68, 68, 0.9)' : 'rgba(0, 255, 136, 0.9)'};
    color: white;
    border-radius: 10px;
    font-family: 'Orbitron', monospace;
    z-index: 1000;
    animation: slideInRight 0.5s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.5s ease';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

function celebrateSuccess() {
  const celebration = document.createElement('div');
  celebration.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 100px;
    z-index: 1000;
    animation: celebrate 1s ease;
  `;
  celebration.textContent = '🎉';
  document.body.appendChild(celebration);
  
  setTimeout(() => celebration.remove(), 1000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  @keyframes celebrate {
    0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); }
    50% { transform: translate(-50%, -50%) scale(1.5) rotate(180deg); }
    100% { transform: translate(-50%, -50%) scale(0) rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Initialize particle effects
document.addEventListener('DOMContentLoaded', function() {
  // Add click sound effect simulation (visual feedback)
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 100);
    });
  });
});