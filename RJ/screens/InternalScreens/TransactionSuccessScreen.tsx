import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SuccessSvg from '../../assets/success.svg';
import RightSvg from '../../assets/right.svg';

const {width, height} = Dimensions.get('window');

const TransactionSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.goldStrip} />

      <TouchableOpacity
        style={styles.backRow}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/back.png')}
          style={styles.backIcon}
        />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Transaction Success</Text>

        <View style={styles.imageContainer}>
          <SuccessSvg width={width * 0.5} height={width * 0.6} />
        </View>

        <View style={styles.successRow}>
          <RightSvg width={width * 0.045} height={width * 0.045} />
          <Text style={styles.successText}>Purchase Successful</Text>
        </View>

        <Text style={styles.message}>
          We appreciate your purchase. Come back soon and enjoy more great deals
          from Rajmani Jewellers.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  goldStrip: {
    height: width * 0.11,
    width: '100%',
    backgroundColor: '#B88731',
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    marginTop: 10,
  },
  backIcon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  backText: {
    marginLeft: 10,
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.08,
    marginTop: height * 0.15, // <-- Increased to match your screenshot spacing
  },
  title: {
    fontSize: width * 0.05,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  successText: {
    fontSize: width * 0.04,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  message: {
    fontSize: width * 0.035,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
  },
});

export default TransactionSuccessScreen;
