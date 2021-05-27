import React from 'react';
import './HomePage.css';
import image from './Crypto portfolio-amico.svg';
import { Image } from '@chakra-ui/image';

function HomePage() {
  return (
    <div className="mainpage-bottom">
      <Image src={image} className="homepage-image" />
    </div>
  );
}

export default HomePage;
