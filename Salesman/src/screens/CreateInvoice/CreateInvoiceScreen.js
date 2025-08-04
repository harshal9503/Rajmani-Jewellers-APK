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

const CreateInvoiceScreen = ({ navigation }) => {
  const [expanded, setExpanded] = useState(true);
  const [products, setProducts] = useState([{ id: 1, expanded: true }]);
  const [productForm, setProductForm] = useState(false);

  const toggleDropdown = () => {
    setExpanded(prev => !prev);
  };

  const toggleProductDropdown = index => {
    const updatedProducts = [...products];
    updatedProducts[index].expanded = !updatedProducts[index].expanded;
    setProducts(updatedProducts);
  };

  const removeProduct = index => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const addMoreProduct = () => {
    setProductForm(true)
  };

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
            <Text style={styles.label}>Bill No.</Text>
            <TextInput style={styles.input} placeholder="RJ-001" />
          </View>
          <View style={styles.inputContainerHalf}>
            <Text style={styles.label}>Date</Text>
            <TextInput style={styles.input} placeholder="12/06/2025" />
          </View>
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
                  placeholder="Enter name in English"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name (In Hindi)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter name in Hindi"
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
                placeholder="+91 74898 06724"
              />
            </View>

            <View style={styles.fullInputContainer}>
              <Text style={styles.label}>Address</Text>
              <TextInput style={styles.input} placeholder="Khargone" />
            </View>
          </>
        )}

        <View
          style={{ height: 1, backgroundColor: '#FF0000', marginVertical: 15 }}
        />

        {products.map((product, index) => (
          <View key={product.id} style={styles.section}>
            {product.expanded ? (
              <View style={styles.productBox1}>
                <Text style={styles.sectionTitle}>Product {index + 1}</Text>
                <Text style={styles.topLeft}>Type: Sale</Text>
                <Text style={styles.topRight}>Name: Gold Ring</Text>
                <Text style={styles.bottomLeft}>Purity: 22K</Text>
                <Text style={styles.bottomRight}>Amount: ₹25000</Text>
                <TouchableOpacity
                  onPress={() => removeProduct(index)}
                  style={{ position: 'absolute', top: -2, right: 8 }}
                >
                  <Image
                    source={require('../../assets/crosscircle.png')}
                    style={{ width: 20, height: 20, marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.headerRow}
                onPress={() => toggleProductDropdown(index)}
              >
                <Text style={styles.sectionTitle}>Product {index + 1}</Text>
                <Image
                  source={require('../../assets/dropdownicon.png')}
                  style={{
                    width: 18,
                    height: 10,
                    transform: [{ rotate: '180deg' }],
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}

        <View
          style={{ height: 1, backgroundColor: '#FF0000', marginVertical: 15 }}
        />

        {productForm && (
          <View>
            <View>
              <TouchableOpacity
                style={styles.headerRow}
                onPress={toggleDropdown}
              >
                <Text style={styles.sectionTitle}>Product 2</Text>
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
                  <Text style={styles.label}>Type</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Sales/Purchase"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Tag number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="08.34"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Product name</Text>
                  <TextInput style={styles.input} placeholder="Jhunki" />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Remark</Text>
                  <TextInput style={styles.input} placeholder="Best Product" />
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Purity</Text>
                <TextInput style={styles.input} placeholder="18k/20k/22k/24k" />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Piece</Text>
                <TextInput
                  style={styles.input}
                  placeholder="01"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Gross Wt.(in Gm)</Text>
                <TextInput style={styles.input} placeholder="0.8" />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Net Wt.(in Gm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.4"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Less Wt.(in Gm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.4"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Rate(in Gm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="₹9800.00"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Value(Net wt * Rate)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="₹39,200.00"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Stone rate</Text>
                <TextInput style={styles.input} placeholder="0.3" />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputContainerbox}>
                  <Text style={styles.label}>Labour change(%)</Text>
                  <TouchableOpacity style={styles.typeChangeBtn}>
                    <Text
                      style={{
                        color: '#FF0000',
                        textAlign: 'center',
                        fontSize: 10,
                      }}
                    >
                      In weight
                    </Text>
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="0.4"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Labour change(in ₹)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="₹1200.00(autofill)"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Final Amount</Text>
                <TextInput
                  style={styles.input}
                  placeholder="₹40,400.00(autofill)"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Addition</Text>
                <TextInput style={styles.input} placeholder="₹5,500.00" />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Discount</Text>
                <TextInput style={styles.input} placeholder="₹500.00" />
              </View>
            </View>
          </View>
        )}

        <View
          style={{ height: 1, backgroundColor: '#FF0000', marginVertical: 15 }}
        />

        <TouchableOpacity onPress={addMoreProduct}>
          <Text style={styles.addProduct}>+ Add more products</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={()=>navigation.navigate('invoice-payment')} >
          <Text style={styles.payText}>Make Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateInvoiceScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 16, paddingBottom: 140, },
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
});
