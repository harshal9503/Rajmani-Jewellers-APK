import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import GoldIcon from '../../assets/goldflat.svg';

const {width} = Dimensions.get('window');
const GOLD_RATE_PER_GRAM = 9800;

const LiveGoldRate = () => (
  <View style={styles.container}>
    <View style={styles.mainBox}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.header}>
          <GoldIcon width={40} height={40} />
          <Text style={styles.title}>Live Gold Rate</Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.ratesContainer}>
        {[
          {
            karat: '24K',
            rate: `₹${(GOLD_RATE_PER_GRAM * 10).toLocaleString()}`,
          },
          {karat: '22K', rate: '₹96,000'},
          {karat: '18K', rate: '₹91,000'},
        ].map((item, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => {}}>
            <View style={styles.rateBox}>
              <Text style={styles.karat}>{item.karat}</Text>
              <Text style={styles.rate}>{item.rate}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 15,
  },
  mainBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#000',
    marginTop: 5,
    fontFamily: 'Poppins-SemiBold',
  },
  ratesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rateBox: {
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    minWidth: width * 0.28,
  },
  karat: {
    fontWeight: '700',
    color: '#000',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-SemiBold',
  },
  rate: {
    fontWeight: '600',
    color: '#B88731',
    fontSize: width * 0.04,
    marginTop: 5,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default LiveGoldRate;
