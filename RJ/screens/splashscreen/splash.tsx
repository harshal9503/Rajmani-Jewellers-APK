import React, {useEffect, useRef} from 'react';
import {
  View,
  Animated,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SplashLogo from '../../assets/splash.svg'; // SVG splash logo

const Splash = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate('Login'); //Login Home
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]);

  return (
    <ImageBackground
      source={require('../../assets/bg.png')} // original PNG background
      style={styles.background}
      resizeMode="cover">
      <Animated.View style={[styles.logoWrapper, {opacity: fadeAnim}]}>
        <SplashLogo width="100%" height="100%" />
      </Animated.View>
    </ImageBackground>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    width: width * 0.3,
    height: width * 0.3,
  },
});

export default Splash;
