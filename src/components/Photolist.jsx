import React from 'react';
import {useParams} from "react-router-dom"
import Photo from "./Photo";

const Photolist = (props) => {
  const { photos } = props;

  let { query } = useParams()
    return (
      <div className="photo-container">
        <ul>
          {photos.map(photo => (
            <Photo key={photo.id} photo={photo} />
          ))}
        </ul>
        </div>
    );
          };

export default Photolist;