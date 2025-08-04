import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const AboutScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Image
          source={require('../../assets/backarrow.png')}
          style={styles.backarrow}
        />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text>contact screen</Text>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    top: 50,
    left: 10,
  },
  backarrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
