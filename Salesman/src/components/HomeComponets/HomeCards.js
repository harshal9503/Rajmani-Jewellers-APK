import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_SIZE = width * 0.32;

const HomeCards = () => {
  const navigation = useNavigation();

  const cards = [
    {
      bg: require('../../assets/HomeImg/bluecard.png'),
      icon: require('../../assets/HomeImg/desh.png'),
      title: 'Dashboard',
      subtitle: 'Get all details',
      color: '#6E50FF',
      navigateTo: 'Dashboard',
    },
    {
      bg: require('../../assets/HomeImg/redcard.png'),
      icon: require('../../assets/HomeImg/homeedit.png'),
      title: 'Create Invoice',
      subtitle: 'Generate Bill',
      color: '#FF6666',
      navigateTo: 'create-invoice',
    },
    {
      bg: require('../../assets/HomeImg/yellowcard.png'),
      icon: require('../../assets/HomeImg/fileicon.png'),
      title: 'Get All Invoices',
      subtitle: 'View and Edit Bills',
      color: '#FADE98',
      navigateTo: 'get-all-invoices',
    },
    {
      bg: require('../../assets/HomeImg/greencard.png'),
      icon: require('../../assets/HomeImg/homering.png'),
      title: 'Repairing',
      subtitle: 'Get All Details',
      color: '#15E052',
      navigateTo: 'repairing-screen',
    },
  ];

  return (
    <View style={styles.container}>
      {cards.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cardWrapper}
          activeOpacity={0.8}
          onPress={() => navigation.navigate(item.navigateTo)}
        >
          <Image source={item.bg} style={styles.card} />

          {/* Inner Icon Box */}
          <View style={[styles.innerBox, { backgroundColor: item.color }]}>
            <Image source={item.icon} style={styles.cardInnerIcon} />
          </View>

          {/* Arrow Button */}
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={() => navigation.navigate(item.navigateTo)}
          >
            <Image
              source={require('../../assets/arrow.png')}
              style={styles.arrow}
            />
          </TouchableOpacity>

          {/* Title & Subtitle */}
          <View style={styles.textBox}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('custom-order')} >
          <Text style={styles.btnText}>Custom Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eyebtn} onPress={()=> navigation.navigate('custom-order-invoice')} >
          <Image
            source={require('../../assets/HomeImg/homeeye.png')}
            style={{ width: 24, height: 22, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeCards;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    margin: 20,
    marginTop: 30,
  },
  cardWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  card: {
    width: CARD_SIZE,
    height: 145,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  arrowContainer: {
    position: 'absolute',
    top: 57,
    right: -10,
    width: 28,
    height: 28,
    backgroundColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  arrow: {
    width: 14,
    height: 10,
    tintColor: '#FF0000',
  },
  innerBox: {
    position: 'absolute',
    width: 35,
    height: 35,
    top: 50,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 5,
  },
  cardInnerIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  textBox: {
    position: 'absolute',
    bottom: 15,
    left: 10,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  subtitle: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    padding: 10,
    backgroundColor: '#A400E0',
    borderRadius: 5,
    elevation: 3,
    width: '77%',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eyebtn: {
    padding: 10,
    backgroundColor: '#A400E0',
    borderRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    paddingVertical: 18,
  },
});
