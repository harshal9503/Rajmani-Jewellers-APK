import React from 'react';
import { View, StyleSheet } from 'react-native';
import BillFormat from './BillFormat';

const BillExample: React.FC = () => {
  const sampleBillData = {
    billNo: '5/2020',
    date: '31.Jul.2020',
    phoneNumber: '0348644345',
    items: [
      {
        description: 'Arhan Dost',
        quantity: 320,
        rate: 14803,
        amount: 14803,
      },
      {
        description: 'Ginni Dost',
        quantity: 283,
        rate: 2848 + 2444,
        amount: 8058.04,
      },
    ],
    total: 22861,
    received: 0,
    balance: 22861,
  };

  return (
    <View style={styles.container}>
      <BillFormat billData={sampleBillData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default BillExample;