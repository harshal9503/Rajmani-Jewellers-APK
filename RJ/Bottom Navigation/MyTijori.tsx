import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Animated,
  Modal,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import GoldSvg from '../assets/gold.svg';
import ArrowSvg from '../assets/arrow.svg';
import CoinSvg from '../assets/goldcoin.svg';
import RecentsSvg from '../assets/recents.svg';
import QuestionMarkSvg from '../assets/questionmark3.svg';

const {width, height} = Dimensions.get('window');

const WHATSAPP_ICON_SIZE = Math.max(50, Math.min(width * 0.14, 65));
const SCREEN_PADDING = width * 0.04;
const BOTTOM_OFFSET = Math.max(60, Math.min(height * 0.16, 100));

const goldRates = [
  '24k gold rate 9800 per gm',
  '22k gold rate 9600 per gm',
  '18k gold rate 9100 per gm',
];

const historyData = [
  {
    type: 'purchased',
    amount: '+2.46 gm',
    date: '13 July 2024',
    price: '₹24108.00',
  },
  {
    type: 'purchased',
    amount: '+1.50 gm',
    date: '10 July 2024',
    price: '₹14700.00',
  },
  {
    type: 'redeemed',
    amount: '-1.00 gm',
    date: '5 July 2024',
    price: '₹9800.00',
  },
  {type: 'gifted', amount: '+0.50 gm', date: '1 July 2024', price: '₹4900.00'},
  {
    type: 'purchased',
    amount: '+3.00 gm',
    date: '28 June 2024',
    price: '₹29400.00',
  },
  {
    type: 'redeemed',
    amount: '-2.00 gm',
    date: '25 June 2024',
    price: '₹19600.00',
  },
];

