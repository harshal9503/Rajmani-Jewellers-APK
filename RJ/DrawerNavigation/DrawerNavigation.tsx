import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from './Main';

// SVG imports
import HeartIcon from '../assets/heart.svg';
import SaveIcon from '../assets/saving1.svg';
import CollectionIcon from '../assets/collection.svg';
import CustomIcon from '../assets/customorder.svg';
import BankIcon from '../assets/bankdetails.svg';
import ShareIcon from '../assets/share.svg';
import InfoIcon from '../assets/about.svg';
import PrivacyIcon from '../assets/privacypolicy.svg';
import TermsIcon from '../assets/terms.svg';
import LogoutIcon from '../assets/logout.svg';
import UserIcon from '../assets/user1.svg';

const Drawer = createDrawerNavigator();
const {width, height} = Dimensions.get('window');

const DrawerContent = ({navigation}) => {
  const menuItems = [
    {title: 'Wishlist', icon: HeartIcon, screen: 'Wishlist'},
    {title: 'Saving Plan', icon: SaveIcon, screen: 'SavingPlan'},
    {title: 'Our collection', icon: CollectionIcon, screen: 'Collection'},
    {title: 'Custom Orders', icon: CustomIcon, screen: 'CustomOrders'},
    {title: 'Bank Details', icon: BankIcon, screen: 'BankDetails'},
    {title: 'Refer a friend', icon: ShareIcon, screen: 'ReferFriend'},
    {title: 'About Us', icon: InfoIcon, screen: 'AboutUs'},
    {title: 'Privacy Policy', icon: PrivacyIcon, screen: 'PrivacyPolicy'},
    {title: 'Terms & Conditions', icon: TermsIcon, screen: 'TermsConditions'},
  ];

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../assets/bg.png')}
        style={styles.drawerWrapper}
        imageStyle={styles.drawerBackground}>
        <View style={styles.innerWrapper}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.headerBox}>
              <View style={styles.profileImage}>
                <UserIcon width={60} height={60} />
              </View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileName}>Hi Ankit Sharma</Text>
                <Text style={styles.profilePhone}>+91 9876543210</Text>
              </View>
            </View>

            <View style={styles.profileSeparator} />

            <View style={styles.menuBox}>
              {menuItems.map((item, index) => (
                <View
                  key={index}
                  style={[styles.menuItem, index === 0 && {marginTop: 10}]}>
                  <View style={styles.menuItemContent}>
                    <TouchableOpacity
                      style={styles.iconTextWrap}
                      onPress={() => navigation.navigate(item.screen)}>
                      <item.icon
                        width={20}
                        height={20}
                        style={styles.menuIcon}
                      />
                      <Text style={styles.menuText}>{item.title}</Text>
                    </TouchableOpacity>
                  </View>
                  {index < menuItems.length - 1 && (
                    <View style={styles.menuSeparator} />
                  )}
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={styles.logoutSection}>
            <TouchableOpacity
              style={styles.logoutBox}
              onPress={() => navigation.navigate('Login')}>
              <LogoutIcon width={20} height={20} style={styles.logoutIcon} />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
        },
        overlayColor: 'transparent',
        sceneContainerStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      <Drawer.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  drawerWrapper: {
    flex: 1,
    marginTop: -StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight + 20,
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    overflow: 'hidden',
  },
  drawerBackground: {
    resizeMode: 'cover',
    width: width * 0.75,
    height: height,
  },
  innerWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerBox: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileTextContainer: {
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  profilePhone: {
    fontSize: 16,
    color: '#B88731',
    marginTop: 2,
    fontFamily: 'Poppins-Medium',
  },
  profileSeparator: {
    height: 2,
    backgroundColor: '#B88731',
    width: '100%',
    marginTop: 12,
    marginBottom: 5,
  },
  menuBox: {
    paddingHorizontal: 10,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconTextWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
    marginLeft: 20,
  },
  menuText: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#B88731',
    marginTop: 8,
  },
  logoutSection: {
    backgroundColor: '#B88731',
    borderBottomRightRadius: 60,
    paddingHorizontal: 20,
    paddingVertical: 29,
  },
  logoutBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIcon: {
    marginRight: 16,
    marginLeft: 20,
  },
  logoutText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default DrawerNavigation;
