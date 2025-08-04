import React from 'react';
import AppNavigator from './src/navigations/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const App = () => {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </>
  );
};
export default App;

