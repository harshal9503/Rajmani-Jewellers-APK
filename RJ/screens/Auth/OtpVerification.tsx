import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../assets/logo1.svg';

const {width, height} = Dimensions.get('window');

const OtpVerification = () => {
  const [timer, setTimer] = useState(35);
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = key => {
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
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 4) {
      navigation.navigate('WelcomeScreen');
    } else {
      alert('Please enter a valid 4-digit OTP');
    }
  };

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
          <Text style={styles.phoneNumber}>+91 9876543210</Text>
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
          Don’t receive the OTP? <Text style={styles.resend}>resend</Text>
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  phoneNumber: {
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 22,
    color: '#B88731',
    fontWeight: '600',
    marginVertical: 15,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  otpInput: {
    width: 45,
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
  },
  resendText: {
    fontSize: 12,
    color: '#000000',
    marginBottom: 20,
  },
  resend: {
    color: '#B88731',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#B88731',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
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
  },
});

export default OtpVerification;
