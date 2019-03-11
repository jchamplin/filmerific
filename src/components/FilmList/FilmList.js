import React, { Component } from 'react';
import {fetchWrapper} from '../../utils/fetchWrapper';
import Thumbnail from '../Thumbnail/Thumbnail';
import './FilmList.css';

/**
 * Filmlist component
 * Renders a film carousel
 */
class Filmlist extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      movies: [],
      filter: this.props.filter,
      results: [],
    };

    this.path = 'http://api.themoviedb.org/3'; 
    this.translate = 0;
    this.slide = 0;
    this.page = 1;

    this.updateModel = this.updateModel.bind(this);
    this.sortFilms = this.sortFilms.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.sideScroll = React.createRef();
    this.scrollContainer = React.createRef();
  }

  /**
   * Gets the movie data from the API
   * 
   * @param {string} filter - select value 
   */
  getData(filter) {
    if(filter) {
      const path = `${this.path}/${this.props.type}/${filter}?page=${this.page}`
      fetchWrapper.get(path).then(data => this.updateModel(data));
    } else {
      const path = `${this.path}/${this.props.type}/${this.props.filter}?page=${this.page}`
      fetchWrapper.get(path).then(data => this.mergeModels(data));
    }
  }

  /**
   * Updates component state
   *
   * @param {object} data object from API
   */
  updateModel(data) {
    this.setState({
      results: data.results,
      movies: this.list(data),
    });
  }

  /**
   * Merges models for infinite scrol
   *
   * @param {object} data object from API
   */
  mergeModels(data) {
    this.setState({
      results: [...this.state.results, ...data.results],
      movies: [...this.state.movies, ...this.list(data)],
    });
  }

  /**
   * Creates an array of Thumbnail components
   * 
   * @returns {array} list of Thumbnail components
   */
  list({results}) {
    return results.map((elem, key) => {
      return <Thumbnail type={this.props.type} key={key} data={elem}></Thumbnail>
    });
  }

  /**
   * Sort films based on selected value
   * 
   * @param {object} event event object 
   */
  sortFilms(event) {
    this.setState({filter: event.target.value});
    this.getData(event.target.value);
    this.scrollAnimation();
  }

  /**
   * Carousel slide animation base on css
   * 
   * @param {string} direction - right || left 
   */
  scrollAnimation(direction) {
    if(direction === 'left') {
      this.translate += 10;
      this.slide--;

    } else if (direction === 'right') {
      this.translate -= 10;
      this.slide++;

    } else {
      this.translate = 0;
      this.slide = 0;

    }

    this.sideScroll.current.style.transform = `translateX(${this.translate}rem)`;
  }

  /**
   * Carousel scroll left
   */
  scrollLeft() {
    if (this.translate === 0) {
      return;
    }

    this.scrollAnimation('left');
  }

  /**
   * Carousel scroll right
   */
  scrollRight() {
    const listLength = this.state.results.length;
    const clientWidth = this.scrollContainer.current.clientWidth;
    const thumbWidth = 160;
    const numDisplayed = Math.ceil(clientWidth/thumbWidth);
    
    if (numDisplayed + this.slide === listLength) {
      this.page++;
      this.getData();
    }

    this.scrollAnimation('right');
  }

  /**
   * generate select options based on type (movie || tv)
   */
  selectOptions() {
    let options = [
      <option value="popular">Popular</option>,
      <option value="top_rated">Top Rated</option>
    ];
    
    if (this.props.type === 'movie') {
      let movieOptions = [
        <option value="upcoming">Upcoming</option>,
        <option value="now_playing">Now Playing</option>,
      ];

      options = [...options, ...movieOptions];
    } else if(this.props.type === 'tv') {
      let tvOptions = [
        <option value="airing_today">Airing Today</option>,
        <option value="on_the_air">On The Air</option>,
      ];

      options = [...options, ...tvOptions];
    }

    return options;
  }

  /**
   * Select list
   */
  dropDown() {
    return <select defaultValue={this.state.filter} onChange={this.sortFilms}>
            {this.selectOptions()}
          </select>;
  }

  /**
   * Renders component
   */
  render() {
    return (
      <div className="scroll-container" ref={this.scrollContainer}>
      <h2 className="title">{this.props.type}</h2>
      <h2  className="select">{this.dropDown()}</h2>
        <div className="side-scroll" ref={this.sideScroll}>
          {this.state.movies}
        </div>
        <i className="fa fa-chevron-left scroll-arrow" id='icon_left' onClick={this.scrollLeft}></i>
        <i className="fa fa-chevron-right scroll-arrow" id='icon_right' onClick={this.scrollRight}></i>
      </div>
    );
  }
}

export default Filmlist;
