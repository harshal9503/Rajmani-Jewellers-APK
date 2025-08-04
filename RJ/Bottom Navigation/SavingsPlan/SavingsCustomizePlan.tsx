import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import QuestionMarkSvg from '../../assets/questionmark3.svg';
import GoldIcon from '../../assets/gold1.svg';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

const CustomizePlanScreen = () => {
  const navigation = useNavigation();
  const [planName, setPlanName] = useState('');
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState({from: false, to: false});

  const handleDateChange = (event, selectedDate, key) => {
    setShowPicker(prev => ({...prev, [key]: false}));
    if (selectedDate) {
      key === 'from' ? setFromDate(selectedDate) : setToDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#B88731"
        barStyle="light-content"
      />
      <View style={styles.goldStrip} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backRow}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.centerTitleRow}>
          <GoldIcon width={24} height={24} />
          <Text style={styles.pageTitle}>Customize your plan</Text>
          <GoldIcon width={24} height={24} />
        </View>

        <Text style={styles.labelText}>Enter your saving plan name</Text>
        <TextInput
          style={styles.inputLeft}
          value={planName}
          onChangeText={setPlanName}
          placeholder="Rajmani Swarncash"
          placeholderTextColor="#ccc"
        />

        <Text style={styles.labelText}>Enter monthly installment amount</Text>
        <TextInput
          style={styles.inputLeft}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="₹ 5000"
          placeholderTextColor="#ccc"
        />
        <Text style={styles.hintText}>
          Minimum installment amount is ₹ 5,000.00
        </Text>

        <Text style={styles.labelText}>Tenure</Text>
        <TextInput
          style={styles.inputLeft}
          value={tenure}
          onChangeText={setTenure}
          keyboardType="numeric"
          placeholder="Tenure (months)"
          placeholderTextColor="#999"
        />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Saving after maturity</Text>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Your total payment</Text>
            <Text style={styles.value}>₹ 55,000.00</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Special Benefits</Text>
            <Text style={styles.value}>₹ 5,000.00</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>You can buy jewellery worth</Text>
            <Text style={styles.value}>₹ 60,000.00</Text>
          </View>
          <View style={styles.separator} />
          <Text style={styles.note}>
            Once you make 75% payment of your Saving Plan, your gold rate at
            that time will be locked.
          </Text>
        </View>

        <Text style={styles.installDateLabel}>Set installment date</Text>
        <View style={styles.dateRow}>
          <TouchableOpacity
            onPress={() => setShowPicker({...showPicker, from: true})}
            style={styles.dateBox}>
            <Text style={styles.dateText}>
              {moment(fromDate).format('DD-MM-YYYY')}
            </Text>
            <Image
              source={require('../../assets/calendar.png')}
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
          <Text style={styles.toText}>to</Text>
          <TouchableOpacity
            onPress={() => setShowPicker({...showPicker, to: true})}
            style={styles.dateBox}>
            <Text style={styles.dateText}>
              {moment(toDate).format('DD-MM-YYYY')}
            </Text>
            <Image
              source={require('../../assets/calendar.png')}
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
        </View>

        {showPicker.from && (
          <DateTimePicker
            value={fromDate}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={(e, d) => handleDateChange(e, d, 'from')}
          />
        )}
        {showPicker.to && (
          <DateTimePicker
            value={toDate}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={(e, d) => handleDateChange(e, d, 'to')}
          />
        )}

        <TouchableOpacity
          style={styles.buyBtn}
          onPress={() => navigation.navigate('SavingsBuyNow')}>
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('SavingsQuestionMark')}
        style={styles.floatingHelp}
        activeOpacity={0.8}>
        <QuestionMarkSvg width={35} height={35} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  goldStrip: {height: 40, backgroundColor: '#B88731', width: '100%'},
  scrollContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: 80,
    paddingTop: 10,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  backText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginLeft: 8,
  },
  centerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginHorizontal: 10,
    color: '#000',
    marginTop: 10,
  },
  labelText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginTop: 10,
    marginBottom: 4,
  },
  inputLeft: {
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'left',
  },
  hintText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
  },
  card: {
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    padding: 15,
    marginVertical: 16,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#B88731',
    marginVertical: 6,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  value: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  note: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginTop: 10,
  },
  installDateLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
    color: '#000',
    textAlign: 'left',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#B88731',
    padding: 10,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000',
  },
  calendarIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  toText: {
    marginHorizontal: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  buyBtn: {
    backgroundColor: '#B88731',
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buyText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  floatingHelp: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 30,
    elevation: 4,
  },
});

export default CustomizePlanScreen;
