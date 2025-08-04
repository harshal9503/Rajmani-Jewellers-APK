import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import RedHeartIcon from '../../assets/redheart.svg';
import NecklaceImage from '../../assets/19.svg';

const {width} = Dimensions.get('window');

const WishlistScreen = ({navigation}) => {
  const [wishlist, setWishlist] = useState([
    {
      id: '1',
      title: '24k Pure Gold Necklace',
      gross: '34.56 gm',
      net: '30.56 gm',
    },
    {
      id: '2',
      title: '24k Pure Gold Necklace',
      gross: '34.56 gm',
      net: '30.56 gm',
    },
    {
      id: '3',
      title:
        'Very Long Title For 24k Pure Gold Necklace That Should Wrap Within The Card',
      gross: '34.56 gm',
      net: '30.56 gm',
    },
    {
      id: '4',
      title: '24k Pure Gold Necklace',
      gross: '34.56 gm',
      net: '30.56 gm',
    },
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={() => removeFromWishlist(item.id)}>
        <RedHeartIcon width={20} height={20} />
      </TouchableOpacity>

      <NecklaceImage width={width * 0.32} height={width * 0.28} />

      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {item.title}
      </Text>

      <View style={styles.weightBlock}>
        <Text style={styles.weightText}>Gross: {item.gross}</Text>
        <Text style={styles.weightText}>Net: {item.net}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.goldStrip} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backIconWrapper}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Wishlist</Text>
      </View>

      <FlatList
        data={wishlist}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.grid}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
        }
      />
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
  backIconWrapper: {
    padding: width * 0.01,
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
    marginTop: 5,
  },
  grid: {
    paddingHorizontal: width * 0.02,
    paddingBottom: width * 0.1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: (width - width * 0.08) / 2,
    marginVertical: width * 0.02,
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 10,
    paddingTop: width * 0.04,
    paddingBottom: width * 0.03,
    paddingHorizontal: width * 0.025,
    backgroundColor: '#fff',
    alignItems: 'center',
    position: 'relative',
    minHeight: width * 0.54,
  },
  heartIcon: {
    position: 'absolute',
    top: width * 0.015,
    right: width * 0.015,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 3,
  },
  title: {
    fontSize: width * 0.035,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginTop: width * 0.015,
    color: '#000',
    maxWidth: '100%',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  weightBlock: {
    marginTop: width * 0.015,
    width: '100%',
    alignItems: 'flex-start',
  },
  weightText: {
    fontSize: width * 0.03,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginBottom: width * 0.005,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: width * 0.1,
    fontSize: width * 0.04,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
});

export default WishlistScreen;
