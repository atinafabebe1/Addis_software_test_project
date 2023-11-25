import React from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';
import logo2 from '../assets/images/logo2.png';

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 40px;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to right, #1a1a1a, #333333);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.img`
  width: 95px;
  height: 70px;
`;

const AppTitle = styled.h1`
  font-size: 24px;
  margin: 0;
  color: #fff;
  margin-left: 10px;
  font-weight: bold;
`;

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavbarContainer>
      <LogoContainer onClick={() => navigate('/')}>
        <Logo src={logo2} alt="Musicify Logo" />
        <AppTitle>Musicify</AppTitle>
      </LogoContainer>
    </NavbarContainer>
  );
};

export default Navbar;
