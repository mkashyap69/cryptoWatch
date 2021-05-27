import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import LoginButton from './LoginButton';
import logo from './logo.png';

const Header = () => {
  const user = useSelector((state) => state.user.data);

  const logout = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      withCredentials: true,
    };
    await axios.get('http://localhost:9000/api/v1/auth/logoutUser', config);
    window.location.reload();
  };

  return (
    <div className="header">
      <Image src={logo} alt="logo" />
      {!user ? (
        <LoginButton />
      ) : (
        <Button colorScheme="red" onClick={logout}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default Header;
