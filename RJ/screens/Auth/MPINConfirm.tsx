import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Animated,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const MPINConfirm = () => {
  const [confirmPin, setConfirmPin] = useState('');
  const [animations, setAnimations] = useState({});
  const navigation = useNavigation();
  const route = useRoute();
  const {mpin} = route.params || {};

  const handleKeyPress = key => {
    if (key === 'x') {
      setConfirmPin(prev => prev.slice(0, -1));
    } else if (confirmPin.length < 4) {
      setConfirmPin(prev => prev + key);
    }

    if (animations[key]) {
      Animated.sequence([
        Animated.timing(animations[key], {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(animations[key], {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleConfirm = () => {
    if (confirmPin.length === 4 && confirmPin === mpin) {
      navigation.navigate('Home');
    } else {
      alert('MPIN does not match. Try again.');
      setConfirmPin('');
    }
  };

  const renderBoxes = () =>
    [...Array(4)].map((_, i) => (
      <View key={i} style={[styles.box, confirmPin[i] && styles.filledBox]}>
        <Text style={styles.boxText}>{confirmPin[i] ? '•' : ''}</Text>
      </View>
    ));

  const renderKeypad = () => {
    const keys = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '0', 'x'],
    ];

    return keys.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((key, index) => {
          if (!animations[key] && key !== '') {
            animations[key] = new Animated.Value(1);
          }

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.cell,
                rowIndex < 3 && styles.borderBottom,
                index < 2 && styles.borderRight,
              ]}
              onPress={() => key && handleKeyPress(key)}
              disabled={!key}
              activeOpacity={1}>
              {key !== '' ? (
                <Animated.Text
                  style={[
                    styles.keyText,
                    {transform: [{scale: animations[key] || 1}]},
                  ]}>
                  {key === 'x' ? '✕' : key}
                </Animated.Text>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    ));
  };

  return (
    <ImageBackground
      source={require('../../assets/bg.png')}
      style={styles.background}
      resizeMode="cover">
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Confirm PIN</Text>
        <Text style={styles.subTitle}>Re-enter your PIN</Text>

        <View style={styles.pinRow}>{renderBoxes()}</View>

        <View style={styles.keypadContainer}>
          <View style={styles.grid}>{renderKeypad()}</View>
        </View>

        <TouchableOpacity style={styles.proceedBtn} onPress={handleConfirm}>
          <Text style={styles.proceedText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 40,
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  subTitle: {
    fontSize: 14,
    marginVertical: 20,
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  pinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  box: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#B88731',
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filledBox: {
    backgroundColor: '#B88731',
  },
  boxText: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    lineHeight: 50,
  },
  keypadContainer: {
    width: width * 0.8,
    height: width * 0.8,
    borderWidth: 1,
    borderColor: '#B88731',
    marginBottom: 30,
  },
  grid: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderRight: {
    borderRightWidth: 1,
    borderColor: '#B88731',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#B88731',
  },
  keyText: {
    fontSize: 22,
    color: '#B88731',
    fontFamily: 'Poppins-Bold',
  },
  proceedBtn: {
    backgroundColor: '#B88731',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    alignItems: 'center',
    width: '80%',
  },
  proceedText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default MPINConfirm;
