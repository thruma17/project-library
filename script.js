const myLibrary = [];

// book constructor
function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error(`You must use the 'new' operator to call the constructor`);
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

// library function
function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));

  displayLibrary();
}

function displayLibrary() {
  const library = document.querySelector(`.books-list`);
  library.innerHTML = ``;

  myLibrary.sort((a, b) => a.title.localeCompare(b.title));

  myLibrary.forEach((book) => {
    const card = document.createElement(`div`);
    card.classList.add(`book-card`);

    card.innerHTML = `
      <div class="book-title">
        <h2>${book.title}</h3>
      </div>
      <div class="book-info">
        <p>A ${book.pages} pages book by</p>
        <p><strong>${book.author}</strong></p>
      </div>
    `;

    card.dataset.id = book.id;

    const deleteBtn = document.createElement(`button`);

    deleteBtn.classList = `btn remove-btn`;
    deleteBtn.textContent = `Remove`;

    card.append(deleteBtn);

    library.appendChild(card);
  });
}

// remove book
document.addEventListener(`click`, (e) => {
  if (e.target.classList[1] === `remove-btn`) {
    myLibrary.forEach((card, index) => {
      if (card.id === e.target.parentElement.dataset.id) {
        myLibrary.splice(index, 1);
      }
    });

    e.target.parentElement.remove();
  }
});

// modal
const modal = document.querySelector(`.modal`);
const openModalBtn = document.querySelector(`.open-modal-btn`);
const closeModalBtn = document.querySelector(`.close-modal-btn`);

openModalBtn.addEventListener(`click`, () => modal.showModal());
closeModalBtn.addEventListener(`click`, () => modal.close());

// form
const form = document.querySelector(`.new-book`);

form.addEventListener(`submit`, (e) => {
  const formData = new FormData(form);

  read = formData.has(`bookread`) ? true : false;

  addBookToLibrary(
    formData.get(`booktitle`),
    formData.get(`bookauthor`),
    formData.get(`bookpages`),
    read,
  );

  form.reset();
});

// manual test books
addBookToLibrary(`book1`, `author1`, 310, true);
addBookToLibrary(`book2`, `author2`, 328, false);
addBookToLibrary(`book3`, `author3`, 464, true);

// initial render
displayLibrary();
