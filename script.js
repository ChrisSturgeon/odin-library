class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info = function() {
    if (read) {
      return `${this.title} by ${this.author}, ${this.pages} pages, read.`
    } else {
      return `${this.title} by ${this.author}, ${this.pages} pages, not yet read.`
    }
  }
}

// Example books

const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 304, true);
const norwegianWood = new Book("Norwegian Wood", "Haruki Murakami", 381, true);
const donQuixote = new Book("Don Quixote", "Miguel de Cervantes", 1077, false);
const jurassicPark = new Book("Jurassic Park", "Michael Crichton", 448, true);
const mobyDick = new Book("Moby Dick", "Herman Melville", 378, false);

// Array for storing book instances.

var myLibrary = [hobbit, norwegianWood, donQuixote, jurassicPark, mobyDick];

// Add book function

function submit() {
  title = document.getElementById('title').value;
  author = document.getElementById('author').value;
  pages = Number(document.getElementById('pages').value);
  read = false;

  if (document.getElementById('yes').checked) {
    read = true;
  }
  userBook = new Book(title, author, pages, read);
  myLibrary.push(userBook); 

  var addBtn = document.getElementById('addButton');
  addBtn.innerText = "Add another!";
  // showBooks();
  makeCards();
  // Reset form to clear inputs 
  document.getElementById('bookForm').reset();
}

// Toggle read book parameter

function toggleRead(index) {
  const book = myLibrary[index];
  
  if (book.read) {
    book.read = false;
  } else {
    book.read = true;
  }
  // showBooks();
  makeCards();
}

// Delete book function

function removeBook(index) {
  myLibrary.splice(index, 1);
  // showBooks();
  makeCards();
}

// Show new book form

function openForm() {
  var cards = document.getElementById('cards');
  cards.style.display = 'none';

  var bookForm = document.getElementById('addBook');
  bookForm.style.display = 'flex';
}

// Close new book

function closeForm() {
  var bookForm = document.getElementById('addBook');
  bookForm.style.display = 'none';
  var addBtn = document.getElementById('addButton');
  addBtn.innerText = "Add";
  
  var cards = document.getElementById('cards');
  cards.style.display = 'grid';
}

// Make individual card

function makeCard() {
  const cards = document.getElementById('cards');

  var card = document.createElement('div');
  card.textContent = this.pages;
  cards.appendChild(card);
}

// Make cards 

function makeCards() {
  cardsReset();
  const cards = document.getElementById('cards');

  // Loop through library array creating card for each book

  for (i = 0; i < myLibrary.length; i++) {
    card = document.createElement('div');
    card.classList.add('card')

    var title = document.createElement('div');
    title.textContent = myLibrary[i]['title'];
    card.appendChild(title);

    var author = document.createElement('div');
    author.textContent = ` by ${myLibrary[i]['author']}`;
    card.appendChild(author);

    var pages = document.createElement('div');
    pages.textContent = `${myLibrary[i]['pages']} pages`;
    card.appendChild(pages);

    var buttons = document.createElement('div');
    buttons.classList.add('cardButtons');
    
    // Read toggle button
    btn = document.createElement('button');
    btn.textContent = "Toggle Read"
    if (myLibrary[i].read) {
      btn.innerHTML = "Read &#10003"
    } else {
      btn.textContent = "Mark as Read"
    }

    btn.value = i;
    btn.addEventListener('click', function() { toggleRead(this.value);});
    buttons.appendChild(btn);
    card.appendChild(buttons);

    // Delete book button
    btn = document.createElement('button');
    btn.textContent = "Delete"
    btn.value = i;
    btn.addEventListener('click', function() { removeBook(this.value);} )
    buttons.appendChild(btn);

    cards.appendChild(card);
    bookCount();
  }
}

// Cards Reset 

function cardsReset() {
  const cards = document.getElementById('cards');
  cards.innerHTML = '';
}

// Update sidebar information 

function bookCount() {
  var total = myLibrary.length;
  document.getElementById('totalCount').innerText = `Total books: ${total}`;

  var readCounter = 0;
  var pagesCounter = 0;
  for (var i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].read) {
      readCounter ++;
      pagesCounter += myLibrary[i].pages;
    }
  }
  document.getElementById('readCount').innerText = `Books read: ${readCounter}`;
  document.getElementById('pagesCount').innerText = `Pages read: ${pagesCounter}`;
}

// Make initial cards


const titleInput = document.getElementById('title');

titleInput.addEventListener('input', (event) => {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('TOo short')
  }

  titleInput.setCustomValidity('Hiya')
});

// titleInput.addEventListener('invalid', () => {
//   if (titleInput.value === '') {
//     titleInput.setCustomValidity('Please enter an title!');
//   }
// })

const addButton = document.getElementById('addButton');

addButton.addEventListener('click', (event) => {
  event.preventDefault();
  submit();
  
  const bookForm = document.getElementById('bookForm');

  bookForm.submit();

});


makeCards();










