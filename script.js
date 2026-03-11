const myLibrary = [];

// book constructor
function Book(title, author, pages, isRead) {
  if (!new.target) {
    throw Error(`You must use the 'new' operator to call the constructor`);
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}

// toggle read function
Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

// library function
function addBookToLibrary(title, author, pages, isRead) {
  myLibrary.push(new Book(title, author, pages, isRead));

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

    const cardBtns = document.createElement(`div`);
    cardBtns.classList.add(`card-btns`);

    card.appendChild(cardBtns);

    const readBtn = document.createElement(`button`);
    readBtn.classList = `btn read-btn`;
    readBtn.textContent = `${book.isRead}`;

    function readBtnText() {
      book.isRead
        ? (readBtn.textContent = `Unread`)
        : (readBtn.textContent = `Read`);
    }

    readBtnText();

    const deleteBtn = document.createElement(`button`);

    deleteBtn.classList = `btn remove-btn`;
    deleteBtn.textContent = `Remove`;

    cardBtns.append(readBtn);
    cardBtns.append(deleteBtn);

    card.dataset.id = book.id;

    library.appendChild(card);

    // read book
    readBtn.addEventListener(`click`, () => {
      book.toggleRead();
      displayLibrary();
    });

    // remove book
    deleteBtn.addEventListener(`click`, () => {
      myLibrary.forEach((card, index) => {
        if (card.id === deleteBtn.parentElement.parentElement.dataset.id) {
          myLibrary.splice(index, 1);
        }
      });

      deleteBtn.parentElement.parentElement.remove();
    });
  });

  console.log(myLibrary);
}

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

  isRead = formData.has(`bookread`) ? true : false;

  addBookToLibrary(
    formData.get(`booktitle`),
    formData.get(`bookauthor`),
    formData.get(`bookpages`),
    isRead,
  );

  form.reset();
});

// initial render
displayLibrary();
