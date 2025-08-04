import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

const CashUpiCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerBox}>
        <Text style={styles.title}>Cash</Text>
        <Text style={styles.amount}>₹1,80,000.00</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.innerBox}>
        <Text style={styles.title}>UPI</Text>
        <Text style={styles.amount}>₹1,80,000.00</Text>
      </View>
    </View>
  );
};

export default CashUpiCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: '-7%',
    left: '19%',
    width: '75%',
    height: 90,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  innerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.PRIMARY,
  },
  amount: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
});
