import { saveEntry } from './storage.mjs';
import { handleMediaContent } from './media.mjs';
import { renderMoodSelection } from './mood.mjs';

console.log("✅ journal.mjs loaded and imported handleMediaContent");

export function showJournalEntry(mood) {
  // Normalize mood casing
  const normalizedMood = mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
  
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Write About Your Day</h2>
    <p>Mood: <strong>${normalizedMood}</strong></p>
    <div class="journal-form">
      <label for="journal-text">Journal Entry:</label>
      <textarea 
        id="journal-text" 
        name="journal-text" 
        rows="6" 
        placeholder="Write here..."
        aria-label="Journal entry text"
      ></textarea>
    </div>
    <br>
    <button id="save-entry">Save Entry</button>
  `;

  // Add mood-based media content
  const mediaSuggestion = handleMediaContent(normalizedMood);
  if (mediaSuggestion) {
    app.appendChild(mediaSuggestion);
  }

  document.getElementById('save-entry').addEventListener('click', () => {
    const text = document.getElementById('journal-text').value.trim();
    if (!text) {
      alert("Please enter some journal text.");
      return;
    }

    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: normalizedMood, // Use normalized mood when saving
      text
    };

    saveEntry(entry);
    alert("Your entry has been saved!");
    renderMoodSelection();
  });
}
