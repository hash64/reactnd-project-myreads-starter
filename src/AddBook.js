import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const AddBook = (props) => {
    const {currentBooks} = props
    return (
        <div className='open-search'>
               <Link to={{
                   pathname:'/search',
                   state: {
                       booksFromMainpage: currentBooks
                       }}}/>
        </div>
    )
}

AddBook.PropTypes = {
    currentBooks:PropTypes.array.isRequired
}
export default AddBook