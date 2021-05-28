/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Stack, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/modal';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Select } from '@chakra-ui/select';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { addToPortfolioTransactions } from './redux/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router';
import './css/AddModal.css';

const AddToPortfolioModal = ({ isOpen, onClose }) => {
  const [total, setTotal] = useState(0);
  const [coinName, setCoinName] = useState();
  const [coinNameToShow, setCoinNameToShow] = useState();
  const [coinNameOb, setCoinNameOb] = useState({});
  const [transactionDate, setTransactionDate] = useState();
  const [coinQuantity, setCoinQuantity] = useState(0);
  const [transactionType, setTransactionType] = useState('Buy');
  const [coinPrice, setCoinPrice] = useState(0);
  const [symbolArray, setSymbolArray] = useState([]);
  const user = useSelector((state) => state.user.data);
  const history = useHistory();

  const dispatch = useDispatch();
  let coinNameObject = {};

  const fetchRates = async () => {
    const token = user?.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `/api/v1/apiData?sortKey=market_cap&limit=400`,
      config
    );

    data.data.data.forEach((d) => {
      coinNameObject[d.symbol] = d.name;
      setSymbolArray(Object.keys(coinNameObject));
    });
    setCoinNameOb(coinNameObject);
  };
  useEffect(() => {
    fetchRates();
  }, []);

  useEffect(() => {
    setCoinNameToShow(coinNameOb[coinName]);
  }, [coinName, coinNameOb]);

  useEffect(() => {
    setTotal(coinPrice * coinQuantity);
  }, [coinPrice, coinQuantity]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const obj = {
      coinName,
      transactionDate,
      coinQuantity,
      transactionType,
      coinPrice,
      total,
    };

    dispatch(addToPortfolioTransactions(obj));

    window.location.reload();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalContent>
        <ModalHeader>Add To Portfolio</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form className="modal-form" onSubmit={onFormSubmit}>
            <div className="select-coin">
              <Stack>
                <FormLabel>Select Coin</FormLabel>
                <Select
                  placeholder="Select Coin"
                  name="coin"
                  onChange={(e) => setCoinName(e.target.value)}
                  value={coinName}
                  isRequired
                >
                  {symbolArray.map((s) => (
                    <option key={Math.random()}>{s}</option>
                  ))}
                </Select>
                <Input
                  type="text"
                  size="lg"
                  placeholder="Quantity"
                  isReadOnly={true}
                  name="coinName"
                  value={coinNameToShow || 'Coin Name'}
                />
              </Stack>
            </div>

            <div className="select-transaction">
              <RadioGroup
                name="transaction"
                onChange={(e) => setTransactionType(e)}
                isRequired
              >
                <Stack spacing={5} direction="row">
                  <Radio size="lg" colorScheme="green" value="Buy">
                    Buy
                  </Radio>
                  <Radio size="lg" colorScheme="red" value="Sell">
                    Sell
                  </Radio>
                </Stack>
              </RadioGroup>
            </div>

            <div className="select-quantity">
              <Stack direction="row" spacing={4}>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="Quantity"
                    name="quantity"
                    step="0.001"
                    onChange={(e) => setCoinQuantity(e.target.value)}
                    isRequired
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="₹"
                  />
                  <Input
                    type="number"
                    placeholder="Price Per Coin"
                    name="price"
                    step="0.001"
                    onChange={(e) => setCoinPrice(e.target.value)}
                    isRequired
                  />
                </InputGroup>
              </Stack>
            </div>
            <div className="select-date">
              <input
                type="datetime-local"
                placeholder="Date & Time"
                name="datetime"
                onChange={(e) => setTransactionDate(e.target.value)}
                required
              />
            </div>
            <div className="display-total">
              <Text mb={4}>Total Received</Text>
              <FormControl id="total">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="₹"
                  />
                  <Input
                    type="number"
                    size="lg"
                    placeholder="Quantity"
                    isReadOnly={true}
                    name="total"
                    value={total}
                  />
                </InputGroup>
              </FormControl>
            </div>
            <Stack className="button-stack" direction="row">
              <Button colorScheme="red" onClick={onClose}>
                Dismiss
              </Button>
              <Button type="submit" variant="solid" colorScheme="teal">
                Add
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddToPortfolioModal;
