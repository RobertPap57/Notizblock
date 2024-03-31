let titles = [];
let notes = [];
let deletedTitles = [];
let deletedNotes = []
load();
loadDeletedNotes();


function save() {
    let titlesAsText = JSON.stringify(titles);
    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('titles', titlesAsText);
    localStorage.setItem('notes', notesAsText);
}

function saveDeletedNotes() {
    let deletedTitlesAsText = JSON.stringify(deletedTitles);
    let deletedNotesAsText = JSON.stringify(deletedNotes);
    localStorage.setItem('deletedTitles', deletedTitlesAsText);
    localStorage.setItem('deletedNotes', deletedNotesAsText);
}

function load() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');
    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }
}

function loadDeletedNotes() {
    let deletedTitlesAsText = localStorage.getItem('deletedTitles');
    let deletedNotesAsText = localStorage.getItem('deletedNotes');
    if (deletedTitlesAsText && deletedNotesAsText) {
        deletedTitles = JSON.parse(deletedTitlesAsText);
        deletedNotes = JSON.parse(deletedNotesAsText);
    }
}

function deleteNote(i) {
    deletedTitles.push(titles[i]);
    deletedNotes.push(notes[i]);
    titles.splice(i, 1);
    notes.splice(i, 1);
    render();
    save();
    saveDeletedNotes();
}

function deleteDeletedNote(i) {
    deletedTitles.splice(i, 1);
    deletedNotes.splice(i, 1);
    render();
    saveDeletedNotes();
}

function addNote() {
    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;
    if (title === '' || note === '') {
        alert('Please fill in both Title and Note fields.');
        return; 
    }
    titles.push(title);
    notes.push(note);
    render();
    save();
}

function restoreDeletedNotes(i) {
    titles.push(deletedTitles[i]);
    notes.push(deletedNotes[i]);
    deleteDeletedNote()
    render();
    saveDeletedNotes();
}

function render() {
    let myNotes = document.getElementById('myNotes');
    myNotes.innerHTML = '';
    for (let i = 0; i < notes.length; i++) {
        myNotes.innerHTML += noteHTML(i)
    }
    let myDeletedNotes = document.getElementById('myDeletedNotes');
    myDeletedNotes.innerHTML = '';
    for (let i = 0; i < deletedNotes.length; i++) {
        myDeletedNotes.innerHTML += deletedNoteHTML(i);
    }
    document.getElementById('title').value = '';
    document.getElementById('note').value = '';
}

function noteHTML(index) {
    return  `
    <div class="page">
    <h2>${titles[index]}</h2>
    <p>${notes[index]}</p>
    <button onclick="deleteNote(${index})">Delete Note</button>
    </div>
    `;
}

function deletedNoteHTML (index) {
    return `
    <div class="page">
    <h2>${deletedTitles[index]}</h2>
    <p>${deletedNotes[index]}</p>
    <div class="twobuttons">
    <button onclick="restoreDeletedNotes(${index})">Restore Note</button>
    <button onclick="deleteDeletedNote(${index})">Delete Note</button>
    </div>
    </div>
    `;
}

function openTrashbin() {
    document.getElementById('trashbin').classList.remove('d-none');
}

function closeTrashbin() {
    document.getElementById('trashbin').classList.add('d-none');
}

