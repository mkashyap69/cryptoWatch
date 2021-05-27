import React from 'react';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import LoginModal from './LoginModal';

const LoginButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen}>Log In</Button>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default LoginButton;
