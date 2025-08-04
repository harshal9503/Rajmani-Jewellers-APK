import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const {width} = Dimensions.get('window');

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [accepted, setAccepted] = useState(false);

  const handleProceed = () => {
    if (accepted) {
      navigation.navigate('TransactionSuccessScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.goldStrip} />
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.backRow}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.nameText}>Ankit Sharma</Text>
              <Text style={styles.phoneText}>+91 7489806724</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Digital gold</Text>
            </View>
          </View>

          <View style={styles.separatorLine} />

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Gold 22KT</Text>
            <Text style={styles.value}>1.00 gm</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>₹9,800.00</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <View style={styles.totalBox}>
              <Text style={styles.totalAmount}>₹9,800.00</Text>
            </View>
          </View>
          <View style={styles.separatorLine} />
          <Text style={styles.noteLabel}>Note: </Text>
          <Text style={styles.noteText}>
            {/* <Text style={styles.noteLabel}>
              {' '}
              GST will be payable while purchasing jewellery at shop.
            </Text> */}
            GST will be payable while purchasing jewellery at shop.
          </Text>
        </View>

        <View style={styles.termsRow}>
          <CheckBox
            value={accepted}
            onValueChange={setAccepted}
            tintColors={{true: '#B88731', false: '#B88731'}}
          />
          <Text style={styles.termsText}>
            I accept <Text style={styles.link}>terms & conditions</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, !accepted && styles.disabledButton]}
          onPress={handleProceed}
          disabled={!accepted}>
          <Text style={styles.buttonText}>Proceed to payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  goldStrip: {
    height: width * 0.11,
    width: '100%',
    backgroundColor: '#B88731',
  },
  content: {
    padding: width * 0.05,
    paddingBottom: 100,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.03,
  },
  backIcon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  backText: {
    marginLeft: 10,
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#B88731',
    width: '100%',
    marginBottom: width * 0.03,
    marginTop: width * 0.02,
  },
  separatorLine1: {
    height: 1,
    backgroundColor: '#B88731',
    width: '100%',
    marginBottom: width * 0.04,
    marginTop: width * 0.04,
  },
  card: {
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    padding: width * 0.04,
    backgroundColor: '#fff',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width * 0.03,
  },
  nameText: {
    fontSize: width * 0.04,
    color: '#000',
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  phoneText: {
    fontSize: width * 0.035,
    color: '#000',
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  badge: {
    backgroundColor: '#A21211',
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: width * 0.03,
    fontFamily: 'Poppins-SemiBold',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#999',
    marginVertical: 10,
  },
  label: {
    fontSize: width * 0.037,
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  value: {
    fontSize: width * 0.037,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  totalBox: {
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 25,
  },
  totalAmount: {
    fontSize: width * 0.038,
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  noteLabel: {
    fontFamily: 'Poppins-SemiBold',
    color: '#444',
  },
  noteText: {
    fontSize: width * 0.028,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginTop: 4,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  termsText: {
    color: '#000',
    fontSize: width * 0.035,
    fontFamily: 'Poppins-Regular',
  },
  link: {
    color: '#0000FF',
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#B88731',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default PaymentScreen;
