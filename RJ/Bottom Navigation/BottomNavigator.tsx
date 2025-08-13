import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
} from 'react-native';
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

type TabKey = 'Home' | 'Search' | 'SavingsPlan' | 'Account';

const TAB_META: Record<TabKey, {icon: () => JSX.Element; label: string}> = {
  Home: {icon: () => <HomeIcon width={24} height={24} />, label: 'Home'},
  Search: {icon: () => <SearchIcon width={24} height={24} />, label: 'Search'},
  SavingsPlan: {icon: () => <OffersIcon width={24} height={24} />, label: 'Savings'},
  Account: {icon: () => <UserIcon width={24} height={24} />, label: 'Account'},
};

const BottomNavigator = () => {
  const tabs = Object.keys(TAB_META) as TabKey[];

  // Icon scale animation per tab
  const animatedScales = useRef<Record<TabKey, Animated.Value>>({
    Home: new Animated.Value(1),
    Search: new Animated.Value(1),
    SavingsPlan: new Animated.Value(1),
    Account: new Animated.Value(1),
  }).current;

  // Label slide and opacity animations per tab
  const animatedTranslate = useRef<Record<TabKey, Animated.Value>>({
    Home: new Animated.Value(0),
    Search: new Animated.Value(0),
    SavingsPlan: new Animated.Value(0),
    Account: new Animated.Value(0),
  }).current;
  const animatedOpacity = useRef<Record<TabKey, Animated.Value>>({
    Home: new Animated.Value(1),
    Search: new Animated.Value(0),
    SavingsPlan: new Animated.Value(0),
    Account: new Animated.Value(0),
  }).current;

  // Center (MyTijori) label animations
  const myTijoriTranslate = useRef(new Animated.Value(0)).current;
  const myTijoriOpacity = useRef(new Animated.Value(0)).current;

  const [selectedTab, setSelectedTab] = useState<TabKey | 'MyTijori'>('Home');
  const [previousTab, setPreviousTab] = useState<TabKey | 'MyTijori'>('Home');

  const animateIcon = (tabName: TabKey) => {
    Animated.sequence([
      Animated.timing(animatedScales[tabName], {
        toValue: 1.1,
        duration: 70,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedScales[tabName], {
        toValue: 1,
        duration: 70,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateLabel = (
    tabName: TabKey | 'MyTijori',
    direction: 'left' | 'right' = 'left',
  ) => {
    const offset = direction === 'left' ? -20 : 20;

    if (tabName === 'MyTijori') {
      myTijoriTranslate.setValue(offset);
      myTijoriOpacity.setValue(0);
      Animated.parallel([
        Animated.spring(myTijoriTranslate, {
          toValue: 0,
          tension: 30,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(myTijoriOpacity, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    // Reset other tabs
    tabs.forEach(key => {
      if (key !== tabName) {
        animatedTranslate[key].setValue(0);
        animatedOpacity[key].setValue(0);
      }
    });

    animatedTranslate[tabName].setValue(offset);
    animatedOpacity[tabName].setValue(0);
    Animated.parallel([
      Animated.spring(animatedTranslate[tabName], {
        toValue: 0,
        tension: 30,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(animatedOpacity[tabName], {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (selectedTab !== previousTab) {
      const selectedIndex = tabs.indexOf(selectedTab as TabKey);
      const prevIndex = tabs.indexOf(previousTab as TabKey);
      const direction: 'left' | 'right' =
        selectedIndex !== -1 && prevIndex !== -1 && selectedIndex > prevIndex
          ? 'right'
          : 'left';

      animateLabel(selectedTab, direction);
      setPreviousTab(selectedTab);
    }
  }, [selectedTab]);

  const renderCircle = ({selectedTab: _selectedTab, navigate}: any) => (
    <View style={styles.circleWrapper}>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => {
          setSelectedTab('MyTijori');
          navigate('MyTijori');
        }}
        activeOpacity={0.7}>
        <GoldIcon width={26} height={26} />
      </TouchableOpacity>
      <Animated.View style={{marginTop: -4, alignItems: 'center', height: 20}}>
        <Animated.Text
          style={[
            styles.centerLabel,
            {
              transform: [{translateX: myTijoriTranslate}],
              opacity: myTijoriOpacity,
            },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit>
          {selectedTab === 'MyTijori' ? 'My Tijori' : ''}
        </Animated.Text>
      </Animated.View>
    </View>
  );

  const renderTabBar = ({
    routeName,
    selectedTab: currentTab,
    navigate,
  }: {
    routeName: string;
    selectedTab: string;
    navigate: (name: string) => void;
  }) => {
    const key = routeName as TabKey;
    const meta = TAB_META[key];
    if (!meta) {
      return <View style={{width: 0, height: 0}} />;
    }

    const isActive = currentTab === routeName;
    const Icon = meta.icon;

    return (
      <TouchableOpacity
        key={routeName}
        onPress={() => {
          animateIcon(key);
          setSelectedTab(key);
          navigate(routeName);
        }}
        style={styles.tabItem}
        activeOpacity={0.7}>
        <Animated.View
          style={{
            marginTop: 2,
            transform: [{scale: animatedScales[key]}],
          }}>
          <Icon />
        </Animated.View>
        <View style={{height: 18, marginTop: 5, overflow: 'hidden'}}>
          <Animated.View
            style={{
              transform: [{translateX: animatedTranslate[key]}],
              opacity: animatedOpacity[key],
            }}>
            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.activeLabel : styles.inactiveLabel,
              ]}>
              {meta.label}
            </Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <CurvedBottomBar.Navigator
        type="UP"
        style={styles.bottomBar}
        height={Platform.OS === 'ios' ? 90 : 80}
        circleWidth={60}
        bgColor="#FFF2DD"
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: false,
        }}
        borderTopLeftRight
        renderCircle={renderCircle}
        tabBar={renderTabBar}>
        <CurvedBottomBar.Screen name="Home" position="LEFT" component={Home} />
        <CurvedBottomBar.Screen name="Search" position="LEFT" component={Search} />
        <CurvedBottomBar.Screen
          name="MyTijori"
          position="CIRCLE"
          component={MyTijoriWrapper}
        />
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
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleButton: {
    backgroundColor: '#B88731',
    borderRadius: 32,
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#B88731',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 4,
    top: -16,
  },
  centerLabel: {
    fontSize: 11,
    color: '#B88731',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 80,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeLabel: {
    color: '#B88731',
  },
  inactiveLabel: {
    color: 'transparent',
  },
});

export default BottomNavigator;
