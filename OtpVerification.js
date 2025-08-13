import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Logo from '../../assets/logo1.svg';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

// API Configuration
const API_BASE_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:5000' // Android emulator
  : 'http://localhost:5000'; // iOS simulator

// For physical device, use your computer's IP address
// const API_BASE_URL = 'http://192.168.1.100:5000'; // Replace with your actual IP

const OtpVerification = () => {
  const [timer, setTimer] = useState(30);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');

  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const navigation = useNavigation();
  const route = useRoute();
  const {confirmation, phone} = route.params || {};

  const showPopup = useCallback((message, type = 'error') => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setPopupVisible(false), 2000);
  }, []);

  // API call to backend login
  const loginToBackend = useCallback(async (phoneNumber) => {
    try {
      console.log('🚀 Starting backend login process...');
      console.log('📱 Phone number to send:', phoneNumber);
      
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactNumber: phoneNumber
        }),
      });

      console.log('🌐 Response status:', response.status);
      console.log('🌐 Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Backend API Response:', JSON.stringify(data, null, 2));

      // Store token and _id from response
      if (data.token && data._id) {
        await AsyncStorage.multiSet([
          ['authToken', data.token],
          ['userId', data._id],
          ['verifiedPhone', phoneNumber],
        ]);

        console.log('💾 Stored data in AsyncStorage:');
        console.log('🔑 Token:', data.token);
        console.log('🆔 User ID:', data._id);
        console.log('📱 Phone:', phoneNumber);

        // Verify stored data
        const storedToken = await AsyncStorage.getItem('authToken');
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedPhone = await AsyncStorage.getItem('verifiedPhone');
        
        console.log('✅ Verification - Stored Token:', storedToken);
        console.log('✅ Verification - Stored User ID:', storedUserId);
        console.log('✅ Verification - Stored Phone:', storedPhone);

        return data;
      } else {
        console.error('❌ Missing token or _id in response');
        throw new Error('Invalid response: missing token or user ID');
      }

    } catch (error) {
      console.error('🌐 API Error:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleKeyPress = useCallback(
    key => {
      if (key === '×') {
        const index = otp.findLastIndex(d => d !== '');
        if (index !== -1) {
          const newOtp = [...otp];
          newOtp[index] = '';
          setOtp(newOtp);
        }
      } else if (key === '✓') {
        handleSubmit();
      } else {
        const index = otp.findIndex(d => d === '');
        if (index !== -1) {
          const newOtp = [...otp];
          newOtp[index] = key;
          setOtp(newOtp);
        }
      }
    },
    [otp],
  );

  const handleSubmit = useCallback(async () => {
    if (loading) return;

    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      showPopup('Please enter 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      if (confirmation) {
        // Step 1: Verify OTP with Firebase
        console.log('🔐 Verifying OTP with Firebase...');
        const credential = await confirmation.confirm(enteredOtp);

        if (credential) {
          console.log('✅ Firebase OTP verification successful');
          console.log('✅ Verified mobile number stored: ' + phone);

          // Step 2: Login to backend API
          console.log('🚀 Proceeding to backend login...');
          const backendResponse = await loginToBackend(phone);

          // Show success message
          showPopup('Verification successful!', 'success');
          
          setTimeout(() => {
            navigation.navigate('WelcomeScreen', {
              phone,
              token: backendResponse.token,
              userId: backendResponse._id
            });
          }, 1500);

        } else {
          throw new Error('Firebase verification failed');
        }
      } else {
        showPopup('Session expired. Please request new OTP');
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      }
    } catch (error) {
      console.error('💥 OTP Verification Error:', error);
      setOtp(['', '', '', '', '', '']);

      let message = 'The OTP you entered is incorrect. Please try again.';
      
      // Firebase errors
      if (error.code === 'auth/invalid-verification-code') {
        message = 'Incorrect OTP. Please check and try again.';
      } else if (error.code === 'auth/code-expired') {
        message = 'This OTP has expired. Please request a new one.';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many attempts. Please try again later.';
      }
      // Network/API errors
      else if (error.message.includes('Network request failed') || error.message.includes('fetch')) {
        message = 'Network error. Please check your connection and try again.';
        console.error('🌐 Network Error Details:', error.message);
        console.log('💡 Tip: Make sure your backend server is running on the correct port');
        console.log('💡 Current API URL:', `${API_BASE_URL}/api/users/login`);
      }
      // Backend API errors
      else if (error.message.includes('HTTP')) {
        message = 'Server error. Please try again later.';
      }

      showPopup(message);
    } finally {
      setLoading(false);
    }
  }, [loading, otp, confirmation, navigation, phone, showPopup, loginToBackend]);

  const handleResendOtp = useCallback(async () => {
    if (resendLoading || timer > 0) {
      showPopup(`Please wait ${timer} seconds before resending`);
      return;
    }

    if (!phone) {
      showPopup('Phone number missing. Please try again.');
      return;
    }

    setResendLoading(true);
    try {
      console.log('📤 Resending OTP to:', phone);
      const newConfirmation = await auth().signInWithPhoneNumber(`+91${phone}`);
      route.params.confirmation = newConfirmation;
      showPopup('New OTP has been sent to your number', 'success');
      setTimer(30);
      setOtp(['', '', '', '', '', '']);
      console.log('✅ OTP resent successfully');
    } catch (error) {
      console.error('📤 Resend OTP Error:', error);
      let message = 'Failed to resend OTP. Please try again.';
      if (error.code === 'auth/too-many-requests') {
        message = 'Too many attempts. Please try again later.';
      } else if (error.code === 'auth/quota-exceeded') {
        message = 'OTP quota exceeded. Please try again later.';
      }
      showPopup(message);
    } finally {
      setResendLoading(false);
    }
  }, [resendLoading, timer, phone, route.params, showPopup]);

  return (
    <ImageBackground
      source={require('../../assets/bg.png')}
      style={styles.background}
      resizeMode="cover">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.logoWrapper}>
          <Logo width="100%" height="100%" />
        </View>

        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          Enter the code from the SMS we sent to{'\n'}
          <Text style={styles.phoneNumber}>
            {phone ? `+91 ${phone}` : '+91 XXXXXXXXXX'}
          </Text>
        </Text>

        <Text style={styles.timer}>
          {timer < 10 ? `00:0${timer}` : `00:${timer}`}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <View key={index} style={styles.otpInput}>
              <Text style={styles.otpText}>{digit}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.resendText}>
          Didn't receive the OTP?{' '}
          {resendLoading ? (
            <ActivityIndicator size="small" color="#B88731" />
          ) : (
            <Text style={styles.resend} onPress={handleResendOtp}>
              Resend
            </Text>
          )}
        </Text>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>

        <View style={styles.keypad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '×', '0', '✓'].map(
            (item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.key}
                onPress={() => handleKeyPress(item)}>
                <Text style={styles.keyText}>{item}</Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      </KeyboardAvoidingView>

      <Modal visible={popupVisible} transparent animationType="fade">
        <View style={styles.popupOverlay}>
          <View
            style={[
              styles.popupBox,
              popupType === 'success' ? styles.popupSuccess : styles.popupError,
            ]}>
            <View
              style={
                popupType === 'success'
                  ? styles.popupSuccessBorder
                  : styles.popupErrorBorder
              }
            />
            <Image
              source={
                popupType === 'success'
                  ? require('../../assets/success.png')
                  : require('../../assets/close.png')
              }
              style={styles.popupIcon}
              resizeMode="contain"
            />
            <Text style={styles.popupText}>{popupMessage}</Text>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {flex: 1, width: '100%', height: '100%'},
  container: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {width: 200, height: 100, marginBottom: 20},
  title: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  subtitle: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  phoneNumber: {fontWeight: '600', fontFamily: 'Poppins-SemiBold'},
  timer: {
    fontSize: 22,
    color: '#B88731',
    fontWeight: '600',
    marginVertical: 15,
    fontFamily: 'Poppins-SemiBold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginBottom: 10,
  },
  otpInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  otpText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
  resendText: {
    fontSize: 12,
    color: '#000000',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  resend: {
    color: '#B88731',
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  button: {
    backgroundColor: '#B88731',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
  keypad: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  key: {
    width: '30%',
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  keyText: {
    fontSize: 20,
    color: '#B88731',
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupBox: {
    backgroundColor: 'white',
    width: width * 0.8,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    overflow: 'hidden',
  },
  popupSuccess: {
    position: 'relative',
  },
  popupError: {
    position: 'relative',
  },
  popupIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    tintColor: '#B88731',
  },
  popupText: {
    fontSize: width * 0.038,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    textAlign: 'center',
  },
  popupSuccessBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#B88731',
  },
  popupErrorBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#FF3B30',
  },
});

export default OtpVerification;