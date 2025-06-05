import { formatDate } from './utils.mjs';
import { renderMoodSelection } from './mood.mjs';

export function showHistory() {
  const app = document.getElementById('app');
  const entries = JSON.parse(localStorage.getItem('entries')) || [];

  if (entries.length === 0) {
    app.innerHTML = `
      <h2>Past Entries</h2>
      <p>No entries found.</p>
      <button id="back">Back</button>
    `;
  } else {
    app.innerHTML = `
      <h2>Past Entries</h2>
      <ul class="entry-list">
        ${entries.reverse().map(entry => `
          <li class="entry-item">
            <strong>${formatDate(entry.date)}</strong> - Mood: <em>${entry.mood}</em><br>
            <p>${entry.text}</p>
          </li>
        `).join('')}
      </ul>
      <button id="back">Back</button>
    `;
  }

  document.getElementById('back').addEventListener('click', renderMoodSelection);
}
