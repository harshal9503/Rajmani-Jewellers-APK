import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import UploadIcon from '../../assets/upload.svg';

const {width} = Dimensions.get('window');

const FormScreen = () => {
  const navigation = useNavigation();
  const [cityOpen, setCityOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [city, setCity] = useState('Indore');
  const [state, setState] = useState('Madhya Pradesh');

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    pincode: '',
    pan: null,
  });

  const handleChange = (field, value) => {
    setForm(prev => ({...prev, [field]: value}));
  };

  const handleUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      handleChange('pan', res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled');
      } else {
        throw err;
      }
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.goldStrip} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled">
            <TouchableOpacity
              style={styles.backRow}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/back.png')}
                style={styles.backIcon}
              />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.instructionText}>
              Kindly Enter your personal details for the fields mentioned below:
            </Text>

            <Text style={styles.label}>
              Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#888"
              value={form.name}
              onChangeText={text => handleChange('name', text)}
            />

            <Text style={styles.label}>
              Email <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              value={form.email}
              onChangeText={text => handleChange('email', text)}
            />

            <Text style={styles.label}>
              Mobile No <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.mobileContainer}>
              <Text style={styles.countryCode}>+91</Text>
              <View style={styles.divider} />
              <TextInput
                style={styles.mobileInput}
                placeholder="Enter your mobile number"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
                maxLength={10}
                value={form.mobile}
                onChangeText={text => handleChange('mobile', text)}
              />
            </View>

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              placeholderTextColor="#888"
              value={form.address}
              onChangeText={text => handleChange('address', text)}
            />

            <View style={styles.rowInput}>
              <View style={styles.dropdownWrapper}>
                <Text style={styles.label}>City</Text>
                <DropDownPicker
                  open={cityOpen}
                  value={city}
                  items={[
                    {label: 'Indore', value: 'Indore'},
                    {label: 'Bhopal', value: 'Bhopal'},
                    {label: 'Ujjain', value: 'Ujjain'},
                    {label: 'Gwalior', value: 'Gwalior'},
                    {label: 'Jabalpur', value: 'Jabalpur'},
                    {label: 'Raipur', value: 'Raipur'},
                  ]}
                  setOpen={setCityOpen}
                  setValue={setCity}
                  containerStyle={styles.dropdown}
                  style={styles.dropdownInner}
                  zIndex={3000}
                />
              </View>

              <View style={styles.pincodeWrapper}>
                <Text style={styles.label}>Pincode</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter pincode"
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                  value={form.pincode}
                  onChangeText={text => handleChange('pincode', text)}
                />
              </View>
            </View>

            <Text style={styles.label}>State</Text>
            <DropDownPicker
              open={stateOpen}
              value={state}
              items={[
                {label: 'Madhya Pradesh', value: 'Madhya Pradesh'},
                {label: 'Maharashtra', value: 'Maharashtra'},
                {label: 'Chhattisgarh', value: 'Chhattisgarh'},
                {label: 'Rajasthan', value: 'Rajasthan'},
                {label: 'Gujarat', value: 'Gujarat'},
              ]}
              setOpen={setStateOpen}
              setValue={setState}
              containerStyle={styles.dropdown}
              style={styles.dropdownInner}
              zIndex={2000}
            />

            <Text style={styles.label}>Upload PAN (Optional)</Text>
            <View style={styles.uploadBox}>
              <TouchableOpacity
                onPress={handleUpload}
                style={styles.uploadTouch}>
                <UploadIcon width={width * 0.05} height={width * 0.05} />
                <Text style={styles.uploadText}>Click to upload pan card</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => navigation.navigate('PaymentScreen')}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  goldStrip: {
    height: width * 0.11,
    width: '100%',
    backgroundColor: '#B88731',
  },
  scrollContent: {
    padding: width * 0.05,
    paddingBottom: 60,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.04,
  },
  backIcon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  backText: {
    marginLeft: 10,
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  instructionText: {
    fontSize: width * 0.037,
    color: '#000',
    marginBottom: width * 0.04,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  label: {
    fontSize: width * 0.035,
    color: '#000',
    marginBottom: 4,
    marginTop: 10,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  required: {
    color: 'red',
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: width * 0.035,
    marginBottom: 8,
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  mobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    width: '100%',
    height: 45,
    marginBottom: 10,
  },
  countryCode: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  divider: {
    width: 1,
    height: 25,
    backgroundColor: '#000',
    marginHorizontal: 8,
  },
  mobileInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    paddingVertical: 0,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    height: '100%',
  },
  rowInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  dropdownWrapper: {flex: 1, zIndex: 3000},
  pincodeWrapper: {flex: 1},
  dropdown: {
    marginBottom: 8,
  },
  dropdownInner: {
    borderColor: '#B88731',
    height: 45,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    paddingVertical: 5,
    marginTop: 6,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  uploadText: {
    color: '#444',
    fontSize: width * 0.035,
    fontFamily: 'Poppins-Regular',
  },
  nextButton: {
    backgroundColor: '#B88731',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default FormScreen;
