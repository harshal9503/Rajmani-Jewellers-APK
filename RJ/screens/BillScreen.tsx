import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import BillFormat from './BillFormat';

const BillScreen: React.FC = () => {
  // Sample data that matches the image format
  const sampleBillData = {
    billNo: "G-2020446340",
    date: "31-Jul-2020",
    phone: "",
    address: "",
    items: [
      {
        code: "JHJ",
        description: "Urban",
        designMtr: "2.95",
        alt: "0.00[1-2.00][1]",
        roll: "2600 mtr[26x100]",
        rollMtr: "",
        mRate: "14.5",
        fold: "",
        totalMtr: "26.00[2.95]",
        amount: "377.00"
      }
    ],
    totalAmount: "8524.18[10796.00]"
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <BillFormat 
          billNo={sampleBillData.billNo}
          date={sampleBillData.date}
          phone={sampleBillData.phone}
          address={sampleBillData.address}
          items={sampleBillData.items}
          totalAmount={sampleBillData.totalAmount}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});

export default BillScreen;