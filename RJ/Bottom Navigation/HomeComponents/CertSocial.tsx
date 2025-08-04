import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Dimensions,
  Linking,
  Keyboard,
} from 'react-native';
import DownloadIcon from '../../assets/download1.svg';
import IgiIcon from '../../assets/118549.svg';

const {width} = Dimensions.get('window');

const CertSocial = () => {
  const openURL = (url: string) => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  const onCardPress = () => {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onCardPress}>
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <DownloadIcon
                width={width * 0.2}
                height={width * 0.2}
                style={styles.cardImage}
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>100% Certified Jewellery</Text>
              <Text style={styles.cardText}>
                Every piece you get is fully checked for quality and
                authenticity by the use of Indian Standards (IBIS).
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={onCardPress}>
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <IgiIcon
                width={width * 0.2}
                height={width * 0.2}
                style={styles.cardImage}
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                International Gemological Institute
              </Text>
              <Text style={styles.cardText}>
                One of the world's largest independent certification and
                accreditation services provider since 1975
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.socialContainer}>
          <TouchableWithoutFeedback
            onPress={() => openURL('https://www.facebook.com/')}>
            <Image
              source={require('../../assets/facebook.png')}
              style={styles.socialIcon}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => openURL('https://www.instagram.com/')}>
            <Image
              source={require('../../assets/instagram.png')}
              style={styles.socialIcon}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => openURL('https://www.youtube.com/')}>
            <Image
              source={require('../../assets/youtube.png')}
              style={styles.socialIcon}
            />
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.footer}>
          <View style={styles.line} />
          <Text style={styles.footerText}>Rajmani Jewellers</Text>
          <View style={styles.line} />
        </View>

        <Text style={styles.credit}>Developed by - Vyanwebs Pvt. Ltd.</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center', // ensure vertical alignment of image and text
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    alignSelf: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: width * 0.04,
    fontWeight: '600',
    marginBottom: 5,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  cardText: {
    fontSize: width * 0.035,
    color: '#555',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  socialIcon: {
    width: width * 0.13,
    height: width * 0.13,
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 8,
  },
  footerText: {
    fontSize: width * 0.04,
    fontWeight: '400',
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  credit: {
    fontSize: width * 0.03,
    color: '#888',
    textAlign: 'center',
    marginBottom: 100,
    fontFamily: 'Poppins-Regular',
  },
});

export default CertSocial;
