import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import LeftDesign from '../../assets/LeftDesign.svg';
import RightDesign from '../../assets/RightDesign.svg';
import DropIcon from '../../assets/DropIcon.svg';

const {width, height} = Dimensions.get('window');

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DotText = ({text}) => (
  <View style={styles.dotPointRow}>
    <Text style={styles.dot}>•</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const DotTextHindi = ({text}) => (
  <View style={styles.dotPointRow}>
    <Text style={styles.dot}>•</Text>
    <Text style={styles.textHindi}>{text}</Text>
  </View>
);

const TERMS = [
  {
    question: '1. सेविंग प्लान कैसे खरीदें?',
    answer:
      'ग्राहक को राजमणि ज्वैलर्स के शोरूम या ऐप के माध्यम से नामांकन कर निर्धारित मासिक किस्त का भुगतान करना होगा।',
  },
  {
    question: '2. रिडीम कैसे करें?',
    answer:
      'योजना की परिपक्वता के बाद ग्राहक को 3 महीनों के अंदर केवल आभूषण खरीदकर रिडीम करना अनिवार्य है। नकद रिफंड नहीं मिलेगा।',
  },
  {
    question: '3. भुगतान कैसे करें?',
    answer:
      'ग्राहक नकद, चेक, कार्ड या ऑनलाइन ट्रांसफर के माध्यम से भुगतान कर सकते हैं। अंतर्राष्ट्रीय कार्ड स्वीकार नहीं किए जाएंगे।',
  },
];

const SavingsQuestionMark = () => {
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
          <LeftDesign width={width * 0.22} height={width * 0.07} />
          <Text style={styles.title}>
            Swarna Bachat Yojna Terms & Conditions
          </Text>
          <RightDesign width={width * 0.22} height={width * 0.07} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {FULL_CONTENT.map((item, index) => (
          <React.Fragment key={index}>
            <DotText text={item.en} />
            <DotTextHindi text={item.hi} />
          </React.Fragment>
        ))}

        <TouchableOpacity
          onPress={() => navigation.navigate('SavingsPlan')}
          style={styles.linkContainer}>
          <Text style={styles.linkText}>Get benefits from the saving plan</Text>
        </TouchableOpacity>

        <View style={styles.faqHeaderRow}>
          <LeftDesign width={width * 0.22} height={width * 0.07} />
          <Text style={styles.faqHeading}>FAQs</Text>
          <RightDesign width={width * 0.22} height={width * 0.07} />
        </View>

        {TERMS.map((item, index) => (
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

const FULL_CONTENT = [
  {
    en: "The Swarna Bachat Yojna (hereinafter 'Gold Saving Plan') offered by Rajmani Jewellers facilitates customers to purchase jewellery on installments from the showroom of Rajmani Jewellers on the terms and conditions contained herein.",
    hi: 'राजमणि ज्वैलर्स द्वारा दी जाने वाली स्वर्ण बचत योजना (इसके बाद "गोल्ड सेविंग प्लान") ग्राहकों को यहां दिए गए नियमों और शर्तों पर राजमणि ज्वैलर्स के शोरूम से किश्तों पर आभूषण खरीदने की सुविधा प्रदान करती है।',
  },
  {
    en: "Earn up to 100% of one month's installment at the end of the scheme.",
    hi: 'योजना के अंत में एक महीने की किस्त का 100% तक कमाएँ।',
  },
  {
    en: 'The scheme is an installment scheme. Under the scheme, the customer is required to pay fixed monthly installment of minimum of Rs. 5,000/- (Rupees Five Thousand) and maximum of Rs.100000/- (Rupees One Lakh) (in multiples of Rs. 500/- Five Hundred) for the period 11 months. During the period the customer has to pay one installment every month.',
    hi: 'यह योजना एक किस्त योजना के रूप में संचालित होती है, जिसमें ग्राहक को न्यूनतम राशि रु5,000/- और अधिकतम रु100000/- (रु.500/- के गुणकों में) 11 महीने तक प्रति माह भुगतान करना होगा।',
  },
  {
    en: 'The Scheme will mature after 5 (Five) days from the date of payment of the last Installment and must be redeemed by jewellery purchase only within 3 months of maturity. No cash refunds.',
    hi: 'यह योजना अंतिम किस्त की तिथि से 5 दिन बाद परिपक्व होगी और इसे केवल आभूषण खरीद के माध्यम से 3 महीने के भीतर रिडीम करना होगा। नकद रिफंड नहीं मिलेगा।',
  },
  {
    en: 'Eligibility of benefit is conditional on timely payment of all installments. Early redemption leads to prorated benefit.',
    hi: 'समय पर सभी किश्तों का भुगतान करने पर ही लाभ मिलेगा। पहले रिडीम करने पर अनुपातिक लाभ मिलेगा।',
  },
  {
    en: 'If not redeemed within 1 year from maturity, the amount is refunded as voucher to be used for jewellery purchase only.',
    hi: 'यदि योजना परिपक्व होने के 1 वर्ष के भीतर रिडीम नहीं की जाती है, तो राशि वाउचर के रूप में लौटाई जाएगी जो केवल आभूषण खरीदने के लिए उपयोग की जा सकती है।',
  },
  {
    en: 'Final invoice value should be equal or greater than the total installment amount.',
    hi: 'अंतिम चालान राशि भुगतान की गई कुल किस्त राशि के बराबर या उससे अधिक होनी चाहिए।',
  },
  {
    en: 'Cash Refund generally not available under this scheme, but the Refunds under the Scheme, if any, will be made by way of cheque in the name of the account holder as specified in the Enrolment Form or by online transfer to the bank account as specified in the Enrolment Form, and no cash refund shall be permissible. 10% of deduction in whole amount is payable.',
    hi: 'इस योजना के तहत आम तौर पर नकद रिफंड उपलब्ध नहीं है, लेकिन योजना के तहत रिफंड, यदि कोई हो, नामांकन फॉर्म में निर्दिष्ट खाताधारक के नाम पर चेक के माध्यम से या निर्दिष्ट बैंक खाते में ऑनलाइन हस्तांतरण के माध्यम से किया जाएगा। नामांकन फॉर्म, और कोई नकद वापसी की अनुमति नहीं होगी। सम्पूर्ण राशि पर 10% कटौती देय है।',
  },
  {
    en: "Gold rate booked or charged on the invoice may vary city wise depending on the corporate gold rate applied by the Company. The rate of gold shall be booked when 75% of the total saving plan amount is paid. It'll be fixed by the company itself.",
    hi: 'बुक की गई सोने की दर या चालान पर चार्ज की गई सोने की दर कंपनी द्वारा लागू की गई कॉर्पोरेट सोने की दर के आधार पर शहर के अनुसार भिन्न हो सकती है।कुल बचत योजना राशि का 75% भुगतान होने पर सोने की दर बुक की जाएगी। यह कंपनी द्वारा ही तय की जाएगी।',
  },
  {
    en: 'Only individuals can enroll in the Scheme and enrolment is not permissible for other entities like companies, partnership firms or proprietorship concerns or Trusts or Hindu Undivided Family (HUF) or NRI Customers. Minors may enroll only through their natural guardians.',
    hi: 'केवल व्यक्ति ही इस योजना में नामांकन कर सकते हैं और कंपनियों, साझेदारी फर्मों या स्वामित्व चिंताओं या ट्रस्टों या हिंदू अविभाजित परिवार (HUF) या NRI ग्राहकों जैसी अन्य संस्थाओं के लिए नामांकन की अनुमति नहीं है। नाबालिग केवल अपने प्राकृतिक अभिभावकों के माध्यम से ही नामांकन करा सकते हैं।',
  },
  {
    en: 'Customers cannot enroll with any money borrowed by him from any other persons.',
    hi: 'ग्राहक किसी अन्य व्यक्ति से उधार लिए गए पैसे से नामांकन नहीं कर सकते।',
  },
  {
    en: 'Enrolment may be through offline mode, i.e., at the Rajmani Jewellers Showroom, or online by registering on the Mobile Application of Rajmani Jewellers.',
    hi: 'नामांकन ऑफ़लाइन मोड के माध्यम से हो सकता है, यानी, राजमणि ज्वैलर्स शोरूम में, या राजमणि ज्वैलर्स के मोबाइल एप्लिकेशन पर पंजीकरण करके ऑनलाइन।',
  },
  {
    en: 'The Customer is required to provide a copy of his/her photo identity and address proof documents like Driving License/Voter ID/Passport/Ration Card/PAN Card/any other document issued by the Government, bank account details, etc. at the time of enrolment.',
    hi: 'ग्राहक को नामांकन के समय अपनी फोटो पहचान और पते के सबूत जैसे ड्राइविंग लाइसेंस/मतदाता पहचान पत्र/पासपोर्ट/राशन कार्ड/पैन कार्ड/सरकार द्वारा जारी कोई अन्य दस्तावेज, बैंक खाते का विवरण आदि की एक प्रति प्रदान करनी होगी।',
  },
  {
    en: 'In case of any change in contact or address details or any other details that the Customer may have furnished, the Customer shall immediately update to the company affecting the changes.',
    hi: 'संपर्क या पते के विवरण या ग्राहक द्वारा दिए गए किसी भी अन्य विवरण में किसी भी बदलाव के मामले में, ग्राहक तुरंत परिवर्तन को प्रभावी करने वाली कंपनी को सूचित करेगा।',
  },
  {
    en: 'The Customer should especially ensure that the name is as per the identity proof provided by the Customer, and not in any other name, including nickname or short forms and the bank account details and other details as provided in the Enrolment Form shall be accurate.',
    hi: 'ग्राहक को विशेष रूप से यह सुनिश्चित करना चाहिए कि नाम ग्राहक द्वारा प्रदान किए गए पहचान प्रमाण के अनुसार है, न कि किसी अन्य नाम पर, जिसमें उपनाम या संक्षिप्त रूप शामिल हैं और नामांकन फॉर्म में दिए गए बैंक खाते के विवरण और अन्य विवरण सटीक होंगे।',
  },
  {
    en: 'Rajmani Jewellers reserves the right to verify the identity of the Customer by means of SMS and/or OTP generation or by any other means at any time including at the time of enrolment and at the time of concluding the purchase and taking the delivery of the jewellery. Rajmani Jewellers also reserves the right to verify the authenticity of the documents provided by the Customer.',
    hi: 'राजमणि ज्वैलर्स के पास नामांकन के समय और खरीदारी के समापन और आभूषणों की डिलीवरी लेने के समय सहित किसी भी समय SMS और/या OTP जनरेशन या किसी अन्य माध्यम से ग्राहक की पहचान सत्यापित करने का अधिकार सुरक्षित है। राजमणि ज्वैलर्स के पास ग्राहक द्वारा उपलब्ध कराए गए दस्तावेजों की प्रामाणिकता को सत्यापित करने का अधिकार भी सुरक्षित है।',
  },
  {
    en: 'Payment of monthly installment(s) may be made by cash, credit/debit cards, NEFT/RTGS, local cheques in favor of "Rajmani Jewellers" payable in the city in where the Rajmani Jewellers Showroom in which the account was opened is located, ECS (Electronic Clearing Service). International card for online payment will not be accepted. In case of cheque dishonor, the bank charges shall be borne by the Customers. Rajmani Jewellers shall not be responsible for any online payment failure and money being debited from the Customer\'s account. Customers are requested to check with their banks or other service providers for such payment failures. It is the responsibility of the account holder to enter details correctly.',
    hi: 'मासिक किश्तों का भुगतान नकद, क्रेडिट/डेबिट कार्ड, NEFT/RTGS "राजमणि ज्वैलर्स" के पक्ष में स्थानीय चेक द्वारा किया जा सकता है, जो उस शहर में देय हो, जहां राजमणि ज्वैलर्स शोरूम है, जहां खाता खोला गया है। स्थित, ECS (इलेक्ट्रॉनिक क्लियरिंग सर्विस)। ऑनलाइन भुगतान के लिए अंतर्राष्ट्रीय कार्ड स्वीकार नहीं किया जाएगा। चेक अनादर के मामले में, बैंक शुल्क ग्राहकों द्वारा वहन किया जाएगा। राजमणि ज्वैलर्स किसी भी ऑनलाइन भुगतान विफलता और ग्राहक के खाते से पैसे डेबिट होने के लिए जिम्मेदार नहीं होगा। ग्राहकों से अनुरोध है कि वे ऐसी भुगतान विफलताओं के लिए अपने बैंकों या अन्य सेवा प्रदाताओं से जांच करें। विवरण सही ढंग से दर्ज करना खाताधारक की जिम्मेदारी है।',
  },
  {
    en: 'Amount of deposit of Rs. 1 Lakhs and above shall be accepted by way of cheque, bankers cheque or by way of electric fund transfer to the designated account of the Company.',
    hi: 'जमा राशि रु. 1 लाख और उससे अधिक की राशि चेक, बैंकर्स चेक या कंपनी के नामित खाते में इलेक्ट्रिक फंड ट्रांसफर के माध्यम से स्वीकार की जाएगी।',
  },
  {
    en: 'The Company or the Rajmani Jewellers will not be responsible or liable to send reminders for payments.',
    hi: 'कंपनी या राजमणि ज्वैलर्स भुगतान के लिए अनुस्मारक भेजने के लिए जिम्मेदार या उत्तरदायी नहीं होंगे।',
  },
  {
    en: 'At the time of purchase of jewellery, the account holder has to personally come and should produce a valid photo identity proof and PAN Card. The Company reserves the right to satisfy the identity of the Customer in any manner it deems fit.',
    hi: 'आभूषणों की खरीद के समय, खाताधारक को व्यक्तिगत रूप से आना होगा और एक वैध फोटो पहचान प्रमाण और पैन कार्ड प्रस्तुत करना होगा। कंपनी किसी भी तरीके से ग्राहक की पहचान को संतुष्ट करने का अधिकार सुरक्षित रखती है।',
  },
  {
    en: 'The customer will have to purchase the jewellery for the total installments amount paid and partial purchase is not allowed.',
    hi: 'ग्राहक को भुगतान की गई कुल किस्त राशि के लिए आभूषण खरीदना होगा और आंशिक खरीद की अनुमति नहीं है।',
  },
  {
    en: 'The Customer may appoint a nominee at the time of enrolment upon submission of relevant documentation. In the event of death of the account holder, the amount is transferable by the Company only to the person(s) whose nomination has been filled by the account holder. in the Enrolment Form at the time of opening the account subject to such nominee producing identity and address proof. In case the account holder does not nominate any person, any claim(s) made by any other person(s) on behalf of the account holder will not be entertained unless such person being a legal heir/duly authorized person claiming the benefits under the Scheme, shall produce below documents to the Company:',
    hi: 'ग्राहक प्रासंगिक दस्तावेज जमा करने पर नामांकन के समय एक नामांकित व्यक्ति नियुक्त कर सकता है। खाताधारक की मृत्यु की स्थिति में, कंपनी द्वारा राशि केवल उस व्यक्ति (व्यक्तियों) को हस्तांतरित की जा सकती है जिसका नामांकन खाता खोलने के समय नामांकन फॉर्म में खाताधारक द्वारा भरा गया है, बशर्ते कि नामांकित व्यक्ति अपनी पहचान प्रस्तुत करे। और पते का प्रमाण, यदि खाताधारक किसी व्यक्ति को नामांकित नहीं करता है, तो खाताधारक की ओर से किसी अन्य व्यक्ति द्वारा किए गए किसी भी दावे पर विचार नहीं किया जाएगा, जब तक कि ऐसा व्यक्ति कानूनी उत्तराधिकारी/योजना के तहत लाभ का दावा करने वाला विधिवत अधिकृत व्यक्ति न हो। कंपनी को निम्नलिखित दस्तावेज़ प्रस्तुत करेगाः',
  },
  {
    en: '1. Death certificate of the deceased. ii. Succession Certificate.\n\niii. NOC from other surviving legal heir for redemption. iv. Indemnity undertaking to indemnify Shree Ganesh Jewellers from claims. v. Will (if any).\n\nvi. Along with all other supporting documents and clarifications.\n\nHowever, the decision of the Company shall be final on sufficiency of any document in all such Cases above and the same shall be binding upon the claimants.',
    hi: '1. मृतक का मृत्यु प्रमाण पत्र। ii. उत्तराधिकार प्रमाण पत्र।\n\niii. रिडेम्पशन के लिए अन्य जीवित कानूनी उत्तराधिकारी से एनओसी। iv. दावों से श्री गणेश ज्वैलर्स को क्षतिपूर्ति करने के लिए क्षतिपूर्ति करने का उपक्रम। v. वसीयत (यदि कोई हो)।\n\nvi. अन्य सभी सहायक दस्तावेजों और स्पष्टीकरणों के साथ।\n\nहालाँकि, उपरोक्त सभी मामलों में किसी भी दस्तावेज़ की पर्याप्तता पर कंपनी का निर्णय अंतिम होगा और यह दावेदारों पर बाध्यकारी होगा।',
  },
  {
    en: 'The Company reserves the right to alter, amend, add or delete part or whole of the privileges of the Scheme without prior notice to the account holder, as long as the same is not detrimental to the interests of the account holder.',
    hi: 'कंपनी खाताधारक को पूर्व सूचना दिए बिना योजना के कुछ या पूरे विशेषाधिकारों को बदलने, संशोधित करने, जोड़ने या हटाने का अधिकार सुरक्षित रखती है, जब तक कि यह खाताधारक के हितों के लिए हानिकारक न हो।',
  },
  {
    en: 'The Company is the operator of this Scheme and reserves the right to suspend the Scheme at any time. In any such event, the account holder may purchase any item at the Rajmani Jewellers Showroom equal to the value of the installments accumulated in his/her Scheme account along with discounts accumulated, as on that day.',
    hi: 'कंपनी इस योजना की संचालक है और किसी भी समय योजना को निलंबित करने का अधिकार सुरक्षित रखती है। ऐसी किसी भी स्थिति में, खाताधारक राजमणि ज्वैलर्स शोरूम से उस दिन अपने स्कीम खाते में जमा हुई किस्तों के मूल्य के साथ-साथ जमा छूट के बराबर कोई भी वस्तु खरीद सकता है।',
  },
  {
    en: 'The liability of the Company or its branch or its stores under the scheme is limited to the extent of installments/advances paid by the account holder(s) and the discount, as per the Scheme and the terms and conditions contained herein, and thus does not lead to any other assurance or warranty whatsoever by the Company.',
    hi: 'योजना के तहत कंपनी या उसकी शाखा या उसके स्टोर की देनदारी योजना और इसमें शामिल नियमों और शर्तों के अनुसार खाताधारक द्वारा भुगतान की गई किश्तों/अग्रिम और छूट की सीमा तक सीमित है, और इस प्रकार है कंपनी द्वारा किसी भी प्रकार का कोई अन्य आश्वासन या वारंटी नहीं दी जाएगी।',
  },
  {
    en: 'Any conditions that are not explicitly covered above would be the discretion of the Company at the time of transaction/redemption. The decision of the Company in this regard would be deemed as irrevocable and final.',
    hi: 'ऊपर स्पष्ट रूप से शामिल नहीं की गई कोई भी शर्त लेन-देन/रिडेम्पशन के समय कंपनी के विवेक पर निर्भर होगी। इस संबंध में कंपनी का निर्णय अपरिवर्तनीय और अंतिम माना जाएगा।',
  },
  {
    en: "Disputes if any will be subject to the Courts in Khargone jurisdiction only, to the exclusion of any other court's jurisdiction.",
    hi: 'यदि कोई विवाद है तो वह केवल खरगौन क्षेत्राधिकार वाले न्यायालयों के अधीन होगा, किसी अन्य न्यायालय के क्षेत्राधिकार को छोड़कर।',
  },
  {
    en: 'In case of any change in existing laws, rules, Acts, etc. by any regulatory authority, the Company reserves the right to make such modifications/change/suspend/discontinue the Scheme suitable to the change of law and necessary requirements as per the same have to be complied with by the account holder.',
    hi: 'किसी भी नियामक प्राधिकरण द्वारा मौजूदा कानूनों, नियमों, अधिनियमों आदि में किसी भी बदलाव के मामले में, कंपनी के पास कानून में बदलाव और उसके अनुसार आवश्यक आवश्यकताओं के अनुरूप योजना में ऐसे संशोधन/परिवर्तन/निलंबित/बंद करने का अधिकार सुरक्षित है। खाताधारक को इसका अनुपालन करना होगा।',
  },
];

const styles = StyleSheet.create({
  goldStrip: {
    height: width * 0.02,
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
    marginTop: 20,
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
    justifyContent: 'space-between',
    marginTop: height * 0.01,
  },
  title: {
    fontSize: width < 400 ? width * 0.038 : width * 0.042,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: width * 0.01,
  },
  scrollContainer: {
    paddingHorizontal: width * 0.04,
    paddingBottom: height * 0.05,
    flexGrow: 1,
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
  text: {
    fontSize: width * 0.038,
    color: '#333',
    flex: 1,
    fontFamily: 'Poppins-Regular',
    lineHeight: width * 0.05,
    textAlign: 'justify',
  },
  textHindi: {
    fontSize: width * 0.035,
    color: '#444',
    flex: 1,
    fontFamily: 'Poppins-Regular',
    lineHeight: width * 0.048,
    textAlign: 'justify',
  },
  linkContainer: {
    marginVertical: height * 0.02,
    alignItems: 'center',
  },
  linkText: {
    fontSize: width * 0.04,
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: 'blue',
    textAlign: 'center',
    marginVertical: height * 0.02,
    fontFamily: 'Poppins-SemiBold',
  },
  faqHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: width * 0.03,
    marginTop: height * 0.03,
  },
  faqHeading: {
    fontSize: width < 400 ? width * 0.04 : width * 0.045,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: width * 0.01,
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
    fontSize: width * 0.038,
    color: '#333',
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    paddingRight: width * 0.02,
  },
  dropdownContent: {
    padding: width * 0.035,
    backgroundColor: '#fff',
    color: '#444',
    fontSize: width * 0.035,
    fontFamily: 'Poppins-Regular',
    lineHeight: width * 0.05,
  },
});

export default SavingsQuestionMark;
