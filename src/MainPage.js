import React from "react";
import BookShelves from "./BookShelves";

const MainPage = () => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <BookShelves />
    </div>
  );
};

export default MainPage;