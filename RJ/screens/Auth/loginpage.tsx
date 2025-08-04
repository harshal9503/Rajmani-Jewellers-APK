import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../assets/logo1.svg';

const {width, height} = Dimensions.get('window');

const Signin = () => {
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  const handleSendOtp = () => {
    navigation.navigate('OtpVerification', {phone});
  };

  return (
    <ImageBackground
      source={require('../../assets/bg.png')}
      style={styles.background}
      resizeMode="cover">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.logoWrapper}>
              <Logo width="100%" height="100%" />
            </View>

            <View style={styles.textSection}>
              <Text style={styles.welcomeText}>
                It’s our pleasure to welcome you to
              </Text>
              <Text style={styles.welcomeText1}>Rajmani Jewellers</Text>
            </View>

            <Text style={styles.inputLabel}>Enter your mobile number</Text>

            <View style={styles.mobileContainer}>
              <Text style={styles.countryCode}>+91</Text>
              <View style={styles.divider} />
              <TextInput
                style={styles.mobileInput}
                placeholder="9876543210"
                keyboardType="number-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
                placeholderTextColor="lightgray"
                textAlignVertical="center"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    paddingHorizontal: 30,
    paddingTop: height * 0.12,
    paddingBottom: 60,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  logoWrapper: {
    width: width * 0.6,
    height: height * 0.15,
    marginBottom: 20,
  },
  textSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: width * 0.04,
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  welcomeText1: {
    fontSize: width * 0.045,
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  inputLabel: {
    alignSelf: 'flex-start',
    color: '#000',
    fontSize: width * 0.035,
    marginBottom: 6,
    fontFamily: 'Poppins-Medium',
  },
  mobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    width: '100%',
    height: 45,
    marginBottom: 30,
  },
  countryCode: {
    fontSize: width * 0.04,
    color: '#000',
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    marginTop: 3,
  },
  divider: {
    width: 1,
    height: 25,
    backgroundColor: '#B88731',
    marginHorizontal: 8,
  },
  mobileInput: {
    flex: 1,
    fontSize: width * 0.04,
    color: '#000',
    paddingVertical: 0,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    height: '100%',
    marginTop: 3,
  },
  button: {
    backgroundColor: '#B88731',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Signin;
