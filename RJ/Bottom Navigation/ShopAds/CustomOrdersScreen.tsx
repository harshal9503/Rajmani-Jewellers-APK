// screens/CustomOrders.js
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';

import SearchIcon from '../../assets/search2.png';
import BackIcon from '../../assets/back.png';
import CloseIcon from '../../assets/close.png';
import CalendarIcon from '../../assets/calendar.png';

const {width} = Dimensions.get('window');

const STATUS_OPTIONS = [
  {label: 'Ready', value: 'ready'},
  {label: 'Pending', value: 'pending'},
];

const orders = [
  {id: 1, status: 'ready', deliveryDate: '31 Jul 2025'},
  {id: 2, status: 'ready', deliveryDate: '01 Aug 2025'},
  {id: 3, status: 'ready', deliveryDate: '02 Aug 2025'},
  {id: 4, status: 'ready', deliveryDate: '03 Aug 2025'},
  {id: 5, status: 'ready', deliveryDate: '04 Aug 2025'},
  {id: 6, status: 'ready', deliveryDate: '05 Aug 2025'},
  {id: 7, status: 'pending', deliveryDate: '06 Aug 2025'},
  {id: 8, status: 'pending', deliveryDate: '07 Aug 2025'},
  {id: 9, status: 'pending', deliveryDate: '08 Aug 2025'},
  {id: 10, status: 'pending', deliveryDate: '09 Aug 2025'},
];

