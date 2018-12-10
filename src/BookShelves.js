import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import BookList from "./BookList";
import AddBook from "./AddBook";

class BookShelves extends Component {
  state = {
    books: []
  };

  // Books are fetched after component is inserted into DOM
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books
      });
    });
  }

  // Handler function for changing book shelf
  onChangeShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(result => {
      // Change the shelf property of the book object to new Shelf.
      book.shelf = newShelf;
      //  Get the previous state book array without current book & add it to the new updated books array
      var updatedBooks = this.state.books.filter(
        resultBook => resultBook.id !== book.id
      );
      updatedBooks.push(book);
      // Set the new state with Updated Books array
      this.setState({ books: updatedBooks });
    });
  };

  render() {
    const shelves = [
      { type: "currentlyReading", title: "Currently Reading" },
      { type: "wantToRead", title: "Want to Read" },
      { type: "read", title: "Read" }
    ];
    return (
      <div>
        <div className="list-books-content">
          {this.state.books.length > 0 && (
            <div>
              {shelves.map((shelf, i) => {
                const compartmentBooks = this.state.books.filter(
                  book => book.shelf === shelf.type
                );
                return (
                  <div className="bookshelf" key={i}>
                    <h2 className="bookshelf-title">{shelf.title}</h2>
                    <BookList
                      key={i}
                      books={compartmentBooks}
                      compartmentsList={shelf}
                      onChangeShelf={this.onChangeShelf}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <AddBook currentBooks={this.state.books} />
      </div>
    );
  }
}
export default BookShelves;