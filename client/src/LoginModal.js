/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  InputGroup,
  InputRightElement,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Button } from '@chakra-ui/button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './redux/actions/action';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const toast = useToast();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const error = useSelector((state) => state.user.error);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  useEffect(() => {
    if (user?.status === 'Success') {
      toast({
        title: 'Success',
        status: 'success',
        duration: 2000,
      });
    }
    if (error?.status === 'Error') {
      toast({
        description: error.message,
        status: 'warning',
        duration: 2000,
      });
    }
  }, [user, error]);

  const onSubmit = async () => {
    dispatch(login(email, password));
    //history.push('/');
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log In your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                placeholder="Enter Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onSubmit} colorScheme="blue" mr={3}>
              Login
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginModal;

/*if (data?.status === 'Success') {
      toast({
        title: 'Login Success.',
        description: 'You will be redirected to the main page',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    
    
    const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };*/
