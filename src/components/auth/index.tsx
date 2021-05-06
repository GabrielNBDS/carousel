import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from 'react-icons/fi';
import fire from '../../lib/firebase';
import { useAuth } from '../../hooks/auth';

interface IFormData {
  name?: string;
  email: string;
  password: string;
}

interface IProps {
  onSignIn?: () => void;
  onSignUp?: () => void;
  onSignInOrSignUp?: () => void;
}

const Auth: React.FC<IProps> = props => {
  const [authFormError, setAuthFormError] = useState('');
  const [resetPasswordError, setResetPasswordError] = useState('');

  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(!show);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { register, handleSubmit } = useForm();
  const [authLoading, setAuthLoading] = useState(false);

  const [isSigningUp, setIsSigningUp] = useState(false);

  const { signUpWithEmailAndPassword, signInWithEmailAndPassword } = useAuth();

  const clearErrors = () => {
    setResetPasswordError('');
    setAuthFormError('');
  };

  const onSubmit = async ({ email, password, name }: IFormData) => {
    setAuthLoading(true);
    clearErrors();

    try {
      if (isSigningUp) {
        await signUpWithEmailAndPassword(name, email, password);

        if (props.onSignUp) {
          props.onSignUp();
        }
      } else {
        await signInWithEmailAndPassword(email, password);
        toast({
          title: 'Logado com sucesso!',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });

        if (props.onSignIn) {
          props.onSignIn();
        }
      }

      if (props.onSignInOrSignUp) {
        props.onSignInOrSignUp();
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setAuthFormError('Usuário não encontrado.');
          break;

        case 'auth/email-already-in-use':
          setAuthFormError('E-mail em uso.');
          break;

        case 'auth/weak-password':
        case 'auth/invalid-password':
          setAuthFormError('A senha deve conter 6 caracteres.');
          break;

        case 'auth/wrong-password':
          setAuthFormError('Senha incorreta');
          break;

        default:
          setAuthFormError('Ocorreu um erro. Tente novamente.');
          break;
      }

      setAuthLoading(false);
    }
  };

  const {
    register: resetPasswordRegister,
    handleSubmit: resetPasswordHandleSubmit,
  } = useForm();
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);

  const resetPassword = ({ email }) => {
    setResetPasswordLoading(true);
    clearErrors();

    fire
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        toast({
          title: 'E-mail enviado!',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });

        onClose();
        setResetPasswordLoading(false);
        clearErrors();
      })
      .catch(() => {
        setResetPasswordLoading(false);
        setResetPasswordError('E-mail não encontrado.');
      });
  };

  return (
    <>
      <Stack
        marginX="auto"
        maxW={400}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={4}
      >
        {isSigningUp && (
          <Box>
            <Text fontWeight="600" mb={1}>
              Nome
            </Text>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FiUser} color="gray.300" />}
              />
              <Input
                disabled={authLoading}
                type="text"
                name="Nome"
                {...register('name')}
                required
              />
            </InputGroup>
          </Box>
        )}

        <Box>
          <Text fontWeight="600" mb={1}>
            Email
          </Text>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children={<Icon as={FiMail} color="gray.300" />}
            />
            <Input
              disabled={authLoading}
              type="email"
              name="email"
              {...register('email')}
              required
            />
          </InputGroup>
        </Box>

        <Box>
          <Text fontWeight="600" mb={1}>
            Senha
          </Text>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children={<Icon as={FiLock} color="gray.300" />}
            />
            <Input
              disabled={authLoading}
              name="senha"
              type={show ? 'text' : 'password'}
              {...register('password')}
              required
            />
            <InputRightElement width="4.5rem">
              <IconButton
                _focus={{ boxShadow: 'none' }}
                aria-label={show ? 'Esconder senha' : 'Exibir senha'}
                variant="unstyled"
                onClick={handleShow}
                isDisabled={authLoading}
                icon={show ? <Icon as={FiEyeOff} /> : <Icon as={FiEye} />}
              />
            </InputRightElement>
          </InputGroup>
        </Box>

        {authFormError && (
          <Alert status="error">
            <AlertIcon />
            {authFormError}
          </Alert>
        )}

        <Button
          isLoading={authLoading}
          type="submit"
          colorScheme="blue"
          color="white"
          width="100%"
        >
          {isSigningUp ? 'Cadastrar' : 'Entrar'}
        </Button>

        <Button
          onClick={() => {
            clearErrors();
            setIsSigningUp(!isSigningUp);
          }}
          isDisabled={authLoading}
          colorScheme="blue"
          variant="outline"
        >
          {isSigningUp ? 'Entrar' : 'Cadastrar'}
        </Button>

        <Button isDisabled={authLoading} variant="unstyled" onClick={onOpen}>
          Recuperar senha
        </Button>
      </Stack>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          clearErrors();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Coloque seu email</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={resetPasswordHandleSubmit(resetPassword)}>
            <ModalBody>
              <Input
                name="email"
                type="email"
                {...resetPasswordRegister('email')}
                required
              />

              {resetPasswordError && (
                <Alert mt={4} status="error">
                  <AlertIcon />
                  {resetPasswordError}
                </Alert>
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                isDisabled={resetPasswordLoading}
                variant="ghost"
                mr={3}
                onClick={onClose}
              >
                Fechar
              </Button>
              <Button
                isLoading={resetPasswordLoading}
                type="submit"
                color="white"
                colorScheme="blue"
              >
                Recuperar senha
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Auth;
