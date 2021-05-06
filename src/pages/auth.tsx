import { Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import Auth from '../components/auth';

const AuthPage: React.FC = () => {
  const router = useRouter();

  return (
    <Container mt="10vw">
      <Auth onSignInOrSignUp={() => router.replace('/dashboard')} />
    </Container>
  );
};

export default AuthPage;
