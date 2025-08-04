import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  DrawerItemList,
} from '@react-navigation/drawer';
import { Colors } from '../../constants/Colors';

const CustomDrawer = (props) => {

  return (
    <View>
      <View>
        {/* Profile Header */}
        <View style={styles.profileSection}>
          <Image
            source={require('../../assets/DrawerImg/profile.jpg')} // replace with actual profile pic
            style={styles.profilePic}
          />
          <Text style={styles.profileName}>Kshitij Jain</Text>
          <Text style={styles.profileEmail}>kshitijain@gmail.com</Text>
        </View>

        <View style={styles.divider} />

        {/* Menu Items */}
        <DrawerItemList {...props} />
      </View>

      {/* Logout */}
      <View>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.logout} onPress={() => console.log('Logout')}>
          <Image source={require('../../assets/DrawerImg/logout.png')} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'flex-start',
    marginTop: 70,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  profilePic: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#2d0073',
  },
  profileName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  profileEmail: {
    fontSize: 12,
    color: '#555',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: Colors.PRIMARY,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 15,
  },
  logoutText: {
    fontSize: 20,
    marginLeft: 10,
    color: '#2d0073',
    fontWeight: '800',
  },
  logoutIcon:{
    width: 25,
    height: 25,
    tintColor: '#2d0073',
  }
});
