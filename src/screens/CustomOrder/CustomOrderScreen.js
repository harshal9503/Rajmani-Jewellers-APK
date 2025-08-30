import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from '../../constants/Colors';
import { baseUrl } from '../../api/baseurl';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

const CustomOrderScreen = ({ navigation, route }) => {
  const [products, setProducts] = useState([
    {
      productName: '',
      weightFrom: '',
      weightTo: '',
      purity: '',
      size: '',
      width: '',
      stoneWeight: '',
      expectedWeight: '',
      rateCut: '',
      ratePerGram: '',
      expectedDeliveryDate: '',
      description: '',
      expectedAmount: '',
      craftsmanName: '',
    },
  ]);
  const [customerDetails, setCustomerDetails] = useState({
    customerNameEng: '',
    mobileNumber: '',
    address: '',
  });
  const [invoiceDetails, setInvoiceDetails] = useState({
    voucherNo: '',
    date: '',
  });
  const [purityDrop, setPurityDrop] = useState(false);
  const [inputClearPurity, setInputClearPurity] = useState(true);
  const [valuePurity, setValuePurity] = useState('');
  const [rateCutDrop, setRateCutDrop] = useState(false);
  const [inputClearRateCut, setInputClearRateCut] = useState(true);
  const [valueRateCut, setValueRateCut] = useState('');
  const [liveGoldRate, setLiveGoldRate] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker2, setShowPicker2] = useState(false);
  const [dateDelivery, setDateDelivery] = useState(new Date());
  const [voucherNo, setVoucherNo] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  let lastIndex = products.length - 1;
  const handlePurityDropOpen = () => setPurityDrop(!purityDrop);
  const handleRateCutDropOpen = () => setRateCutDrop(!rateCutDrop);

  const currentDay = new Date().toISOString().split('T')[0];

  const { id } = route.params || {};
  console.log('id', id);
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      fetchInvoiceById(id); // fetch old order
    } else {
      fetchVoucherNo(); // get fresh voucher for new order
    }
  }, [id]);

  const fetchVoucherNo = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/salesman/get-unique-voucher-number`,
      );

      // ✅ Adjust according to your API structure
      // For example, if API response looks like:
      // { data: { voucherNo: "V12345" } }
      const voucher = response.data.data;
      console.log('API Response:', voucher);

      if (voucher) {
        setVoucherNo(voucher);
        setInvoiceDetails(prev => ({ ...prev, voucherNo: voucher }));
      }
    } catch (error) {
      console.error('Error fetching voucher:', error);
    }
  };

  // const fetchInvoiceById = async invoiceId => {
  //   try {
  //     const response = await axios.patch(
  //       `${baseUrl}/salesman/update-custom-order-by-id/${invoiceId}`,
  //       console.log("update data", response)

  //     );
  //   } catch (error) {
  //     console.error(
  //       'Error fetching invoice by ID:',
  //       error.response?.data || error,
  //     );
  //     Alert.alert('Error', 'Failed to load invoice data');
  //   }
  // };

  const fetchInvoiceById = async invoiceId => {
    try {
      const response = await axios.get(
        `${baseUrl}/salesman/get-custom-order-by-id/${invoiceId}`,
      );
      const updatedProducts = response.data.customInvoice.productDetails;
      const updatedCustomer = response.data.customInvoice.customerDetails;
      const updatedInvoice = response.data.customInvoice.invoiceDetails;
      console.log('update data', updatedCustomer, updatedProducts);
      setProducts(updatedProducts);
      setCustomerDetails(updatedCustomer);
      setInvoiceDetails(updatedInvoice);
      setVoucherNo(updatedInvoice.voucherNo)
      setIsUpdate(true)
    } catch (error) {
      console.error(
        'Error fetching invoice by ID:',
        error.response?.data || error,
      );
      Alert.alert('Error', 'Failed to load invoice data');
    }
  };

  const handleChange = (index, key, value) => {
    const updatedProducts = [...products];

    updatedProducts[index][key] = value;
    setProducts(updatedProducts);
  };

  const onChange = (event, selectedDate) => {
    setShowPicker(false); // close picker
    if (selectedDate) {
      setDate(selectedDate);

      // format date as DD/MM/YYYY
      const formattedDate = selectedDate.toISOString().split('T')[0];
      handleInvoiceChange('date', formattedDate);
    }
  };

  const onChangeSecond = (event, selectedDateSecond) => {
    setShowPicker2(false);
    if (selectedDateSecond) {
      setDateDelivery(selectedDateSecond);

      const formattedDate = selectedDateSecond.toISOString().split('T')[0];
      handleChange(lastIndex, 'expectedDeliveryDate', formattedDate); // updates product
    }
  };

  const navigateToPayment = () => {
    console.log('invoice data', isUpdate);

    setInputClearPurity(false);
    // Navigate to payment screen with product data
    const invoiceEmpty = invoiceDetails.date === '';
    const customerEmpty = customerDetails.customerNameEng === '';
    const productsEmpty = products[0].productName === '';

    if (invoiceEmpty || customerEmpty || productsEmpty) {
      Alert.alert('Required', 'Please enter all fields');
      return;
    }
    navigation.navigate('payment-third', {
      productDetails: products,
      customerDetails,
      invoiceDetails,
      isUpdate,
      id
    });
  };

  const toggleDropdownPurity = item => {
    const numericPurity = parseInt(item.replace('k', '')); // "20k" → 20
    setValuePurity(item); // still show "20k" in UI
    handleChange(lastIndex, 'purity', numericPurity); // send 20 to backend
    setPurityDrop(false);
    setInputClearPurity(false);
  };

  const toggleDropdownRateCut = item => {
    const rateCutBol = item === 'Yes' ? true : false;
    setValueRateCut(item);
    console.log('rateCut', rateCutBol);

    handleChange(lastIndex, 'rateCut', rateCutBol);
    setRateCutDrop(false);
    setInputClearRateCut(false);
  };

  // Update customer details
  const handleCustomerChange = (key, value) => {
    const updated = { ...customerDetails, [key]: value };
    setCustomerDetails(updated);
  };

  // Update invoice details
  const handleInvoiceChange = (key, value) => {
    console.log(value);
    const updated = { ...invoiceDetails, [key]: value };
    setInvoiceDetails(updated);
  };

  useEffect(() => {
    getLiveGoldRate();
  }, []);

  const getLiveGoldRate = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/admin/get-all-gold-price-records`,
      );
      // 👆 Replace with your API endpoint

      // If API returns { rate: 6500 }

      setLiveGoldRate(response.data);
    } catch (error) {
      console.error('Error fetching gold rate:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: hp('5%'), backgroundColor: Colors.PRIMARY }} />
      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Main')}
          style={styles.backButtonTouch}
        >
          <Image
            source={require('../../assets/backarrow.png')}
            style={styles.backarrow}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Today’s Gold Rate</Text>
        {currentDay ===
        liveGoldRate?.data[liveGoldRate?.data.length - 1].updatedAt?.slice(
          0,
          10,
        ) ? (
          <View style={styles.boxRow}>
            <View style={styles.box}>
              <Text style={styles.boxTitle}>18k</Text>
              <Text style={styles.boxValue}>
                ₹{liveGoldRate?.data[liveGoldRate?.data.length - 1].price18k}
              </Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxTitle}>20k</Text>
              <Text style={styles.boxValue}>
                ₹{liveGoldRate?.data[liveGoldRate?.data.length - 1].price20k}
              </Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxTitle}>22k</Text>
              <Text style={styles.boxValue}>
                ₹{liveGoldRate?.data[liveGoldRate?.data.length - 1].price22k}
              </Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxTitle}>24k</Text>
              <Text style={styles.boxValue}>
                ₹{liveGoldRate?.data[liveGoldRate?.data.length - 1].price24k}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.boxRow}>
            <View style={styles.box}>
              <Text style={styles.boxTitle}>18k</Text>
              <Text style={styles.boxValue}>₹2000</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxTitle}>20k</Text>
              <Text style={styles.boxValue}>₹5000</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxTitle}>22k</Text>
              <Text style={styles.boxValue}>₹7000</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxTitle}>24k</Text>
              <Text style={styles.boxValue}>₹8000</Text>
            </View>
          </View>
        )}
        <Text style={styles.infoText}>
          Please fill in all the required details here and generate the invoice
        </Text>

        <View style={styles.sectionFirst}>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Voucher No.</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#777"
              value={voucherNo}
              editable={false}
            />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              value={invoiceDetails.date ? invoiceDetails.date.slice(0, 10) : ""}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#777"
              editable={false} // prevent typing
            />
            <TouchableOpacity
              style={styles.dateContainer}
              onPress={() => setShowPicker(true)}
            >
              <Image
                source={require('../../assets/dateicon.png')}
                style={styles.datePickerBtn}
              />
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChange}
              />
            )}
          </View>
        </View>

        <View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Customer Name"
              placeholderTextColor="#777"
              value={customerDetails.customerNameEng}
              onChangeText={value =>
                handleCustomerChange('customerNameEng', value)
              }
            />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+91 0000000000"
              placeholderTextColor="#777"
              keyboardType="numeric"
              maxLength={10}
              value={String(customerDetails.mobileNumber)}
              onChangeText={value =>
                handleCustomerChange('mobileNumber', value)
              }
            />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Address"
              placeholderTextColor="#777"
              value={String(customerDetails.address)}
              onChangeText={value => handleCustomerChange('address', value)}
            />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Jhumki"
              placeholderTextColor="#777"
              value={products[lastIndex].productName}
              onChangeText={value =>
                handleChange(lastIndex, 'productName', value)
              }
            />
          </View>
        </View>

        <View style={styles.sectionFirst}>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Weight form</Text>
            <TextInput
              style={styles.input}
              placeholder="from"
              placeholderTextColor="#777"
              keyboardType="numeric"
              value={String(products[lastIndex].weightFrom)}
              onChangeText={value =>
                handleChange(lastIndex, 'weightFrom', value)
              }
            />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Weight to</Text>
            <TextInput
              style={styles.input}
              placeholder="to"
              placeholderTextColor="#777"
              keyboardType="numeric"
              value={String(products[lastIndex].weightTo)}
              onChangeText={value => handleChange(lastIndex, 'weightTo', value)}
            />
          </View>
        </View>

        <View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Purity</Text>
            <View>
              <TouchableOpacity onPress={handlePurityDropOpen}>
                <Image
                  source={require('../../assets/down.png')}
                  style={styles.dropdownArrow}
                />
                <View style={styles.input}>
                  <Text style={styles.dropdownText}>
                    {inputClearPurity ? 'Select purity' : valuePurity}
                  </Text>
                </View>
              </TouchableOpacity>

              {purityDrop && (
                <View style={styles.dropdownContainer}>
                  {['18k', '20k', '22k', '24k'].map((purity, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => toggleDropdownPurity(purity)}
                    >
                      <Text style={styles.dropdownOption}>{purity}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Size/Lenght</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#777"
              keyboardType="numeric"
              value={String(products[lastIndex].size)}
              onChangeText={value => handleChange(lastIndex, 'size', value)}
            />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Expected Weight</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#777"
              keyboardType="numeric"
              value={String(products[lastIndex].expectedWeight)}
              onChangeText={value =>
                handleChange(lastIndex, 'expectedWeight', value)
              }
            />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Width</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              keyboardType="numeric"
              placeholderTextColor="#777"
              value={String(products[lastIndex].width)}
              onChangeText={value => handleChange(lastIndex, 'width', value)}
            />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Stone weight</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#777"
              keyboardType="numeric"
              value={String(products[lastIndex].stoneWeight)}
              onChangeText={value =>
                handleChange(lastIndex, 'stoneWeight', value)
              }
            />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Rate cut</Text>
            <View>
              <TouchableOpacity onPress={handleRateCutDropOpen}>
                <Image
                  source={require('../../assets/down.png')}
                  style={styles.dropdownArrow}
                />
                <View style={styles.input}>
                  <Text style={styles.dropdownText}>
                    {inputClearRateCut ? 'Select Ratecut' : valueRateCut}
                  </Text>
                </View>
              </TouchableOpacity>

              {rateCutDrop && (
                <View style={styles.dropdownContainer}>
                  {['Yes', 'No'].map((rateCut, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => toggleDropdownRateCut(rateCut)}
                    >
                      <Text style={styles.dropdownOption}>{rateCut}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Rate</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              keyboardType="numeric"
              placeholderTextColor="#777"
              value={String(products[lastIndex].ratePerGram)}
              onChangeText={value =>
                handleChange(lastIndex, 'ratePerGram', value)
              }
            />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Expected Delivery Date</Text>
            <TextInput
              style={styles.input}
              value={products[lastIndex].expectedDeliveryDate ? products[lastIndex].expectedDeliveryDate.slice(0, 10) : ''}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#777"
              editable={false} // prevent typing
            />
            <TouchableOpacity
              style={styles.dateContainer}
              onPress={() => setShowPicker2(true)}
            >
              <Image
                source={require('../../assets/dateicon.png')}
                style={styles.datePickerBtn}
              />
            </TouchableOpacity>
            {showPicker2 && (
              <DateTimePicker
                value={dateDelivery}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeSecond}
              />
            )}
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.description}
              multiline
              value={products[lastIndex].description}
              onChangeText={value =>
                handleChange(lastIndex, 'description', value)
              }
            />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Expected Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              keyboardType="numeric"
              placeholderTextColor="#777"
              value={String(products[lastIndex].expectedAmount)}
              onChangeText={value =>
                handleChange(lastIndex, 'expectedAmount', value)
              }
            />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Craftman Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Craftman Name"
              placeholderTextColor="#777"
              value={products[lastIndex].craftsmanName}
              onChangeText={value =>
                handleChange(lastIndex, 'craftsmanName', value)
              }
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={navigateToPayment}>
          <Text style={styles.payText}>{isUpdate ? "Update" : "Save"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CustomOrderScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 16, paddingBottom: 140 },
  heading: {
    fontSize: wp('5%'),
    fontFamily: 'Poppins-SemiBold',
    color: '#222',
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  sectionFirst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  section: { marginBottom: 20 },
  label: {
    fontSize: wp('3.2%'),
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  input: {
    height: hp('5%'),
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: wp('2.5%'),
    paddingVertical: 0, // Explicitly set vertical padding
    borderRadius: wp('1.5%'),
    marginBottom: hp('1%'),
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Medium',
    color: '#000',
    textAlignVertical: 'center', // Ensures text is properly vertically aligned
    includeFontPadding: false, // Removes extra font padding
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainerHalf: { flex: 1 },
  fullInputContainer: { marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  requiredLabel: { fontFamily: 'Poppins-SemiBold' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#fff',
  },
  payButton: {
    backgroundColor: Colors.BTNGREEN,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  payText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginTop: 3,
  },
  description: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 10,
    textAlignVertical: 'top',
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
  boxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  box: {
    backgroundColor: '#fff',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    width: (width - wp('15%')) / 4,
    height: hp('6%'),
    elevation: 9,
  },
  boxTitle: {
    fontSize: wp('3%'),
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  boxValue: {
    fontSize: wp('3%'),
    fontFamily: 'Poppins-Medium',
    color: '#555',
  },
  infoText: {
    fontSize: wp('3.5%'),
    color: '#888',
    marginBottom: hp('2%'),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
  },
  dropdownContainer: {
    position: 'absolute',
    top: hp('5%'),
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: wp('1.5%'),
    zIndex: 999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dropdownOption: {
    fontSize: wp('3.5%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2.5%'),
    fontFamily: 'Poppins-Medium',
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownArrow: {
    width: 14,
    height: 7,
    position: 'absolute',
    top: hp('2%'),
    right: wp('5%'),
    tintColor: '#888',
    zIndex: 1,
  },
  dropdownText: {
    marginTop: hp('1.2%'),
    color: '#000',
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Medium',
  },
  datePickerBtn: {
    width: 25,
    height: 25,
  },
  dateContainer: {
    position: 'absolute',
    top: hp('3%'),
    right: hp('1%'),
  },
});
