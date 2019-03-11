import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Thumbnail.css';

/**
 * A class to create a movie thumbnail and display the poster
 * 
 * @param {object} data - data object from the api
 */
class Thumbnail extends Component {
  render() {
    const data = this.props.data;
    const title = data.title || data.original_name;

    // a default poster image
    let poster = '/img/default-poster.jpg';
    if (data.poster_path) {
      poster = `http://image.tmdb.org/t/p/w185/${data.poster_path}`;
    }

    const backgroundImage = {
      backgroundImage: `url(${poster})`
    }

    return (
      <Link to={`/${this.props.type}/${data.id}`}>
        <div className="thumbnail__container" style={backgroundImage}></div>
        <p className="thumbnail__details">
          {title}
        </p>
      </Link>
    );
  }
}

Thumbnail.defaultProps = {
  type: 'movie',
}

Thumbnail.propTypes = {
  type: PropTypes.string,
}

export default Thumbnail;
