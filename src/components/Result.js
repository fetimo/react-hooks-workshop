import React from 'react';

import Card from './Card';

const Result = ({ image, title, vote_average }) => {
  if (!image) {
    return null;
  }

  return (
    <Card 
      style={ {
        backgroundImage: image
          ? `url(https://image.tmdb.org/t/p/w300/${ image })`
          : null,
        } }
    >
      <Card.Popularity>{ vote_average > 7 ? '👍' : '👎' }</Card.Popularity>
    </Card>
  );
}

export default Result;