import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import logo from './assets/instagram.png';

import FeedPage from './pages/Feed';
import NewPostPage from './pages/NewPost';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const Authorized = createStackNavigator(
  {
    Home: {
      screen: FeedPage,
    },
    NewPost: {
      screen: NewPostPage,
    },
  },
  {
    initialRouteName: 'Home',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerTitle: <Image source={logo} />,
      headerStyle: {
        backgroundColor: '#f5f5f5',
      },
    },
  },
);

const Unauthorized = createStackNavigator(
  {
    SignUp: {
      screen: SignUp,
    },
    SignIn: {
      screen: SignIn,
    },
  },
  {
    initialRouteName: 'SignIn',
    headerMode: 'none',
    defaultNavigationOptions: {
      headerVisible: false,
    },
  },
);

export const createRootNavigator = (signedIn = false) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        SignedIn: {
          screen: Authorized,
        },
        SignedOut: {
          screen: Unauthorized,
        },
      },
      {
        initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
      },
    ),
  );
};

export default createRootNavigator;
