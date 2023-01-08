function marked(markdown) {
  // Convert heading text to `<h1>`, `<h2>`, etc.
  markdown = markdown.replace(/^# (.*)/gm, '<h1>$1</h1>');
  markdown = markdown.replace(/^## (.*)/gm, '<h2>$1</h2>');
  markdown = markdown.replace(/^### (.*)/gm, '<h3>$1</h3>');
  // Convert bold text to `<strong>`
  markdown = markdown.replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>');
  // Convert italic text to `<em>`
  markdown = markdown.replace(/\*(.*)\*/g, '<em>$1</em>');
  // Convert inline code to `<code>`
  markdown = markdown.replace(/`(.*)`/g, '<code>$1</code>');
  // Convert blockquotes to `<blockquote>`
  markdown = markdown.replace(/^> (.*)/gm, '<blockquote>$1</blockquote>');
  // Convert unordered list items to `<li>`
  markdown = markdown.replace(/^- (.*)/gm, '<li>$1</li>');
  // Add other conversions as needed

  return markdown;
}

const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) {
  notes.forEach(note => {
    addNewNote(note);
  })
}

addBtn.addEventListener('click', () => {
  addNewNote();
});

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
  <div class="notes">
    <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i>
      </button>
    </div>

    <div class="main ${text ? "hidden" : ""}"></div>
    <textarea class="${text ? "" : "hidden"}"></textarea>
  </div>`;


const editBtn = note.querySelector('.edit');
const deleteBtn = note.querySelector('.delete');

const main = note.querySelector('.main');
const textArea = note.querySelector('textarea');

textArea.value = text;

editBtn.addEventListener("click", () => {
  main.classList.toggle("hidden");
  textArea.classList.toggle("hidden");
});

deleteBtn.addEventListener("click", () => {
  note.remove();

  updateLS();
})



textArea.addEventListener("input", (e) => {
  const { value } = e.target;

  main.innerHTML = marked(value);

  updateLS();
});

  document.body.appendChild(note);
}


function updateLS() {
  const notesText = document.querySelectorAll('textarea');

  const notes = [];

  notesText.forEach(note => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
