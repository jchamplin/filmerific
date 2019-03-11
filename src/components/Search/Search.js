import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {fetchWrapper} from '../../utils/fetchWrapper';
import Thumbnail from '../Thumbnail/Thumbnail';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.filter = this.props.match.params.filter;
    this.state = {
      data: null,
      movies: [],
    };

    this.overview = null;
    this.page = 1;

    this.myRef = React.createRef();

    this.isBottom = this.isBottom.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
    this.getMovies();
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
        this.filter = this.props.match.params.filter;
        this.setState({
          data: null,
          movies: [],
        });
        this.page = 1;
        this.getMovies(1);
    }
  }

  /**
   * Calculates current scroll position
   * 
   * @param {object} elem - event object
   */
  isBottom(elem) {
    return (elem.getBoundingClientRect().bottom - 1) <= window.innerHeight;
  }
  
  /**
   * Tracks current scroll position
   */
  trackScrolling() {
    const wrappedElement = document.getElementsByTagName('body')[0];
    if (this.isBottom(wrappedElement)) {
      this.getMovies();
    }
  };

  /**
   * Gets the next page from the API
   */
  getNextPage() {
    const path = encodeURI(`https://api.themoviedb.org/3/search/movie?query=${this.filter}&page=${this.page}`);
    fetchWrapper.get(path).then(data => this.updateModel(data));
    this.page++;
  }
  
  /**
   * Get movies
   * 
   * @param {number} page - page number 
   */
  getMovies(page) {
    if(page) {
      this.page = page;
    }
    //gets the first few pages of movies
    for(let i=0; i<=3; i++) {
      this.getNextPage();
    }
  }  

  /**
   * Updates component state
   *
   * @param {object} data object from API
   */
  updateModel(data) {
    this.setState({
      data,
      movies: this.list(data),
    });
  }

  /**
   * Creates an array of Thumbnail components
   * 
   * @returns {array} list of Thumbnail components
   */
  list({results}) {
    const list = results.map((elem) => {
      const styles = {
        padding: '0.3rem',
        display: 'inline-block',
      }
      return <div style={styles}><Thumbnail data={elem}></Thumbnail></div>
    });

    return [...this.state.movies, list];
  }

  /**
   * Render componet
   */
  render() {
    return (
      <div className="search-container" ref={this.myRef} >
        <h2>Results for "{this.filter}"</h2>
        {this.state.movies}
      </div>
    );
  }
}

export default withRouter(Search);
