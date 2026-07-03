// =========================================================
// PhishGuard — script.js
// Handles: mobile nav toggle + interactive quiz
// =========================================================

/* ---------- Mobile Nav Toggle ---------- */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// Close mobile nav after clicking a link
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

/* ---------- Quiz Data ---------- */
const quizData = [
  {
    question: "1. You receive an email from 'support@paypa1-secure.com' asking you to verify your account immediately. What should you do?",
    options: [
      "Click the link and enter your login details quickly",
      "Check the sender's domain carefully and avoid clicking the link",
      "Reply with your password to confirm your identity",
      "Forward it to friends to warn them"
    ],
    correct: 1,
    feedback: "The domain 'paypa1' uses a number '1' instead of the letter 'l' — a classic lookalike domain trick used in phishing."
  },
  {
    question: "2. Which of the following is the strongest sign of a phishing message?",
    options: [
      "A personalized greeting using your full name",
      "An email from a colleague you recognize",
      "Urgent language demanding immediate action within hours",
      "A message with no links or attachments"
    ],
    correct: 2,
    feedback: "Urgency is one of the most common social engineering tactics — it pressures you to act before you think."
  },
  {
    question: "3. A website has a padlock icon (HTTPS) in the address bar. What does this tell you?",
    options: [
      "The website is 100% safe and legitimate",
      "The connection is encrypted, but the site could still be fake",
      "The site is owned by a verified government body",
      "The site cannot contain malware"
    ],
    correct: 1,
    feedback: "HTTPS only encrypts the connection — scammers can get valid certificates too. Always check the actual domain name."
  },
  {
    question: "4. You get a call from someone claiming to be your bank, asking you to share the OTP you just received to 'cancel a fraudulent transaction'. What should you do?",
    options: [
      "Share the OTP immediately since it's your bank",
      "Hang up and call your bank directly using the number on your card",
      "Text the OTP instead of saying it out loud",
      "Ask them to call back in 10 minutes"
    ],
    correct: 1,
    feedback: "Banks never ask for your OTP over a call. Always verify by contacting your bank directly through official channels."
  },
  {
    question: "5. Which of these is the best way to strengthen your account security against phishing?",
    options: [
      "Use the same strong password across all accounts",
      "Disable email notifications",
      "Enable Two-Factor Authentication (2FA)",
      "Only use public Wi-Fi for banking"
    ],
    correct: 2,
    feedback: "2FA adds an extra layer of protection — even if a password is stolen, attackers still can't log in without the second factor."
  }
];

/* ---------- Render Quiz ---------- */
const quizContainer = document.getElementById('quizContainer');
const quizResult = document.getElementById('quizResult');
const scoreText = document.getElementById('scoreText');
const scoreMsg = document.getElementById('scoreMsg');
const retryBtn = document.getElementById('retryBtn');

let score = 0;
let answered = 0;

function renderQuiz() {
  quizContainer.innerHTML = '';
  score = 0;
  answered = 0;
  quizResult.classList.add('hidden');

  quizData.forEach((q, qIndex) => {
    const qBlock = document.createElement('div');
    qBlock.className = 'quiz-question';

    const qTitle = document.createElement('h4');
    qTitle.textContent = q.question;
    qBlock.appendChild(qTitle);

    const optionsWrap = document.createElement('div');
    optionsWrap.className = 'quiz-options';

    const feedbackEl = document.createElement('div');
    feedbackEl.className = 'quiz-feedback';
    feedbackEl.textContent = q.feedback;

    q.options.forEach((optionText, oIndex) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = optionText;

      btn.addEventListener('click', () => {
        // Disable all options in this question once answered
        const allOptions = optionsWrap.querySelectorAll('.quiz-option');
        allOptions.forEach(o => o.disabled = true);

        if (oIndex === q.correct) {
          btn.classList.add('correct');
          score++;
        } else {
          btn.classList.add('incorrect');
          allOptions[q.correct].classList.add('correct');
        }

        feedbackEl.classList.add('show');
        answered++;

        if (answered === quizData.length) {
          showResults();
        }
      });

      optionsWrap.appendChild(btn);
    });

    qBlock.appendChild(optionsWrap);
    qBlock.appendChild(feedbackEl);
    quizContainer.appendChild(qBlock);
  });
}

function showResults() {
  quizResult.classList.remove('hidden');
  scoreText.textContent = `${score} / ${quizData.length}`;

  let message = '';
  const percent = (score / quizData.length) * 100;

  if (percent === 100) {
    message = "Perfect score! You've got a sharp eye for phishing red flags. 🛡️";
  } else if (percent >= 60) {
    message = "Good job! Review the sections above to sharpen your detection skills further.";
  } else {
    message = "Keep learning! Revisit the sections above — spotting phishing gets easier with practice.";
  }
  scoreMsg.textContent = message;

  quizResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

retryBtn.addEventListener('click', renderQuiz);

// Initialize quiz on page load
renderQuiz();
