export function initStorage() {
  if (!localStorage.getItem('entries')) {
    localStorage.setItem('entries', JSON.stringify([]));
  }
}

export function saveEntry(entry) {
  const entries = JSON.parse(localStorage.getItem('entries')) || [];
  entries.push(entry);
  localStorage.setItem('entries', JSON.stringify(entries));
}
