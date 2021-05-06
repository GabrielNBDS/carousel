import React from 'react';
import { Container, Image } from '@chakra-ui/react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Carousel from '../components/Carousel';

const Home: React.FC = () => {
  return (
    <Container maxW="1200px">
      <Carousel>
        <Image
          width="300px"
          height="300px"
          src="https://images.unsplash.com/photo-1620291699655-d958150a3ff8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        />
        <Image
          width="300px"
          height="300px"
          src="https://images.unsplash.com/photo-1620307262982-6a53092802f3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        />
        <Image
          width="300px"
          height="300px"
          src="https://images.unsplash.com/photo-1620259570543-31964aa22586?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        />
        <Image
          width="300px"
          height="300px"
          src="https://images.unsplash.com/photo-1620283591389-ab302f5bf063?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
        />
        <Image
          width="300px"
          height="300px"
          src="https://images.unsplash.com/photo-1620243334642-fafaa1717016?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        />
        <Image
          width="300px"
          height="300px"
          src="https://images.unsplash.com/photo-1620223741726-7d39ff6e4e6c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80"
        />
        <Image
          width="300px"
          height="300px"
          src="https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        />
        <Image
          width="300px"
          height="300px"
          src="https://images.unsplash.com/photo-1619983403504-c22e32aedc6c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        />
        <Image
          width="300px"
          height="300px"
          src="https://images.unsplash.com/photo-1620011639838-06a4d037edb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=652&q=80"
        />
        <Image
          width="300px"
          height="300px"
          src="https://images.unsplash.com/photo-1620028193525-43352539de1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=730&q=80"
        />
        <Image
          width="300px"
          height="300px"
          src="https://images.unsplash.com/photo-1619969888884-6523aa49c6ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        />
      </Carousel>
    </Container>
  );
};

export default Home;
