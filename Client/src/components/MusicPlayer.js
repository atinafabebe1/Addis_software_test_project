import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const MusicPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(45deg, #1a1a1a, #2e2e2e);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  width: 100%;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(45deg, #0d0d0d, #1e1e1e);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);
  }
`;

const CoverImage = styled.img`
  max-width: 90%;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 20px rgba(44, 62, 80, 0.4);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const AudioPlayerStyled = styled(AudioPlayer)`
  .rhap_main {
    background: linear-gradient(45deg, #1e1e1e, #2e2e2e);
    border-radius: 20px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.4);
    padding: 12px;
  }

  .rhap_progress-bar {
    background: linear-gradient(45deg, #ff6f00, #ffcc00); /* Gradient Orange-Yellow */
    height: 6px;
    border-radius: 3px;
  }

  .rhap_progress-filled {
    background: linear-gradient(45deg, #ffcc00, #ff6f00); /* Gradient Yellow-Orange */
    height: 100%;
    border-radius: 3px;
  }

  .rhap_time {
    color: #b3b3b3;
    font-size: 0.9em;
    margin-top: 5px;
  }

  .rhap_volume-bar,
  .rhap_volume-indicator {
    background: #f2f2f2;
    height: 6px;
    border-radius: 3px;
  }

  .rhap_volume-filled {
    background: linear-gradient(45deg, #ffcc00, #ff6f00); /* Gradient Yellow-Orange */
    height: 100%;
    border-radius: 3px;
  }
`;

const PlayerInfo = styled.div`
  margin-top: 8px;
  text-align: center;

  h3 {
    margin-bottom: 6px;
    font-size: 1.6em;
    color: #ffcc00; 
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }

  p {
    font-size: 1.2em;
    color: #bdc3c7;
    font-style: italic;
  }
`;

const MusicPlayerComponent = () => {
  const isPlaying = useSelector((state) => state.songs.isPlaying);
  const selectedSong = useSelector((state) => state.songs.selectedSong);
  const [volume, setVolume] = useState(0.5);

  return (
    <MusicPlayerContainer>
      {selectedSong && <CoverImage src={selectedSong.coverImage?.secure_url} alt="Cover" />}
      <AudioPlayerStyled autoPlay={selectedSong && isPlaying} src={selectedSong.file.secure_url} volume={volume} />
      {selectedSong && (
        <PlayerInfo>
          <h3>{selectedSong.title}</h3>
          <p>{selectedSong.artist}</p>
        </PlayerInfo>
      )}
    </MusicPlayerContainer>
  );
};

export default MusicPlayerComponent;
