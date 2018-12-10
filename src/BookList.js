import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookList = (props) => {
    const { index,books,onChangeShelf } = props
    return(
        <div>
            <div className="bookshelf-books" key={index}>
                <ol className="books-grid">
                    {books.map( (book) => (
                        <Book
                            key={book.id}
                            book={book}
                            onChangeShelf={onChangeShelf}
                        />
                    ))}
                </ol>
            </div>
        </div>
        )
}


BookList.PropTypes = {
    index: PropTypes.number.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default BookList