import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import GoldIcon from '../../assets/goldflat.svg';
import QuestionMarkSvg from '../../assets/questionmark3.svg';

const {width, height} = Dimensions.get('window');

// Responsive sizing calculations
const GOLD_ICON_SIZE = Math.min(width * 0.08, 40);
const SCREEN_PADDING = Math.min(width * 0.04, 20);
const BOTTOM_OFFSET = Math.min(height * 0.1, 70);
const TAB_HEIGHT = Math.min(height * 0.06, 50);
const QUESTION_MARK_SIZE = Math.min(width * 0.12, 60);
const BOTTOM_TAB_HEIGHT = 60;
const WHATSAPP_ICON_SIZE = Math.max(50, Math.min(width * 0.14, 65));

const plans = {
  active: [
    {
      id: '1',
      title: 'Rajmani Swarncash',
      status: 'Active',
      amount: '1,000.00',
      tenure: '1Y - Monthly',
    },
    {
      id: '2',
      title: 'Rajmani Swarncash',
      status: 'Active',
      amount: '1,000.00',
      tenure: '1Y - Monthly',
    },
    {
      id: '3',
      title: 'Golden Future Plan',
      status: 'Active',
      amount: '2,500.00',
      tenure: '2Y - Quarterly',
    },
    {
      id: '4',
      title: 'Wealth Builder',
      status: 'Active',
      amount: '5,000.00',
      tenure: '3Y - Yearly',
    },
  ],
  past: [
    {
      id: '5',
      title: 'Rajmani Swarncash',
      status: 'Redeemed',
      amount: '1,000.00',
      tenure: '1Y - Monthly',
    },
    {
      id: '6',
      title: 'Rajmani Swarncash',
      status: 'Pending',
      amount: '1,000.00',
      tenure: '1Y - Monthly',
    },
    {
      id: '7',
      title: 'Legacy Plan',
      status: 'Pending',
      amount: '4,000.00',
      tenure: '2Y - Quarterly',
    },
  ],
};

const SavingPlanScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('active');
  const [pastTab, setPastTab] = useState('redeemed');

  const renderPlanCard = plan => {
    const isActive = plan.status === 'Active';
    const color = isActive ? '#0B9B36' : '#A21211';

    return (
      <View key={plan.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.planName}>Plan Name</Text>
            <Text style={styles.planTitle}>{plan.title}</Text>
            <Text style={styles.tenure}>Tenure: {plan.tenure}</Text>
          </View>
          <Text style={styles.amount}>₹{plan.amount}</Text>
        </View>

        <View style={styles.detailsBtnContainer}>
          <TouchableOpacity
            style={[styles.detailsBtn, {backgroundColor: color}]}
            onPress={() => {}}>
            <Text style={styles.detailsBtnText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#B88731"
        barStyle="light-content"
      />
      <View style={styles.statusBarContainer}>
        <View style={styles.goldStrip} />
      </View>

      <View style={styles.headerRow}>
        <GoldIcon width={GOLD_ICON_SIZE} height={GOLD_ICON_SIZE} />
        <Text style={styles.title}>Your Saving Plans</Text>
        <GoldIcon width={GOLD_ICON_SIZE} height={GOLD_ICON_SIZE} />
      </View>

      <View style={styles.tabContainer}>
        <View style={styles.tabBox}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'past' ? styles.activeTabRed : styles.inactiveTab,
            ]}
            onPress={() => setActiveTab('past')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'past' && styles.tabTextActiveRed,
              ]}>
              Past Plans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'active'
                ? styles.activeTabGreen
                : styles.inactiveTab,
            ]}
            onPress={() => setActiveTab('active')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'active' && styles.tabTextActiveGreen,
              ]}>
              Active Plans
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'past' && (
        <View style={styles.subTabRow}>
          <TouchableOpacity onPress={() => setPastTab('redeemed')}>
            <Text
              style={
                pastTab === 'redeemed'
                  ? styles.activeSubTab
                  : styles.inactiveSubTab
              }>
              Redeemed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPastTab('pending')}>
            <Text
              style={
                pastTab === 'pending'
                  ? styles.activeSubTab
                  : styles.inactiveSubTab
              }>
              Pending
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {activeTab === 'active'
          ? plans.active.map(renderPlanCard)
          : plans.past
              .filter(plan =>
                pastTab === 'redeemed'
                  ? plan.status === 'Redeemed'
                  : plan.status === 'Pending',
              )
              .map(renderPlanCard)}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Only the red button without any background container */}
      <TouchableOpacity
        style={styles.createPlanBtn}
        onPress={() => navigation.navigate('SavingsCustomizePlan')}>
        <Text style={styles.createPlanText}>Create new plan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('SavingsQuestionMark')}
        style={styles.floatingHelp}
        activeOpacity={0.7}>
        <QuestionMarkSvg
          width={WHATSAPP_ICON_SIZE * 0.7}
          height={WHATSAPP_ICON_SIZE * 0.7}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarContainer: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#B88731',
  },
  goldStrip: {
    height: Math.min(width * 0.08, 40),
    backgroundColor: '#B88731',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Math.min(height * 0.015, 15),
    paddingHorizontal: SCREEN_PADDING,
  },
  title: {
    fontSize: Math.min(width * 0.045, 18),
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    textAlign: 'center',
    marginHorizontal: 8,
    marginTop: 15,
  },
  tabContainer: {
    marginTop: Math.min(height * 0.015, 15),
  },
  tabBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#A21211',
    borderRadius: 6,
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: TAB_HEIGHT,
    width: width * 0.85,
    alignSelf: 'center',
  },
  activeTabGreen: {
    backgroundColor: '#0B9B36',
    borderRadius: 4,
    width: '45%',
    marginRight: 10,
  },
  activeTabRed: {
    backgroundColor: '#A21211',
    borderRadius: 4,
    width: '45%',
    marginLeft: 10,
  },
  inactiveTab: {
    borderRadius: 4,
    width: '45%',
  },
  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  tabText: {
    color: '#A21211',
    fontSize: Math.min(width * 0.032, 13),
    fontFamily: 'Poppins-SemiBold',
    paddingHorizontal: 8,
  },
  tabTextActiveGreen: {
    color: '#fff',
  },
  tabTextActiveRed: {
    color: '#fff',
  },
  subTabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Math.min(height * 0.008, 8),
    marginBottom: Math.min(height * 0.008, 8),
    paddingHorizontal: SCREEN_PADDING,
  },
  activeSubTab: {
    color: '#B88731',
    fontFamily: 'Poppins-Medium',
    fontSize: Math.min(width * 0.032, 13),
    textDecorationLine: 'underline',
  },
  inactiveSubTab: {
    color: '#B88731',
    fontFamily: 'Poppins-Medium',
    fontSize: Math.min(width * 0.032, 13),
  },
  card: {
    backgroundColor: '#F9F9F9',
    marginHorizontal: SCREEN_PADDING,
    borderRadius: 6,
    padding: 12,
    marginBottom: Math.min(height * 0.012, 12),
    elevation: 2,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardTextContainer: {
    flex: 1,
  },
  planName: {
    fontSize: Math.min(width * 0.03, 12),
    fontFamily: 'Poppins-Regular',
    color: '#555',
    marginBottom: 2,
  },
  planTitle: {
    fontSize: Math.min(width * 0.035, 14),
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginBottom: 2,
  },
  tenure: {
    fontSize: Math.min(width * 0.028, 11),
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  amount: {
    fontSize: Math.min(width * 0.04, 16),
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  detailsBtnContainer: {
    alignItems: 'center',
    marginTop: 6,
  },
  detailsBtn: {
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: 'center',
    width: '50%',
    height: 32,
    justifyContent: 'center',
  },
  detailsBtnText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: Math.min(width * 0.032, 13),
  },
  createPlanBtn: {
    position: 'absolute',
    bottom: BOTTOM_TAB_HEIGHT + 60,
    left: SCREEN_PADDING,
    right: SCREEN_PADDING,
    backgroundColor: '#A21211',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  createPlanText: {
    color: '#fff',
    fontSize: Math.min(width * 0.038, 15),
    fontFamily: 'Poppins-SemiBold',
  },
  floatingHelp: {
    position: 'absolute',
    right: SCREEN_PADDING,
    bottom: BOTTOM_TAB_HEIGHT + 130,
    width: WHATSAPP_ICON_SIZE,
    height: WHATSAPP_ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    borderRadius: WHATSAPP_ICON_SIZE / 2,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  scrollContent: {
    paddingBottom: BOTTOM_TAB_HEIGHT + 80,
    paddingTop: Math.min(height * 0.008, 8),
  },
  bottomSpacer: {
    height: 35,
  },
});

export default SavingPlanScreen;
