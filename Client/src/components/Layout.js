import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import styled from '@emotion/styled/macro';
import { useSelector } from 'react-redux';
import Draggable from 'react-draggable';
import { MusicPlayer } from '../components';

const MainContainer = styled.div`
  display: flex;
  flex: 1;
`;

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const SongListContainer = styled.div`
  flex: 1;
  padding: 20px;
  background: linear-gradient(to right, #f8f9fa, #ced4da);
`;

const MusicPlayerContainer = styled.div`
  position: absolute; /* Change this line from 'fixed' to 'absolute' */
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #2c3e50;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const Layout = () => {
  const selectedSong = useSelector((state) => state.songs.selectedSong);

  return (
    <AppContainer>
      <MainContainer>

        <SongListContainer>
          <Navbar />
          <Outlet />
        </SongListContainer>
        {selectedSong && (
          <Draggable>
            <MusicPlayerContainer>
              <MusicPlayer />
            </MusicPlayerContainer>
          </Draggable>
        )}
      </MainContainer>
    </AppContainer>
  );
};

export default Layout;
