import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  ImageBackground,
  Platform
} from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <ImageBackground
        source={require('../../assets/background.jpeg')} 
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Image
            source={require('../../assets/homelogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
