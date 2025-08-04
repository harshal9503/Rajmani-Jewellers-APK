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
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [refCode, setRefCode] = useState('');
  const [accepted, setAccepted] = useState(false);

  const handleEnter = () => {
    if (!accepted) {
      Alert.alert('Please accept the terms & conditions to proceed.');
      return;
    }
    navigation.navigate('MPIN');
  };

  return (
    <ImageBackground
      source={require('../../assets/bg.png')}
      style={styles.background}
      resizeMode="cover">
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.subText}>
          Fill the details & complete your profile
        </Text>

        <Text style={styles.label}>
          Enter your name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Harshal Sharma"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Enter your email</Text>
        <TextInput
          style={styles.input}
          placeholder="harshalsharma@gmail.com"
          keyboardType="email-address"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>
          Mobile Number <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.mobileContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <View style={styles.divider} />
          <TextInput
            style={styles.mobileInput}
            keyboardType="number-pad"
            maxLength={10}
            placeholder="Enter your 10 digit Mobile Number"
            placeholderTextColor="#999"
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        <Text style={styles.label}>Reference code (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter reference code"
          placeholderTextColor="#999"
          value={refCode}
          onChangeText={setRefCode}
        />

        <View style={styles.termsRow}>
          <CheckBox
            value={accepted}
            onValueChange={setAccepted}
            tintColors={{true: '#B88731', false: '#B88731'}}
          />
          <Text style={styles.termsText}>
            I accept <Text style={styles.link}>terms & conditions</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleEnter}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 60,
    width: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    marginBottom: 5,
  },
  subText: {
    fontSize: 13,
    color: '#333',
    fontFamily: 'Poppins-Regular',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 6,
    fontFamily: 'Poppins-Medium',
  },
  required: {
    color: 'red',
    fontFamily: 'Poppins-Medium',
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    marginBottom: 18,
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  mobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    backgroundColor: 'transparent',
    width: '100%',
    height: 45,
    marginBottom: 18,
    paddingHorizontal: 10,
  },
  countryCode: {
    fontSize: 14,
    color: '#B88731',
    fontFamily: 'Poppins-Medium',
    marginRight: 4,
    textAlignVertical: 'center',
  },
  divider: {
    width: 1,
    height: 25,
    backgroundColor: '#B88731',
    marginHorizontal: 6,
  },
  mobileInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-Medium',
    textAlignVertical: 'center',
    height: '100%',
    paddingVertical: 0,
    paddingLeft: 6,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
    gap: 8,
  },
  termsText: {
    color: '#000',
    fontSize: width * 0.035,
    fontFamily: 'Poppins-Regular',
  },
  link: {
    color: '#0000FF',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#B88731',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default WelcomeScreen;
