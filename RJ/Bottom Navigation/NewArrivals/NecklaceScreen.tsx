import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

const {width} = Dimensions.get('window');

const NecklaceScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.goldStrip} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Necklace Collection</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>
          Beautiful Necklaces Displayed Here
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  goldStrip: {
    height: width * 0.11,
    backgroundColor: '#B88731',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.025,
    backgroundColor: '#fff',
  },
  backIcon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  headerText: {
    marginLeft: width * 0.05,
    fontSize: width * 0.045,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    color: '#000',
  },
});

export default NecklaceScreen;
