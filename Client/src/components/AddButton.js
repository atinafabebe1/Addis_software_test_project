import React from 'react';
import styled from '@emotion/styled/macro';
import { MdLibraryAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const AddButtonContainer = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(to right, #0f4c75, #1b262c);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  z-index: 999;
  animation: pulse 1.5s infinite; /* Pulse animation */

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    transform: scale(1.1);
    animation: none; /* Disable pulse animation on hover */
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: linear-gradient(to right, #0f4c75, #1b262c);
    z-index: -1;
  }

  .add-icon {
    color: #fff;
    font-size: 36px;
  }

  .music-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://image-url-for-music-background.jpg');
    background-size: cover;
    opacity: 0.1;
    z-index: -2;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const AddButton = () => {
  const navigate = useNavigate();

  return (
    <AddButtonContainer title="Add Music" onClick={() => navigate('/songs/create')}>
      <div className="music-background" />
      <MdLibraryAdd className="add-icon" />
    </AddButtonContainer>
  );
};

export default AddButton;
