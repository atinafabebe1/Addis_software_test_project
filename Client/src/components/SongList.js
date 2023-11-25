import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import SongItem from './SongItem';
import SearchBar from './SearchBar';
import Loading from './Loading';
import Status from './Status';
import AddButton from './AddButton';
import Genre from './Genre';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsAsync } from '../redux/actions/songActions';

const SongListContainer = styled.div`
  height: 80vh;
  overflow-y: auto;
  padding: 20px;
  margin-top: 40px;
  animation: slideUp 0.8s ease;

  @keyframes slideUp {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SongListWrapper = styled.div`
  margin: 10px;
`;

const SongItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 0 80px;
`;

const FilterContainer = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center; 
  justify-content: center; 
  gap: 20px; 
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: ${({ active }) => (active ? '#007bff' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#007bff')};
  border: 1px solid #007bff;
  border-radius: 50%;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
`;

const Page = styled.span`
  color: #fff;
  padding-right: 5px;
  font-weight: bold;
`;

const SongList = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.songs);
  const isLoading = useSelector((state) => state.songs.isLoading);

  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(fetchSongsAsync());
  }, [dispatch]);

  useEffect(() => {
    setFilteredSongs(songs);
  }, [songs]);

  if (isLoading) {
    return <Loading />;
  }

  if (songs.length === 0) {
    return <Status text="No songs available." />;
  }

  const handleSearch = (searchTerm) => {
    const filtered = songs.filter((song) => {
      const titleMatches = song.title.toLowerCase().includes(searchTerm.toLowerCase());
      const artistMatches = song.artist.toLowerCase().includes(searchTerm.toLowerCase());
      const genreMatches = selectedGenre === '' || selectedGenre === 'All Genres' || song.genre === selectedGenre;
      return (titleMatches || artistMatches || !searchTerm) && genreMatches;
    });
    setFilteredSongs(filtered);
  };

  const handleGenreChange = (genre) => {
    const filtered = songs.filter((song) => {
      const genreMatches = genre === 'All Genres' || song.genre === genre;
      return genreMatches;
    });

    setSelectedGenre(genre);
    setFilteredSongs(filtered);
  };

  const getGenres = () => {
    const genres = songs.map((song) => song.genre);
    return ['All Genres', ...new Set(genres)];
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSongs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredSongs.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <SongListContainer>
      <SongListWrapper>
        <FilterContainer>
          <SearchBar handleSearch={handleSearch} />
          <Genre genres={getGenres()} selectedGenre={selectedGenre} handleGenreChange={handleGenreChange} />
        </FilterContainer>
        <SongItemContainer>
          {currentItems.map((song) => (
            <SongItem key={song._id} song={song} />
          ))}
        </SongItemContainer>
      </SongListWrapper>
      <PaginationContainer>
        <Page>Page: </Page>
        {pageNumbers.map((pageNumber) => (
          <PaginationButton
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            active={pageNumber === currentPage}
          >
            {pageNumber}
          </PaginationButton>
        ))}
      </PaginationContainer>
      <AddButton />
    </SongListContainer>
  );
};

export default SongList;
