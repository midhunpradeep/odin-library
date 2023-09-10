"use strict";

let idCounter = 0;
function getNewID() {
  let id = idCounter;
  idCounter += 1;
  return id;
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

  const bookReadBox = bookElement.querySelector(".book-read-box");
  bookReadBox.addEventListener("change", () => {
    book.hasBeenRead = bookReadBox.checked;
    console.log(this);
  });
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
  bookContainer.classList.add("book-container");

  const bookName = document.createElement("h2");
  bookContainer.appendChild(bookName);
  bookName.classList.add("book-name");
  bookName.textContent = this.name;

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

function main() {
  const myLibrary = new Library("library");

  myLibrary.addBook(new Book("The Alchemist", "Paulo Coelho", 167, true));
  myLibrary.addBook(
    new Book(
      "The Hitchhiker’s Guide To The Galaxy",
      "Douglas Adams",
      180,
      true,
    ),
  );

  myLibrary.addBook(
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 184, false),
  );
  myLibrary.addBook(new Book("The Call Of The Wild", "Jack London", 288, true));
  myLibrary.addBook(new Book("To Kill A Mockingbird", "Harper Lee", 309, true));

  console.log(myLibrary);
}

main();
