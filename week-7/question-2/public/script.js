function displayBooks(data){

const container = document.getElementById("books");

container.innerHTML = "";

data.forEach(book => {

container.innerHTML += `
<div class="book">
<h3>${book.title}</h3>
<p>Author: ${book.author}</p>
<p>Category: ${book.category}</p>
<p>Price: ₹${book.price}</p>
<p>Rating: ${book.rating}</p>
</div>
`;

});

}

/* Search */

function searchBook(){

const title = document.getElementById("search").value;

fetch("/books/search?title=" + title)

.then(res => res.json())

.then(data => displayBooks(data));

}

/* Sort price */

function sortPrice(){

fetch("/books/sort/price")

.then(res => res.json())

.then(data => displayBooks(data));

}

/* Sort rating */

function sortRating(){

fetch("/books/sort/rating")

.then(res => res.json())

.then(data => displayBooks(data));

}

/* Top books */

function topBooks(){

fetch("/books/top")

.then(res => res.json())

.then(data => displayBooks(data));

}