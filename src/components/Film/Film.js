import React, { Component } from 'react';
import {fetchWrapper} from '../../utils/fetchWrapper';
import './Film.css';

/**
 * Film component
 * Supports both movie and tv films
 */
class Film extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.id = this.props.match.params.id;
    this.type = this.props.type;
    this.state = {
      trailerID: null,
    };
    this.overview = null;
  }

  componentDidMount() {
    fetchWrapper.get(`https://api.themoviedb.org/3/${this.type}/${this.id}?append_to_response=videos`)
      .then(data => this.updateModel(data));
  }

  /**
   * Updates component state
   *
   * @param {object} data object from API
   */
  updateModel({title, name, release_date, homepage, poster_path, overview, videos}) {
    this.title = title;
    this.name = name;
    this.overview = overview;
    this.release_date = release_date;
    let trailerID = null;
    
    if(videos && videos.results.length) {
      trailerID = videos.results[0].key;
    }

    this.setState({
      title,
      trailerID,
      link: homepage,
      img: `http://image.tmdb.org/t/p/w500/${poster_path}`
    });
  }

  /**
   * Embeds the youtube video as the components background
   */
  embedVideo() {
    if(this.state.trailerID) {
      return <iframe title="trailer" allow="autoplay; fullscreen"
              src={
                `https://www.youtube.com/embed/${this.state.trailerID}?autoplay=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${this.state.trailerID}`} 
              frameBorder="0" allowFullScreen>
            </iframe>
    }
    return null;
  }

  /**
   * Dynamic tile based on props.type
   */
  renderTitle() {
    if(this.type === 'movie') {
      return <h2>{ this.title } ({this.release_date})</h2>;
    } else {
      return <h2>{ this.name }</h2>;
    }
  }

  /**
   * renders the component
   */
  render() {
    return (
      <React.Fragment>
        <div class="video-background">
          <div class="video-foreground">
            {this.embedVideo()}
          </div>
        </div>
        <div className="video-details">
          {this.renderTitle()}
          <p>
            {this.overview}
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default Film;
