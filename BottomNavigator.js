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

  // Calculate tab positions for sliding animation
  const getTabPosition = (tabIndex) => {
    const tabWidth = screenWidth / 5; // 5 tabs total (including MyTijori)
    const baseOffset = tabWidth / 2;
    
    if (tabIndex < 2) {
      // Left side tabs (Home, Search)
      return (tabIndex * tabWidth) + baseOffset;
    } else {
      // Right side tabs (SavingsPlan, Account) - skip MyTijori position
      return ((tabIndex + 1) * tabWidth) + baseOffset;
    }
  };

  const getMyTijoriPosition = () => {
    return screenWidth / 2; // Center position
  };

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

  const animateTextSliding = (fromTab, toTab) => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Determine positions
    let fromPosition, toPosition;
    
    if (fromTab === 'MyTijori') {
      fromPosition = getMyTijoriPosition();
    } else {
      const fromIndex = tabs.indexOf(fromTab);
      fromPosition = getTabPosition(fromIndex);
    }

    if (toTab === 'MyTijori') {
      toPosition = getMyTijoriPosition();
      setSlidingText('My Tijori');
    } else {
      const toIndex = tabs.indexOf(toTab);
      toPosition = getTabPosition(toIndex);
      setSlidingText(TAB_META[toTab].label);
    }

    // Calculate the distance to slide
    const slideDistance = toPosition - fromPosition;

    // Reset and start animation
    slidingTextTranslate.setValue(0);
    slidingTextOpacity.setValue(1);
    slidingTextScale.setValue(1);

    // Hide all tab labels during animation
    tabs.forEach(key => {
      animatedOpacity[key].setValue(0);
    });
    myTijoriOpacity.setValue(0);

    // Animate the sliding text
    Animated.parallel([
      Animated.timing(slidingTextTranslate, {
        toValue: slideDistance,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(slidingTextScale, {
          toValue: 1.1,
          duration: 200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(slidingTextScale, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Animation complete - show the target tab label
      if (toTab === 'MyTijori') {
        myTijoriOpacity.setValue(1);
      } else {
        animatedOpacity[toTab].setValue(1);
      }
      
      // Reset sliding text
      slidingTextTranslate.setValue(0);
      slidingTextOpacity.setValue(0);
      setIsAnimating(false);
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
        activeOpacity={0.6}>
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
      {isAnimating && (
        <Animated.View
          style={[
            styles.slidingTextContainer,
            {
              transform: [
                {translateX: slidingTextTranslate},
                {scale: slidingTextScale}
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
    bottom: Platform.OS === 'ios' ? 20 : 10,
    left: 0,
    right: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 20,
    zIndex: 1000,
  },
  slidingText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#B88731',
    textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 242, 221, 0.9)',
    borderRadius: 8,
    paddingVertical: 2,
    overflow: 'hidden',
  },
});

export default BottomNavigator;