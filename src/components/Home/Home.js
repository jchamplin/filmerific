import React from 'react';
import FilmList from '../FilmList/FilmList';

export default function Home() {
  return (
    <React.Fragment>
      <FilmList type="movie" filter="popular" />
      <FilmList type="tv" filter="popular" />
    </React.Fragment>
  )
}