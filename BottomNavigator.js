import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  Image,
} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';

import Home from './Home';
import Search from './Search';
import SavingsPlan from './SavingsPlan/SavingsPlan';
import Account from './Account';
import MyTijori from './MyTijori';

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import SavingsIcon from '../assets/Savingsplannew.png';
import UserIcon from '../assets/user.svg';
import GoldIcon from '../assets/mdi_gold.svg';

const MyTijoriWrapper = () => (
  <View style={{flex: 1}}>
    <MyTijori />
  </View>
);

const TAB_META = {
  Home: {icon: HomeIcon, label: 'Home'},
  Search: {icon: SearchIcon, label: 'Search'},
  SavingsPlan: {
    icon: () => (
      <Image
        source={SavingsIcon}
        style={{width: 24, height: 24, tintColor: '#B88731'}}
      />
    ),
    label: 'Saving Plan',
  },
  Account: {icon: UserIcon, label: 'Account'},
};

const BottomNavigator = () => {
  const animatedScales = useRef({}).current;
  const animatedTranslate = useRef({}).current;
  const animatedOpacity = useRef({}).current;
  const tabs = Object.keys(TAB_META);

  tabs.forEach(key => {
    if (!animatedScales[key]) animatedScales[key] = new Animated.Value(1);
    if (!animatedTranslate[key]) animatedTranslate[key] = new Animated.Value(0);
    if (!animatedOpacity[key])
      animatedOpacity[key] = new Animated.Value(key === 'Home' ? 1 : 0);
  });

  const myTijoriTranslate = useRef(new Animated.Value(0)).current;
  const myTijoriOpacity = useRef(new Animated.Value(0)).current;

  const [selectedTab, setSelectedTab] = useState('Home');
  const [previousTab, setPreviousTab] = useState('Home');

  const animateIcon = tabName => {
    Animated.sequence([
      Animated.timing(animatedScales[tabName], {
        toValue: 1.15,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(animatedScales[tabName], {
        toValue: 1,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateLabel = (tabName, direction = 'left') => {
    const offset = direction === 'left' ? -40 : 40;
    
    if (tabName === 'MyTijori') {
      myTijoriTranslate.setValue(offset);
      myTijoriOpacity.setValue(0);
      Animated.parallel([
        Animated.spring(myTijoriTranslate, {
          toValue: 0,
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(myTijoriOpacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset all other tab animations first
      tabs.forEach(key => {
        if (key !== tabName) {
          animatedOpacity[key].setValue(0);
          animatedTranslate[key].setValue(0);
        }
      });

      // Animate the selected tab
      animatedTranslate[tabName].setValue(offset);
      animatedOpacity[tabName].setValue(0);
      
      Animated.parallel([
        Animated.spring(animatedTranslate[tabName], {
          toValue: 0,
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity[tabName], {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  useEffect(() => {
    if (selectedTab !== previousTab) {
      const direction =
        tabs.indexOf(selectedTab) > tabs.indexOf(previousTab)
          ? 'right'
          : 'left';
      
      // Handle MyTijori transitions
      if (selectedTab === 'MyTijori' || previousTab === 'MyTijori') {
        if (selectedTab === 'MyTijori') {
          const newTabIndex = tabs.indexOf(previousTab);
          const dir = newTabIndex < 2 ? 'right' : 'left';
          animateLabel(selectedTab, dir);
        } else {
          const oldTabIndex = tabs.indexOf(selectedTab);
          const dir = oldTabIndex < 2 ? 'left' : 'right';
          animateLabel(selectedTab, dir);
        }
      } else {
        animateLabel(selectedTab, direction);
      }
      
      setPreviousTab(selectedTab);
    }
  }, [selectedTab]);

  const renderCircle = ({selectedTab, navigate}) => (
    <View style={styles.circleWrapper}>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => {
          setSelectedTab('MyTijori');
          navigate('MyTijori');
        }}
        activeOpacity={0.6}>
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

  const renderTabBar = ({routeName, selectedTab: currentTab, navigate}) => {
    const meta = TAB_META[routeName];
    if (!meta) return null;
    const IconComponent = meta.icon;
    const isActive = currentTab === routeName;

    return (
      <TouchableOpacity
        key={routeName}
        onPress={() => {
          animateIcon(routeName);
          setSelectedTab(routeName);
          navigate(routeName);
        }}
        style={styles.tabItem}
        activeOpacity={0.6}>
        <Animated.View
          style={{
            marginTop: 2,
            transform: [{scale: animatedScales[routeName]}],
          }}>
          {typeof IconComponent === 'function' ? (
            <IconComponent />
          ) : (
            <IconComponent width={24} height={24} />
          )}
        </Animated.View>
        <View style={styles.labelContainer}>
          <Animated.View
            style={[
              styles.labelWrapper,
              {
                transform: [{translateX: animatedTranslate[routeName]}],
                opacity: animatedOpacity[routeName],
              },
            ]}>
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
        circleWidth={64}
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
        <CurvedBottomBar.Screen
          name="Search"
          position="LEFT"
          component={Search}
        />
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
  labelContainer: {
    height: 18,
    marginTop: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  labelWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
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