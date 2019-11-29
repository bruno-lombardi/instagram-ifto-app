import React, { useState, useEffect } from 'react';
import { Image, ToastAndroid } from 'react-native';

import {
  Container,
  SignUpForm,
  FormInput,
  FormSubmit,
  FormSubmitText,
  Logo,
} from './styles';
import api from '../../services/api';

import logo from '../../assets/instagram.png';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [canSubmit, setCanSubmit] = useState('');

  async function signIn() {
    try {
      const response = await api.post('/api/v1/auth/signup', {
        firstName,
        lastName,
        email,
        password,
      });
      const { user } = response.data;
      if (user.id) {
        navigation.pop();
        ToastAndroid.showWithGravity(
          'Você se cadastrou com sucesso. Entre na sua conta.',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    } catch (err) {
      console.log(err.response);
      ToastAndroid.showWithGravity(
        'Erro ao se cadastrar. Tente novamente!',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }
  }

  useEffect(() => {
    const formValid =
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      firstName.trim().length > 2 &&
      lastName.trim().length > 2;
    setCanSubmit(formValid);
  }, [email, password, firstName, lastName]);

  return (
    <Container behavior="height">
      <SignUpForm>
        <Logo>
          <Image source={logo} />
        </Logo>
        <FormInput
          placeholder="Nome"
          placeholderTextColor="#333"
          onChangeText={text => setFirstName(text)}
          value={firstName}
        />
        <FormInput
          placeholder="Sobrenome"
          placeholderTextColor="#333"
          onChangeText={text => setLastName(text)}
          value={lastName}
        />
        <FormInput
          placeholder="Email"
          placeholderTextColor="#333"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <FormInput
          placeholder="Senha"
          placeholderTextColor="#333"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <FormSubmit onPress={signIn} disabled={!canSubmit} activeOpacity={0.6}>
          <FormSubmitText>Cadastrar</FormSubmitText>
        </FormSubmit>
      </SignUpForm>
    </Container>
  );
}
