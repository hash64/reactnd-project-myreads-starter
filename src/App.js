import React from 'react'
import { Route, Switch } from "react-router-dom"
import MainPage from "./MainPage"
import SearchBook from "./SearchBook"
import NotFound from "./NotFound"
import './App.css'

const BooksApp = () => {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/search" component={SearchBook} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default BooksApp