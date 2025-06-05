import { saveEntry } from './storage.mjs';

export function showJournalEntry(mood) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Write About Your Day</h2>
    <p>Mood: <strong>${mood}</strong></p>
    <textarea id="journal-text" rows="6" placeholder="Write here..."></textarea>
    <br>
    <button id="save-entry">Save Entry</button>
  `;

  document.getElementById('save-entry').addEventListener('click', () => {
    const text = document.getElementById('journal-text').value.trim();
    if (!text) {
      alert("Please enter some journal text.");
      return;
    }

    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood,
      text
    };

    saveEntry(entry);
    alert("Your entry has been saved!");
    location.reload(); // Go back to mood selection
  });
}
