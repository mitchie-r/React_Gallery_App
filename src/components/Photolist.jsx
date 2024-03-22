import React from 'react'; // Importing useContext from React
import { useParams } from 'react-router-dom'; // Importing useParams
import Photo from "./Photo";
import NoFlickers from "./NoFlickers";

// Lists all photos 
const Photolist = props => {
  let photos;
  const results = props.data
  // Displays no results message if no results
  if (results.length > 0) {
    photos = results.map(photo =>
      <Photo key={photo.id} photo={photo} />); 

  } else {
    photos = <NoFlickers />
  }
  return (
    <div className="photo-container">
      <h2>{props.title}</h2>
      <ul>
         { photos }
      </ul>
    </div>
  );
};

export default Photolist;