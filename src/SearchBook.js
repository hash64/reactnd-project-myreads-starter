import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component
{    
    state = {
        books: [],
        searchResult: [],
        hasError: false
    }
    // Current books are fetched from Mainpage after component is inserted into DOM
    componentDidMount() {
        this.setState({
            books: this.props.location.state.booksFromMainpage
        })
    }
    // Handler function for searching book through BooksAPI
    onSearch = (event) => {
        const searchQuery = event.target.value
        if (searchQuery) {
            BooksAPI.search(searchQuery).then((resultBooks) => {
                if (!resultBooks || resultBooks.hasOwnProperty('error')) {
                    this.setState({ searchResult: [], hasError: true })
                } else {
                    this.setState({ searchResult: resultBooks, hasError: false })
                    this.syncBookShelfProperty()
                }
            })
        } else {
            this.setState({ searchResult: [] , searchQuery: ''})
        }
    }
    // Handler function for changing book shelf
    onChangeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then((result) => {
            // Change the shelf property of the book object to new Shelf.
            book.shelf = shelf
            //  Get the previous state book array without current book & add it to the new updated books array
            var updatedBooks = this.state.books.filter((resultBook) => resultBook.id !== book.id)
            updatedBooks.push(book)
            // Set the new state with Updated Books array
            this.setState({ books: updatedBooks })
        })
    }
 // Sync search result book .shelf property with current shelf books
    syncBookShelfProperty = () => {
        const books = this.state.books
        const searchResult = this.state.searchResult
        if (searchResult.length > 0) {
            books.forEach((book) => {
                searchResult.forEach((searchResultBook) => {
                    if (book.id === searchResultBook.id) {
                        searchResultBook.shelf = book.shelf
                    }
                })
            })
        }
        this.setState({ searchResult: searchResult })
    }

    render() {
        const searchResult = this.state.searchResult
        const hasError = this.state.hasError
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            onChange={this.onSearch}
                            placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    {searchResult.length > 0 && (
                        <div>
                            <div>
                                <h3>Search Returned {searchResult.length} books</h3>
                            </div>
                            <ol className="books-grid">
                                {searchResult.map((book) => (
                                    <Book
                                        key={book.id}
                                        book={book}
                                        onChangeShelf={this.onChangeShelf}
                                    />
                                ))}
                            </ol>
                        </div>
                    )}
                    {hasError && (
                        <div>
                            <h3>Search returned no books. Please try again !</h3>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default SearchBook