import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const DashboardCardScreen = () => {
  const navigation = useNavigation();

  const renderSection = (title, color, cash, upi, pending) => {
    return (
      <View style={styles.sectionContainer}>
        <View style={[styles.titleContainer, { backgroundColor: color }]}>
          <Text style={styles.titleText}>{title}</Text>
        </View>

        <View style={styles.totalAmountRow}>
          <Image
            source={require('../../assets/HomeImg/coin.png')}
            style={styles.iconImage}
          />
          <Text style={styles.totalAmount}> ₹2,60,000.00</Text>
        </View>

        <View style={styles.paymentRow}>
          <View style={[styles.paymentBox, { borderColor: color }]}>
            <Text style={styles.paymentTitle}>Cash</Text>
            <Text style={styles.paymentValue}>₹{cash}</Text>
          </View>
          <View style={[styles.paymentBox, { borderColor: color }]}>
            <Text style={styles.paymentTitle}>UPI</Text>
            <Text style={styles.paymentValue}>₹{upi}</Text>
          </View>
        </View>

        <View style={[styles.pendingBox, { borderColor: color }]}>
          <Text style={styles.pendingLabel}>Pending</Text>
          <Text style={styles.pendingValue}>₹{pending}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
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

      {/* Dashboard Heading */}
      <Text style={styles.dashboardHeading}>Dashboard</Text>

      {/* Date Box */}
      <View style={styles.dateBox}>
        <Text style={styles.dateText}>20 July 2025</Text>
        <Image
          source={require('../../assets/calendar.png')}
          style={styles.calendarIcon}
        />
      </View>

      {/* Dashboard Cards */}
      {renderSection('Total Sale', Colors.PRIMARY, '1,20,000.00', '80,000.00', '60,000.00')}
      {renderSection('Total Repair', '#F90000', '1,20,000.00', '80,000.00', '60,000.00')}
    </View>
  );
};

export default DashboardCardScreen;

const styles = StyleSheet.create({
  dashboardHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 100,
    flex: 1,
    paddingTop: 50,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  titleContainer: {
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  titleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 10,
    justifyContent: 'center',
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    gap: 10,
  },
  paymentBox: {
    borderWidth: 1,
    borderRadius: 8,
    width: (width - 80) / 2,
    padding: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  paymentTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
    color: '#000',
  },
  paymentValue: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  pendingBox: {
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    padding: 12,
    marginTop: 10,
  },
  pendingLabel: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  pendingValue: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  dateBox: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    height: 30,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#2BB826',
  },
  calendarIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    right: 0,
    top: 5,
    resizeMode: 'contain',
  },
});
