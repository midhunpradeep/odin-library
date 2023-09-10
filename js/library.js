"use strict";

let idCounter = 0;

function getNewID() {
  let id = idCounter;
  idCounter += 1;
  return id.toString();
}

function Library(htmlID) {
  this.htmlID = htmlID;
  this.books = [];
}

Library.prototype.addBook = function (book) {
  this.books.push(book);

  const htmlLibrary = document.getElementById(this.htmlID);
  const bookElement = book.generateBookHTMLElement();
  htmlLibrary.appendChild(bookElement);
  addBookHTMLElementEvents(bookElement, this);
};

Library.prototype.removeBookAt = function (bookIndex) {
  const book = this.books[bookIndex];
  this.books.splice(bookIndex, 1);

  const bookElement = document.querySelector(
    `.book-container[data-book-id="${book.id}"]`,
  );
  bookElement.remove();
  console.log(this);
};

Library.prototype.searchForBook = function (bookId) {
  for (let i = 0; i < this.books.length; i++) {
    if (this.books[i].id === bookId) return i;
  }
  return -1;
};

function Book(name, author, numPages, hasBeenRead) {
  this.id = getNewID();
  this.name = name;
  this.author = author;
  this.numPages = numPages;
  this.hasBeenRead = hasBeenRead;
}

Book.prototype.generateBookHTMLElement = function () {
  const bookContainer = document.createElement("div");
  bookContainer.dataset.bookId = this.id;
  bookContainer.classList.add("book-container");

  const topRow = document.createElement("div");
  topRow.classList.add("book-name-delete-container");
  bookContainer.appendChild(topRow);

  const bookName = document.createElement("h2");
  topRow.appendChild(bookName);
  bookName.classList.add("book-name");
  bookName.textContent = this.name;

  const deleteButton = document.createElement("button");
  topRow.appendChild(deleteButton);
  deleteButton.classList.add("book-delete-btn");
  deleteButton.classList.add("material-symbols-outlined");
  deleteButton.textContent = "delete";

  const bookAuthor = document.createElement("h3");
  bookContainer.appendChild(bookAuthor);
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = this.author;

  const bookPages = document.createElement("div");
  bookContainer.appendChild(bookPages);
  bookPages.classList.add("book-pages");
  bookPages.textContent = this.numPages + " Pages";

  const bookReadContainer = document.createElement("div");
  bookContainer.appendChild(bookReadContainer);
  bookReadContainer.classList.add("book-read-container");

  const bookReadLabel = document.createElement("label");
  bookReadContainer.appendChild(bookReadLabel);
  bookReadLabel.classList.add("book-read-box-id");
  bookReadLabel.textContent = "Mark as Read";

  const bookRead = document.createElement("input");
  bookReadContainer.appendChild(bookRead);
  bookRead.classList.add("book-read-box");
  bookRead.id = "book-" + this.id + "-read-box";
  bookRead.type = "checkbox";
  bookRead.checked = this.hasBeenRead;

  bookReadLabel.htmlFor = bookRead.id;

  return bookContainer;
};

function addBookHTMLElementEvents(bookElement, library) {
  let book = library.books[library.searchForBook(bookElement.dataset.bookId)];

  const bookReadBox = bookElement.querySelector(".book-read-box");
  bookReadBox.addEventListener("change", () => {
    book.hasBeenRead = bookReadBox.checked;
  });

  const bookDeleteBtn = bookElement.querySelector(".book-delete-btn");
  bookDeleteBtn.addEventListener("click", () => {
    let bookIndex = library.searchForBook(bookElement.dataset.bookId);
    library.removeBookAt(bookIndex);
  });
}

function addShowDialogEvent() {
  const newBookBtn = document.getElementById("new-book-btn");
  const newBookDialog = document.getElementById("new-book-dialog");

  newBookBtn.addEventListener("click", () => {
    newBookDialog.showModal();
  });
}

function addDialogFormEvents(library) {
  const dialog = document.getElementById("new-book-dialog");

  dialog.querySelector("#new-book-cancel-btn").addEventListener("click", () => {
    for (const inputElement of dialog.querySelectorAll("input")) {
      inputElement.value = "";
    }
    dialog.close();
  });

  dialog.querySelector("form").addEventListener("submit", () => {
    let bookName = dialog.querySelector("#new-book-name").value;
    let bookAuthor = dialog.querySelector("#new-book-author").value;
    let bookPages = dialog.querySelector("#new-book-pages").value;
    for (const inputElement of dialog.querySelectorAll("input")) {
      inputElement.value = "";
    }
    library.addBook(new Book(bookName, bookAuthor, bookPages, false));
  });
}

function addDialogCloseOnOutsideClickEvent() {
  const dialog = document.getElementById("new-book-dialog");
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
}

function main() {
  const myLibrary = new Library("library");
  addShowDialogEvent();
  addDialogFormEvents(myLibrary);
  addDialogCloseOnOutsideClickEvent();
}

main();
