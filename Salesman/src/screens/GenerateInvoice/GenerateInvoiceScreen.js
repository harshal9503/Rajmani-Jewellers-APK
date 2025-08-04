import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const GenerateInvoiceScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <Text style={styles.boldText}>Tukaram Verma जी</Text>
            <Text style={styles.text}>Ph: 6268845480</Text>
          </View>
          <View style={styles.rightHeader}>
            <Text style={styles.text}>Bill No. RJ001</Text>
            <Text style={styles.text}>Date: 31 Jul 2025</Text>
          </View>
        </View>

        {/* Table Header */}
        <View style={styles.tableRowHeader}>
          {['Type', 'Description', 'Purity', 'Gross Wt', 'Net Wt', 'Rate', 'Value', 'Dia Wt', 'Dia Amt', 'Labour', 'Total'].map((col, index) => (
            <Text key={index} style={styles.tableHeaderText}>{col}</Text>
          ))}
        </View>

        {/* Table Row */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>S</Text>
          <Text style={styles.tableCell}>Jems ring Lakha</Text>
          <Text style={styles.tableCell}>23k, 23k</Text>
          <Text style={styles.tableCell}>3.370, 2.640</Text>
          <Text style={styles.tableCell}>3.370, 2.640</Text>
          <Text style={styles.tableCell}>65600.00</Text>
          <Text style={styles.tableCell}>22119</Text>
          <Text style={styles.tableCell}>0.000, 0.000</Text>
          <Text style={styles.tableCell}>0</Text>
          <Text style={styles.tableCell}>14%</Text>
          <Text style={styles.tableCell}>38583.00 / 22102.00</Text>
        </View>

        {/* Totals */}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total Gold: 5.910</Text>
          <Text style={styles.totalText}>Total: ₹10702.00</Text>
        </View>

        {/* Receipt and Net */}
        <View style={styles.footerDetails}>
          <Text style={styles.text}>RECEIPT (CASH): ₹4500.00</Text>
          <Text style={styles.text}>Net Amount: NIL</Text>
        </View>
      </ScrollView>

      {/* Download Button */}
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadText}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenerateInvoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  leftHeader: {},
  rightHeader: {
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 13,
    color: '#333',
  },
  boldText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tableRowHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#eee',
    padding: 6,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 10,
    width: '9%',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 6,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableCell: {
    fontSize: 10,
    width: '9%',
    textAlign: 'center',
  },
  totalRow: {
    marginTop: 12,
    borderTopWidth: 1,
    paddingTop: 8,
    borderColor: '#ccc',
  },
  totalText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  footerDetails: {
    marginTop: 12,
  },
  downloadButton: {
    position: 'absolute',
    bottom: 10,
    left: 14,
    right: 14,
    backgroundColor: '#1a1aff',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    elevation: 5,
  },
  downloadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
