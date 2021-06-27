import React, { useState, useEffect} from 'react'
import "./App.css";
import book from "bookContainer";


const BASE_URL = 'https://calm-springs-94720.herokuapp.com/';

function bookContainer() {
const [book, setbook] = useState([]);

useEffect(() => {
    fetch(BASE_URL)
.then(r => r.json())
.then(bookData => bookContainer(bookData)) 
}, [])

function deletebook(bookid) {
const URL = `${BASE_URL}/${bookid}`; // BASE_URL+ `/bookid}`
const config = { method: "DELETE"};
fetch(URL, config)
.then(r => r.json())
.then(() => {
    const newbook = book.fliter(book => book.id !== bookid);
    setbook(newbook);
})

}
 
function addbook(book) {
    const config ={
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book)
    }

    fetch(BASE_URL, config)
    .then(r => r.json())
    .then(newbook => {
        const newbook = [...book, newbook];
        setbook(newbook);
    })

}

    function updatebook(id, updatedbook) {
        fetch(`${BASE_URL}/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedbook),
        })
        .then((r) => r.json())
        .then((updatedbook) => {
            const updatedbook = book.map((book) => {
                if (book.id === updatedbook.id) return updatedbook;
                return book;
            });
            setbook(updatebook);
        });

    }

    return (
        <div className="book-Container">
            <bookForm addbook={addbook} />
            <div className="book-Container-list">
                { book.length === 0
                ? <h1>Loading...</h1>
                :book.map(book => {
                    return <book
                    key={book.id}
                    book={book}
                    deletebook={deletebook}
                    updatebook={updatebook}
                    /> })
                }
                </div>
              </div>
            )
          }
          
          export default bookContainer;