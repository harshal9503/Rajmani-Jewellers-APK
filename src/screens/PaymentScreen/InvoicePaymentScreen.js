import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../api/baseurl';

const InvoicePaymentScreen = ({ route, navigation }) => {
  const [showQR, setShowQR] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [cash, setCash] = useState();
  const [upi, setUpi] = useState();
  const [pending, setPending] = useState();
  const [paymentDetails, setPaymentDetails] = useState({
    cash: '0',
    upi: '0',
    pending: '0',
  });
  const [invoice, setInvoice] = useState([]);

  const { customerDetails, productDetails, invoiceDetails } = route.params;
  const totalAmount = Number(productDetails[0]?.finalAmount || 0);

  useEffect(() => {
    setInvoice({
      customerDetails,
      productDetails,
      invoiceDetails,
    });
  }, []);

  // 🔹 Auto-calculate pending whenever cash/upi changes
  useEffect(() => {
    const cashVal = cash || 0;
    const upiVal = upi || 0;
    const calcPending = totalAmount - (cashVal + upiVal);

    setPending(calcPending.toString());

    setPaymentDetails({
      cash: cashVal.toString(),
      upi: upiVal.toString(),
      pending: calcPending.toString(),
    });
  }, [cash, upi, totalAmount]);

  const handlePaymentDone = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      const filteredProducts = productDetails.filter(p =>
        Object.values(p).some(
          val =>
            val !== '' &&
            val !== null &&
            val !== undefined &&
            !(typeof val === 'number' && val === 0),
        ),
      );

      console.log('Payload:', {
        invoiceDetails,
        customerDetails,
        productDetails: filteredProducts,
        paymentDetails,
      });

      const response = await axios.post(
        `${baseUrl}/salesman/create-invoice`,
        {
          invoiceDetails,
          customerDetails,
          productDetails: filteredProducts,
          paymentDetails,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Server response:', response.data);

      await AsyncStorage.setItem('lastBillNo', invoiceDetails.billNo);

      Alert.alert('Success', 'Invoice created successfully!');
      setModalVisible(false);
      navigation.navigate('get-all-invoices');
    } catch (error) {
      console.error('Error submitting invoice:', error);

      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'Server error');
      } else if (error.request) {
        Alert.alert('Error', 'No response from server. Check your connection.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <>
      <View style={{ height: hp('5%'), backgroundColor: Colors.PRIMARY }} />

      {/* Back Button */}
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

      {/* Scrollable Content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: hp('20%') }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginLeft: 26,
            }}
          >
            {/* Center Text */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.header}>Make Payment</Text>
              <Text style={styles.amount}>Payable amount = ₹{totalAmount}</Text>
            </View>

            {/* Right Button */}
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: '#00000021',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.navigate('bill-page', { invoice });
              }}
            >
              <Image
                source={require('../../assets/billicon.png')}
                style={styles.billIconImg}
              />
            </TouchableOpacity>
          </View>

          {/* Labels */}
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Mode of payment</Text>
            <Text style={styles.paymentLabel}>Amount</Text>
          </View>

          {/* Cash */}
          <View style={styles.paymentRow}>
            <TextInput style={styles.modeInput} value="Cash" editable={false} />
            <TextInput
              style={styles.amountInput}
              placeholder="0"
              keyboardType="numeric"
              value={cash}
              onChangeText={setCash}
            />
          </View>

          {/* UPI */}
          <View style={styles.paymentRow}>
            <TextInput style={styles.modeInput} value="UPI" editable={false} />
            <TextInput
              style={styles.amountInput}
              placeholder="0"
              keyboardType="numeric"
              value={upi}
              onChangeText={setUpi}
            />
          </View>

          {/* Pending (auto-calculated, not editable) */}
          <View style={styles.paymentRow}>
            <TextInput
              style={styles.modeInput}
              value="Pending"
              editable={false}
            />
            <TextInput
              style={styles.amountInput}
              value={pending}
              editable={false} // make it readonly
            />
          </View>

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>₹{totalAmount}</Text>
          </View>

          {/* Toggle QR */}
          <TouchableOpacity
            style={styles.qrToggle}
            onPress={() => setShowQR(!showQR)}
          >
            <Text style={styles.qrToggleText}>
              {showQR ? 'Close QR code' : 'Open QR code'}
            </Text>
            <Image
              source={require('../../assets/greendrop.png')}
              style={styles.qrToggleIcon}
            />
          </TouchableOpacity>

          {/* QR Image */}
          {showQR && (
            <View style={styles.qrContainer}>
              <Image
                source={require('../../assets/barcode.jpg')}
                style={styles.qrImage}
                resizeMode="contain"
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Done Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.payText}>Payment Done</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure payment is completed?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePaymentDone}
                style={[
                  styles.modalButton,
                  { backgroundColor: Colors.BTNGREEN },
                ]}
              >
                <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium' }}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default InvoicePaymentScreen;

// Styles remain same as yours...

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
  },
  header: {
    textAlign: 'center',
    fontSize: wp('4.5%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'red',
    marginBottom: hp('1.5%'),
  },
  amount: {
    textAlign: 'center',
    fontSize: wp('4%'),
    fontFamily: 'Poppins-SemiBold',
    marginBottom: hp('2%'),
    color: '#000',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Poppins-Medium',
    marginBottom: hp('1.5%'),
    color: '#000',
  },
  paymentLabel: {
    fontWeight: '600',
    fontSize: wp('3.5%'),
    color: '#000',
  },
  modeInput: {
    width: '45%',
    borderWidth: 1,
    borderColor: '#aaa',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    fontSize: wp('3.5%'),
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  amountInput: {
    width: '45%',
    borderWidth: 1,
    borderColor: '#aaa',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    fontSize: wp('3.5%'),
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1.5%'),
    paddingVertical: hp('1.5%'),
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalLabel: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  totalAmount: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  qrToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
  },
  qrToggleText: {
    fontSize: wp('4%'),
    color: Colors.BTNGREEN,
    fontFamily: 'Poppins-Medium',
  },
  qrToggleIcon: {
    width: wp('4.6%'),
    height: hp('1.2%'),
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  qrImage: {
    width: wp('70%'),
    height: wp('70%'),
  },
  doneButton: {
    backgroundColor: Colors.BTNGREEN,
    paddingVertical: hp('1.5%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    elevation: 5,
  },
  doneText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: wp('4%'),
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
  backButtonTouch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backarrow: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    resizeMode: 'contain',
    marginRight: wp('2%'),
  },
  backText: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  bottonBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: wp('4%'),
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: wp('80%'),
    backgroundColor: '#fff',
    padding: wp('5%'),
    borderRadius: wp('2%'),
    elevation: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: wp('4%'),
    marginBottom: hp('2%'),
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: hp('1.5%'),
    marginHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: wp('4%'),
    backgroundColor: '#fff',
    paddingBottom: hp('5%'),
  },
  payButton: {
    backgroundColor: Colors.BTNGREEN,
    paddingVertical: hp('1.6%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginBottom: hp('1%'),
    height: hp('6%'),
    justifyContent: 'center',
  },
  payText: {
    color: '#fff',
    fontSize: wp('4.2%'),
    fontFamily: 'Poppins-Bold',
  },
  billIconImg: {
    width: 35,
    height: 35,
  },
});
