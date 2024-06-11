//Book class: Represent a book
class Book{
    constructor(title, author, price){
        this.title = title;
        this.author = author;
        this.price = price;
    }

}

//UI : Handling tasks [STORAGE AREA]

class UI {
    static displayBooks() {
        const books = store.getBooks();
        books.forEach(book => {
            UI.addBooktoList(book)
        });
    }

    static addBooktoList(book){
        const list = document.querySelector('#book-list')
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.price}</td> 
        <td><a href = "#" class = "btn-danger btn-sm delete"> X </td>`;

        list.appendChild(row);

        // console.log(typeof JSON.parse(localStorage.getItem('book')));
    }

    static showAlert(msg, style){
        const al = document.createElement('div')
        al.className = `alert alert-${style}`;
        al.appendChild(document.createTextNode(msg));

        const add = document.querySelector('#add');
        add.style.display = 'flex';
        add.style.gap = '50px';

        add.appendChild(al)
        console.log(al);

        //vanish after 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(),3000)
    }
    static clearFields(){
        document.getElementById('title').value = null
        document.getElementById('author').value = null
        document.getElementById('price').value = null
    }

    static deleteBooks(element){
        const item = element.parentElement.parentElement;
        item.remove();
    }
}

//LocalStorage
class store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
            console.log(typeof books);
        }
        return books
    }

    static addBook(book){
        const books = store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static deleteBook(bookName){
        const books = store.getBooks();

        books.forEach(e => {
            if(e.title === bookName){
                books.splice(books.indexOf(e), 1);
            }
        })

        localStorage.setItem('books', JSON.stringify(books));
    }

}

//adding a desired book of our own type



document.querySelector('#book-form').addEventListener('submit', (e) =>{
    e.preventDefault();
    const tit = document.getElementById('title').value;
    const aut = document.getElementById('author').value;
    const pri = document.getElementById('price').value;
    // console.log(e);

    if(tit === '' || aut === '' || pri === ''){
        // alert('Please fill in all the details!');
        UI.clearFields();
        UI.showAlert('Please fill the fields!', 'danger');
    }
    else{
        console.log(tit,
        aut,
        pri
    );

    const bookObject = {
        title: tit,
        author: aut,
        price: pri
    }

    UI.addBooktoList(bookObject);
    UI.showAlert(`${tit} added`, 'success');

    //adding the book to store
    store.addBook(bookObject);

    UI.clearFields();
    }

    
});

//Deleting a book
document.querySelector('#book-list').addEventListener('click', (t) =>{
    console.log(t.target);
    const itemName = t.target.parentElement.parentElement.firstElementChild.textContent;
    if(t.target.classList.contains('delete')){

        if(confirm(`Do you really want to delete ${itemName}?`)){
            UI.deleteBooks(t.target);
            UI.showAlert(`${itemName} deleted`, 'danger');
            store.deleteBook(itemName);
        }
    }
})



document.addEventListener('DOMContentLoaded', UI.displayBooks);