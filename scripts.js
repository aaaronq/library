let myLibrary = [];

const bookGrid = document.querySelector(".bookgrid");

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = Boolean(read);
}

function addBookToLibrary(book) {
	const bookCard = document.createElement("div");
	const title = document.createElement("p");
	const author = document.createElement("p");
	const pages = document.createElement("p");
	const buttons = document.createElement("div");
	const readBtn = document.createElement("button");
	const removeBtn = document.createElement("button");

	bookCard.classList.add("book");
	bookCard.setAttribute("data-index", myLibrary.indexOf(book));
	buttons.classList.add("buttons");
	readBtn.classList.add("btn");
	readBtn.classList.add("btn-red");
	removeBtn.classList.add("btn", "btn-remove");
	readBtn.onclick = () => {
		readBtn.classList.toggle("btn-green");
		if (book.read === true) {
			readBtn.innerText = "Unread";
			book.read = false;
		} else {
			readBtn.innerText = "Read";
			book.read = true;
		}
	};

	removeBtn.onclick = (e) => {
		const book = e.target.parentNode.parentNode;
		const title = book.firstChild.innerText;
		console.log(title);

		myLibrary = myLibrary.filter((book) => book.title !== title);

		book.remove();
	};

	if (book.read) {
		readBtn.innerText = "Read";
		readBtn.classList.add("btn-green");
	} else readBtn.innerText = "Unread";

	title.innerText = `${book.title}`;
	author.innerText = `${book.author}`;
	pages.innerText = `${book.pages} pages`;
	removeBtn.innerText = "Remove";

	bookCard.appendChild(title);
	bookCard.appendChild(author);
	bookCard.appendChild(pages);
	buttons.appendChild(readBtn);
	buttons.appendChild(removeBtn);
	bookCard.appendChild(buttons);
	bookGrid.appendChild(bookCard);
}

//Modal interactivity
const modal = document.querySelector(".modal");
const openModalBtn = document.getElementById("addBookBtn1");
const closeModalBtn = document.getElementById("closeModalBtn");

openModalBtn.onclick = () => (modal.style.display = "flex");
closeModalBtn.onclick = () => (modal.style.display = "none");

//Listen for input from form
const form = document.getElementById("addBookForm");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	modal.style.display = "none";

	const author = document.getElementById("author").value;
	const title = document.getElementById("title").value;
	const pages = document.getElementById("pages").value;
	const read = document.getElementById("read").checked;

	const newBook = new Book(title, author, pages, read);
	if (myLibrary.some((book) => book.title === newBook.title)) {
		const book = myLibrary.find((book) => book.title === newBook.title);
		console.log(myLibrary.indexOf(book));
		const card = document.querySelector(`.book[data-index="${myLibrary.indexOf(book)}"]`)
		card.style.backgroundColor = "gold";
		setTimeout(() => card.style.backgroundColor = "initial", 1500)
		return;
	}

	myLibrary.push(newBook);
	addBookToLibrary(newBook);
});

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
let dubliners = new Book("Dubliners", "James Joyce", 152, false);
let omam = new Book("Of Mice and Men", "John Steinbeck", 107, true);

addBookToLibrary(theHobbit);
addBookToLibrary(dubliners);
addBookToLibrary(omam);
