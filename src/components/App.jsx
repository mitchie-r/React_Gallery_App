import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import apiKey from '../config';
import '../App.css';

// App Components
import Search from './Search';
import Photolist from './Photolist';
import Nav from './Nav';
import NotFound from './NotFound';

// Main App
function App() {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  // Function receives data from flicker
  function fetchData(query) {
    axios
      .get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        setLoading(false);
        setPhotos(response.data.photos.photo);
        setLoading(false);

      })
      .catch(error => {
        console.log('Error fetching and parsing data:', error);
      }), [query];
  }
  // Use Effect to populate correct pictures and set default to cats
  useEffect(() => {
    setLoading(true);
    // Extracts search to work with correct route
    const extractSearchTerm = () => {
      const pathParts = location.pathname.split('/');
      if (pathParts[1] === 'search') {
        return pathParts[2];
      }
      return null;
    }
  
    const searchTerm = extractSearchTerm();
  
    if (location.pathname.startsWith('/search')) {
      if (searchTerm) {
        fetchData(searchTerm);
      }
    } else {
      switch (location.pathname) {
        case '/cats':
          fetchData('cats');
          break;
        case '/dogs':
          fetchData('dogs');
          break;
        case '/computers':
          fetchData('computers');
          break;
        default:
          fetchData('cats');
      }
    }
  }, [location]);
  // Handles changes in the query
  const handleQueryChange = (searchText) => {
    setQuery(searchText);
    fetchData(searchText);
    navigate(`/search/${encodeURIComponent(searchText)}`); // Use navigate function
    
  };
  // Routes with loading to handle NotFound message
  return (
    <div>
      <div className="container">
        <h1>Flickr Gallery</h1>
        <Search changeQuery={handleQueryChange} />
        <Nav />
        {loading ? (
          <div>
            <h3>Loading...</h3>
          </div>
        ) : (
        <Routes>
          <Route path="/" element={<Navigate replace to="/cats" />} />
          <Route path="/cats" element={<Photolist data={photos} />} />
          <Route path="/dogs" element={<Photolist data={photos} />} />
          <Route path="/computers" element={<Photolist data={photos} />} />
          <Route path="/search/:query" element={<Photolist data={photos} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        )}
      </div>
    </div>
  );
}

export default App;