import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled/macro';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Status from './Status';
import { deleteSongAsync } from '../redux/actions/songActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SongDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Ensure the container takes the full height of the viewport */
`;

const SongCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 300px;
`;

const SongImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
`;

const SongCardContent = styled.div`
  padding: 20px;
  color: #fff;
`;

const SongTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SongArtist = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const UpdateButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const SongDetail = () => {
  const dispatch = useDispatch();
  const successMessageDisplayed = useRef(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const songs = useSelector((state) => state.songs.songs);
  const song = songs.find((song) => song._id === id);

  const status = useSelector((state) => state.songs.status);

  useEffect(() => {
    if (status === 201 && !successMessageDisplayed.current) {
      toast.success('Music Updated successfully!', { autoClose: 3000 });
    } else if (status === 500 && !successMessageDisplayed.current) {
      toast.error(`Error updating music 😌`, { autoClose: 3000 });
    }
    return () => {
      if (status === 201) {
        successMessageDisplayed.current = true;
      }
    };
  }, [status]);

  if (!song) {
    return <Status />;
  }

  const handleDelete = () => {
    dispatch(deleteSongAsync(id));
    navigate('/');
  };

  return (
    <SongDetailContainer>

      <SongCard>
        <SongImage src={song.coverImage.secure_url} alt={song.title} />
        <SongCardContent>
          <SongTitle>{song.title}</SongTitle>
          <SongArtist>{song.artist}</SongArtist>
          <ButtonContainer>
            <UpdateButton onClick={() => navigate(`/songs/update/${id}`)}>Update</UpdateButton>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </ButtonContainer>
        </SongCardContent>
        <ToastContainer />
      </SongCard>
    </SongDetailContainer>
  );
};

export default SongDetail;
