import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import CloseIcon from '../../assets/close.svg';

const {width} = Dimensions.get('window');
const goldColor = '#B8860B';
const redColor = '#FF0000';

const notifications = [
  {
    id: '1',
    dateLabel: 'Today',
    goldRate: '₹9900/Gm',
    message:
      'Rajmani Jewellers is a trusted place to buy gold. Shop worry-free!',
    time: '08:00AM',
  },
  {
    id: '2',
    dateLabel: '18 Jul 2024',
    goldRate: '₹9900/Gm',
    message:
      'Rajmani Jewellers is a trusted place to buy gold. Shop worry-free!',
    time: '08:00AM',
  },
  {
    id: '3',
    dateLabel: '18 Jul 2024',
    goldRate: '₹9900/Gm',
    message:
      'Rajmani Jewellers is a trusted place to buy gold. Shop worry-free!',
    time: '08:00AM',
  },
];

const Notification = ({navigation}) => {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const renderItem = ({item}: {item: (typeof notifications)[0]}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedMessage(item.message)}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateLabel}>{item.dateLabel}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <Text style={styles.goldRate}>Gold rate - {item.goldRate}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.goldStrip} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backIconWrapper}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        visible={!!selectedMessage}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedMessage(null)}>
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setSelectedMessage(null)}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIconWrapper}
              onPress={() => setSelectedMessage(null)}>
              <CloseIcon width={20} height={20} />
            </TouchableOpacity>
            <Text style={styles.modalText}>{selectedMessage}</Text>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  goldStrip: {
    height: width * 0.11,
    backgroundColor: goldColor,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.025,
    backgroundColor: '#fff',
  },
  backIconWrapper: {
    padding: width * 0.01,
  },
  backIcon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  headerText: {
    marginLeft: width * 0.05,
    fontSize: width * 0.045,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginTop: 5,
  },
  listContent: {
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: goldColor,
    borderRadius: 8,
    paddingVertical: width * 0.025,
    paddingHorizontal: width * 0.04,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dateLabel: {
    fontFamily: 'Poppins-Bold',
    color: redColor,
    fontSize: width * 0.035,
  },
  goldRate: {
    fontFamily: 'Poppins-Bold',
    fontSize: width * 0.037,
    color: '#000',
    marginTop: 2,
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: width * 0.031,
    color: '#555',
    marginTop: 2,
  },
  timeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: width * 0.03,
    color: '#777',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxWidth: '80%',
    minWidth: '70%',
    position: 'relative',
    alignItems: 'center',
  },
  modalText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  closeIconWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 999,
  },
});

export default Notification;
