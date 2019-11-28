import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import logo from './assets/instagram.png';

import FeedPage from './pages/Feed';
import NewPostPage from './pages/NewPost';

const FeedNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedPage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FoundationIcon
            style={{ paddingTop: 8 }}
            name="home"
            size={28}
            color={tintColor}
          />
        ),
        title: '',
      },
    },
    // NewPost: {
    //   screen: NewPostPage,
    //   navigationOptions: {
    //     tabBarIcon: ({ tintColor }) => (
    //       <EntypoIcon
    //         style={{ paddingTop: 8 }}
    //         name="circle-with-plus"
    //         size={28}
    //         color={tintColor}
    //       />
    //     ),
    //     title: '',
    //   },
    // },
  },
  {
    initialRouteName: 'Feed',
    tabBarOptions: {
      activeTintColor: '#333',
      inactiveTintColor: 'gray',
    },
  },
);

const Routes = createAppContainer(
  createStackNavigator(
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
  ),
);

export default Routes;
