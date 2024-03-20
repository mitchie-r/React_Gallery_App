import React from 'react';

const Photo = ({ photo }) => {
    const imgSrc = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`; 
    console.log(imgSrc);
        <li>
            <img src={imgSrc} alt={photo.title} /> 
        </li>
}


export default Photo;