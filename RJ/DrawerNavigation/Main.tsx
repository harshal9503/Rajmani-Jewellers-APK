import {View, Text} from 'react-native';
import React from 'react';
import Bottom from '../Bottom Navigation/BottomNavigator';
import BottomNavigator from '../Bottom Navigation/BottomNavigator';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const Component = props => (
  <View
    style={{
      width: scale(30),
      height: verticalScale(50),
      padding: moderateScale(5),
    }}
  />
);
const Main = () => {
  return (
    <View style={{flex: 1}}>
      <BottomNavigator />
    </View>
  );
};

export default Main;
