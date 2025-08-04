import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const InvoiceModal = ({ visible, onClose }) => {
  const navigation = useNavigation();

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Image
              source={require('../assets/modalclose.png')}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Edit Button */}
            <TouchableOpacity style={styles.editBtn} onPress={()=>navigation.navigate('create-invoice')} >
              <View style={styles.editBtnContent}>
                <Text style={styles.editText}>Edit Invoice</Text>
                <Image
                  source={require('../assets/modaledit.png')}
                  style={styles.editIcon}
                />
              </View>
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Necklace</Text>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.label}>Order</Text>
                <Text
                  style={{ color: '#aaa', fontSize: 15, fontWeight: 'bold' }}
                >
                  001
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 20 }}>
                <Text
                  style={{ marginLeft: 20, fontSize: 15, fontWeight: '800' }}
                >
                  Tag Id
                </Text>
                <Text
                  style={{ color: '#aaa', fontSize: 15, fontWeight: 'bold' }}
                >
                  54342
                </Text>
              </View>
            </View>

            {/* Detail Items */}
            {[
              { label: 'Name:', value: 'Ankit Sharma' },
              { label: 'Contact:', value: '+91 74898 06724' },
              { label: 'Address:', value: 'Bengali Square, Indore' },
              { label: 'Product:', value: 'Diamond Necklace' },
              { label: 'Gross Wt.:', value: '08.57Gm' },
              { label: 'Net Wt.:', value: '08.57Gm' },
              {
                label: 'Status:',
                value: 'Sold',
                color: '#0DC143',
                bold: true,
              },
              { label: 'Amount:', value: '₹48,000.00' },
              { label: 'Diamonds:', value: '₹20,000.00' },
            ].map((item, index) => (
              <View style={styles.detailContainer} key={index}>
                <Text style={styles.label}>{item.label}</Text>
                <Text
                  style={[
                    styles.value,
                    item.color && { color: item.color },
                    item.bold && { fontWeight: 'bold' },
                  ]}
                >
                  {item.value}
                </Text>
              </View>
            ))}

            {/* Total */}
            <View style={styles.detailContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>₹68,000.00</Text>
            </View>

            {/* Generate Invoice Button */}
            <TouchableOpacity style={styles.invoiceBtn} onPress={()=>navigation.navigate('bill-page')} >
              <View style={styles.invoiceBtnContent}>
                <Text style={styles.invoiceBtnText}>Generate Invoice</Text>
                <Image
                  source={require('../assets/downloadicon.png')}
                  style={styles.downloadIcon}
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default InvoiceModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.94,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 40,
    maxHeight: '90%',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  editBtn: {
    backgroundColor: '#1E1EFF',
    paddingVertical: 13,
    borderRadius: 6,
    marginBottom: 16,
    alignItems: 'center',
  },
  editBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 6,
  },
  editIcon: {
    width: 14,
    height: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    fontWeight: '800',
    color: '#000',
    width: 90,
    fontSize: 15,
  },
  value: {
    color: '#aaa',
    fontWeight: '800',
    flex: 1,
    textAlign: 'left',
    fontSize: 15,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
    width: 90,
  },
  totalValue: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#aaa',
    flex: 1,
    textAlign: 'left',
  },
  invoiceBtn: {
    backgroundColor: 'red',
    paddingVertical: 13,
    borderRadius: 6,
    marginTop: 16,
    alignItems: 'center',
  },
  invoiceBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  invoiceBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 6,
  },
  downloadIcon: {
    width: 14,
    height: 14,
  },
});
