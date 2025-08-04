import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    navigation.navigate('Main');
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Make status bar transparent */}
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={require('../../assets/background.jpeg')}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Content Overlay */}
        <SafeAreaView style={styles.safeArea}>
          <Image
            source={require('../../assets/homelogo.png')}
            style={styles.logo}
          />
          <View style={styles.overlay}>
            <Text style={styles.title}>Rojmani Jewelers</Text>
            <Text style={styles.subtitle}>Login to your account</Text>

            {/* Email Input */}
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              placeholderTextColor="#777"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Password Input */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter password"
                placeholderTextColor="#777"
                secureTextEntry={secureText}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                <Image
                  source={ secureText ? require('../../assets/eyeicon.png') : require('../../assets/closeeye.png')}
                  style={styles.eyeicon}
                />
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    marginTop: hp('12%'),
  },
  overlay: {
    marginHorizontal: wp('5%'),
    padding: wp('6%'),
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  logo: {
    width: wp('30%'),
    height: wp('30%'),
    alignSelf: 'center',
    borderRadius: wp('15%'),
    marginBottom: hp('3%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#2d0073',
    textAlign: 'center',
    marginBottom: hp('0.5%'),
  },
  subtitle: {
    fontSize: wp('3.5%'),
    textAlign: 'center',
    color: '#555',
    marginBottom: hp('3%'),
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#211C84',
    borderRadius: 10,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    fontSize: wp('4%'),
    marginBottom: hp('2.5%'),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#211C84',
    borderRadius: 10,
    paddingHorizontal: wp('4%'),
    marginBottom: hp('3%'),
  },
  passwordInput: {
    flex: 1,
    fontSize: wp('4%'),
    paddingVertical: hp('1.5%'),
  },
 eyeicon: {
  width: wp('6%'),
  height: wp('6%'),
  marginLeft: wp('2%'),
  tintColor: '#2d0073',
  resizeMode: 'contain',
},
  button: {
    backgroundColor: '#2d0073',
    paddingVertical: hp('2%'),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: hp('1.5%'),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
  },
});

