import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import LeftDesign from '../../assets/LeftDesign.svg';
import RightDesign from '../../assets/RightDesign.svg';
import DropIcon from '../../assets/DropIcon.svg';

const {width} = Dimensions.get('window');

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQs = [
  {
    question: '1. डिजिटल गोल्ड कैसे खरीदें ?',
    answer:
      'आप ऐप के होमपेज पर जाकर "Buy Digital Gold" बटन पर टैप करके डिजिटल गोल्ड खरीद सकते हैं।',
  },
  {
    question: '2. डिजिटल गोल्ड कैसे बेचें ?',
    answer:
      'आप "Sell Digital Gold" विकल्प का उपयोग करके अपने खरीदे हुए डिजिटल गोल्ड को कभी भी बेच सकते हैं।',
  },
  {
    question: '3. डिजिटल गोल्ड कैसे स्टोर होता है ?',
    answer:
      'डिजिटल गोल्ड को ज्वैलर्स के सुरक्षित वॉल्ट में स्टोर किया जाता है, जो पूरी तरह से बीमाकृत होता है।',
  },
];

const DotPoint = ({text}) => (
  <View style={styles.dotPointRow}>
    <Text style={styles.dot}>•</Text>
    <Text style={styles.dotText}>{text}</Text>
  </View>
);

const DotPointHindi = ({text}) => (
  <View style={styles.dotPointRow}>
    <Text style={styles.dot}>•</Text>
    <Text style={styles.dotTextHindi}>{text}</Text>
  </View>
);

const QuestionMark = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === index ? null : index);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.goldStrip} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backRow}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.titleRow}>
          <LeftDesign width={width * 0.24} height={width * 0.08} />
          <Text style={styles.title}>Digital Gold Benefits</Text>
          <RightDesign width={width * 0.24} height={width * 0.08} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DotPoint text="Digital gold offers Customers the convenience of buying and selling gold from anywhere at any time without visiting the showrooms of jewelers." />
        <DotPointHindi text="डिजिटल गोल्ड ग्राहकों को सोने के खरीदने और बेचने की सुविधा कभी भी कहीं से भी देता है।" />

        <DotPoint text="Digital gold is secured in a vault of Jewelers, which eliminates the risk of theft or loss that can occur with physical gold." />
        <DotPointHindi text="डिजिटल गोल्ड को ज्वैलर्स की तिजोरी में सुरक्षित रखा जाता है, जिससे चोरी का जोखिम समाप्त हो जाता है।" />

        <DotPoint text="Digital gold is highly liquid, which means that it can be easily converted to cash within a short span of time." />
        <DotPointHindi text="डिजिटल गोल्ड अत्यधिक लिक्विड होता है, जिससे इसे कैश में आसानी से बदला जा सकता है।" />

        <DotPoint text="Digital Gold can be purchased in Smaller Denomination starting from Rs.100/-." />
        <DotPointHindi text="डिजिटल गोल्ड ₹100/- रुपये से शुरू होकर छोटे मूल्यवर्ग में खरीदा जा सकता है।" />

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.linkText}>Start buying digital gold now.</Text>
        </TouchableOpacity>

        <View style={styles.faqHeaderRow}>
          <LeftDesign width={width * 0.24} height={width * 0.08} />
          <Text style={styles.faqHeading}>FAQs</Text>
          <RightDesign width={width * 0.24} height={width * 0.08} />
        </View>

        {FAQs.map((item, index) => (
          <View key={index} style={styles.dropdownContainer}>
            <Pressable
              onPress={() => toggleExpand(index)}
              style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>{item.question}</Text>
              <DropIcon width={width * 0.05} height={width * 0.05} />
            </Pressable>
            {expanded === index && (
              <Text style={styles.dropdownContent}>{item.answer}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  goldStrip: {
    height: width * 0.11,
    backgroundColor: '#B88731',
    width: '100%',
  },
  header: {
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.02,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: width * 0.02,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  scrollContainer: {
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.03,
    paddingBottom: width * 0.2,
  },
  dotPointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: width * 0.03,
  },
  dot: {
    fontSize: width * 0.05,
    color: '#333',
    marginRight: width * 0.02,
    lineHeight: width * 0.06,
  },
  dotText: {
    fontSize: width * 0.04,
    color: '#333',
    flex: 1,
    fontFamily: 'Poppins-Regular',
    lineHeight: width * 0.055,
  },
  dotTextHindi: {
    fontSize: width * 0.037,
    color: '#444',
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'italic',
    lineHeight: width * 0.05,
  },
  linkText: {
    fontSize: width * 0.04,
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: 'blue',
    textAlign: 'center',
    marginVertical: width * 0.06,
    fontFamily: 'Poppins-SemiBold',
  },
  faqHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: width * 0.03,
    marginTop: width * 0.05,
  },
  faqHeading: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: width * 0.02,
    fontFamily: 'Poppins-SemiBold',
  },
  dropdownContainer: {
    marginBottom: width * 0.04,
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 6,
    overflow: 'hidden',
  },
  dropdownHeader: {
    padding: width * 0.035,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownTitle: {
    fontSize: width * 0.04,
    color: '#333',
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
  },
  dropdownContent: {
    padding: width * 0.035,
    backgroundColor: '#fff',
    color: '#444',
    fontSize: width * 0.038,
    fontFamily: 'Poppins-Regular',
  },
});

export default QuestionMark;
