import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'; 

const InvoicePaymentScreen = () => {
  const [showQR, setShowQR] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Make Payment</Text>
      <Text style={styles.amount}>Payable amount = ₹40,400.00</Text>

      {/* Payment Inputs */}
      <View style={styles.paymentRow}>
        <Text style={styles.paymentLabel}>Mode of payment</Text>
        <Text style={styles.paymentLabel}>Payment</Text>
      </View>

      {['Cash', 'UPI', 'Pending'].map((mode, index) => (
        <View key={index} style={styles.paymentRow}>
          <TextInput style={styles.modeInput} value={mode} editable={false} />
          <TextInput
            style={styles.amountInput}
            defaultValue="₹1200.00"
            keyboardType="numeric"
          />
        </View>
      ))}

      {/* Total */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>₹3600.00</Text>
      </View>

      {/* QR Toggle */}
      <TouchableOpacity
        style={styles.qrToggle}
        onPress={() => setShowQR(!showQR)}
      >
        <Text style={styles.qrToggleText}>
          {showQR ? 'Close QR code' : 'Open QR code'}
        </Text>
      </TouchableOpacity>

      {/* QR Code */}
      {showQR && (
        <View style={styles.qrContainer}>
          <Image
            source={require('../../assets/barcode.jpg')} // Replace with your QR image
            style={styles.qrImage}
            resizeMode="contain"
          />
          <Text style={styles.qrNote}>Scan to pay with any UPI app</Text>
        </View>
      )}

      {/* Done Button */}
      <TouchableOpacity style={styles.doneButton}>
        <Text style={styles.doneText}>Payment Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default InvoicePaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: 'red',
    marginBottom: 10,
  },
  amount: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  paymentLabel: {
    fontWeight: '600',
    fontSize: 14,
  },
  modeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  amountInput: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    fontSize: 14,
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  qrToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  qrToggleText: {
    fontSize: 16,
    color: 'green',
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  qrNote: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
  },
  doneButton: {
    backgroundColor: '#0DC143',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: '20%',
    elevation: 5,
  },
  doneText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
