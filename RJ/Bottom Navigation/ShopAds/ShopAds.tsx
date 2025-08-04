import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const HORIZONTAL_PADDING = 10;
const IMAGE_GAP = 10;

const TOP_IMAGE_WIDTH = (width - HORIZONTAL_PADDING * 2 - IMAGE_GAP) / 2;
const TOP_IMAGE_HEIGHT = Math.min(width * 0.3, 200);
const BOTTOM_IMAGE_WIDTH = width - HORIZONTAL_PADDING * 2;
const BOTTOM_IMAGE_HEIGHT = Math.min(BOTTOM_IMAGE_WIDTH * 0.5, 250);

const ShopAds = () => {
  // State hooks should come first
  const [loadingStates, setLoadingStates] = React.useState({
    topLeft: true,
    topRight: true,
    bottomFull: true,
  });

  // Then other hooks
  const navigation = useNavigation();

  const imageSources = {
    topLeft: require('../../assets/Rectangle11.png'),
    topRight: require('../../assets/Rectangle12.png'),
    bottomFull: require('../../assets/Rectangle14.png'),
  };

  const handleImageLoad = imageKey => {
    setLoadingStates(prev => ({...prev, [imageKey]: false}));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('OurCollectionScreen')}>
          <View style={styles.imageWrapper}>
            {loadingStates.topLeft && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            )}
            <FastImage
              source={imageSources.topLeft}
              style={styles.topImage}
              resizeMode={FastImage.resizeMode.cover}
              onLoad={() => handleImageLoad('topLeft')}
            />
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('CustomOrdersScreen')}>
          <View style={styles.imageWrapper}>
            {loadingStates.topRight && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            )}
            <FastImage
              source={imageSources.topRight}
              style={styles.topImage}
              resizeMode={FastImage.resizeMode.cover}
              onLoad={() => handleImageLoad('topRight')}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.bottomRow}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('SwarnBachatYojnaScreen')}>
          <View style={styles.imageWrapperFull}>
            {loadingStates.bottomFull && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            )}
            <FastImage
              source={imageSources.bottomFull}
              style={styles.bottomImage}
              resizeMode={FastImage.resizeMode.contain}
              onLoad={() => handleImageLoad('bottomFull')}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  bottomRow: {
    width: '100%',
    alignItems: 'center',
  },
  imageWrapper: {
    overflow: 'hidden',
    borderRadius: 8,
    width: TOP_IMAGE_WIDTH,
    height: TOP_IMAGE_HEIGHT,
  },
  imageWrapperFull: {
    overflow: 'hidden',
    borderRadius: 8,
    width: BOTTOM_IMAGE_WIDTH,
    height: BOTTOM_IMAGE_HEIGHT,
  },
  topImage: {
    width: TOP_IMAGE_WIDTH,
    height: TOP_IMAGE_HEIGHT,
  },
  bottomImage: {
    width: BOTTOM_IMAGE_WIDTH,
    height: BOTTOM_IMAGE_HEIGHT,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default ShopAds;
