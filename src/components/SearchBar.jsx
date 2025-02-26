import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <div className="input-group mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="Entrez une ville"
    value={city}
    onChange={(e) => setCity(e.target.value)}
  />
  <button className="btn btn-primary" onClick={handleSearch}>Rechercher</button>
</div>
  );
};

export default SearchBar;