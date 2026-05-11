const container = document.getElementById("notesContainer");
const addBtn = document.getElementById("addNoteBtn");

// Load notes
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Color palette (like screenshot)
const colors = [
  "#f28b82", // pink
  "#00ffc3", // orange
  "#fb8dff", // yellow
  "#ccff90", // green
  "#5c92ff", // teal
  "#fff200", // blue
  "#ff00ff"  // purple
];

// Random color
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Save notes
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Add note
function addNote() {
  const note = {
    id: Date.now(),
    content: "",
    color: getRandomColor()
  };

  notes.push(note);
  saveNotes();
  renderNotes();
}

// Delete note
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  renderNotes();
}

// Render notes
function renderNotes() {
  // Clear everything except add button
  container.innerHTML = "";

  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";
    div.style.background = note.color;

    const textarea = document.createElement("textarea");
    textarea.value = note.content;
    textarea.placeholder = "Write your note...";

    textarea.addEventListener("input", (e) => {
      note.content = e.target.value;
      saveNotes();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "✕";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = () => deleteNote(note.id);

    div.appendChild(textarea);
    div.appendChild(deleteBtn);

    container.appendChild(div);
  });

  // Re-add "+" card at end
  container.appendChild(addBtn);
}

// Event
addBtn.addEventListener("click", addNote);

// Initial load
renderNotes();