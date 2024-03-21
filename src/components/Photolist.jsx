import React from 'react'; // Importing useContext from React
import { useParams } from 'react-router-dom'; // Importing useParams
import Photo from "./Photo";


const Photolist = props => {
  let { query } = useParams()
  const results = props.data
  const buildImageUrl = (photo) => {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
  }
  let photos = results.map(photo => <Photo key={photo.id} url={buildImageUrl} />);
  return (
    <div className="photo-container">
      <ul>
        {photos}
      </ul>
    </div>
  );
};

export default Photolist;