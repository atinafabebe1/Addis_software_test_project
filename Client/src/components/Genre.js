import React from 'react';
import styled from '@emotion/styled/macro';
import { FiChevronDown } from 'react-icons/fi';

const GenreContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 10px;
  height: 50px;
`;

const GenreButton = styled.button`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background-color: #000;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const DropdownIcon = styled(FiChevronDown)`
  margin-left: 5px;
`;

const GenreDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  padding: 12px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const GenreItem = styled.div`
  padding: 8px 0;
  cursor: pointer;
  color: #000;
  transition: color 0.3s ease;

  &:hover {
    color: #333;
  }
`;

const Genre = ({ genres, selectedGenre, handleGenreChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (genre) => {
    handleGenreChange(genre);
    setIsOpen(false);
  };

  return (
    <GenreContainer>
      <GenreButton onClick={toggleDropdown}>
        {selectedGenre ? selectedGenre : 'All Genres'}
        <DropdownIcon />
      </GenreButton>
      {isOpen && (
        <GenreDropdown>
          {genres.map((genre) => (
            <GenreItem key={genre} onClick={() => handleItemClick(genre)}>
              {genre}
            </GenreItem>
          ))}
        </GenreDropdown>
      )}
    </GenreContainer>
  );
};

export default Genre;
