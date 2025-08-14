import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#fff" 
        translucent={false}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Home</Text>
          <Text style={styles.subtitle}>Your digital gold journey starts here</Text>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.searchInput,
              inputFocused && styles.searchInputFocused
            ]}
            placeholder="Search gold products..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Text style={styles.actionTitle}>Buy Gold</Text>
              <Text style={styles.actionSubtitle}>Start investing today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Text style={styles.actionTitle}>Sell Gold</Text>
              <Text style={styles.actionSubtitle}>Get best rates</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Gold Rates */}
        <View style={styles.goldRates}>
          <Text style={styles.sectionTitle}>Today's Gold Rates</Text>
          <View style={styles.rateCard}>
            <View style={styles.rateItem}>
              <Text style={styles.rateLabel}>24K Gold</Text>
              <Text style={styles.rateValue}>₹5,850/g</Text>
            </View>
            <View style={styles.rateItem}>
              <Text style={styles.rateLabel}>22K Gold</Text>
              <Text style={styles.rateValue}>₹5,365/g</Text>
            </View>
          </View>
        </View>

        {/* Portfolio Summary */}
        <View style={styles.portfolio}>
          <Text style={styles.sectionTitle}>Your Portfolio</Text>
          <View style={styles.portfolioCard}>
            <View style={styles.portfolioItem}>
              <Text style={styles.portfolioLabel}>Total Gold</Text>
              <Text style={styles.portfolioValue}>2.5g</Text>
            </View>
            <View style={styles.portfolioItem}>
              <Text style={styles.portfolioLabel}>Current Value</Text>
              <Text style={styles.portfolioValue}>₹14,625</Text>
            </View>
            <View style={styles.portfolioItem}>
              <Text style={styles.portfolioLabel}>P&L</Text>
              <Text style={[styles.portfolioValue, styles.profit]}>+₹1,250</Text>
            </View>
          </View>
        </View>

        {/* Investment Options */}
        <View style={styles.investments}>
          <Text style={styles.sectionTitle}>Investment Options</Text>
          <TouchableOpacity style={styles.investmentCard}>
            <Text style={styles.investmentTitle}>SIP Plans</Text>
            <Text style={styles.investmentDesc}>Start with ₹100/month</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.investmentCard}>
            <Text style={styles.investmentTitle}>One-time Purchase</Text>
            <Text style={styles.investmentDesc}>Buy gold instantly</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactions}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <View style={styles.transactionCard}>
            <Text style={styles.transactionTitle}>Gold Purchase</Text>
            <Text style={styles.transactionDate}>Today, 2:30 PM</Text>
            <Text style={styles.transactionAmount}>+0.5g</Text>
          </View>
          <View style={styles.transactionCard}>
            <Text style={styles.transactionTitle}>SIP Investment</Text>
            <Text style={styles.transactionDate}>Yesterday, 10:00 AM</Text>
            <Text style={styles.transactionAmount}>+0.2g</Text>
          </View>
        </View>

        {/* Add some bottom padding to ensure content is not hidden behind tab bar */}
        <View style={styles.bottomPadding} />
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B88731',
    marginBottom: 5,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  searchContainer: {
    marginBottom: 30,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
    fontFamily: 'Poppins-Regular',
  },
  searchInputFocused: {
    borderColor: '#B88731',
    backgroundColor: '#FFF2DD',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    fontFamily: 'Poppins-SemiBold',
  },
  quickActions: {
    marginBottom: 30,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#FFF2DD',
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B88731',
    marginBottom: 5,
    fontFamily: 'Poppins-SemiBold',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  goldRates: {
    marginBottom: 30,
  },
  rateCard: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rateItem: {
    alignItems: 'center',
  },
  rateLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  rateValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B88731',
    fontFamily: 'Poppins-Bold',
  },
  portfolio: {
    marginBottom: 30,
  },
  portfolioCard: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  portfolioItem: {
    alignItems: 'center',
  },
  portfolioLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  portfolioValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  profit: {
    color: '#4CAF50',
  },
  investments: {
    marginBottom: 30,
  },
  investmentCard: {
    backgroundColor: '#FFF2DD',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  investmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B88731',
    marginBottom: 5,
    fontFamily: 'Poppins-SemiBold',
  },
  investmentDesc: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  transactions: {
    marginBottom: 30,
  },
  transactionCard: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B88731',
    fontFamily: 'Poppins-Bold',
  },
  bottomPadding: {
    height: Platform.OS === 'ios' ? 120 : 100,
  },
});

export default Home;