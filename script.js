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
  myLibrary.push(userBook); 

  var addBtn = document.getElementById('addButton');
  addBtn.innerText = "Add another!";
  // showBooks();
  makeCards();
  // Reset form to clear inputs 
  document.getElementById('bookForm').reset();

}

function addClose() {
  submit();
  closeForm();
}

// Delete book function

function removeBook(index) {
  myLibrary.splice(index, 1);
  // showBooks();
  makeCards();
}

// Toggle read

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

// Show form

function openForm() {
  var cards = document.getElementById('cards');
  cards.style.display = 'none';

  var bookForm = document.getElementById('addBook');
  bookForm.style.display = 'flex';
  
}

function closeForm() {
  var bookForm = document.getElementById('addBook');
  bookForm.style.display = 'none';
  
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

// Cards Reset 

function cardsReset() {
  const cards = document.getElementById('cards');
  cards.innerHTML = '';
}

// Make cards 

function makeCards() {
  cardsReset();
  const cards = document.getElementById('cards');

  for (i = 0; i < myLibrary.length; i++) {
    card = document.createElement('div');
    card.classList.add('card')

    var title = document.createElement('div');
    title.textContent = myLibrary[i]['title'];
    card.appendChild(title);

    var author = document.createElement('div');
    author.textContent = myLibrary[i]['author'];
    card.appendChild(author);

    var pages = document.createElement('div');
    pages.textContent = myLibrary[i]['pages'];
    card.appendChild(pages);



    var buttons = document.createElement('div');
    buttons.classList.add('cardButtons');
    

    // Read Toggle
    btn = document.createElement('button');
    btn.textContent = "Toggle Read"
    if (myLibrary[i].read) {
      btn.textContent = "Read"
      btn.style.backgroundColor = 'green'
    } else {
      btn.textContent = "Mark as Read"
      btn.style.backgroundColor = 'orange'
    }

    btn.value = i;
    btn.addEventListener('click', function() { toggleRead(this.value);});
    buttons.appendChild(btn);
    card.appendChild(buttons);
        // Delete button
        btn = document.createElement('button');
        btn.textContent = "Delete"
        btn.value = i;
        btn.addEventListener('click', function() { removeBook(this.value);} )
        buttons.appendChild(btn);

    cards.appendChild(card);
    bookCount();
    
  }
}

// Update sidebar information 

function bookCount() {
  var total = myLibrary.length;
  document.getElementById('totalCount').innerText = `Total: ${total}`;

  var readCounter = 0;
  for (var i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].read) {
      readCounter ++;
    }
  }
  document.getElementById('readCount').innerText = `Read: ${readCounter}`;

}

function hideCards() {
  document.getElementById('cards').innerHTML = '';
  bookForm = document.getElementById('addBook');
  bookForm.style.display = 'flex';
}



// Initialise table 
// showBooks();
makeCards();








