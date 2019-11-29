import React, { useState, useEffect } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { isSignedIn } from './services/auth';
import createRootNavigator from './routes';

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    isSignedIn()
      .then(res => {
        console.log(res);
        setSignedIn(res);
        setChecked(true);
      })
      .catch(err => console.log(err));
  }, []);

  const Routes = createRootNavigator(signedIn);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      {checked ? (
        <Routes />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      )}
    </>
  );
}
