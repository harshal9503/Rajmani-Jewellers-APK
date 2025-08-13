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
  const animatedTranslateOut = useRef({}).current; // For sliding out current text
  const animatedTranslateIn = useRef({}).current;  // For sliding in new text
  const animatedOpacityOut = useRef({}).current;   // For fading out current text
  const animatedOpacityIn = useRef({}).current;    // For fading in new text
  const tabs = Object.keys(TAB_META);

  tabs.forEach(key => {
    if (!animatedScales[key]) animatedScales[key] = new Animated.Value(1);
    if (!animatedTranslateOut[key]) animatedTranslateOut[key] = new Animated.Value(0);
    if (!animatedTranslateIn[key]) animatedTranslateIn[key] = new Animated.Value(0);
    if (!animatedOpacityOut[key]) animatedOpacityOut[key] = new Animated.Value(key === 'Home' ? 1 : 0);
    if (!animatedOpacityIn[key]) animatedOpacityIn[key] = new Animated.Value(key === 'Home' ? 1 : 0);
  });

  const myTijoriTranslate = useRef(new Animated.Value(0)).current;
  const myTijoriOpacity = useRef(new Animated.Value(0)).current;

  const [selectedTab, setSelectedTab] = useState('Home');
  const [previousTab, setPreviousTab] = useState('Home');
  const [displayedLabels, setDisplayedLabels] = useState(
    tabs.reduce((acc, tab) => ({...acc, [tab]: tab === 'Home' ? TAB_META[tab].label : ''}), {})
  );

  const animateIcon = tabName => {
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

  const animateLabel = (newTab, oldTab, direction = 'left') => {
    const slideOffset = direction === 'left' ? -30 : 30;
    const slideInOffset = direction === 'left' ? 30 : -30;

    if (newTab === 'MyTijori') {
      myTijoriTranslate.setValue(slideInOffset);
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

    // Step 1: Slide out the old tab text
    if (oldTab && oldTab !== newTab && oldTab !== 'MyTijori') {
      Animated.parallel([
        Animated.timing(animatedTranslateOut[oldTab], {
          toValue: slideOffset,
          duration: 150,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacityOut[oldTab], {
          toValue: 0,
          duration: 150,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Reset old tab position and update displayed label
        animatedTranslateOut[oldTab].setValue(0);
        setDisplayedLabels(prev => ({...prev, [oldTab]: ''}));
      });
    }

    // Step 2: Slide in the new tab text
    setTimeout(() => {
      // Update displayed label for new tab
      setDisplayedLabels(prev => ({...prev, [newTab]: TAB_META[newTab].label}));
      
      // Set initial position for slide in animation
      animatedTranslateIn[newTab].setValue(slideInOffset);
      animatedOpacityIn[newTab].setValue(0);
      
      Animated.parallel([
        Animated.spring(animatedTranslateIn[newTab], {
          toValue: 0,
          tension: 35,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacityIn[newTab], {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    }, oldTab && oldTab !== newTab && oldTab !== 'MyTijori' ? 75 : 0);
  };

  useEffect(() => {
    if (selectedTab !== previousTab) {
      const newTabIndex = tabs.indexOf(selectedTab);
      const oldTabIndex = tabs.indexOf(previousTab);
      
      let direction = 'left';
      if (selectedTab === 'MyTijori' || previousTab === 'MyTijori') {
        // Handle MyTijori transitions
        if (selectedTab === 'MyTijori') {
          direction = newTabIndex < 2 ? 'right' : 'left';
        } else {
          direction = oldTabIndex < 2 ? 'left' : 'right';
        }
      } else {
        direction = newTabIndex > oldTabIndex ? 'right' : 'left';
      }

      animateLabel(selectedTab, previousTab, direction);
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
        activeOpacity={0.7}>
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
        <View style={{height: 18, marginTop: 5, overflow: 'hidden'}}>
          {/* Sliding out text */}
          <Animated.View
            style={[
              styles.textContainer,
              {
                transform: [{translateX: animatedTranslateOut[routeName]}],
                opacity: animatedOpacityOut[routeName],
              },
            ]}>
            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.activeLabel : styles.inactiveLabel,
              ]}>
              {displayedLabels[routeName]}
            </Text>
          </Animated.View>
          
          {/* Sliding in text */}
          <Animated.View
            style={[
              styles.textContainer,
              {
                position: 'absolute',
                transform: [{translateX: animatedTranslateIn[routeName]}],
                opacity: animatedOpacityIn[routeName],
              },
            ]}>
            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.activeLabel : styles.inactiveLabel,
              ]}>
              {displayedLabels[routeName]}
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
  textContainer: {
    width: '100%',
    alignItems: 'center',
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