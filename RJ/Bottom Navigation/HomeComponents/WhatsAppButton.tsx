// src/components/WhatsAppFloatingButton.js

import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Linking,
  View,
  Platform,
} from 'react-native';

const {width, height} = Dimensions.get('window');

// Responsive icon size with safe bounds
const WHATSAPP_ICON_SIZE = Math.max(50, Math.min(width * 0.14, 65));
const SCREEN_PADDING = width * 0.04;

// 🔼 Increased base bottom offset, ensuring it's never behind bottom nav/gesture bar
const BOTTOM_OFFSET = Math.max(60, Math.min(height * 0.16, 100));

const WhatsAppFloatingButton = () => {
  const handlePress = () => {
    const phoneNumber = '+917828120142';
    const url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url).catch(err =>
      console.error('Failed to open WhatsApp:', err),
    );
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        style={styles.button}>
        <Image
          source={require('../../assets/Whatsapp.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: SCREEN_PADDING,
    bottom: BOTTOM_OFFSET,
    width: WHATSAPP_ICON_SIZE,
    height: WHATSAPP_ICON_SIZE,
    borderRadius: WHATSAPP_ICON_SIZE / 2,
    backgroundColor: '#04be48ff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1000,
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: WHATSAPP_ICON_SIZE / 2,
  },
  icon: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    marginTop: 1,
  },
});

export default WhatsAppFloatingButton;
