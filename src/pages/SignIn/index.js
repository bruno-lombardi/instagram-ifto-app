import React, { useState, useEffect } from 'react';
import { StatusBar, Image, ToastAndroid, Keyboard } from 'react-native';

import {
  Container,
  LoginForm,
  Logo,
  FormInput,
  FormSubmit,
  FormSubmitText,
  SignUpContainer,
  SignUpHighlight,
  SignUpText,
} from './styles';
import logo from '../../assets/instagram_white.png';

import api from '../../services/api';
import { onSignIn } from '../../services/auth';

function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showFooter, setShowFooter] = useState(true);

  async function signIn() {
    try {
      const response = await api.post('/api/v1/auth/signin', {
        email,
        password,
      });
      console.log(response);
      const { token } = response.data;
      await onSignIn(token);
      navigation.navigate('SignedIn');
    } catch (err) {
      console.log(JSON.stringify(err.response.data));
      ToastAndroid.showWithGravity(
        'Erro ao fazer login. Verique seu email e senha!',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }
  }

  function goToSignUp() {
    navigation.navigate('SignUp');
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setShowFooter(false));
    Keyboard.addListener('keyboardDidHide', () => setShowFooter(true));

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Container
        colors={['#B21E89', '#D03157']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <LoginForm>
          <Logo>
            <Image source={logo} />
          </Logo>
          <FormInput
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.7)"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <FormInput
            placeholder="Senha"
            placeholderTextColor="rgba(255,255,255,0.7)"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <FormSubmit
            onPress={signIn}
            disabled={!email.trim().length || !password.trim().length}>
            <FormSubmitText>Entrar</FormSubmitText>
          </FormSubmit>
        </LoginForm>

        {showFooter && (
          <SignUpContainer>
            <SignUpHighlight activeOpacity={0.6} onPress={goToSignUp}>
              <SignUpText>Criar uma conta</SignUpText>
            </SignUpHighlight>
          </SignUpContainer>
        )}
      </Container>
    </>
  );
}

SignIn.navigationOptions = ({ navigation }) => ({
  headerVisible: false,
});

export default SignIn;
