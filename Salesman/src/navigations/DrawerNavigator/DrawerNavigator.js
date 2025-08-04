import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, StyleSheet } from 'react-native';

import ContactScreen from '../../screens/ContactScreen/ContactScreen';
import AboutScreen from '../../screens/AboutScreen/AboutScreen';
import BottomTabNavigator from '../BottomNavigator/BottomTabNavigator';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={({ route }) => ({
        drawerActiveBackgroundColor: '#fff',
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#555',
        drawerLabelStyle: {
          marginLeft: 10,
          fontSize: 16,
          fontWeight: '800',
        },
        drawerStyle: {
          width: 270, 
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
        },
        headerShown: false,
        drawerIcon: ({ focused, size, color }) => {
          const icons = {
            Home: require('../../assets/DrawerImg/home-outline.png'),
            Contact: require('../../assets/DrawerImg/contact.png'),
            'About Us': require('../../assets/DrawerImg/about.png'),
          };
          return (
            <Image
              source={icons[route.name]}
              style={[styles.icon, { tintColor: color }]}
            />
          );
        },
      })}
    >
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
      <Drawer.Screen name="About Us" component={AboutScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
