import React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

// SVG imports
import MenuIcon from '../../assets/menu.svg';
import LogoIcon from '../../assets/logo2.svg';
import HeartIcon from '../../assets/heart.svg';
import NotificationIcon from '../../assets/notification.svg';

const {width} = Dimensions.get('window');

const TopStripHeader = ({navigation}) => (
  <View style={styles.container}>
    <View style={styles.goldStrip} />
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MenuIcon width={width * 0.06} height={width * 0.06} />
        </TouchableOpacity>
        <View style={styles.logoWrapper}>
          <LogoIcon width={width * 0.44} height={width * 0.14} />
        </View>
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Wishlist')}>
          <HeartIcon width={width * 0.055} height={width * 0.055} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Notification')}>
          <NotificationIcon width={width * 0.055} height={width * 0.055} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  goldStrip: {
    height: width * 0.11,
    backgroundColor: '#B88731',
    width: '100%',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.025,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrapper: {
    marginLeft: width * 0.04,
  },
  rightSection: {
    flexDirection: 'row',
    gap: width * 0.04,
  },
  iconButton: {
    padding: width * 0.01,
  },
});

export default TopStripHeader;
