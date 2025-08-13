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
  Dimensions,
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

const {width: screenWidth} = Dimensions.get('window');

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
  const animatedOpacity = useRef({}).current;
  const tabs = Object.keys(TAB_META);

  // Global sliding text animation
  const slidingTextTranslate = useRef(new Animated.Value(0)).current;
  const slidingTextOpacity = useRef(new Animated.Value(1)).current;
  const slidingTextScale = useRef(new Animated.Value(1)).current;

  tabs.forEach(key => {
    if (!animatedScales[key]) animatedScales[key] = new Animated.Value(1);
    if (!animatedOpacity[key])
      animatedOpacity[key] = new Animated.Value(key === 'Home' ? 1 : 0);
  });

  const myTijoriTranslate = useRef(new Animated.Value(0)).current;
  const myTijoriOpacity = useRef(new Animated.Value(0)).current;

  const [selectedTab, setSelectedTab] = useState('Home');
  const [previousTab, setPreviousTab] = useState('Home');
  const [slidingText, setSlidingText] = useState('Home');
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate exact tab positions for precise alignment
  const getTabPosition = tabIndex => {
    const totalTabs = 5; // Home, Search, MyTijori, SavingsPlan, Account
    const tabWidth = screenWidth / totalTabs;

    if (tabIndex < 2) {
      // Left side tabs (Home, Search)
      return tabIndex * tabWidth + tabWidth / 2;
    } else {
      // Right side tabs (SavingsPlan, Account) - account for center circle
      return (tabIndex + 1) * tabWidth + tabWidth / 2;
    }
  };

  const getMyTijoriPosition = () => {
    return screenWidth / 2;
  };

  const animateIcon = tabName => {
    Animated.sequence([
      Animated.timing(animatedScales[tabName], {
        toValue: 1.2,
        duration: 120,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      Animated.timing(animatedScales[tabName], {
        toValue: 1,
        duration: 120,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateTextSliding = (fromTab, toTab) => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Determine exact positions
    let fromPosition, toPosition;

    if (fromTab === 'MyTijori') {
      fromPosition = getMyTijoriPosition();
    } else {
      const fromIndex = tabs.indexOf(fromTab);
      fromPosition = getTabPosition(fromIndex);
    }

    if (toTab === 'MyTijori') {
      toPosition = getMyTijoriPosition();
    } else {
      const toIndex = tabs.indexOf(toTab);
      toPosition = getTabPosition(toIndex);
    }

    // Start with current text at current position
    slidingTextTranslate.setValue(fromPosition - screenWidth / 2);
    slidingTextOpacity.setValue(1);
    slidingTextScale.setValue(1);

    // Set the current tab text initially
    if (fromTab === 'MyTijori') {
      setSlidingText('My Tijori');
    } else {
      setSlidingText(TAB_META[fromTab].label);
    }

    // Hide all tab labels during animation
    tabs.forEach(key => {
      animatedOpacity[key].setValue(0);
    });
    myTijoriOpacity.setValue(0);

    // Show sliding text
    slidingTextOpacity.setValue(1);

    // First phase: slide current text towards target (50% of the way)
    const midPosition = fromPosition + (toPosition - fromPosition) * 0.5;
    
    Animated.parallel([
      Animated.timing(slidingTextTranslate, {
        toValue: midPosition - screenWidth / 2,
        duration: 200,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      Animated.timing(slidingTextScale, {
        toValue: 1.15,
        duration: 200,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      Animated.timing(slidingTextOpacity, {
        toValue: 0.7,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Change text to target tab text
      if (toTab === 'MyTijori') {
        setSlidingText('My Tijori');
      } else {
        setSlidingText(TAB_META[toTab].label);
      }

      // Second phase: slide new text to final position
      Animated.parallel([
        Animated.timing(slidingTextTranslate, {
          toValue: toPosition - screenWidth / 2,
          duration: 300,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          useNativeDriver: true,
        }),
        Animated.timing(slidingTextScale, {
          toValue: 1,
          duration: 300,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }),
        Animated.timing(slidingTextOpacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Animation complete - show the target tab label
        if (toTab === 'MyTijori') {
          myTijoriOpacity.setValue(1);
        } else {
          animatedOpacity[toTab].setValue(1);
        }

        // Hide sliding text
        slidingTextOpacity.setValue(0);
        setIsAnimating(false);
      });
    });
  };

  useEffect(() => {
    if (selectedTab !== previousTab && !isAnimating) {
      animateTextSliding(previousTab, selectedTab);
      setPreviousTab(selectedTab);
    }
  }, [selectedTab]);

  const renderCircle = ({selectedTab, navigate}) => (
    <View style={styles.circleWrapper}>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => {
          if (!isAnimating) {
            setSelectedTab('MyTijori');
            navigate('MyTijori');
          }
        }}
        activeOpacity={0.7}>
        <GoldIcon width={26} height={26} />
      </TouchableOpacity>
      <Animated.View style={{marginTop: -4, alignItems: 'center', height: 20}}>
        <Animated.Text
          style={[
            styles.centerLabel,
            {
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
          if (!isAnimating) {
            animateIcon(routeName);
            setSelectedTab(routeName);
            navigate(routeName);
          }
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
        <View style={styles.labelContainer}>
          <Animated.View
            style={[
              styles.labelWrapper,
              {
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

      {/* Global Sliding Text Overlay */}
      {(isAnimating || selectedTab === 'Home') && (
        <Animated.View
          style={[
            styles.slidingTextContainer,
            {
              transform: [
                {translateX: slidingTextTranslate},
                {scale: slidingTextScale},
              ],
              opacity: slidingTextOpacity,
            },
          ]}
          pointerEvents="none">
          <Text style={styles.slidingText}>{slidingText}</Text>
        </Animated.View>
      )}
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
  slidingTextContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 22 : 12,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    zIndex: 1000,
  },
  slidingText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#B88731',
    textAlign: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 242, 221, 0.95)',
    borderRadius: 10,
    paddingVertical: 3,
    minWidth: 60,
    shadowColor: '#B88731',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default BottomNavigator;