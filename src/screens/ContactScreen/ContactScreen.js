import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContactScreen = ({ navigation }) => {
  return (
    <>
    <View style={{height:hp('5%'), backgroundColor:Colors.PRIMARY}} />
      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonTouch}
        >
          <Image
            source={require('../../assets/backarrow.png')}
            style={styles.backarrow}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Rajmani Jewellers</Text>

        <Text style={styles.address}>
          Jhanda Chowk, Kila Gate, Sarafa Bazar,{'\n'}
          Khargone, Madhya Pradesh{'\n'}
          451001, MP, India
        </Text>

        {/* GSTIN */}
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>GSTIN:</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="23AVFPS5740P1Z1"
            placeholderTextColor="#777"
          />
        </View>

        {/* Contact */}
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Contact:</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="+91 91790 97007"
            placeholderTextColor="#777"
          />
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}> </Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="+91 97708 72919"
            placeholderTextColor="#777"
          />
        </View>

        {/* Email */}
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Email:</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="info@rajmani.com"
            placeholderTextColor="#777"
          />
        </View>

        <Text style={styles.footerNote}>
          If you encounter any problems, please feel free to reach out to us.
        </Text>
      </ScrollView>
    </>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 26,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.PRIMARY,
    alignSelf: 'center',
    marginBottom: 35,
    marginTop: 25,
  },
  address: {
    fontSize: 14,
    color: '#222',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 35,
    lineHeight: 20,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  fieldLabel: {
    width: 90,
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  fieldInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2d0073',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  footerNote: {
    fontSize: 14,
    color: '#444',
    marginTop: 35,
    textAlign: 'center',
    letterSpacing: 0.3,
    fontFamily: 'Poppins-Medium',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: hp('6%'),
    backgroundColor: '#fff',
    padding: 5,
    paddingHorizontal: 10,
  },
  backButtonTouch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backarrow: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    resizeMode: 'contain',
    marginRight: wp('2%'),
  },
  backText: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginTop:5
  },
});