const MyTijoriScreen = () => {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const totalScrollWidth = width * 1.5;
  const circleAnim = useRef(new Animated.Value(0)).current;
  const scrollAnimation = useRef(null);
  const blinkAnimation = useRef(null);

  const [showGiftOptions, setShowGiftOptions] = useState(false);
  const [activeTab, setActiveTab] = useState('purchased');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const animateScroll = () => {
      scrollX.setValue(0);
      scrollAnimation.current = Animated.timing(scrollX, {
        toValue: -totalScrollWidth,
        duration: 15000,
        useNativeDriver: true,
      });
      scrollAnimation.current.start(() => animateScroll());
    };

    // Blinking animation for the circle
    blinkAnimation.current = Animated.loop(
      Animated.sequence([
        Animated.timing(circleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(circleAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    animateScroll();
    blinkAnimation.current.start();

    return () => {
      if (scrollAnimation.current) {
        scrollAnimation.current.stop();
      }
      if (blinkAnimation.current) {
        blinkAnimation.current.stop();
      }
    };
  }, []);

  const circleOpacity = circleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });

  const filteredHistory = historyData.filter(item => {
    if (activeTab === 'purchased') return item.type === 'purchased';
    if (activeTab === 'redeemed') return item.type === 'redeemed';
    if (activeTab === 'gifted') return item.type === 'gifted';
    return true;
  });

  const handleItemPress = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'purchased':
        return 'Purchased History';
      case 'redeemed':
        return 'Redeemed History';
      case 'gifted':
        return 'Gifted History';
      default:
        return 'Transaction History';
    }
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

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.leftColumn}>
            <TouchableOpacity
              onPress={() => setShowGiftOptions(!showGiftOptions)}
              activeOpacity={0.7}>
              <Animated.View style={[styles.circle, {opacity: circleOpacity}]}>
                <View style={styles.iconBox}>
                  <GoldSvg
                    width={WHATSAPP_ICON_SIZE * 0.4}
                    height={WHATSAPP_ICON_SIZE * 0.4}
                  />
                </View>
              </Animated.View>
            </TouchableOpacity>

            {showGiftOptions && (
              <View style={styles.giftOptionsContainer}>
                <TouchableOpacity
                  style={styles.giftBox}
                  onPress={() => {
                    setShowGiftOptions(false);
                    navigation.navigate('GiftGold');
                  }}>
                  <Text style={styles.giftText}>Gift your gold</Text>
                  <ArrowSvg width={10} height={10} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.giftedBox}
                  onPress={() => {
                    setShowGiftOptions(false);
                    navigation.navigate('GiftedGold');
                  }}>
                  <Text style={styles.giftedText}>Gifted Gold</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text style={styles.title}>My Tijori</Text>
          <View style={styles.rightSpacer} />
        </View>

        <View style={styles.coinContainer}>
          <CoinSvg width={width * 0.25} height={width * 0.2} />
          <Text style={styles.goldWeight}>10.46 Gm</Text>
          <View style={styles.karatBox}>
            <Text style={styles.karatText}>22K</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => navigation.navigate('BuyNow')}>
            <Text style={[styles.buyText, styles.centerText]}>Buy gold</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.redeemButton}
            onPress={() => navigation.navigate('Redeem')}>
            <Text style={[styles.redeemText, styles.centerText]}>Redeem</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.marqueeContainer}>
          <Animated.View
            style={[styles.rateWrapper, {transform: [{translateX: scrollX}]}]}>
            {[...goldRates, ...goldRates].map((text, index) => (
              <Text key={index} style={styles.rateText}>
                {text} &nbsp;&nbsp;&nbsp;&nbsp;
              </Text>
            ))}
          </Animated.View>
        </View>

        <View style={styles.tabRow}>
          <TouchableOpacity
            style={
              activeTab === 'purchased'
                ? styles.selectedTab
                : styles.outlinedTab
            }
            onPress={() => setActiveTab('purchased')}>
            <Text
              style={[
                activeTab === 'purchased'
                  ? styles.tabTextWhite
                  : styles.tabText,
                styles.centerText,
              ]}>
              Purchased
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeTab === 'redeemed' ? styles.selectedTab : styles.outlinedTab
            }
            onPress={() => setActiveTab('redeemed')}>
            <Text
              style={[
                activeTab === 'redeemed' ? styles.tabTextWhite : styles.tabText,
                styles.centerText,
              ]}>
              Redeemed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeTab === 'gifted' ? styles.selectedTab : styles.outlinedTab
            }
            onPress={() => setActiveTab('gifted')}>
            <Text
              style={[
                activeTab === 'gifted' ? styles.tabTextWhite : styles.tabText,
                styles.centerText,
              ]}>
              Gifted
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>{getTabTitle()}</Text>
          <ScrollView
            style={styles.historyScroll}
            contentContainerStyle={styles.historyScrollContent}>
            {filteredHistory.slice(0, 4).map((item, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={styles.historyRow}
                  onPress={() => handleItemPress(item)}
                  activeOpacity={0.7}>
                  <RecentsSvg width={18} height={18} />
                  <CoinSvg width={18} height={18} />
                  <Text style={styles.historyText}>{item.amount}</Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                  <Text style={styles.historyAmt}>{item.price}</Text>
                </TouchableOpacity>
                {index < filteredHistory.length - 1 && (
                  <View style={styles.divider} />
                )}
              </React.Fragment>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={[styles.bottomButton, {marginBottom: BOTTOM_OFFSET}]}
          onPress={() => navigation.navigate('SavingsPlans')}>
          <Text style={styles.buttonText}>Explore Savings Plans</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Floating Help Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Help')}
        activeOpacity={0.7}
        style={styles.floatingHelp}>
        <QuestionMarkSvg
          width={WHATSAPP_ICON_SIZE * 0.7}
          height={WHATSAPP_ICON_SIZE * 0.7}
        />
      </TouchableOpacity>

      {/* Details Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Transaction Details</Text>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Type:</Text>
                <Text style={styles.detailValue}>
                  {selectedItem?.type.charAt(0).toUpperCase() +
                    selectedItem?.type.slice(1)}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Amount:</Text>
                <Text style={styles.detailValue}>{selectedItem?.amount}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date:</Text>
                <Text style={styles.detailValue}>{selectedItem?.date}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Price:</Text>
                <Text style={styles.detailValue}>{selectedItem?.price}</Text>
              </View>

              <TouchableOpacity
                style={styles.invoiceButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Invoice', {transaction: selectedItem});
                }}>
                <Text style={styles.invoiceButtonText}>Generate Invoice</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  statusBarContainer: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#B88731',
  },
  goldStrip: {height: width * 0.11, backgroundColor: '#B88731'},
  content: {
    paddingHorizontal: width * 0.05,
    paddingBottom: BOTTOM_OFFSET,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: width * 0.05,
    position: 'relative',
  },
  leftColumn: {
    alignItems: 'flex-start',
    zIndex: 1,
  },
  circle: {
    backgroundColor: '#FFCC4D',
    borderRadius: 50,
    width: WHATSAPP_ICON_SIZE * 0.8,
    height: WHATSAPP_ICON_SIZE * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  giftOptionsContainer: {
    position: 'absolute',
    top: WHATSAPP_ICON_SIZE * 0.8 + 10,
    left: 0,
    flexDirection: 'column',
    gap: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    zIndex: 2,
  },
  giftBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFCC4D',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    gap: 6,
  },
  giftedBox: {
    backgroundColor: '#FFCC4D',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  giftText: {
    fontSize: width * 0.03,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  giftedText: {
    fontSize: width * 0.03,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  title: {
    fontSize: width * 0.05,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    top: WHATSAPP_ICON_SIZE * 0.2,
    zIndex: 0,
  },
  rightSpacer: {
    width: WHATSAPP_ICON_SIZE * 0.5 + 24,
  },
  coinContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  goldWeight: {
    fontSize: width * 0.06,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginTop: 10,
  },
  karatBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 4, // ⬇ smaller horizontally
    paddingVertical: 1, // ⬇ smaller vertically
    borderRadius: 3, // ⬇ tighter corners
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  karatText: {
    fontSize: width * 0.022, // ⬇ smaller font
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },
  buyButton: {
    borderWidth: 1,
    borderColor: '#008000',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 4,
    width: width * 0.4,
    justifyContent: 'center',
  },
  buyText: {
    color: '#008000',
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.035,
  },
  redeemButton: {
    borderWidth: 1,
    borderColor: '#A21211',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 4,
    width: width * 0.4,
    justifyContent: 'center',
  },
  redeemText: {
    color: '#A21211',
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.035,
  },
  centerText: {
    textAlign: 'center',
  },
  marqueeContainer: {
    overflow: 'hidden',
    height: 30,
    marginVertical: 10,
  },
  rateWrapper: {
    flexDirection: 'row',
  },
  rateText: {
    fontSize: width * 0.032,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  selectedTab: {
    backgroundColor: '#A21211',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    justifyContent: 'center',
    minWidth: width * 0.25,
    borderWidth: 1,
    borderColor: '#A21211',
  },
  outlinedTab: {
    borderWidth: 1,
    borderColor: '#A21211',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    justifyContent: 'center',
    minWidth: width * 0.25,
  },
  tabTextWhite: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.035,
  },
  tabText: {
    color: '#A21211',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.035,
  },
  historyCard: {
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginBottom: 10,
  },
  historyScroll: {
    maxHeight: 200,
  },
  historyScrollContent: {
    paddingBottom: 10,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    paddingVertical: 8,
  },
  historyText: {
    flex: 1,
    fontSize: width * 0.035,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  historyDate: {
    flex: 1,
    fontSize: width * 0.03,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  historyAmt: {
    fontSize: width * 0.035,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#B88731',
    marginVertical: 5,
  },
  bottomButton: {
    backgroundColor: '#B88731',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-SemiBold',
  },
  floatingHelp: {
    position: 'absolute',
    right: SCREEN_PADDING,
    bottom: BOTTOM_OFFSET,
    width: WHATSAPP_ICON_SIZE,
    height: WHATSAPP_ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    borderRadius: WHATSAPP_ICON_SIZE / 2,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalContent: {
    width: '100%',
  },
  modalTitle: {
    fontSize: width * 0.045,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: width * 0.038,
    fontFamily: 'Poppins-SemiBold',
    color: '#555',
  },
  detailValue: {
    fontSize: width * 0.038,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  invoiceButton: {
    backgroundColor: '#A21211',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  invoiceButtonText: {
    color: '#fff',
    fontSize: width * 0.038,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default MyTijoriScreen;
