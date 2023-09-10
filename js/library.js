"use strict";

function Library() {
  this.books = [];
}

Library.prototype.addBook = function (book) {
  this.books.push(book);
};

function Book(name, author, numPages, hasBeenRead) {
  this.name = name;
  this.author = author;
  this.numPages = numPages;
  this.hasBeenRead = hasBeenRead;
}

function main() {
  const myLibrary = new Library();
  myLibrary.addBook(new Book("The Alchemist", "Paulo Coelho", 167, true));
  myLibrary.addBook(
    new Book(
      "The Hitchhiker’s Guide To The Galaxy",
      "Dougals Adams",
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
