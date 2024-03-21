import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import apiKey from '../config';
import '../App.css';

// App Components
import Search from './Search';
import Photolist from './Photolist';
import Nav from './Nav';
import NotFound from './NotFound';

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  function receiveData(query) {
    axios
      .get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        setLoading(false);
        setPhotos(response.data.photos.photo);
        
      })
      .catch(error => {
        console.log('Error fetching and parsing data:', error);
      }), [query];
  }

  useEffect(() => {
    setLoading(true);
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
        receiveData('cats'); 
    }
  }, [location]);

  const handleQueryChange = (searchText) => {
    setQuery(searchText);
    receiveData(searchText);
  };

  return (
      <div>
        <div className="container">
          <h1>Flickr Gallery</h1>
          <Search changeQuery={handleQueryChange} />
          <Nav />
          <Routes>
            <Route path="/" element={<Navigate to="/cats" />} />
            <Route path="/cats" element={<Photolist data={photos} />} />
            <Route path="/dogs" element={<Photolist data={photos} />} />
            <Route path="/computers" element={<Photolist data={photos}  />} />
            <Route path="/search/:query" element={<Photolist data={photos} />} />
            <Route path="/*" element={<NotFound /> } />
          
          </Routes>
        </div>
      </div>
  );
}

export default App;