const OrderCard = React.memo(
  ({order, isReady, onImagePress, activeIndex, setActiveIndex, orderId}) => {
    const isPastDue = new Date(order.deliveryDate) < new Date();
    const flatListRef = useRef(null);
    const [localActiveIndex, setLocalActiveIndex] = useState(0);

    // Auto-slide functionality with proper loop
    useEffect(() => {
      const interval = setInterval(() => {
        if (flatListRef.current) {
          const nextIndex = (localActiveIndex + 1) % 3;
          if (nextIndex === 0 && localActiveIndex === 2) {
            // Smooth transition from last to first
            flatListRef.current.scrollToIndex({
              index: nextIndex,
              animated: true,
            });
          } else {
            flatListRef.current.scrollToIndex({
              index: nextIndex,
              animated: true,
            });
          }
          setLocalActiveIndex(nextIndex);
        }
      }, 2000);

      return () => clearInterval(interval);
    }, [localActiveIndex]);

    return (
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <View style={styles.orderNoContainer}>
            <Text style={styles.orderNo}>Order no.</Text>
            <Text style={styles.orderLink}>#RJR00{order.id}</Text>
          </View>
          <View style={styles.deliveryContainer}>
            <Text style={styles.delivery}>Estimated Delivery</Text>
            <View style={styles.deliveryDateRow}>
              <Text style={styles.deliveryDateBlack}>{order.deliveryDate}</Text>
              <Image source={CalendarIcon} style={styles.calendarIcon} />
            </View>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.cardMiddleRow}>
          <View style={{flex: 1}}>
            <Text style={styles.productName}>24K pure gold ring</Text>
            <Text style={styles.label}>
              Purity <Text style={styles.value}>24k</Text>
            </Text>
            <Text style={styles.label}>
              Expected weight(in gm) <Text style={styles.value}>1.02gm</Text>
            </Text>
            <View style={styles.statusRow}>
              <Text style={styles.label}>Status</Text>
              <View
                style={[
                  styles.statusContainer,
                  isReady ? styles.readyContainer : styles.pendingContainer,
                ]}>
                <Text style={styles.statusText}>
                  {isReady ? 'Ready' : 'Pending'}
                </Text>
              </View>
            </View>

            {isReady ? null : (
              <Text style={styles.remark}>Remark: Delivered in 2-3 days</Text>
            )}
          </View>
          <View style={styles.imageSliderContainer}>
            <FlatList
              ref={flatListRef}
              horizontal
              data={[1, 2, 3]}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => onImagePress(item)}
                  style={styles.imageTouchable}>
                  <Image
                    source={require('../../assets/ring.png')}
                    style={styles.ringImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.toString()}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToInterval={width * 0.18}
              decelerationRate="fast"
              onMomentumScrollEnd={e => {
                const index = Math.round(
                  e.nativeEvent.contentOffset.x / (width * 0.18),
                );
                setLocalActiveIndex(index);
              }}
              contentContainerStyle={styles.imageSlider}
            />
            <View style={styles.pagination}>
              {[0, 1, 2].map(i => (
                <View
                  key={i}
                  style={[
                    styles.paginationDot,
                    localActiveIndex === i && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.quantityContainer}>
          <View style={styles.quantityItem}>
            <Text style={styles.quantityLabel}>Quantity(in pcs)</Text>
            <Text style={styles.quantityValue}>02</Text>
          </View>
          <View style={styles.quantityItem}>
            <Text style={styles.depositLabel}>Deposited Amount</Text>
            <Text style={styles.depositValue}>₹1200.00</Text>
          </View>
        </View>
      </View>
    );
  },
);

const CustomOrders = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState('ready');
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const modalFlatListRef = useRef(null);

  const filteredOrders = React.useMemo(
    () => orders.filter(order => order.status === status),
    [status],
  );

  const readyCount = orders.filter(o => o.status === 'ready').length;
  const pendingCount = orders.filter(o => o.status === 'pending').length;

  const handleImagePress = React.useCallback(index => {
    setSelectedImage(index);
    setModalIndex(0);
  }, []);

  const handleModalSwipe = React.useCallback(e => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setModalIndex(index);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.goldStrip} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backRow}
          onPress={() => navigation.goBack()}>
          <Image source={BackIcon} style={styles.backIcon} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.titleRow}>
          {!isSearchVisible ? (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Your custom orders</Text>
            </View>
          ) : (
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search orders..."
                placeholderTextColor="#888"
                value={searchText}
                onChangeText={setSearchText}
                autoFocus={true}
              />
            </View>
          )}
          <TouchableOpacity
            style={styles.searchBox}
            onPress={() => {
              setIsSearchVisible(!isSearchVisible);
              if (isSearchVisible) {
                setSearchText('');
              }
            }}>
            <Image source={SearchIcon} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          <Dropdown
            style={styles.dropdown}
            selectedTextStyle={styles.dropdownSelectedText}
            placeholderStyle={styles.dropdownPlaceholder}
            data={STATUS_OPTIONS}
            labelField="label"
            valueField="value"
            value={status}
            onChange={item => setStatus(item.value)}
            itemTextStyle={styles.dropdownItemText}
            itemContainerStyle={styles.dropdownItemContainer}
            activeColor="#f2f2f2"
          />
          <Text style={styles.orderCountText}>
            (Orders {status === 'ready' ? readyCount : pendingCount})
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={true}>
        {filteredOrders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            isReady={status === 'ready'}
            onImagePress={handleImagePress}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            orderId={order.id}
          />
        ))}
      </ScrollView>

      {/* Image Modal */}
      <Modal visible={selectedImage !== null} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedImage(null)}>
            <Image source={CloseIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          <View style={styles.modalImageContainer}>
            <Image
              source={require('../../assets/ring.png')}
              style={styles.modalCenterImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  goldStrip: {
    height: width * 0.11,
    backgroundColor: '#B88731',
    width: '100%',
  },
  header: {
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.03,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.02,
  },
  backIcon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  backText: {
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width * 0.02,
  },
  titleContainer: {
    backgroundColor: '#B88731',
    paddingHorizontal: width * 0.15,
    paddingVertical: width * 0.02,
    borderRadius: 6,
  },
  title: {
    fontSize: width * 0.046,
    fontWeight: '600',
    color: '#ffff',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  searchBox: {
    backgroundColor: '#B88731',
    padding: width * 0.03,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: width * 0.06,
    height: width * 0.06,
    tintColor: '#fff',
  },
  searchInputContainer: {
    backgroundColor: '#B88731',
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.02,
    borderRadius: 6,
    flex: 1,
    marginRight: width * 0.02,
  },
  searchInput: {
    fontSize: width * 0.04,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: width * 0.02,
  },
  orderCountText: {
    fontSize: width * 0.035,
    color: '#888',
    fontFamily: 'Poppins-Regular',
    marginLeft: width * 0.02,
  },
  dropdown: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.015,
    width: width * 0.35,
  },
  dropdownSelectedText: {
    fontSize: width * 0.035,
    color: '#000',
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  dropdownPlaceholder: {
    fontSize: width * 0.035,
    color: '#888',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  dropdownItemText: {
    fontSize: width * 0.035,
    color: '#000',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  dropdownItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scroll: {
    padding: width * 0.04,
    flexGrow: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: width * 0.035,
    marginBottom: width * 0.04,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderNoContainer: {
    flexDirection: 'column',
  },
  orderNo: {
    fontSize: width * 0.03,
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  orderLink: {
    color: '#2A00FF',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.035,
    marginTop: 1,
  },
  deliveryContainer: {
    alignItems: 'flex-end',
  },
  delivery: {
    fontSize: width * 0.03,
    color: '#888',
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
  },
  deliveryDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  deliveryDate: {
    fontSize: width * 0.03,
    color: '#888',
    fontFamily: 'Poppins-Regular',
    marginRight: 10,
  },
  deliveryDateBlack: {
    fontSize: width * 0.03,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    marginRight: 10,
  },
  calendarIcon: {
    width: width * 0.04,
    height: width * 0.04,
  },
  separator: {
    height: 1,
    backgroundColor: '#000',
    marginTop: width * 0.02,
    marginBottom: width * 0.02,
    width: '100%',
    alignSelf: 'stretch',
  },
  cardMiddleRow: {
    flexDirection: 'row',
    marginTop: width * 0.025,
  },
  productName: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: width * 0.01,
    fontFamily: 'Poppins-SemiBold',
  },
  label: {
    fontSize: width * 0.035,
    color: '#555',
    marginBottom: width * 0.005,
    fontFamily: 'Poppins-Regular',
  },
  value: {
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  readyContainer: {
    backgroundColor: '#0B9B36',
  },
  pendingContainer: {
    backgroundColor: '#FFCC4D',
  },
  statusText: {
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.033,
    textAlign: 'center',
  },
  remark: {
    fontSize: width * 0.033,
    color: '#000',
    fontStyle: 'italic',
    marginVertical: width * 0.01,
    fontFamily: 'Poppins-Regular',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: width * 0.01,
  },
  quantityItem: {
    alignItems: 'center',
  },
  depositBox: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  quantityLabel: {
    fontSize: width * 0.032,
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  quantityValue: {
    fontSize: width * 0.035,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 2,
  },
  depositLabel: {
    fontSize: width * 0.032,
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  depositValue: {
    fontSize: width * 0.035,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 2,
  },
  imageSliderContainer: {
    marginLeft: width * 0.04,
    width: width * 0.18,
    height: width * 0.18 + 20,
    justifyContent: 'center',
  },
  imageSlider: {
    height: width * 0.18,
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  imageTouchable: {
    width: width * 0.18,
    height: width * 0.18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  ringImage: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: 6,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#B88731',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width,
    height: width,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  modalPagination: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  modalPaginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },
  modalActiveDot: {
    backgroundColor: '#fff',
  },
  modalImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCenterImage: {
    width: width * 0.8,
    height: width * 0.8,
  },
});

export default CustomOrders;
