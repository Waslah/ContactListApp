import React, { useState } from 'react';
import Button from '../Ui/Button';
import './HorizontalNavbar.css';

const HorizontalNavbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery); // Pass the search query to the parent component
  };

  return (
    <div className='horizontal-nav'>
      <div className='profile'>
        <div className='profile-img-box'>
          <i className='fa-solid fa-user'></i>
        </div>
        <h2 style={{ color: 'white' }}>Waslah Nisar</h2>


      </div>
      <form className='search-box' onSubmit={handleSearchSubmit}>
        <input
          type='text'
          placeholder='Search contacts...'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button name='Search' />
      </form>
    </div>
  );
}

export default HorizontalNavbar;
