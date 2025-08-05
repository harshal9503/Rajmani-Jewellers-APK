import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface BillItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface BillData {
  billNo: string;
  date: string;
  phoneNumber: string;
  items: BillItem[];
  total: number;
  received: number;
  balance: number;
}

const BillFormat: React.FC<{ billData: BillData }> = ({ billData }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.billContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.businessName}>Taksheel Verma Ji Ginni and Oil</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.billNoLabel}>Bill No. 5/2020</Text>
            <Text style={styles.dateLabel}>Date: 31.Jul.2020</Text>
          </View>
        </View>

        {/* Phone Number */}
        <View style={styles.phoneContainer}>
          <Text style={styles.phoneText}>Ph # 0348644345</Text>
        </View>

        {/* Table Header */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <View style={[styles.tableCell, styles.descriptionColumn]}>
              <Text style={styles.tableHeaderText}>Description</Text>
            </View>
            <View style={[styles.tableCell, styles.qtyColumn]}>
              <Text style={styles.tableHeaderText}>Qty</Text>
            </View>
            <View style={[styles.tableCell, styles.rateColumn]}>
              <Text style={styles.tableHeaderText}>Rate</Text>
            </View>
            <View style={[styles.tableCell, styles.amountColumn]}>
              <Text style={styles.tableHeaderText}>Amount</Text>
            </View>
          </View>

          {/* Table Rows */}
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.descriptionColumn]}>
              <Text style={styles.tableCellText}>Arhan Dost</Text>
            </View>
            <View style={[styles.tableCell, styles.qtyColumn]}>
              <Text style={styles.tableCellText}>320</Text>
            </View>
            <View style={[styles.tableCell, styles.rateColumn]}>
              <Text style={styles.tableCellText}>14,803</Text>
            </View>
            <View style={[styles.tableCell, styles.amountColumn]}>
              <Text style={styles.tableCellText}>14,803</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.descriptionColumn]}>
              <Text style={styles.tableCellText}>Ginni Dost</Text>
            </View>
            <View style={[styles.tableCell, styles.qtyColumn]}>
              <Text style={styles.tableCellText}>283</Text>
            </View>
            <View style={[styles.tableCell, styles.rateColumn]}>
              <Text style={styles.tableCellText}>2,848 + 2,444</Text>
            </View>
            <View style={[styles.tableCell, styles.amountColumn]}>
              <Text style={styles.tableCellText}>8058.04 (2192)</Text>
            </View>
          </View>

          {/* Empty rows to match the image */}
          {[...Array(8)].map((_, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={[styles.tableCell, styles.descriptionColumn]}>
                <Text style={styles.tableCellText}></Text>
              </View>
              <View style={[styles.tableCell, styles.qtyColumn]}>
                <Text style={styles.tableCellText}></Text>
              </View>
              <View style={[styles.tableCell, styles.rateColumn]}>
                <Text style={styles.tableCellText}></Text>
              </View>
              <View style={[styles.tableCell, styles.amountColumn]}>
                <Text style={styles.tableCellText}></Text>
              </View>
            </View>
          ))}

          {/* Total Row */}
          <View style={[styles.tableRow, styles.totalRow]}>
            <View style={[styles.tableCell, styles.descriptionColumn]}>
              <Text style={styles.totalText}>Total</Text>
            </View>
            <View style={[styles.tableCell, styles.qtyColumn]}>
              <Text style={styles.totalText}>Gold = 5,910</Text>
            </View>
            <View style={[styles.tableCell, styles.rateColumn]}>
              <Text style={styles.totalText}>5,910</Text>
            </View>
            <View style={[styles.tableCell, styles.amountColumn]}>
              <Text style={styles.totalText}>22861 (5,910.00)</Text>
            </View>
          </View>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerText}>To: Goldy</Text>
          </View>
          <View style={styles.footerRight}>
            <Text style={styles.footerText}>NET AMOUNT: 22861</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#white',
  },
  billContainer: {
    margin: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 8,
    minHeight: 50,
  },
  headerLeft: {
    flex: 2,
    justifyContent: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  businessName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  billNoLabel: {
    fontSize: 12,
    color: '#000',
    marginBottom: 2,
  },
  dateLabel: {
    fontSize: 12,
    color: '#000',
  },
  phoneContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 8,
    minHeight: 35,
    justifyContent: 'center',
  },
  phoneText: {
    fontSize: 12,
    color: '#000',
  },
  tableContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: '#f0f0f0',
    minHeight: 35,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: 30,
  },
  totalRow: {
    backgroundColor: '#f0f0f0',
    minHeight: 35,
  },
  tableCell: {
    borderRightWidth: 1,
    borderRightColor: '#000',
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  descriptionColumn: {
    flex: 3,
  },
  qtyColumn: {
    flex: 2,
  },
  rateColumn: {
    flex: 2,
  },
  amountColumn: {
    flex: 2.5,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  tableCellText: {
    fontSize: 11,
    color: '#000',
    textAlign: 'center',
  },
  totalText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    minHeight: 35,
  },
  footerLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  footerRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default BillFormat;