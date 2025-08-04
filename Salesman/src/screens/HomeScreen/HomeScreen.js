import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeCards from '../../components/HomeComponets/HomeCards';
import { Colors } from '../../constants/Colors';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.PRIMARY}
        barStyle="light-content"
        translucent={false}
      />

      {/* Header */}
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
        <HomeCards />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    paddingTop: StatusBar.currentHeight || 50,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  IconImg: {
    width: 30,
    height: 30,
  },
  menuIconImg: {
    tintColor: '#fff',
    position: 'absolute',
    left: 15,
    top: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 18,
  },
  curveContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    paddingTop: 30,
    marginTop: 50,
  },
  containerbox: {
    flexDirection: 'row',
    position: 'absolute',
    top: '-7%',
    left: '19%',
    width: '75%',
    height: 90,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    paddingHorizontal: 10,
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
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.PRIMARY,
  },
  amount: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
});
