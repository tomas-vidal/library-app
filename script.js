const submitButton = document.querySelector(".app__submit");
const parentElement = document.querySelector(".app__books");
let title = document.querySelector("#name");
let author = document.querySelector("#author");
let totalPages = document.querySelector("#pages");
let read = document.querySelector("#read");
let id = 0;
let myBooks = [];

function Book(title, author, totalPages, id) {
  (this.title = title),
    (this.author = author),
    (this.totalPages = totalPages),
    (this.id = id);
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (title.value === "" || author.value === "" || totalPages === "") {
    return;
  }

  let myNewBook = new Book(title.value, author.value, totalPages.value, id);
  myBooks.push(myNewBook);

  /* DISPLAY BOOKS AND REFRESH DELETE BUTTONS TO GET THEM VIA QUERYSELECTOR */
  displayBooks(myBooks);

  /* RESETS THE INPUTS AND REFRESH ID */
  title.value = "";
  author.value = "";
  totalPages.value = "";
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
          <span>SI</span>
          <img
                  src="./images/trash-can-outline.svg"
                  alt=""
                  class="app__book-delete"
                  onclick="deleteBook(${book.id})"
                />
        </div>`;
  });
};

const deleteBook = (id) => {
  myBooks = myBooks.filter((book) => book.id !== id);
  console.log(myBooks);
  displayBooks(myBooks);
};
