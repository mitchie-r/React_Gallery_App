import React from 'react';
import LostAstronautImage from '/lost-astronaut.jpg'; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>Whoops! Looks like you're lost in space</h1>
      <img src={LostAstronautImage} alt="Astronaut floating with confused look" />
      <p>Don't worry, we'll help you find your way back:</p>
      <button onClick={() => window.location.href = '/'}>Take Me Home</button>
    </div>
  );
};

export default NotFound;