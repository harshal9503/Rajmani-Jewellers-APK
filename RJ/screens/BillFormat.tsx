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
  code: string;
  description: string;
  designMtr: string;
  alt: string;
  roll: string;
  rollMtr: string;
  mRate: string;
  fold: string;
  totalMtr: string;
  amount: string;
}

interface BillFormatProps {
  billNo?: string;
  date?: string;
  phone?: string;
  address?: string;
  items?: BillItem[];
  totalAmount?: string;
}

const BillFormat: React.FC<BillFormatProps> = ({
  billNo = "G-2020446340",
  date = "31-Jul-2020",
  phone = "",
  address = "",
  items = [
    {
      code: "JHJ",
      description: "Urban",
      designMtr: "2.95",
      alt: "0.00[1-2.00][1]",
      roll: "2600 mtr[26x100]",
      rollMtr: "",
      mRate: "14.5",
      fold: "",
      totalMtr: "26.00[2.95]",
      amount: "377.00"
    }
  ],
  totalAmount = "8524.18[10796.00]"
}) => {

  const TableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerCell, { width: '8%' }]}>Code</Text>
      <Text style={[styles.headerCell, { width: '12%' }]}>Description</Text>
      <Text style={[styles.headerCell, { width: '8%' }]}>Design</Text>
      <Text style={[styles.headerCell, { width: '6%' }]}>Mtr</Text>
      <Text style={[styles.headerCell, { width: '8%' }]}>Alt</Text>
      <Text style={[styles.headerCell, { width: '15%' }]}>Roll</Text>
      <Text style={[styles.headerCell, { width: '8%' }]}>Roll Mtr</Text>
      <Text style={[styles.headerCell, { width: '8%' }]}>M.Rate</Text>
      <Text style={[styles.headerCell, { width: '6%' }]}>Fold</Text>
      <Text style={[styles.headerCell, { width: '12%' }]}>Total Mtr</Text>
      <Text style={[styles.headerCell, { width: '9%' }]}>Amount</Text>
    </View>
  );

  const TableRow = ({ item }: { item: BillItem }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.cell, { width: '8%' }]}>{item.code}</Text>
      <Text style={[styles.cell, { width: '12%' }]}>{item.description}</Text>
      <Text style={[styles.cell, { width: '8%' }]}>{item.designMtr}</Text>
      <Text style={[styles.cell, { width: '6%' }]}></Text>
      <Text style={[styles.cell, { width: '8%' }]}>{item.alt}</Text>
      <Text style={[styles.cell, { width: '15%' }]}>{item.roll}</Text>
      <Text style={[styles.cell, { width: '8%' }]}>{item.rollMtr}</Text>
      <Text style={[styles.cell, { width: '8%' }]}>{item.mRate}</Text>
      <Text style={[styles.cell, { width: '6%' }]}>{item.fold}</Text>
      <Text style={[styles.cell, { width: '12%' }]}>{item.totalMtr}</Text>
      <Text style={[styles.cell, { width: '9%' }]}>{item.amount}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.billContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>Textiles Vania</Text>
            <Text style={styles.subtitle}>at Girnar out df</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.billDetails}>Bill No. 9-0001</Text>
            <Text style={styles.billDetails}>Date: {date}</Text>
          </View>
        </View>

        {/* Party Details Section */}
        <View style={styles.partySection}>
          <View style={styles.partyRow}>
            <Text style={styles.label}>Ph :</Text>
            <Text style={styles.billNoText}>{billNo}</Text>
          </View>
          <View style={styles.addressRow}>
            <Text style={styles.addressText}>{address}</Text>
          </View>
        </View>

        {/* Table Section */}
        <View style={styles.tableContainer}>
          <TableHeader />
          {items.map((item, index) => (
            <TableRow key={index} item={item} />
          ))}
          
          {/* Empty rows to match the image */}
          {[...Array(8)].map((_, index) => (
            <View key={`empty-${index}`} style={styles.emptyRow}>
              <Text style={[styles.cell, { width: '8%' }]}></Text>
              <Text style={[styles.cell, { width: '12%' }]}></Text>
              <Text style={[styles.cell, { width: '8%' }]}></Text>
              <Text style={[styles.cell, { width: '6%' }]}></Text>
              <Text style={[styles.cell, { width: '8%' }]}></Text>
              <Text style={[styles.cell, { width: '15%' }]}></Text>
              <Text style={[styles.cell, { width: '8%' }]}></Text>
              <Text style={[styles.cell, { width: '8%' }]}></Text>
              <Text style={[styles.cell, { width: '6%' }]}></Text>
              <Text style={[styles.cell, { width: '12%' }]}></Text>
              <Text style={[styles.cell, { width: '9%' }]}></Text>
            </View>
          ))}
        </View>

        {/* Total Section */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total :</Text>
            <Text style={styles.totalValue}>Gold : 5,910</Text>
            <Text style={styles.totalValue}>5,910</Text>
            <Text style={styles.totalValue}>$</Text>
            <Text style={styles.finalTotal}>{totalAmount}</Text>
          </View>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerText}>Rs. Only</Text>
          </View>
          <View style={styles.footerRight}>
            <Text style={styles.footerAmount}>NET AMOUNT:</Text>
            <Text style={styles.footerAmount}>NIL</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  billContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 12,
    color: '#000',
    marginTop: 2,
  },
  billDetails: {
    fontSize: 12,
    color: '#000',
    marginBottom: 2,
  },
  partySection: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  partyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  addressRow: {
    marginTop: 5,
  },
  label: {
    fontSize: 12,
    color: '#000',
    marginRight: 5,
  },
  billNoText: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 12,
    color: '#000',
  },
  tableContainer: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 8,
  },
  headerCell: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 2,
    borderRightWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 6,
    minHeight: 25,
  },
  emptyRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 6,
    minHeight: 25,
  },
  cell: {
    fontSize: 10,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 2,
    borderRightWidth: 1,
    borderColor: '#000',
  },
  totalSection: {
    borderTopWidth: 2,
    borderTopColor: '#000',
    paddingTop: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontSize: 12,
    color: '#000',
  },
  finalTotal: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 10,
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#000',
  },
  footerAmount: {
    fontSize: 12,
    color: '#000',
    marginLeft: 20,
  },
});

export default BillFormat;