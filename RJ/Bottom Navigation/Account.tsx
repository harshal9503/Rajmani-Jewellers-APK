import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';

// SVG Imports
import UserIcon from '../assets/user1.svg';
import EditIcon from '../assets/edit.svg';
import HeartIcon from '../assets/heart.svg';
import SaveIcon from '../assets/saving1.svg';
import CollectionIcon from '../assets/collection.svg';
import CustomIcon from '../assets/customorder.svg';
import BankIcon from '../assets/bankdetails.svg';
import ShareIcon from '../assets/share.svg';
import InfoIcon from '../assets/about.svg';
import PrivacyIcon from '../assets/privacypolicy.svg';
import TermsIcon from '../assets/terms.svg';

const {width, height} = Dimensions.get('window');

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

const EditProfile = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.goldStrip} />

      <ImageBackground
        source={require('../assets/bg.png')}
        style={styles.background}
        imageStyle={styles.imageStyle}>
        <View style={styles.profileContainer}>
          <View style={styles.profileLeftWrapper}>
            <UserIcon
              width={width * 0.19}
              height={width * 0.19}
              style={styles.profileImage}
            />

            <View style={styles.profileTextRow}>
              <Text style={styles.profileName}>Ankit Sharma</Text>
              <Text style={styles.profilePhone}>+91 74898 06724</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate('QuickBuyNow')}>
            <EditIcon width={width * 0.045} height={width * 0.045} />
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}>
              <item.icon
                width={width * 0.06}
                height={width * 0.06}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.versionBox}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <View style={styles.logoutSpacer} />
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  goldStrip: {
    height: width * 0.11,
    backgroundColor: '#B88731',
    width: '100%',
  },
  background: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: width * 0.05,
    paddingBottom: height * 0.05,
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: height * 0.03,
  },
  profileLeftWrapper: {
    marginLeft: 0,
    alignItems: 'center',
  },
  profileImage: {
    marginBottom: height * 0.015,
    marginRight: width * 0.08,
  },
  profileTextRow: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: width * 0.045,
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  profilePhone: {
    fontSize: width * 0.04,
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  editIcon: {
    marginRight: 10,
    marginBottom: height * 0.015,
  },
  separator: {
    height: 1,
    backgroundColor: '#B88731',
    marginVertical: height * 0.015,
    marginTop: -20,
    marginLeft: -width * 0.05,
    marginRight: -width * 0.05,
  },

  menuContainer: {
    marginTop: height * 0.01,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.013,
  },
  menuIcon: {
    marginRight: width * 0.04,
  },
  menuText: {
    fontSize: width * 0.04,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  versionBox: {
    marginTop: height * 0.03,
    alignItems: 'center',
  },
  versionText: {
    fontSize: width * 0.035,
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
  logoutButton: {
    backgroundColor: '#B88731',
    paddingVertical: height * 0.01,
    alignItems: 'center',
    borderRadius: width * 0.02,
    marginTop: height * 0.02,
    width: '100%',
  },
  logoutText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-SemiBold',
  },
  logoutSpacer: {
    height: height * 0.08 + 20,
  },
});

export default EditProfile;
