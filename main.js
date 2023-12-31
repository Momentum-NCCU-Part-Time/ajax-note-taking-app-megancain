const url = "http://localhost:3000/notes/";
const from = document.querySelector("#note-form");
const noteList = document.querySelector("#note-list");

form.addEventListener("submit", function (event) {
  const noteText = document.querySelector("note-text").value;
  const noteTitle = document.querySelector("note-title").value;
  createNote(noteText, noteTitle);
});

noteList.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit")) {
    editNote(event.target);
  }
  if (event.target.classList.contains("delete")) {
    deleteNote(event.target);
  }
  if (event.target.classList.contains("update-note")) {
    updateNote(event.target);
  }
  if (event.target.classList.contains("cancel")) {
    hideEditControls(event.target.parentElement);
  }
});

function listNotes() {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      for (let note of data) {
        console.log(note);
        renderNoteItem(note);
      }
    });
}

function createNote(noteText, noteTitle) {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: noteTitle,
      body: noteText,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderNoteItem(data);
    });
}

function deleteNote(element) {
  const noteId = element.parentElement.id;
  fetch(`http://localhost:3000/notes/${noteId}`, { method: "DELETE" }).then(
    function () {
      element.parentElement.remove();
    }
  );
}

function updateNote(element) {
  const noteId = element.parentElement.id;
  const noteTText = document.querySelector(",edit-text");
  fetch(`http://localhost:3000/notes/${noteId}`, {
    method: "PATCH",
    headers: { "Content-Tyle": "application/json" },
    body: JSON.stringify({
      body: noteText.value,
    }),
  })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      renderNoteText(element.parentElement, data);
    });
}

function renderNoteText(noteEl, noteObj) {
  noteEl.innerHTML = `<p>${noteObj.body}</p><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i>`;
}

function editNote(element) {
  showEditInput(element.parentElement);
}

function showEditInput(noteItem) {
  noteItem.innerHTML = `<input class="edit-text bw0 pl0 outline-0 w-60" type="text" value="${noteItem.textContent}" autofocus>
    <button class='update-note f6 link br-pill p1 ml1 dib white bg-green' data-note=${noteItem.id}>save</button>
    <button class='cancel f6 link br-pill p1 ml2 dib white light-purple'>cancel</button>`;
  noteItem.querySelector("input").select();
}

function hideEditControls(noteItem) {
  fetch(`http://localhost:3000/notes/${noteItem.id}`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      renderNoteText(noteItem, data);
    });
}
