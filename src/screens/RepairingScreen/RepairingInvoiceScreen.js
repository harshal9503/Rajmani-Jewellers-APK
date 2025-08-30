import React, { useState } from 'react';
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
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

const RepairingInvoiceScreen = ({ navigation }) => {
  const [expanded, setExpanded] = useState(true);
  const [productForm, setProductForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [metalDrop, setMetalDrop] = useState(false);
  const [valueMetal, setValueMetal] = useState();
  const [inputClearMetal, setInputClearMetal] = useState(true);
  const [customerDetails, setCustomerDetails] = useState({
    customerNameEng: '',
    customerNameHin: '',
    mobileNumber: '',
    address: '',
  });
  const [invoiceDetails, setInvoiceDetails] = useState({ date: '' });
  const [salesmanContactNumber, setSalesmanContactNumber] = useState({
    salesmanContactNumber: '',
  });
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  let lastIndex = products.length - 1;

  const handleChange = (index, key, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][key] = value;
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProductForm(true);

    // ✅ New product object create karo
    const newProduct = {
      productName: '',
      netWeightInGrams: '',
      piece: '',
      metal: '',
      description: '',
      finalAmount: '',
    };

    // ✅ Purane products + new product add karo
    setProducts(prev => [...prev, newProduct]);
  };

  const navigateToPayment = () => {
    if (
      !invoiceDetails ||
      !customerDetails ||
      !products ||
      !salesmanContactNumber
    ) {
      Alert.alert('Required', 'Please enter all fields');
      return;
    }
    if (!customerDetails.mobileNumber.trim()) {
      Alert.alert('Required', 'Please enter customer mobile number');
      return;
    }

    if (products.length === 0 || products[0].type === '') {
      Alert.alert('Required', 'Please add at least one product');
      return;
    }

    navigation.navigate('payment-second', {
      invoiceDetails,
      customerDetails,
      productDetails: products.filter(p =>
        Object.values(p).some(
          val => val !== '' && val !== null && val !== undefined,
        ),
      ),
      salesmanContactNumber,
    });
  };

  const toggleDropdown = () => {
    setExpanded(prev => !prev);
  };

  const handleTypeDropOpen = () => {
    setMetalDrop(!metalDrop);
  };

  const toggleDropdownMetal = item => {
    setValueMetal(item);
    handleChange(lastIndex, 'metal', item);
    setMetalDrop(false);
    setInputClearMetal(false);
  };

  const onChange = (event, selectedDate) => {
    setShowPicker(false); // close picker
    if (selectedDate) {
      setDate(selectedDate);

      const formattedDate = selectedDate.toISOString().split('T')[0];
      setInvoiceDetails(prev => ({
        ...prev,
        date: formattedDate,
      }));
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
        <Text style={styles.heading}>Repairing</Text>

        <Text style={styles.infoText}>
          Please fill in all the required details here and generate the invoice
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            value={invoiceDetails.date}
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

        <TouchableOpacity style={styles.headerRow} onPress={toggleDropdown}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <Image
            source={require('../../assets/dropdownicon.png')}
            style={{
              width: 18,
              height: 10,
              transform: [{ rotate: expanded ? '0deg' : '180deg' }],
            }}
          />
        </TouchableOpacity>

        {expanded && (
          <>
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name (In Eng)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter name"
                  placeholderTextColor="#777"
                  value={customerDetails.customerNameEng}
                  onChangeText={text =>
                    setCustomerDetails({
                      ...customerDetails,
                      customerNameEng: text,
                    })
                  }
                />
              </View>

              <View style={[styles.inputContainer, { marginLeft: 10 }]}>
                <Text style={styles.label}>Name (In Hindi)</Text>

                <TextInput
                  style={styles.input}
                  placeholder="hindi"
                  placeholderTextColor="#777"
                  value={customerDetails.customerNameHin}
                  onChangeText={text =>
                    setCustomerDetails({
                      ...customerDetails,
                      customerNameHin: text,
                    })
                  }
                />
              </View>
            </View>

            <View style={styles.fullInputContainer}>
              <Text style={[styles.label, styles.requiredLabel]}>
                Mobile number <Text style={styles.red}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="+91 0000000000"
                placeholderTextColor="#777"
                value={customerDetails.mobileNumber}
                onChangeText={text =>
                  setCustomerDetails({ ...customerDetails, mobileNumber: text })
                }
                maxLength={10}
              />
            </View>

            <View style={styles.fullInputContainer}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="City"
                placeholderTextColor="#777"
                value={customerDetails.address}
                onChangeText={text =>
                  setCustomerDetails({ ...customerDetails, address: text })
                }
              />
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: Colors.BTNRED,
                marginVertical: 15,
              }}
            />
          </>
        )}

        {productForm && (
          <View>
            <View>
              <TouchableOpacity
                style={styles.headerRow}
                onPress={toggleDropdown}
              >
                <Text style={styles.sectionTitle}>Product </Text>
                <Image
                  source={require('../../assets/dropdownicon.png')}
                  style={{
                    width: 18,
                    height: 10,
                    transform: [{ rotate: expanded ? '0deg' : '180deg' }],
                  }}
                />
              </TouchableOpacity>

              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Product name <Text style={styles.red}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Product"
                    placeholderTextColor="#777"
                    value={products[lastIndex].productName}
                    onChangeText={value =>
                      handleChange(lastIndex, 'productName', value)
                    }
                  />
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Weight</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.0"
                  keyboardType="numeric"
                  placeholderTextColor="#777"
                  value={products[lastIndex].netWeightInGrams}
                  onChangeText={value =>
                    handleChange(lastIndex, 'netWeightInGrams', value)
                  }
                />
              </View>
              <View style={[styles.inputContainer, { marginLeft: 10 }]}>
                <Text style={styles.label}>Piece</Text>
                <TextInput
                  style={styles.input}
                  placeholder="01"
                  keyboardType="numeric"
                  placeholderTextColor="#777"
                  value={products[lastIndex].piece}
                  onChangeText={value =>
                    handleChange(lastIndex, 'piece', value)
                  }
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Metal</Text>
                <View>
                  <TouchableOpacity onPress={handleTypeDropOpen}>
                    <Image
                      source={require('../../assets/down.png')}
                      style={{
                        width: 14,
                        height: 7,
                        position: 'absolute',
                        top: hp('2%'),
                        right: wp('5%'),
                        tintColor: '#888',
                      }}
                    />
                    <View style={styles.input}>
                      <Text style={{ marginTop: hp('1.2%'), color: '#000' }}>
                        {inputClearMetal ? 'select metal' : valueMetal}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {metalDrop && (
                    <View style={[styles.dropdownContainer]}>
                      <TouchableOpacity
                        onPress={() => toggleDropdownMetal('Gold')}
                      >
                        <Text style={styles.dropdownOption}>Gold</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => toggleDropdownMetal('Silver')}
                      >
                        <Text style={styles.dropdownOption}>Silver</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={styles.inputDescription}
                  multiline
                  value={products[lastIndex].description}
                  onChangeText={value =>
                    handleChange(lastIndex, 'description', value)
                  }
                />
              </View>
            </View>

            <View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  style={styles.input}
                  placeholder="8000.00"
                  keyboardType="numeric"
                  placeholderTextColor="#777"
                  value={products[lastIndex].finalAmount}
                  onChangeText={value =>
                    handleChange(lastIndex, 'finalAmount', value)
                  }
                />
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity onPress={handleAddProduct}>
          <Text style={styles.addProduct}>+ Add more products</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact number(salesman)</Text>
          <TextInput
            style={styles.input}
            placeholder="+910000000000"
            placeholderTextColor="#777"
            keyboardType="numeric"
            maxLength={10}
            value={salesmanContactNumber}
            onChangeText={value => setSalesmanContactNumber(value)}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={navigateToPayment}>
          <Text style={styles.payText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RepairingInvoiceScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 16, paddingBottom: 140 },
  heading: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: hp('2%'),
  },

  sectionFirst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 20,
  },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.BTNRED,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 2,
    color: '#666',
    fontFamily: 'Poppins-Medium',
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

  inputContainer: { flex: 1, justifyContent: 'center' },
  inputContainerHalf: { flex: 1 },
  fullInputContainer: { marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  requiredLabel: { fontWeight: '600' },
  red: { color: 'red' },
  addProduct: {
    color: Colors.BTNRED,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
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
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  payText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Bold',
  },
  box: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: (width - 60) / 4,
    marginBottom: 12,
  },
  boxTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 3,
  },
  boxValue: { fontSize: 12, color: '#555', fontFamily: 'Poppins-Regular' },
  infoText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingRight: 12,
  },
  productBox1: {},
  topLeft: { top: 5, left: 10, fontFamily: 'Poppins-Medium' },
  topRight: { top: -13, right: -280, fontFamily: 'Poppins-Medium' },
  bottomLeft: { bottom: -10, left: 10, fontFamily: 'Poppins-Medium' },
  bottomRight: { bottom: 6, right: -280, fontFamily: 'Poppins-Medium' },
  typeChangeBtn: {
    width: 50,
    height: 16,
    backgroundColor: 'transparent',
    borderColor: Colors.BTNRED,
    borderWidth: 1,
    borderRadius: 3,
    color: Colors.BTNRED,
  },
  inputContainerbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputDescription: {
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
