import { showJournalEntry } from './journal.mjs';
import { showHistory } from './history.mjs';

export function renderMoodSelection() {
  const app = document.getElementById('app');
  const moods = ['Happy', 'Sad', 'Stressed', 'Excited'];

  app.innerHTML = `
    <h2>How are you feeling today?</h2>
    <div class="mood-buttons">
      ${moods.map(mood => `<button class="mood-btn" data-mood="${mood}">${mood}</button>`).join('')}
    </div>
    <p><a href="#" id="view-history">View Past Entries</a></p>
  `;

  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedMood = e.target.dataset.mood;
      showJournalEntry(selectedMood);
    });
  });

  document.getElementById('view-history').addEventListener('click', (e) => {
    e.preventDefault();
    showHistory();
  });
}
