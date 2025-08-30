import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DashboardComponent from '../../components/HomeComponets/DashboardComponent';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="light-content"
            />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuIconImg}
        >
          <Image
            source={require('../../assets/menu.png')}
            style={styles.IconImg}
          />
        </TouchableOpacity>

        <Image
          source={require('../../assets/homelogo.png')}
          style={styles.logo}
        />
        <Text style={styles.appTitle}>Rajmani Jewellers</Text>
      </View>

      {/* White Curve Section */}
      <View style={styles.curveContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <DashboardComponent/>
        </ScrollView>
      </View>
      <View style={styles.containerbox}>
        <View style={styles.innerBox}>
          <Text style={styles.title}>Cash</Text>
          <Text style={styles.amount}>₹1,80,000.00</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.innerBox}>
          <Text style={styles.title}>UPI</Text>
          <Text style={styles.amount}>₹1,80,000.00</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    paddingTop: hp('2%'),
  },
  header: {
    alignItems: 'center',
    marginTop:hp('3%')
  },
  IconImg: {
    width: wp('7.5%'),
    height: wp('7%'),
  },
  menuIconImg: {
    tintColor: '#fff',
    position: 'absolute',
    left: wp('5%'),
    top: hp('0%'),
  },
  logo: {
    width: wp('15%'),
    height: wp('15%'),
    resizeMode: 'contain',
    marginBottom: hp('1%'),
  },
  appTitle: {
    fontSize: wp('5%'),
    color: '#fff',
    fontFamily:'Poppins-SemiBold',
    marginBottom: hp('2%'),
  },
  curveContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('10%'),
    borderTopRightRadius: wp('10%'),
    padding: wp('5%'),
    marginTop: hp('5%'),
  },
  containerbox: {
    flexDirection: 'row',
    position: 'absolute',
    top: '17%',
    left: '13%',
    width: '75%',
    height: hp('12%'),
    backgroundColor: '#ffffff',
    borderRadius: wp('4%'),
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
  },
  innerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: wp('3%'),
  },
  title: {
    fontSize: wp('4.2%'),
    fontFamily:'Poppins-SemiBold',
    color: Colors.PRIMARY,
  },
  amount: {
    fontSize: wp('3.5%'),
    fontFamily:'Poppins-Regular',
    color: '#000',
  },
});
