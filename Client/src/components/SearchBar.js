import React, { useState } from 'react';
import styled from '@emotion/styled/macro';

const SearchBarContainer = styled.div`
  margin-bottom: 20px;
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchBarInput = styled.input`
  padding: 15px;
  width: 300px;
  height: 50px;
  border: none;
  border-radius: 30px; /* Slightly increased border radius for a modern look */
  font-size: 18px; /* Larger font size */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: width 0.3s ease, box-shadow 0.3s ease; /* Added box-shadow transition */

  &:focus {
    width: 400px;
    outline: none;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Enhanced box-shadow on focus */
  }

  @media (max-width: 768px) {
    width: 90%;
    &:focus {
      width: 100%;
      outline: none;
    }
  }
`;

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <SearchBarContainer>
      <SearchBarInput
        type="text"
        placeholder="Search by title or artist"
        value={searchTerm}
        onChange={handleChange}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
