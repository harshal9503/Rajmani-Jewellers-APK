import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { baseUrl } from '../../api/baseurl';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateInvoiceScreen = ({ navigation }) => {
  // State for UI controls
  const [expanded, setExpanded] = useState(true);
  const [productForm, setProductForm] = useState(false);
  const [mini, setMini] = useState(false);
  const [typeDrop, setTypeDrop] = useState(false);
  const [purityDrop, setPurityDrop] = useState(false);
  const [showData, setShowData] = useState(false);

  // State for dropdown values
  const [valueType, setValueType] = useState('');
  const [valuePurity, setValuePurity] = useState('');
  const [inputClearType, setInputClearType] = useState(true);
  const [inputClearPurity, setInputClearPurity] = useState(true);

  // State for form data
  const [invoiceDetails, setInvoiceDetails] = useState({
    billNo: '',
    date: moment().format('YYYY-MM-DD'),
  });

  const [customerDetails, setCustomerDetails] = useState({
    customerNameEng: '',
    customerNameHin: '',
    mobileNumber: '',
    address: '',
  });

  const [products, setProducts] = useState([]);

  const [productDetails, setProductDetails] = useState([]);
  const [invoicesData, setInvoicesData] = useState([]);
  const [liveRate, setLiveRate] = useState();
  const [piece, setPiece] = useState(0);
  const [netValue, setNetValue] = useState(0);
  const [inGram, setInGram] = useState(0);
  const [inPer, setInPer] = useState(0);
  const [netWeight, setNetWeight] = useState(0);
  const [liveGoldRate, setLiveGoldRate] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [billNo, setBillNo] = useState();
  const [tagNoError, setTagNoError] = useState(false);
  const lastIndex = products.length - 1;

  const currentGoldRate = 98000;
  const currentDay = new Date().toISOString().split('T')[0];
  // Initialize with default values
  useEffect(() => {
    generateDefaultBillNo();
  }, []);

  useEffect(() => {
    setLiveRate((currentGoldRate / 10).toFixed(2));
  }, [liveRate]);

  useEffect(() => {
    setInGram(liveRate * netValue * piece);
  }, [piece, netValue]);

  useEffect(() => {
    setInPer(netWeight * liveRate * piece);
  }, [piece, netWeight]);

  const generateDefaultBillNo = async () => {
    try {
      const lastBillNo = await AsyncStorage.getItem('lastBillNo');
      if (lastBillNo) {
        const nextNumber = parseInt(lastBillNo.split('-')[1]) + 1;
        setInvoiceDetails(prev => ({
          ...prev,
          billNo: `RJ-${nextNumber.toString().padStart(3, '0')}`,
        }));
      }
    } catch (error) {
      console.error('Error generating bill number:', error);
    }
  };

  // Toggle functions
  const toggleDropdownCustom = () => setExpanded(prev => !prev);
  const handleTypeDropOpen = () => setTypeDrop(!typeDrop);
  const handlePurityDropOpen = () => setPurityDrop(!purityDrop);

  // Product management
  const removeProduct = index => {
    const updatedProducts = [...productDetails];
    updatedProducts.splice(index, 1);
    setProductDetails(updatedProducts);
  };

  const handleChange = (index, key, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][key] = value;

    const net = parseFloat(updatedProducts[index].netWeightInGrams) || 0;
    const rate = parseFloat(updatedProducts[index].rate) || 0;
    const stoneRate = parseFloat(updatedProducts[index].stoneRate) || 0;
    const labour =
      parseFloat(updatedProducts[index].labourChargesInPercentage) || 0;
    const addl = parseFloat(updatedProducts[index].additionalAmount) || 0;
    const disc = parseFloat(updatedProducts[index].discountAmount) || 0;

    // Value = Net * Rate
    updatedProducts[index].value = (net * rate).toFixed(2);

    // Labour Charge = percentage OR per gram
    if (labour) {
      if (mini) {
        updatedProducts[index].labourChargeInRupees = (labour * net).toFixed(2);
      } else {
        updatedProducts[index].labourChargeInRupees = (
          (labour / 100) *
          updatedProducts[index].value
        ).toFixed(2);
      }
    }

    // Final Amount
    const val = parseFloat(updatedProducts[index].value) || 0;
    const lab = parseFloat(updatedProducts[index].labourChargeInRupees) || 0;
    updatedProducts[index].finalAmount = (
      val +
      stoneRate +
      lab +
      addl -
      disc
    ).toFixed(2);

    setProducts(updatedProducts);
    console.log('blank blank blank', updatedProducts);
  };

  // Form handlers
  const handleInvoiceDetailsChange = (key, value) => {
    setInvoiceDetails(prev => ({ ...prev, [key]: value }));
  };

  // Dropdown selections
  const toggleDropdownType = item => {
    setValueType(item);
    handleChange(lastIndex, 'type', item);
    setTypeDrop(false);
    setInputClearType(false);
  };

  const toggleDropdownPurity = item => {
    const numericPurity = parseInt(item.replace('k', '')); // "20k" → 20

    setValuePurity(item); // still show "20k" in UI
    handleChange(lastIndex, 'purity', numericPurity); // send 20 to backend
    setPurityDrop(false);
    setInputClearPurity(false);
  };

  // Navigation to payment screen
  const navigateToPayment = () => {
    if (!customerDetails.mobileNumber.trim()) {
      Alert.alert('Validation Error', 'Please enter customer mobile number');
      return;
    }

    if (productDetails.length === 0 || productDetails[0].type === '') {
      Alert.alert('Validation Error', 'Please add at least one product');
      return;
    }

    console.log('check product details', productDetails);

    const filteredProducts = products.filter(
      p => p.type || p.productName || p.purity || p.finalAmount,
    );

    navigation.navigate('invoice-payment', {
      invoiceDetails,
      customerDetails,
      productDetails: filteredProducts,
    });
  };

  const handleAddProduct = () => {
    setProductForm(true);
    setShowData(true);

    // ✅ New product object create karo
    const newProduct = {
      type: '',
      tagNo: '',
      productName: '',
      remark: '',
      purity: '',
      piece: '',
      grossWeightInGrams: '',
      netWeightInGrams: '',
      lessWeightInGrams: '',
      rate: (currentGoldRate / 10).toFixed(2),
      stoneRate: '',
      value: '',
      labourChargesInPercentage: '',
      labourChargeInRupees: '',
      finalAmount: '',
      additionalAmount: '',
      discountAmount: '',
    };

    // ✅ Purane products + new product add karo
    setProducts(prev => [...prev, newProduct]);

    setProductDetails(products);

    console.log('customer details', customerDetails);
    console.log('invoice details', invoiceDetails);
    console.log('product details jsij', productDetails);

    // resetForm(); // agar zaroorat ho
    if (productDetails.length >= 1) {
      setShowData(true);
    }

    setInputClearType(true);
    setInputClearPurity(true);
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

  const onChange = (event, selectedDate) => {
    setShowPicker(false); // close picker
    if (selectedDate) {
      setDate(selectedDate);

      const formattedDate = selectedDate.toISOString().split('T')[0];
      handleInvoiceDetailsChange('date', formattedDate);
    }
  };

  useEffect(() => {
    fetchBillNo();
  }, []);

  const fetchBillNo = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/salesman/get-unique-voucher-number`,
      );

      // ✅ Adjust according to your API structure
      // For example, if API response looks like:
      // { data: { voucherNo: "V12345" } }
      const billNo = response.data.data;
      console.log('API Response:', billNo);

      if (billNo) {
        setBillNo(billNo);
        setInvoiceDetails(prev => ({ ...prev, billNo: billNo }));
      }
    } catch (error) {
      console.error('Error fetching voucher:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: hp('5%'), backgroundColor: Colors.PRIMARY }} />
      <View style={styles.header}>
        <View style={styles.backButton}>
          <TouchableOpacity
            onPress={() => navigation.navigate('get-all-invoices')}
            style={styles.backButtonTouch}
          >
            <Image
              source={require('../../assets/backarrow.png')}
              style={styles.backarrow}
            />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Today's Gold Rate</Text>

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

        {/* Invoice Details */}
        <View style={styles.sectionFirst}>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Bill No.</Text>
            <TextInput
              style={styles.input}
              placeholder="RJ-001"
              placeholderTextColor="#777"
              value={invoiceDetails.billNo}
              onChangeText={value =>
                handleInvoiceDetailsChange('billNo', value)
              }
            />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              value={
                invoiceDetails.date ? invoiceDetails.date.slice(0, 10) : ''
              }
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

        {/* Customer Details */}
        <TouchableOpacity
          style={styles.headerRow}
          onPress={toggleDropdownCustom}
        >
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <Image
            source={require('../../assets/dropdownicon.png')}
            style={styles.dropdownIcon}
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
                  placeholder="हिंदी नाम"
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

            <View>
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

            <View>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter address"
                placeholderTextColor="#777"
                value={customerDetails.address}
                onChangeText={text =>
                  setCustomerDetails({ ...customerDetails, address: text })
                }
              />
            </View>

            <View style={styles.divider} />
          </>
        )}

        {/* Existing Products */}
        {showData &&
          productDetails.map((item, index) => {
            // check agar kam se kam ek field filled hai
            const hasData =
              item.type && item.productName && item.purity && item.finalAmount;

            return hasData ? (
              <View key={index} style={styles.section}>
                <View style={styles.productHeader}>
                  <Text style={styles.sectionTitle}>Product {index + 1}</Text>
                  <TouchableOpacity
                    style={styles.crossIcon}
                    onPress={() => removeProduct(index)}
                  >
                    <Image
                      source={require('../../assets/crosscircle.png')}
                      style={styles.crossImage}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.productBox}>
                  {item.type ? (
                    <Text style={styles.topLeft}>Type: {item.type}</Text>
                  ) : null}
                  {item.productName ? (
                    <Text style={styles.topRight}>
                      Name: {item.productName}
                    </Text>
                  ) : null}
                  {item.purity ? (
                    <Text style={styles.bottomLeft}>Purity: {item.purity}</Text>
                  ) : null}
                  {item.finalAmount ? (
                    <Text style={styles.bottomRight}>
                      Amount: ₹{item.finalAmount}
                    </Text>
                  ) : null}
                </View>

                <View style={styles.divider} />
              </View>
            ) : null;
          })}

        {/* Product Form */}
        {productForm && (
          <View>
            <TouchableOpacity style={styles.headerRow}>
              <Text style={styles.sectionTitle}>Product </Text>
              <Image
                source={require('../../assets/dropdownicon.png')}
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>

            {/* Type and Tag Number */}
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Type</Text>
                <View>
                  <TouchableOpacity onPress={handleTypeDropOpen}>
                    <Image
                      source={require('../../assets/down.png')}
                      style={styles.dropdownArrow}
                    />
                    <View style={styles.input}>
                      <Text style={styles.dropdownText}>
                        {inputClearType ? 'Select type' : valueType}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {typeDrop && (
                    <View style={styles.dropdownContainer}>
                      {['Sales', 'Purchase'].map((type, i) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => toggleDropdownType(type)}
                        >
                          <Text style={styles.dropdownOption}>{type}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Tag number</Text>
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: tagNoError ? 'red' : '#ccc' }, // only border color
                  ]}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#777"
                  value={products[lastIndex].tagNo}
                  onChangeText={value => {
                    handleChange(lastIndex, 'tagNo', value);

                    // ✅ validation (no text, just border)
                    if (!value.trim() || isNaN(value)) {
                      setTagNoError(true);
                    } else {
                      setTagNoError(false);
                    }
                  }}
                  onBlur={() => {
                    if (!products[lastIndex].tagNo.trim()) {
                      setTagNoError(true);
                    }
                  }}
                />
              </View>
            </View>

            {/* Product Name and Remark */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Product name</Text>
              <TextInput
                style={styles.input}
                placeholder="Product name"
                placeholderTextColor="#777"
                value={products[lastIndex].productName}
                onChangeText={value =>
                  handleChange(lastIndex, 'productName', value)
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Remark</Text>
              <TextInput
                style={styles.input}
                placeholder="Remark"
                placeholderTextColor="#777"
                value={products[lastIndex].remark}
                onChangeText={value => handleChange(lastIndex, 'remark', value)}
              />
            </View>

            {/* Purity and Piece */}
            <View style={styles.row}>
              <View style={styles.inputContainer}>
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
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Piece</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1"
                  keyboardType="numeric"
                  placeholderTextColor="#777"
                  value={products[lastIndex].piece}
                  onChangeText={value => {
                    setPiece(value);
                    handleChange(lastIndex, 'piece', value);
                  }}
                />
              </View>
            </View>

            {/* Weight Measurements */}
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Gross Wt. (In Gm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  keyboardType="numeric"
                  placeholderTextColor="#777"
                  value={products[lastIndex].grossWeightInGrams}
                  onChangeText={value =>
                    handleChange(lastIndex, 'grossWeightInGrams', value)
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Net Wt. (In Gm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  keyboardType="numeric"
                  placeholderTextColor="#777"
                  value={products[lastIndex].netWeightInGrams}
                  onChangeText={value => {
                    setNetWeight(value);
                    const calcValue = (liveRate * value).toFixed(2);
                    setNetValue(calcValue);

                    // update product value also
                    handleChange(lastIndex, 'netWeightInGrams', value);
                    handleChange(lastIndex, 'value', calcValue); // 👈 call here explicitly
                  }}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Less Wt. (In Gm)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor="#777"
                value={products[lastIndex].lessWeightInGrams}
                onChangeText={value =>
                  handleChange(lastIndex, 'lessWeightInGrams', value)
                }
              />
            </View>

            {/* Rate and Value */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Rate (In Gm)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor="#777"
                value={liveRate}
                onChangeText={value => handleChange(lastIndex, 'rate', value)}
                editable={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Value (Net Wt. * Rate)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor="#777"
                value={netValue}
                editable={false}
              />
            </View>

            {/* Stone Rate and Labour */}
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Stone rate</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  keyboardType="numeric"
                  placeholderTextColor="#777"
                  value={products[lastIndex].stoneRate}
                  onChangeText={value =>
                    handleChange(lastIndex, 'stoneRate', value)
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.labourHeader}>
                  <Text style={styles.label}>
                    Labour charge ({mini ? 'Gm' : '%'})
                  </Text>
                  <TouchableOpacity
                    style={styles.minibtn}
                    onPress={() => setMini(!mini)}
                  >
                    <Text style={styles.minibtnText}>
                      {mini ? 'In %' : 'In Weight'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  keyboardType="numeric"
                  placeholderTextColor="#777"
                  value={products[lastIndex].labourChargesInPercentage}
                  onChangeText={value =>
                    handleChange(lastIndex, 'labourChargesInPercentage', value)
                  }
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Labour charge (In ₹)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor="#777"
                value={String(products[lastIndex].labourChargeInRupees)}
                editable={false}
              />
            </View>

            {/* Final Amount */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Final Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor="#777"
                value={products[lastIndex].finalAmount}
              />
            </View>

            {/* Addition and Discount */}
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Addition</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  keyboardType="numeric"
                  placeholderTextColor="#777"
                  value={products[lastIndex].additionalAmount}
                  onChangeText={value =>
                    handleChange(lastIndex, 'additionalAmount', value)
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Discount</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  keyboardType="numeric"
                  placeholderTextColor="#777"
                  value={products[lastIndex].discountAmount}
                  onChangeText={value =>
                    handleChange(lastIndex, 'discountAmount', value)
                  }
                />
              </View>
            </View>

            <View style={styles.separator} />
          </View>
        )}

        <TouchableOpacity
          onPress={handleAddProduct}
          style={styles.addProductButton}
        >
          <Text style={styles.addProductText}>+ Add more products</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={navigateToPayment}>
          <Text style={styles.payText}>Make Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: hp('6%'),
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
  },
  scrollContent: {
    padding: wp('4%'),
    paddingBottom: hp('18%'),
  },
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
    gap: wp('4%'),
    marginBottom: hp('2%'),
  },
  sectionTitle: {
    fontSize: wp('4.2%'),
    fontFamily: 'Poppins-Medium',
    color: Colors.BTNRED,
  },
  label: {
    fontSize: wp('3.2%'),
    fontFamily: 'Poppins-Medium',
    color: '#666',
    marginBottom: hp('0.5%'),
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
  },
  inputContainerHalf: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp('4%'),
  },
  requiredLabel: {
    fontFamily: 'Poppins-Medium',
  },
  red: {
    color: 'red',
  },
  addProductButton: {
    marginTop: hp('2%'),
  },
  addProductText: {
    color: Colors.BTNRED,
    fontFamily: 'Poppins-Medium',
    fontSize: wp('4%'),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: wp('4%'),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
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
    width: wp('21%'),
    height: hp('6%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  boxTitle: {
    fontSize: wp('3%'),
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  boxValue: {
    fontSize: wp('3%'),
    fontFamily: 'Poppins-Medium',
    color: '#777',
  },
  infoText: {
    fontSize: wp('3.5%'),
    color: '#888',
    marginBottom: hp('2%'),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  dropdownIcon: {
    width: wp('4.5%'),
    height: hp('1.2%'),
    tintColor: Colors.BTNRED,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.BTNRED,
    marginVertical: hp('2%'),
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  productBox: {
    padding: wp('2.5%'),
    marginTop: hp('1%'),
    backgroundColor: '#f9f9f9',
    borderRadius: wp('1.5%'),
    height: hp('8%'),
  },
  topLeft: {
    position: 'absolute',
    top: hp('1%'),
    left: wp('2.5%'),
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Medium',
  },
  topRight: {
    position: 'absolute',
    top: hp('1%'),
    right: wp('2.5%'),
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Medium',
  },
  bottomLeft: {
    position: 'absolute',
    bottom: hp('1%'),
    left: wp('2.5%'),
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Medium',
  },
  bottomRight: {
    position: 'absolute',
    bottom: hp('1%'),
    right: wp('2.5%'),
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Medium',
    color: '#777',
  },
  crossIcon: {
    padding: wp('1%'),
  },
  crossImage: {
    width: wp('5%'),
    height: wp('5%'),
  },
  section: {
    marginBottom: hp('2%'),
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
  minibtn: {
    width: wp('11%'),
    height: hp('2%'),
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: 'red',
    borderRadius: wp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  minibtnText: {
    fontSize: wp('2.3%'),
    color: 'red',
    fontFamily: 'Poppins-Medium',
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
  labourHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: hp('2%'),
  },
  datePickerBtn: {
    width: 25,
    height: 25,
  },
  dateContainer: {
    position: 'absolute',
    top: hp('3.5%'),
    right: hp('1%'),
  },
});

export default CreateInvoiceScreen;
