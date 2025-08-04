import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import DashboardScreen from '../../screens/DashboardScreen/DashboardScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const BottomTabNavigator = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Dashboard':
        return <DashboardScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Main screen content */}
      <View style={styles.screenContainer}>{renderScreen()}</View>

      {/* Background curve image */}
      <Image
        source={require('../../assets/HomeImg/curvedbottom.png')}
        style={styles.curveBackground}
      />

      {/* Bottom tab bar */}
      <View style={styles.tabBar}>
        {/* Home Tab */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('Home')}
        >
          <View style={styles.iconWrapper}>
            <View style={styles.imgBox} >
              <Image source={require('../../assets/HomeImg/shadowcircle.png')} style={styles.circleShadow} />
              <Image
                source={require('../../assets/homeicon.png')}
                style={[styles.icon, activeTab === 'Home' && styles.activeIcon]}
              />
            </View>
            <Text
              style={[styles.label, { opacity: activeTab === 'Home' ? 1 : 0 }]}
            >
              Home
            </Text>
          </View>
        </TouchableOpacity>

        {/* Dashboard Tab */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('Dashboard')}
        >
          <View style={styles.iconWrapper}>
            <View>
               <Image source={require('../../assets/HomeImg/shadowcircle.png')} style={styles.circleShadow1} />
              <Image
                source={require('../../assets/boxicon.png')}
                style={[
                  styles.icon1,
                  activeTab === 'Dashboard' && styles.activeIcon,
                ]}
              />
            </View>
            <Text
              style={[
                styles.label1,
                { opacity: activeTab === 'Dashboard' ? 1 : 0 },
              ]}
            >
              Dashboard
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContainer: {
    flex: 1,
  },
  curveBackground: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 80,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    position: 'relative',
  },
  circleShadow: {
    width: 110,
    height: 110,
    left: -13,
    top: 10,
  },
  circleShadow1: {
    width: 110,
    height: 110,
    left: 16,
    top: 10,
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: '#999',
    top:-58,
    left:28
  },
   icon1: {
    width: 28,
    height: 28,
    tintColor: '#999',
    top:-58,
    left:58
  },
  activeIcon: {
    tintColor: '#2d0073',
  },
  label: {
    position: 'absolute',
    top: 110,
    left: 20,
    fontSize: 16,
    color: '#2d0073',
    fontWeight: '600',
  },
  label1: {
   position: 'absolute',
    top: 110,
    left: 30,
    fontSize: 16,
    color: '#2d0073',
    fontWeight: '600',
  },
  circleImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    top: -41,
    left: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'red'
  },
  imgBox:{
  
  }
});
