import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {fetchWrapper} from '../../utils/fetchWrapper';
import './Searchbox.css';

/**
 * Searchbox component
 */
class Searchbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchMenu: {'display': 'none'},
      searchValue: null,
      data: [],
    }

    this.filter = '';
    this.searchNow = null;
    
    this.search = this.search.bind(this);
    this.menuItem = this.menuItem.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  /**
   * Gets data from the api based on search input
   * 
   * @param {object} event search object 
   */
  search (event){
    if(this.searchNow && this.searchNow.clearTimeout) {
      clearTimeout(this.searchNow);
    }
    this.filter = event.target.value;
    
    if(event.which === 13) {
      this.setState({searchValue: this.filter})
      console.log(this.state.searchValue)
    }

    this.searchNow = setTimeout(() => {
      const path = encodeURI(`https://api.themoviedb.org/3/search/movie?query=${this.filter}`);
      fetchWrapper.get(path).then(data => this.setState({ data: data.results }));
    }, 500);
  }

  /**
   * Onblur handler
   */
  handleBlur() {
    setTimeout(() => {
      this.setState({ 'searchMenu': {'display': 'none'} });
    }, 500);
  }

  /**
   * Onfocus handler
   */
  handleFocus() {
    this.setState({ 'searchMenu': {'display': 'block'} });
  }

  /**
   * Menu it for search results
   * Todo - make it a component
   */
  menuItem() {
    let items = [];
    if(!this.state.data) {
      return;
    }

    for(const [index, elem] of this.state.data.entries()) {
      const backgroundImage = {
        backgroundImage: `url(http://image.tmdb.org/t/p/w45/${elem.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '3rem',
        width: '2rem',
        display: 'inline-block',
      }

      if (index === 5) {
        items.push(<li><Link key={index} to={`/search/${this.filter}`}>View More</Link></li>);
        break;
      }
      
      items.push(<li><Link key={index} to={`/movie/${elem.id}`}><div style={backgroundImage}></div><span>{elem.title}</span></Link></li>);
    }
    
    return items;
  }

  /**
   * Render component
   */
  render() {
    if (this.state.searchValue) {
      const path = `/search/${this.state.searchValue}`;

      // reset search menu
      this.setState({
        searchValue: null,
        data: [],
        searchMenu: {'display': 'none'}
      });
      
      return <Redirect to={path} />;
    }

    return (
      <div class="searchbox"> 
      
        <input type="search"
          class="fas fa-search"
          id="search"
          placeholder="&#xF002;"
          autocomplete="off"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyUp={this.search}>
        </input>

        <div className="search__menu" id="search__menu" style={this.state.searchMenu}>
          <ul>
            {
              this.menuItem()
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Searchbox;
