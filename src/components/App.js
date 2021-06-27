import React, {useEffect, useState} from 'react';
import App from './App.css';
import book from '../components/bookComponents';
import 'async';


const App = () => {
  const APP_KEY = "AIzaSyA5ZmAxxTqCMODzl5bgsvKsZ5c0CBVF_go";

  const [book , setbook] = useState([]);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("Harry potter");

  useEffect(() => {
  getbook();
  }, [query]);
  
  

  const getbook = async () => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );
    const data = await response.json();
    setbook(data.hits);
    console.log(data.hits);
  };

 
  const updateSearch = e => {
    setInput(e.target.value);
  };

  const getInput = e => {
    e.preventDefault();
    setQuery(input);
    setInput("");
   
  };
  
  return (
    <div className="App">
      <h1>Bookworm-app!</h1>
      <form onSubmit={getInput} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={input}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="book">
        {book.map(book => (
          <book
            key={book.book.label}
            title={book.book.title}
            image={book.book.image}
            bookData={book.book.bookData}
        />
        ))}
      </div>
    </div>
  );
};
export default App;




