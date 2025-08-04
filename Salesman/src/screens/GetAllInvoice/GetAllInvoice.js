import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import InvoiceModal from '../../modals/InvoiceModal';

const GetAllInvoice = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Sale');
  const [searchText, setSearchText] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const invoices = [
    {
      id: 1,
      name: 'Ankit Sharma',
      billNo: '11370',
      amount: '₹10,000.00',
      date: '20 Jul 2025',
      phone: '+91 74588 06724',
      color: '#c8f2d1',
      tab: 'Sale',
    },
    {
      id: 2,
      name: 'Kshitij Jain',
      billNo: '11370',
      amount: '₹10,000.00',
      date: '20 Jul 2025',
      phone: '+91 74588 06724',
      color: '#fdd9d9',
      tab: 'Repair',
    },
    {
      id: 3,
      name: 'Ankit Sharma',
      billNo: '11370',
      amount: '₹10,000.00',
      date: '20 Jul 2025',
      phone: '+91 74588 06724',
      color: '#dfd8f9',
      tab: 'Repair',
    },
    {
      id: 4,
      name: 'Ankit Sharma',
      billNo: '11370',
      amount: '₹10,000.00',
      date: '20 Jul 2025',
      phone: '+91 74588 06724',
      color: '#c8f2d1',
      tab: 'Sale',
    },
  ];

  const filteredInvoices = invoices.filter(
    inv =>
      inv.tab === selectedTab &&
      inv.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/HomeImg/editicon.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text style={styles.headerTitle}>INVOICE</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Sale', 'Repair'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search */}
      <View>
        <View
          style={{
            position: 'absolute',
            top: 25,
            left: 20,
            borderRightWidth: 1,
            borderColor: '#aaa',
            paddingHorizontal: 8,
          }}
        >
          <Image
            source={require('../../assets/searchicon.png')}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <View style={{flexDirection:'row',gap:1}} >
          <Text style={styles.tableHeaderText}>C Name</Text>
          <Image source={require('../../assets/doublearrow.png')} style={{width:10, height:8, marginTop:5}} />
        </View>
        <View style={{flexDirection:'row',gap:1}} >
          <Text style={styles.tableHeaderText}>Bill no.</Text>
          <Image source={require('../../assets/doublearrow.png')} style={{width:10, height:8, marginTop:5}} />
        </View>
        <View style={{flexDirection:'row',gap:1}} >
          <Text style={styles.tableHeaderText}>Amount </Text>
          <Image source={require('../../assets/doublearrow.png')} style={{width:10, height:8, marginTop:5}} />
        </View>
      </View>

      {/* Invoices List */}
      <ScrollView style={styles.scrollArea}>
        {filteredInvoices.map(inv => (
          <TouchableOpacity
            key={inv.id}
            onPress={() => setOpenModal(true)}
          >
            <View style={[styles.invoiceCard, { backgroundColor: inv.color }]}>
              <View>
                <Text style={styles.dateText}>{inv.date}</Text>
                <Text style={styles.nameText}>{inv.name}</Text>
                <Text style={styles.phoneText}>{inv.phone}</Text>
              </View>
              <Text style={styles.billText}>{inv.billNo}</Text>
              <Text style={styles.amountText}>{inv.amount}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Create Invoice Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate('create-invoice')}
        >
          <Text style={styles.createBtnText}>Create Invoice +</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      {openModal && (
        <InvoiceModal visible={openModal} onClose={() => setOpenModal(false)} />
      )}
    </SafeAreaView>
  );
};

export default GetAllInvoice;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#2a2ebf',
  },
  tabText: {
    fontSize: 14,
    color: '#2a2ebf',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#fff',
  },
  searchInput: {
    margin: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    paddingLeft: 50,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    backgroundColor: '#eee',
    paddingVertical: 8,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 10,
  },
  scrollArea: {
    flex: 1,
  },
  invoiceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 10,
    padding: 12,
  },
  dateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#d00',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  phoneText: {
    fontSize: 12,
    color: '#555',
  },
  billText: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  amountText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    padding: 12,
    backgroundColor: '#fff',
  },
  createBtn: {
    backgroundColor: '#2a2ebf',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  createBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
