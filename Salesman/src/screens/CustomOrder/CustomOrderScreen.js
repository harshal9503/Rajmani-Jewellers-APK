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
} from 'react-native';

const { width } = Dimensions.get('window');

const CustomOrderScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Today’s Gold Rate</Text>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          {[1, 2, 3, 4].map((_, i) => (
            <View key={i} style={styles.box}>
              <Text style={styles.boxTitle}>18k</Text>
              <Text style={styles.boxValue}>₹92000.00</Text>
            </View>
          ))}
        </View>

        <Text style={styles.infoText}>
          Please fill in all the required details here and generate the invoice
        </Text>

        <View style={styles.sectionFirst}>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Vouncher No.</Text>
            <TextInput style={styles.input} placeholder="RJ-001" />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Date</Text>
            <TextInput style={styles.input} placeholder="12/06/2025" />
          </View>
        </View>

        <View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholder="Kratin Rathor" />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput style={styles.input} placeholder="+91 0000000000" />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput style={styles.input} placeholder="Jhumki" />
          </View>
        </View>

        <View style={styles.sectionFirst}>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Weight form</Text>
            <TextInput style={styles.input} placeholder="from" />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Weight to</Text>
            <TextInput style={styles.input} placeholder="to" />
          </View>
        </View>

        <View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Purity</Text>
            <TextInput style={styles.input} placeholder="18k/22k/24k" />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Size/Lenght</Text>
            <TextInput style={styles.input} placeholder="565656" />
          </View>
           <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Width</Text>
            <TextInput style={styles.input} placeholder="24" />
          </View>
           <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Stone weight</Text>
            <TextInput style={styles.input} placeholder="1.00gm" />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Rate cut</Text>
            <TextInput style={styles.input} placeholder="Yes/No" />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Rate</Text>
            <TextInput style={styles.input} placeholder="₹9800.00" />
          </View>
           <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Expected delivery data</Text>
            <TextInput style={styles.input} placeholder="30 Aug 2025" />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.description} />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Expected Amount</Text>
            <TextInput style={styles.input} placeholder="₹9800.00" />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Karigar Name</Text>
            <TextInput style={styles.input} placeholder="Rahul" />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => navigation.navigate('invoice-payment')}
        >
          <Text style={styles.payText}>Save</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 20,
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
    fontWeight: '600',
    color: '#FF0000',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    color: '#666',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  inputContainer: { flex: 1, marginRight: 10 },
  inputContainerHalf: { flex: 1 },
  fullInputContainer: { marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  requiredLabel: { fontWeight: '600' },
  red: { color: 'red' },
  addProduct: { color: '#d00', fontWeight: 'bold', marginTop: 10 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#fff',
  },
  payButton: {
    backgroundColor: '#0DC143',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  payText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  backButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 60,
    left: 10,
    zIndex: 10,
  },
  backarrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  backText: { fontSize: 16, fontWeight: '500' },
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
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  boxValue: { fontSize: 12, color: '#555' },
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
  topLeft: { top: 5, left: 10 },
  topRight: { top: -13, right: -280 },
  bottomLeft: { bottom: -10, left: 10 },
  bottomRight: { bottom: 6, right: -280 },
  typeChangeBtn: {
    width: 50,
    height: 16,
    backgroundColor: 'transparent',
    borderColor: '#FF0000',
    borderWidth: 1,
    borderRadius: 3,
    color: '#FF0000',
  },
  inputContainerbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description:{
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 10,
  }
});
