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
  htmlLibrary.appendChild(book.generateBookHTMLElement());
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

  const bookReadLabel = document.createElement("label");
  bookContainer.appendChild(bookReadLabel);
  bookReadLabel.classList.add("book-read-box-id");
  bookReadLabel.textContent = "Finished";

  const bookRead = document.createElement("input");
  bookContainer.appendChild(bookRead);
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
