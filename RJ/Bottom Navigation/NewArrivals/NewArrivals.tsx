import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Svg17 from '../../assets/17.svg';
import Svg19 from '../../assets/19.svg';

const {width} = Dimensions.get('window');

const newArrivalsData = [
  {
    id: 1,
    SvgComponent: Svg17,
    title: 'Gold Bangles',
    screen: 'GoldBanglesScreen',
  },
  {id: 2, SvgComponent: Svg19, title: 'Necklace', screen: 'NecklaceScreen'},
];

const NewArrivals = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New Arrivals</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('OurCollectionScreen')}>
          <Text style={styles.seeMore}>See more &gt;&gt;</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.itemsContainer}>
        {newArrivalsData.map(item => {
          const SvgImage = item.SvgComponent;
          return (
            <TouchableWithoutFeedback
              key={item.id}
              onPress={() => navigation.navigate(item.screen)}>
              <View style={styles.item}>
                <View style={styles.svgWrapper}>
                  <SvgImage width={'100%'} height={width * 0.35} />
                </View>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  seeMore: {
    fontSize: width * 0.035,
    color: '#0000FF',
    fontWeight: '400',
    fontFamily: 'Poppins-SemiBold',
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    width: width * 0.46,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 8,
    overflow: 'hidden',
    paddingBottom: 8,
  },
  svgWrapper: {
    marginTop: 8,
    marginHorizontal: 8,
  },
  itemTitle: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: width * 0.035,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
});

export default NewArrivals;
