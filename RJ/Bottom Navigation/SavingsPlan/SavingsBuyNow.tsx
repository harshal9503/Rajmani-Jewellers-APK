import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  Modal,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const {width} = Dimensions.get('window');
const relations = ['Brother', 'Sister', 'Father', 'Mother', 'Spouse', 'Other'];

const SavingsBuyNow = () => {
  const navigation = useNavigation();
  const [nominee, setNominee] = useState('');
  const [relation, setRelation] = useState('Brother');
  const [contact, setContact] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#B88731"
        barStyle="light-content"
      />
      <View style={styles.goldStrip} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backRow}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.name}>Ankit Sharma</Text>
              <Text style={styles.phone}>+91 7489806724</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Saving Plan</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>₹1,000.00</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tenure month</Text>
            <View style={[styles.inputBox, {width: 100}]}>
              <Text style={styles.inputBoxText}>July</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total</Text>
            <View style={[styles.inputBox, {width: 120}]}>
              <Text style={styles.inputBoxText}>₹1,000.00</Text>
            </View>
          </View>
        </View>

        <Text style={styles.label}>
          Nominee <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter nominee name"
          placeholderTextColor="#999"
          value={nominee}
          onChangeText={setNominee}
        />

        <Text style={styles.label}>
          Relation <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity
          style={styles.relationInput}
          onPress={() => setModalVisible(true)}>
          <Text style={{color: '#000'}}>{relation}</Text>
          <Image
            source={require('../../assets/dropdown.png')}
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>

        <Text style={styles.label}>
          Nominee contact number <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="+91 | 74898 06724"
          placeholderTextColor="#999"
          keyboardType="number-pad"
          value={contact}
          onChangeText={setContact}
        />

        <View style={styles.termsRow}>
          <CheckBox
            value={accepted}
            onValueChange={setAccepted}
            tintColors={{true: '#B88731', false: '#B88731'}}
          />
          <Text style={styles.termsText}>
            I accept <Text style={styles.link}>terms & conditions</Text>
          </Text>
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.btn, styles.shopBtn]}
            onPress={() => setInfoModalVisible(true)}>
            <Text style={styles.btnText}>Pay at shop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.onlineBtn]}
            onPress={() => navigation.navigate('TransactionSuccessScreen')}>
            <Text style={styles.btnText}>Pay online</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Dropdown Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={relations}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setRelation(item);
                    setModalVisible(false);
                  }}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Info Popup Modal */}
      <Modal visible={infoModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setInfoModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.infoPopup}>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setInfoModalVisible(false)}>
                  <Image
                    source={require('../../assets/close.png')}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.noteTitle}>Note:</Text>
                <Text style={styles.noteText}>
                  Pay at shop within 3 days to get unique code to get activate
                  plan. {'\n'}
                  Otherwise your plan will be declined
                </Text>
                <TouchableOpacity
                  style={styles.okButton}
                  onPress={() => {
                    setInfoModalVisible(false);
                    navigation.navigate('Home');
                  }}>
                  <Text style={styles.okText}>OK</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  goldStrip: {height: 40, backgroundColor: '#B88731', width: '100%'},
  content: {
    paddingHorizontal: width * 0.05,
    paddingBottom: 100,
    paddingTop: 20,
  },
  backRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 20},
  backIcon: {width: 20, height: 20, resizeMode: 'contain'},
  backText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginLeft: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    padding: 15,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {fontSize: 16, fontFamily: 'Poppins-SemiBold', color: '#000'},
  phone: {fontSize: 13, fontFamily: 'Poppins-Regular', color: '#555'},
  badge: {
    backgroundColor: '#A21211',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold'},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginBottom: 4,
  },
  required: {color: 'red'},
  value: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginBottom: 12,
    color: '#000',
  },
  relationInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  dropdownIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
  },
  inputBoxText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 8,
  },
  termsText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  link: {
    color: '#2043C6',
    textDecorationLine: 'underline',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    flex: 0.48,
    height: 48,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopBtn: {backgroundColor: '#C89A45'},
  onlineBtn: {backgroundColor: '#0A8F4E'},
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 10,
    maxHeight: 300,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  modalItemText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  modalCancel: {
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  modalCancelText: {
    color: '#B88731',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  infoPopup: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 8,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#B88731',
  },
  noteTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
    color: '#000',
  },
  noteText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#444',
    lineHeight: 20,
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#B88731',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  okText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
});

export default SavingsBuyNow;
