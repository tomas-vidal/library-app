const submitButton = document.querySelector(".app__submit");
const parentElement = document.querySelector(".app__books");
let title = document.querySelector("#name");
let author = document.querySelector("#author");
let totalPages = document.querySelector("#pages");
let read = document.querySelector("#read");
let id = 0;
let editingId;
let myBooks = [];
let editMode = false;
let currentIndex;

function Book(title, author, totalPages, id) {
  (this.title = title),
    (this.author = author),
    (this.totalPages = totalPages),
    (this.id = id),
    (this.read = read.checked);
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(id);

  if (title.value === "" || author.value === "" || totalPages === "") {
    return;
  }

  if (editMode) {
    myBooks[currentIndex] = {
      title: title.value,
      author: author.value,
      totalPages: totalPages.value,
      id: editingId,
      read: read.checked,
    };
    resetInputs();
    displayBooks(myBooks);
    editMode = false;
    submitButton.textContent = "ADD BOOK";
    return;
  }

  let myNewBook = new Book(title.value, author.value, totalPages.value, id);
  myBooks.push(myNewBook);

  /* DISPLAY BOOKS AND REFRESH DELETE BUTTONS TO GET THEM VIA QUERYSELECTOR */
  displayBooks(myBooks);

  /* RESETS THE INPUTS AND REFRESH ID */
  resetInputs();
  id++;
});

const displayBooks = (bookArray) => {
  parentElement.innerHTML = "";
  bookArray.forEach((book) => {
    parentElement.innerHTML += `
        <div class="app__book" data-id="${book.id}">
          <h2>${book.title}</h2>
          <p>${book.author}</p>
          <span>${book.totalPages}</span>
          <span>${book.read ? "Read" : "Not read"}</span>
          <div class="app__options-book">
            <img
                    src="./images/trash-can-outline.svg"
                    alt=""
                    class="app__book-delete"
                    onclick="deleteBook(${book.id})"
                  />
            <img src="./images/pencil.svg" alt="" onclick="editBook(${
              book.id
            })"class="app__book-edit" />
          </div>
        </div>`;
  });
};

const deleteBook = (id) => {
  if (editMode) {
    editMode = false;
    submitButton.textContent = "ADD BOOK";
    resetInputs();
  }
  myBooks = myBooks.filter((book) => book.id !== id);
  displayBooks(myBooks);
};

const editBook = (id) => {
  submitButton.textContent = "EDIT CONFIRM";
  editingId = id;
  currentIndex = myBooks.findIndex((book) => book.id === id);
  editMode = true;
  title.value = myBooks[currentIndex].title;
  author.value = myBooks[currentIndex].author;
  totalPages.value = myBooks[currentIndex].totalPages;
  read.checked = myBooks[currentIndex].read;

  document.querySelector(`[data-id="${editingId}"]`).style.backgroundColor =
    "#6036b3";
  document.querySelector(`[data-id="${editingId}"]`).style.color = "#fff";
  document
    .querySelector(`[data-id="${editingId}"]`)
    .querySelector(".app__options-book").style.filter = "invert(1)";
};

const resetInputs = () => {
  title.value = "";
  author.value = "";
  totalPages.value = "";
  read.checked = false;
};
