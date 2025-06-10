import { formatDate } from './utils.mjs';
import { renderMoodSelection } from './mood.mjs';

export function showHistory() {
  console.log("📖 showHistory() called");
  
  const app = document.getElementById('app');
  const entries = JSON.parse(localStorage.getItem('entries')) || [];
  
  console.log("Entries for history:", entries.map(e => ({ mood: e.mood, class: `mood-${e.mood.toLowerCase()}` })));

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
        ${entries.reverse().map(entry => {
          const moodClass = `mood-${entry.mood.toLowerCase()}`;
          console.log("Entry mood class:", moodClass);
          return `
            <li class="entry-item ${moodClass}">
              <strong>${formatDate(entry.date)}</strong> - Mood: <em>${entry.mood}</em><br>
              <p>${entry.text}</p>
            </li>
          `;
        }).join('')}
      </ul>
      <button id="back">Back</button>
    `;
  }

  // Add back button listener with setTimeout for robustness
  setTimeout(() => {
    const backButton = document.getElementById('back');
    if (backButton) {
      backButton.addEventListener('click', renderMoodSelection);
    } else {
      console.warn("Back button not found in DOM.");
    }
  }, 0);
}
