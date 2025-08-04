import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
  ToastAndroid,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import QuestionMarkIcon from '../../assets/questionmark3.svg';
import GramIcon from '../../assets/gram.svg';

const {width} = Dimensions.get('window');
const GOLD_RATE_PER_GRAM = 9600;

const QuickBuyCard = () => {
  const navigation = useNavigation();
  const amountInputRef = useRef<TextInput>(null);
  const gramInputRef = useRef<TextInput>(null);
  const [amount, setAmount] = useState('');
  const [gram, setGram] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Toast utility function with custom positioning
  const showToast = (message: string) => {
    setErrorMessage(message);
    // Clear error message after 3 seconds
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Notice', message);
    }
  };

  const handleAmountChange = (text: string) => {
    const cleanText = text.replace(/[^0-9.]/g, '');
    setAmount(cleanText);
    const parsed = parseFloat(cleanText);
    if (!isNaN(parsed)) {
      setGram((parsed / GOLD_RATE_PER_GRAM).toFixed(4));
    } else {
      setGram('');
    }
  };

  const handleAmountBlur = () => {
    const parsed = parseFloat(amount);
    if (!isNaN(parsed)) {
      const formatted = parsed.toFixed(2);
      setAmount(formatted);
      setGram((parsed / GOLD_RATE_PER_GRAM).toFixed(4));
    }
  };

  const handleGramChange = (text: string) => {
    const cleanText = text.replace(/[^0-9.]/g, '');
    setGram(cleanText);
    const parsed = parseFloat(cleanText);
    if (!isNaN(parsed)) {
      setAmount((parsed * GOLD_RATE_PER_GRAM).toFixed(2));
    } else {
      setAmount('');
    }
  };

  const handleBuyNow = () => {
    Keyboard.dismiss();

    // Validation: Check if amount or gram is entered
    const amountValue = parseFloat(amount);
    const gramValue = parseFloat(gram);

    if (!amount.trim() && !gram.trim()) {
      showToast('Please enter amount or gram value');
      // Focus on amount input by default
      setTimeout(() => {
        amountInputRef.current?.focus();
      }, 100);
      return;
    }

    if (amount.trim() && (isNaN(amountValue) || amountValue <= 0)) {
      showToast('Please enter a valid amount');
      setTimeout(() => {
        amountInputRef.current?.focus();
      }, 100);
      return;
    }

    if (gram.trim() && (isNaN(gramValue) || gramValue <= 0)) {
      showToast('Please enter a valid gram value');
      setTimeout(() => {
        gramInputRef.current?.focus();
      }, 100);
      return;
    }

    // Navigate to next screen with the entered values
    try {
      (navigation as any).navigate('QuickBuyNow', {
        amount: amount || (gramValue * GOLD_RATE_PER_GRAM).toFixed(2),
        gram: gram || (amountValue / GOLD_RATE_PER_GRAM).toFixed(4),
      });
    } catch (error) {
      console.log('Navigation error:', error);
      showToast('Unable to proceed. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.shadowWrapper}>
            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.title}>Quick Buy</Text>
                <TouchableWithoutFeedback
                  onPress={() => (navigation as any).navigate('QuestionMark')}>
                  <View style={styles.helpTouchable}>
                    <QuestionMarkIcon
                      width={width * 0.06}
                      height={width * 0.06}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>

              {/* Error Message Display */}
              {errorMessage ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              ) : null}

              <View style={styles.inputContainer}>
                <TouchableWithoutFeedback
                  onPress={() => amountInputRef.current?.focus()}>
                  <View style={styles.inputBox}>
                    <Text style={[styles.label, styles.centerText]}>
                      Amount ( ₹ )
                    </Text>
                    <TextInput
                      ref={amountInputRef}
                      style={[styles.input, {borderColor: '#C09244'}]}
                      keyboardType="numeric"
                      value={amount}
                      onChangeText={handleAmountChange}
                      onBlur={handleAmountBlur}
                      placeholder="0.00"
                      placeholderTextColor="#aaa"
                      returnKeyType="next"
                      onSubmitEditing={() => gramInputRef.current?.focus()}
                    />
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                  <Image
                    source={require('../../assets/right-and-left.png')}
                    style={styles.arrowIcon}
                  />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                  onPress={() => gramInputRef.current?.focus()}>
                  <View style={styles.inputBox}>
                    <View style={[styles.gramLabel, styles.centerText]}>
                      <Text style={styles.label}>Gram (</Text>
                      <GramIcon
                        width={width * 0.025}
                        height={width * 0.025}
                        style={styles.gramIcon}
                      />
                      <Text style={styles.label}>)</Text>
                    </View>
                    <TextInput
                      ref={gramInputRef}
                      style={[styles.input, {borderColor: '#C09244'}]}
                      keyboardType="numeric"
                      value={gram}
                      onChangeText={handleGramChange}
                      placeholder="0.0000"
                      placeholderTextColor="#aaa"
                      returnKeyType="done"
                      onSubmitEditing={handleBuyNow}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>

              {/* Changed button width from 85% to 70% */}
              <TouchableOpacity
                style={[styles.button, {width: '50%'}]}
                onPress={handleBuyNow}
                activeOpacity={0.8}>
                <Text style={styles.buttonText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  shadowWrapper: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    backgroundColor: 'transparent',
    borderRadius: 12,
    margin: 5,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    position: 'relative',
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  helpTouchable: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: width * 0.12,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderWidth: 1,
    borderColor: '#f44336',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: width * 0.032,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputBox: {
    width: '40%',
  },
  label: {
    fontSize: width * 0.035,
    color: '#C09244',
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  centerText: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  gramLabel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gramIcon: {
    marginHorizontal: 2,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: width * 0.04,
    color: '#000',
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  arrowIcon: {
    width: width * 0.1,
    height: width * 0.1,
    tintColor: '#C09244',
    marginTop: 25,
  },
  button: {
    // Changed width from 85% to 70% (now set inline in the component)
    height: 42,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#C09244',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default QuickBuyCard;
