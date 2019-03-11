import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Searchbox from '../Searchbox/Searchbox';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        {/**
          * Importing resources from a cdn. In a production environment this would be local and transpiled to one file
          */}
        <style>
          @import url('https://fonts.googleapis.com/css?family=Karla');
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.7.2/css/all.min.css');
        </style>
        <Link to="/">
          <h1 Style="display:inline-block;color:white;"><i class="fas fa-film logo"></i> Filmerific</h1>
        </Link>
        <Searchbox></Searchbox>
      </header>
    );
    }
}

export default Header;
