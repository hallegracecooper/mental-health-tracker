import { showJournalEntry } from './journal.mjs';
import { showHistory } from './history.mjs';
import { showDailyQuote } from './quote.mjs';

// Wellness tips array
const wellnessTips = [
  "Take a 10-minute walk outdoors to reset your mood",
  "Practice deep breathing for 5 minutes",
  "Write down three things you're grateful for",
  "Drink a glass of water and stretch",
  "Call or message someone you care about",
  "Listen to your favorite uplifting song",
  "Take a short break from screens",
  "Do one small act of kindness today"
];

// Mood icons mapping
const moodIcons = {
  Happy: "😊",
  Sad: "😢",
  Stressed: "😰",
  Excited: "🤩"
};

function getRandomTip() {
  return wellnessTips[Math.floor(Math.random() * wellnessTips.length)];
}

export function renderMoodSelection() {
  const app = document.getElementById('app');
  const footerContainer = document.getElementById('footer-container');
  const moods = ['Happy', 'Sad', 'Stressed', 'Excited'];

  app.innerHTML = `
    <div class="welcome-section">
      <h2>How are you feeling today?</h2>
      <p class="tagline">Track your emotions, reflect on your journey, and grow with grace.</p>
    </div>

    <div id="quote-container" class="quote-box"></div>
    
    <div class="mood-buttons" role="group" aria-label="Mood selection">
      ${moods.map(mood => `
        <button class="mood-btn mood-${mood.toLowerCase()}" data-mood="${mood}" aria-label="Select mood: ${mood}">
          <span class="mood-icon">${moodIcons[mood]}</span>
          <span class="mood-text">${mood}</span>
        </button>
      `).join('')}
    </div>

    <div class="action-links">
      <a href="#" id="view-history" aria-label="View your past journal entries">View Past Entries</a>
      <span class="divider">|</span>
      <a href="#" id="view-graph" aria-label="View mood frequency graph">View Mood Graph</a>
    </div>

    <section class="info-sections">
      <div class="why-track">
        <h3>Why Track Your Mood?</h3>
        <p>Understanding your emotions is the first step toward better mental health. Regular journaling helps identify patterns, triggers, and personal growth opportunities. Take a moment each day to reflect and grow.</p>
      </div>

      <div class="daily-challenge">
        <h3>Today's Wellness Tip</h3>
        <p>${getRandomTip()}</p>
      </div>
    </section>
  `;

  footerContainer.innerHTML = `
    <footer class="app-footer">
      <p>&copy; ${new Date().getFullYear()} Mental Wellness Tools | Made with 💜 for your well-being</p>
    </footer>
  `;

  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedMood = e.target.closest('.mood-btn').dataset.mood;
      showJournalEntry(selectedMood);
    });
  });

  // History link event listener
  setTimeout(() => {
    const historyLink = document.getElementById('view-history');
    if (historyLink) {
      historyLink.addEventListener('click', (e) => {
        e.preventDefault();
        showHistory();
      });
    } else {
      console.warn("History link not found in DOM.");
    }
  }, 0);

  // Mood Graph link
  setTimeout(() => {
    const graphLink = document.getElementById('view-graph');
    if (graphLink) {
      import('./graph.mjs').then(module => {
        graphLink.addEventListener('click', (e) => {
          e.preventDefault();
          module.renderMoodGraph();
        });
      });
    } else {
      console.warn("Graph link not found in DOM.");
    }
  }, 0);

  showDailyQuote();
}
