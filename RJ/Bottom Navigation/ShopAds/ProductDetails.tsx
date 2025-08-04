import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';

const {width, height} = Dimensions.get('window');

// Responsive scaling function
const scale = size => (width / 375) * size;
const verticalScale = size => (height / 812) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const similarItems = [
  {
    id: '1',
    title: 'Gold Bangles',
    image: require('../../assets/bangles.png'),
    isCircle: false,
  },
  {
    id: '2',
    title: 'Necklace',
    image: require('../../assets/bangles.png'),
    isCircle: false,
  },
];

const ProductDetails = ({navigation, route}) => {
  const {product} = route.params || {};
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWhatsAppShare = () => {
    const message = `🔥 *Rajmani Jewellers* 🔥\n\n✨ *24k Pure Gold Ring* ✨\n\n📋 *Product Details:*\n• Purity: 24 karat\n• Gross Weight: 1.64 gm\n• Net Weight: 1.30 gm\n\n💎 Exquisite craftsmanship with premium quality gold\n\n📞 Can I get more information about this beautiful piece?\n\n🏪 *Visit our store for the finest jewelry collection*`;
    const url = `whatsapp://send?text=${encodeURIComponent(
      message,
    )}&phone=+917828120142`;

    // Directly try to open WhatsApp without checking
    Linking.openURL(url).catch(() => {
      // If WhatsApp fails to open, open in browser
      Linking.openURL(
        `https://wa.me/917828120142?text=${encodeURIComponent(message)}`,
      );
    });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleSeeMore = () => {
    navigation.navigate('OurCollectionScreen');
  };

  const handleCollectionNavigation = () => {
    navigation.navigate('OurCollectionScreen');
  };

  return (
    <View style={styles.container}>
      {/* Gold Strip */}
      <View style={styles.goldStrip} />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/ring1.png')}
            style={styles.productImage}
          />
        </View>

        <View style={styles.contentBox}>
          {/* Title */}
          <Text style={styles.title}>24k Pure Gold Ring</Text>

          {/* Description */}
          <Text style={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detail}>Purity or fineness: 24 karat</Text>
            <Text style={styles.detail}>Gross Weight: 1.64 gm</Text>
            <Text style={styles.detail}>Net Weight: 1.30 gm</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.wishlistButton}
              onPress={toggleWishlist}
              activeOpacity={0.7}>
              <Text style={styles.wishlistButtonText}>Add to wish List</Text>
              <Image
                source={
                  isWishlisted
                    ? require('../../assets/filled.png')
                    : require('../../assets/unfilled.png')
                }
                style={styles.wishlistIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={handleWhatsAppShare}
              activeOpacity={0.7}>
              <Text style={styles.detailButtonText}>Get more details</Text>
              <Image
                source={require('../../assets/Whatsapp1.png')}
                style={styles.whatsappIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Similar Collection */}
          <View style={styles.collectionHeader}>
            <Text style={styles.collectionTitle}>View more collection</Text>
            <TouchableOpacity onPress={handleSeeMore} activeOpacity={0.7}>
              <Text style={styles.seeMore}>See more &gt;&gt;</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.similarItemsContainer}>
            {similarItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={handleCollectionNavigation}
                activeOpacity={0.7}>
                <View
                  style={[
                    styles.cardImageContainer,
                    item.isCircle ? styles.circleImageContainer : null,
                  ]}>
                  <Image
                    source={item.image}
                    style={[
                      styles.cardImage,
                      item.isCircle
                        ? styles.circleImage
                        : styles.rectangleImage,
                    ]}
                  />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  goldStrip: {
    height: verticalScale(44),
    backgroundColor: '#B88731',
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12),
  },
  backIcon: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
  },
  backText: {
    fontSize: moderateScale(15),
    marginLeft: scale(8),
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  imageContainer: {
    width: '100%',
    height: verticalScale(300),
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentBox: {
    backgroundColor: '#fff',
    marginTop: -verticalScale(40),
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: scale(15),
    paddingTop: verticalScale(30),
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: -2},
    shadowRadius: 4,
  },
  title: {
    fontSize: moderateScale(18),
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginBottom: verticalScale(12),
    textAlign: 'center',
  },
  description: {
    fontSize: moderateScale(13),
    fontFamily: 'Poppins-Regular',
    color: '#444',
    lineHeight: moderateScale(18),
    marginBottom: verticalScale(15),
    marginHorizontal: scale(12),
  },
  detailsContainer: {
    marginHorizontal: scale(12),
    marginBottom: verticalScale(15),
  },
  detail: {
    fontSize: moderateScale(13),
    fontFamily: 'Poppins-Regular',
    marginBottom: verticalScale(4),
    color: '#333',
    lineHeight: moderateScale(18),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(15),
    gap: scale(8),
    marginHorizontal: scale(12),
  },
  wishlistButton: {
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 8,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(12),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  wishlistIcon: {
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
    marginLeft: scale(6),
  },
  wishlistButtonText: {
    fontSize: moderateScale(13),
    fontFamily: 'Poppins-SemiBold',
    color: '#B88731',
  },
  detailButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 8,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(12),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailButtonText: {
    fontSize: moderateScale(13),
    fontFamily: 'Poppins-SemiBold',
    color: '#B88731',
    marginRight: scale(8),
  },
  whatsappIcon: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
    marginBottom: 2,
  },
  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
    marginHorizontal: scale(12),
  },
  collectionTitle: {
    fontSize: moderateScale(15),
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  seeMore: {
    fontSize: moderateScale(13),
    fontFamily: 'Poppins-SemiBold',
    color: '#2A00FF',
  },
  similarItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    marginBottom: verticalScale(25),
    gap: scale(12),
  },
  card: {
    width: scale(155),
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    padding: scale(12),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B88731',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
  },
  cardImageContainer: {
    width: '100%',
    height: verticalScale(110),
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(8),
  },
  circleImageContainer: {
    borderRadius: 60,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  rectangleImage: {
    resizeMode: 'contain',
  },
  circleImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    fontSize: moderateScale(13),
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    color: '#000',
  },
});

export default ProductDetails;
