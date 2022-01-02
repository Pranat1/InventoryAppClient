import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import AddPurchase from './components/AddPurchase';
import AddItem from './components/AddItem';
import AddPlace from './components/AddPlace';
import AddPerson from './components/AddPerson';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

// components

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Inventory App</h1>
          <BookList />
          <AddBook/>
          <AddPurchase/>
          <AddItem/>
          <AddPlace/>
          <AddPerson/>
      </div>

      </ApolloProvider>
    );
  }
}

export default App;