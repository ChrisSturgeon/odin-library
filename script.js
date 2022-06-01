// Example instances and library

const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 304, true);
const norwegianWood = new Book("Norwegian Wood", "Haruki Murakami", 381, true);
const donQuixote = new Book("Don Quixote", "Miguel de Cervantes", 1077, false);
const jurassicPark = new Book("Jurassic Park", "Michael Crichton", 448, true);
const mobyDick = new Book("Moby Dick", "Herman Melville", 378, false);

// Create array for storing books.

var myLibrary = [hobbit, norwegianWood, donQuixote, jurassicPark, mobyDick];

// Book constructor

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    if (read) {
      return `${this.title} by ${this.author}, ${this.pages} pages, read.`
    } else {
      return `${this.title} by ${this.author}, ${this.pages} pages, not yet read.`
    }
  }
}

// Function for adding books to the library array.

function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Clear table and replace initial headers;

function tableReset() {
  const table = document.getElementById('library');
  table.innerHTML = '';
  const headerRow = document.createElement('tr');
  const headers = ["Index", "Title", "Author", "Pages", "Read", "Toggle", "Delete"];

  for (var i = 0; i < headers.length; i++) {
    cell = document.createElement('th');
    cell.innerText = headers[i];
    headerRow.appendChild(cell)
  }
  table.appendChild(headerRow)
}

// Function for showing all books

function showBooks() {

  const table = document.getElementById('library');

  tableReset();

  for (i = 0; i< myLibrary.length; i++) {
    const row = document.createElement('tr');
    // index
    var cell = document.createElement('td');
    cell.innerText = i;
    row.appendChild(cell);
    // title
    var cell = document.createElement('td');
    cell.innerText = myLibrary[i].title
    row.appendChild(cell);
    // author
    var cell = document.createElement('td');
    cell.innerText = myLibrary[i].author;
    row.appendChild(cell);
    // pages
    var cell = document.createElement('td');
    cell.innerText = myLibrary[i].pages;
    row.appendChild(cell);
    // read
    var cell = document.createElement('td');
    if (myLibrary[i].read) {
      cell.innerText = 'Yes'
    } else {
      cell.innerText = 'No'
    }
    row.appendChild(cell);
    // Read toggle
    var cell = document.createElement('td');
    var btn = document.createElement('button');
    btn.textContent = "Toggle read";
    btn.value = i;
    btn.addEventListener('click', function() { toggleRead(this.value);});
    cell.appendChild(btn)
    row.appendChild(cell);




    // Delete button

    var cell = document.createElement('td');
    var btn = document.createElement('button');
    btn.textContent = "Delete"
    btn.value = i;
    btn.addEventListener('click', function() { removeBook(this.value);} )
    cell.appendChild(btn)
    row.appendChild(cell);
    table.appendChild(row);
  }
}

// Add book function

function submit() {
  title = document.getElementById('title').value;
  author = document.getElementById('author').value;
  pages = document.getElementById('pages').value;
  read = false;

  if (document.getElementById('yes').checked) {
    read = true;
  }
  userBook = new Book(title, author, pages, read);
  addBookToLibrary(userBook);
  showBooks();
  // Reset form to clear inputs 
  document.getElementById('bookForm').reset();
}

// Delete book function

function removeBook(index) {
  myLibrary.splice(index, 1);
  showBooks();
}

// Toggle read

function toggleRead(index) {
  const book = myLibrary[index];

  if (book.read) {
    book.read = false;
  } else {
    book.read = true;
  }

  showBooks();
}


// Initialise table 
showBooks();








