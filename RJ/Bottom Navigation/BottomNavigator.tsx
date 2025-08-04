import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';

import Home from './Home';
import Search from './Search';
import SavingsPlan from './SavingsPlan/SavingsPlan';
import Account from './Account';
import MyTijori from './MyTijori';

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import OffersIcon from '../assets/saving2.svg';
import UserIcon from '../assets/user.svg';
import GoldIcon from '../assets/mdi_gold.svg';

const MyTijoriWrapper = () => (
  <View style={{flex: 1}}>
    <MyTijori />
  </View>
);

const TAB_META = {
  Home: {
    icon: <HomeIcon width={24} height={24} />,
    label: 'Home',
  },
  Search: {
    icon: <SearchIcon width={24} height={24} />,
    label: 'Search',
  },
  SavingsPlan: {
    icon: <OffersIcon width={24} height={24} />,
    label: 'Savings',
  },
  Account: {
    icon: <UserIcon width={24} height={24} />,
    label: 'Account',
  },
};

const BottomNavigator = () => {
  const renderCircle = ({selectedTab, navigate}) => (
    <View style={styles.circleWrapper}>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => navigate('MyTijori')}
        activeOpacity={0.7}>
        <GoldIcon width={28} height={28} />
      </TouchableOpacity>
      <Text
        style={[
          styles.centerLabel,
          {opacity: selectedTab === 'MyTijori' ? 1 : 0},
        ]}>
        My Tijori
      </Text>
    </View>
  );

  const renderTabBar = ({routeName, selectedTab, navigate}) => {
    const {icon, label} = TAB_META[routeName] || {};
    const isActive = selectedTab === routeName;

    return (
      <TouchableOpacity
        key={routeName}
        onPress={() => navigate(routeName)}
        style={styles.tabItem}
        activeOpacity={0.7}>
        <View style={styles.iconWrapper}>
          {icon}
          {isActive && <Text style={styles.tabLabel}>{label}</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <CurvedBottomBar.Navigator
        type="UP"
        style={styles.bottomBar}
        height={90}
        circleWidth={60}
        bgColor="#FFF2DD"
        initialRouteName="Home"
        screenOptions={{headerShown: false}}
        borderTopLeftRight
        renderCircle={renderCircle}
        tabBar={renderTabBar}>
        <CurvedBottomBar.Screen name="Home" position="LEFT" component={Home} />
        <CurvedBottomBar.Screen
          name="Search"
          position="LEFT"
          component={Search}
        />
        <CurvedBottomBar.Screen name="MyTijori" component={MyTijoriWrapper} />
        <CurvedBottomBar.Screen
          name="SavingsPlan"
          position="RIGHT"
          component={SavingsPlan}
        />
        <CurvedBottomBar.Screen
          name="Account"
          position="RIGHT"
          component={Account}
        />
      </CurvedBottomBar.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomBar: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4, // less vertical gap from bottom
  },
  circleButton: {
    backgroundColor: '#B88731',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#B88731',
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
    top: -13, // previously -20 → now less floating
  },
  centerLabel: {
    fontSize: 11,
    color: '#B88731',
    fontWeight: 'bold',
    marginTop: -2, // pulled closer to the button
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    flex: 1,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    color: '#B88731',
    fontWeight: 'bold',
    marginTop: 1,
  },
});

export default BottomNavigator;
