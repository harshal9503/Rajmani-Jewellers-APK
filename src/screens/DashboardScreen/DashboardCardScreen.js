import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import { baseUrl } from '../../api/baseurl';

const DashboardCardScreen = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const currDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
      const fetchDashboardData = async () => {
        try {   
          setLoading(true);
          const response = await axios.get(
            `${baseUrl}/salesman/salesman-dashboard/${currDate}`,
          );
          setDashboardData(response.data);
          console.log('deshboard data', response.data, currDate);
        } catch (err) {
          setError(err.message || 'Something went wrong');
        } finally {
          setLoading(false);
        }
      };

      fetchDashboardData();
    }, []);

  const renderSection = (title, color, cash, upi, pending, total) => {
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
          <Text style={styles.totalAmount}> ₹{total}</Text>
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
    <>
      <View style={{ height: hp('5%'), backgroundColor: Colors.PRIMARY }} />
      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonTouch}
        >
          <Image
            source={require('../../assets/backarrow.png')}
            style={styles.backarrow}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.dashboardHeading}>Dashboard</Text>

        <View style={styles.dateBox}>
          <Text style={styles.dateText}>
            {' '}
            {`${String(date.getDate()).padStart(2, '0')} ${date.toLocaleString(
              'default',
              { month: 'long' },
            )} ${date.getFullYear()}`}
          </Text>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Image
              source={require('../../assets/calendar.png')}
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
        </View>

        {dashboardData && (
          <>
            {renderSection(
              'Total Sale',
              Colors.PRIMARY,
              dashboardData.sales.cash,
              dashboardData.sales.upi,
              dashboardData.sales.pending,
              dashboardData.sales.total
            )}
            {renderSection(
              'Total Repair',
              Colors.BTNRED,
              dashboardData.repairing.cash,
              dashboardData.repairing.upi,
              dashboardData.repairing.pending,
              dashboardData.repairing.total
            )}
          </>
        )}
      </ScrollView>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        theme="light"
        onConfirm={selectedDate => {
          setOpen(false);
          setDate(selectedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default DashboardCardScreen;

const styles = StyleSheet.create({
  container: {
    padding: wp('5%'),
    backgroundColor: '#fff',
    paddingBottom: hp('10%'),
    flex: 1,
    paddingTop: hp('2%'),
  },
  dashboardHeading: {
    fontSize: wp('5.5%'),
    fontFamily: 'Poppins-Bold',
    color: Colors.PRIMARY,
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: hp('2.5%'),
  },
  titleContainer: {
    paddingVertical: hp('1%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  titleText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: wp('4%'),
  },
  totalAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.5%'),
    marginBottom: hp('1.2%'),
    justifyContent: 'center',
  },
  iconImage: {
    width: wp('6%'),
    height: wp('6%'),
    resizeMode: 'contain',
  },
  totalAmount: {
    fontSize: wp('4.5%'),
    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp('2%'),
    color: '#000',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('1.5%'),
    gap: wp('2%'),
  },
  paymentBox: {
    borderWidth: 1,
    borderRadius: wp('2%'),
    width: '48%',
    padding: hp('1.5%'),
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  paymentTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: wp('3.5%'),
    marginBottom: hp('0.5%'),
    color: '#000',
  },
  paymentValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: wp('3.5%'),
    color: '#000',
  },
  pendingBox: {
    borderWidth: 1,
    borderRadius: wp('2%'),
    alignItems: 'center',
    padding: hp('1.5%'),
    marginTop: hp('1%'),
  },
  pendingLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: wp('3.5%'),
    marginBottom: hp('0.5%'),
    color: '#000',
  },
  pendingValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: wp('3.5%'),
    color: '#000',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: hp('6%'),
    backgroundColor: '#fff',
    padding: 5,
    paddingHorizontal: 10,
  },
  backButtonTouch: { flexDirection: 'row', alignItems: 'center' },
  backarrow: {
    width: wp('4%'),
    height: wp('4%'),
    resizeMode: 'contain',
    marginRight: wp('2%'),
  },
  backText: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Bold',
    marginTop: 2,
    color: '#000',
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: hp('2%'),
    height: hp('4%'),
  },

  dateText: {
    flex: 1,
    fontSize: wp('3%'),
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.BTNGREEN,
  },

  calendarIcon: {
    width: wp('4%'),
    height: wp('4%'),
    resizeMode: 'contain',
    position: 'absolute',
    right: wp('2%'),
    top: wp('-2%'),
  },
});
