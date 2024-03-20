import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import apiKey from '../config';
import '../App.css';

// App Components
import Search from './Search';
import Photolist from './Photolist';
import Nav from './Nav';

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    let activeFetch = true;

    function receiveData(query) {
      axios
        .get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
          if (activeFetch) {
            setLoading(false);
            setPhotos(response.data.photos.photo);
          }
        })
        .catch(error => {
          console.log('Error fetching and parsing data:', error);
        });
    }
    switch (location.pathname) {
      case '/cats':
        receiveData('cats');
        break;
      case '/dogs':
        receiveData('dogs');
        break;
      case '/computers':
        receiveData('computers');
        break;
      default:
        receiveData('cats'); // Optional: Make cats the default
    }

    return () => { activeFetch = false; };
  }, [query, location.pathname]);

  const handleQueryChange = searchText => {
    setQuery(searchText);
    receiveData(searchText);
    navigate(`/search/${searchText}`);
  };

  return (
    <div>
      <div className="container">
        <h1>Flickr Gallery</h1>
        <Search handleQueryChange={handleQueryChange} />
        <Nav />
        <Photolist photos={photos} loading={loading} />
        <Routes>
          <Route path="/" element={<Navigate to="/cats" />} />
          <Route path="/cats" element={<Photolist photos={photos} loading={loading} />} />
          <Route path="/dogs" element={<Photolist photos={photos} loading={loading} />} />
          <Route path="/computers" element={<Photolist photos={photos} loading={loading} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
