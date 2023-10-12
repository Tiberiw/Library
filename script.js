class Book {

    #title;
    #author;
    #pageNumber;
    #isRead;

    constructor(title, author, pageNumber, isRead) {
        this.#title = title;
        this.#author = author;
        this.#pageNumber = pageNumber;
        this.#isRead = isRead;
    }

    get isRead() {
        return this.#isRead;
    }

    get title() {
        return this.#title;
    }

    get author() {
        return this.#author;
    }

    get pageNumber() {
        return this.#pageNumber;
    }

    toggleRead() {
        this.#isRead = !this.isRead;
    }
}

class Repository {
    
    #bookRepo = [];

    addBook(title, author, nrPages, read) {
        this.#bookRepo.push(new Book(title, author, nrPages, read));
    }

    get bookRepo() {
        return this.#bookRepo;
    }
}


class UI {

    #repository;
    #buttonCloseModal;
    #buttonShowModal;
    #modal;
    #tableBody;
    #buttonAddBook;
    #inputTitle;
    #inputAuthor;
    #inputPages;
    #inputRead

    constructor(repo) {
        this.#repository = repo;

        this.#buttonCloseModal = document.querySelector('button.close-modal');
        this.#buttonShowModal = document.querySelector('button.open-modal');
        this.#modal = document.querySelector('.modal');
        this.#tableBody = document.querySelector('tbody');
        this.#buttonAddBook = document.querySelector('button[type="submit"]');
        this.#inputTitle = document.querySelector('input#title');
        this.#inputAuthor = document.querySelector('input#author');
        this.#inputPages = document.querySelector('input#pages');
        this.#inputRead = document.querySelector('input#read');
    }


    setUp(){
        this.#buttonAddBook.addEventListener('click', (e) => {

            e.preventDefault();
            const title = this.#inputTitle.value;
            const author = this.#inputAuthor.value;
            const pages = this.#inputPages.value;
            const read = this.#inputRead.checked;
    
            this.#repository.addBook(title,author,pages,read);
            this.#modal.close();
            this.showBooks();
        });

        this.#modal.addEventListener('close', () => {
            this.#inputTitle.value = this.#inputAuthor.value = this.#inputPages.value = "";
            this.#inputRead.checked = false;
        });

        this.#buttonShowModal.addEventListener('click', () => {
            this.#modal.showModal();
        });

        this.#buttonCloseModal.addEventListener('click', () => {
            this.#modal.close();
        });
    }

    showBooks() {


        /* Remove all books to not have duplicates */
        this.#tableBody.innerHTML = "";


        /* Iterate on all books from repo */
        this.#repository.bookRepo.forEach( (book,index) => {

            /* Create new table row */
            const newRow = document.createElement('tr');
            newRow.setAttribute('data-row',index);

            /* Append title to table */
            const newTitle = document.createElement('td');
            newTitle.textContent = book.title;
            newRow.appendChild(newTitle);

            /* Append author to table */
            const newAuthor = document.createElement('td');
            newAuthor.textContent = book.author;
            newRow.appendChild(newAuthor);

            /* Append pages number to table */
            const newPages = document.createElement('td');
            newPages.textContent = book.pageNumber;
            newRow.appendChild(newPages);

            /* Append status to table */
            const newRead = document.createElement('td');
            const toogleReadBtn = document.createElement('button');
            newRead.appendChild(toogleReadBtn);
            
            if(book.isRead === true) {
                toogleReadBtn.textContent = "READ";
                toogleReadBtn.classList.add('read');
                toogleReadBtn.classList.remove('not-read');
            }
            else {
                toogleReadBtn.textContent = "NOT READ";
                toogleReadBtn.classList.add('not-read');
                toogleReadBtn.classList.remove('read');
            }
                

            toogleReadBtn.addEventListener('click', () => {
                book.toggleRead();
                if(book.isRead === true)
                toogleReadBtn.textContent = "READ";
            else
                toogleReadBtn.textContent = "NOT READ";
                this.showBooks();

            });
            newRow.appendChild(newRead);

            const newDelete = document.createElement('td');
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete');
            newDelete.appendChild(deleteBtn);

            deleteBtn.textContent = "DELETE";
            deleteBtn.addEventListener('click', () => {

                this.#tableBody.removeChild(this.#tableBody.children[index]);
                this.#repository.bookRepo.splice(index,1);
                this.showBooks();
            });
            newRow.appendChild(newDelete);

            /* Append row to table */
            this.#tableBody.appendChild(newRow);

        });




        
    }

    populate() {
        this.#repository.addBook("How to Win Friends and Influence People", "Dale Carnegie", 320, false);
        this.#repository.addBook("Atomic Habits", "James Clear", 20, false);
        
    }

}



let Repo = new Repository();
let GUI = new UI(Repo);
GUI.setUp();
GUI.populate();
GUI.showBooks();