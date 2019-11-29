import AsyncStorage from '@react-native-community/async-storage';

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem('token');
  return token !== null;
};

export const getToken = async () => await AsyncStorage.getItem('token');

export const onSignIn = async token => AsyncStorage.setItem('token', token);

export const onSignOut = async () => AsyncStorage.removeItem('token');
