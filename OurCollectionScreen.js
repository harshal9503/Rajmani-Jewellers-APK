import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const {width} = Dimensions.get('window');

const categories = [
  {
    id: 1,
    name: 'Rings',
    icon: require('../../assets/ring.png'),
  },
  {
    id: 2,
    name: 'Chains',
    icon: require('../../assets/ring.png'),
  },
  {
    id: 3,
    name: 'Earrings',
    icon: require('../../assets/ring.png'),
  },
  {
    id: 4,
    name: 'Bracelets',
    icon: require('../../assets/ring.png'),
  },
  {
    id: 5,
    name: 'Necklace',
    icon: require('../../assets/ring.png'),
  },
];

const products = [
  {
    id: 1,
    name: '24k Pure Gold Ring',
    grossWeight: '34.56 gm',
    netWeight: '30.56 gm',
    image: require('../../assets/ring.png'),
    isFavorite: false,
  },
  {
    id: 2,
    name: '24k Pure Gold Necklace',
    grossWeight: '34.56 gm',
    netWeight: '30.56 gm',
    image: require('../../assets/ring.png'),
    isFavorite: true,
  },
  {
    id: 3,
    name: '24k Pure Gold Bracelet',
    grossWeight: '34.56 gm',
    netWeight: '30.56 gm',
    image: require('../../assets/ring.png'),
    isFavorite: false,
  },
  {
    id: 4,
    name: '24k Pure Gold Earrings',
    grossWeight: '34.56 gm',
    netWeight: '30.56 gm',
    image: require('../../assets/ring.png'),
    isFavorite: false,
  },
  {
    id: 5,
    name: '24k Pure Gold Chain',
    grossWeight: '34.56 gm',
    netWeight: '30.56 gm',
    image: require('../../assets/ring.png'),
    isFavorite: false,
  },
  {
    id: 6,
    name: '24k Pure Gold Pendant',
    grossWeight: '34.56 gm',
    netWeight: '30.56 gm',
    image: require('../../assets/ring.png'),
    isFavorite: false,
  },
];

const OurCollectionScreen = ({navigation}) => {
  const [productList, setProductList] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState(1);

  const toggleFavorite = useCallback(id => {
    setProductList(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? {...product, isFavorite: !product.isFavorite}
          : product,
      ),
    );
  }, []);

  const selectCategory = useCallback(categoryId => {
    setSelectedCategory(categoryId);
  }, []);

  const renderCategory = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => selectCategory(item.id)}>
        <View
          style={[
            styles.categoryIconContainer,
            selectedCategory === item.id && styles.selectedCategoryContainer,
          ]}>
          <Image source={item.icon} style={styles.categoryIcon} />
        </View>
        <Text
          style={[
            styles.categoryText,
            selectedCategory === item.id && styles.selectedCategoryText,
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    ),
    [selectedCategory, selectCategory],
  );

  const renderProduct = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => navigation.navigate('ProductDetails', {product: item})}>
        <View style={styles.productMainContainer}>
          {/* Product Image Container with gold border */}
          <View style={styles.productImageWrapper}>
            <Image source={item.image} style={styles.productImage} />
          </View>

          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.id)}>
            <Svg
              width={width * 0.035}
              height={width * 0.035}
              viewBox="0 0 24 24">
              <Path
                fill={item.isFavorite ? '#FF0000' : '#CCCCCC'}
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </Svg>
          </TouchableOpacity>

          {/* Product Info Box */}
          <View style={styles.productInfoBox}>
            <Text style={styles.productName} numberOfLines={1}>
              {item.name}
            </Text>

            <View style={styles.weightContainer}>
              <Text style={styles.weightText}>
                <Text style={styles.weightLabel}>Gross Weight: </Text>
                {item.grossWeight}
              </Text>
              <Text style={styles.weightText}>
                <Text style={styles.weightLabel}>Net Weight: </Text>
                {item.netWeight}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [navigation, toggleFavorite],
  );

  return (
    <View style={styles.container}>
      <View style={styles.goldStrip} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Products Grid */}
        <View style={styles.productsContainer}>
          <FlatList
            data={productList}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.productRow}
            contentContainerStyle={styles.productsList}
            scrollEnabled={false}
          />
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  backText: {
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoriesContainer: {
    paddingVertical: width * 0.04,
    backgroundColor: '#fff',
  },
  categoriesList: {
    paddingHorizontal: width * 0.04,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: width * 0.06,
  },
  categoryIconContainer: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.08,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: width * 0.02,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCategoryContainer: {
    borderColor: '#B88731',
    shadowColor: '#B88731',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  categoryIcon: {
    width: width * 0.12,
    height: width * 0.12,
    resizeMode: 'cover',
    borderRadius: width * 0.06,
  },
  categoryText: {
    fontSize: width * 0.03,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#B88731',
    fontWeight: '600',
  },
  productsContainer: {
    flex: 1,
    paddingHorizontal: width * 0.02, // Reduced padding for less left and right margins
  },
  productsList: {
    paddingBottom: width * 0.04,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 0, // Removed extra padding to fix alignment
  },
  productCard: {
    width: (width - width * 0.08) / 2, // Optimized width calculation with reduced margins
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: width * 0.05,
    marginHorizontal: 0, // Removed horizontal margin to fix spacing
    borderWidth: 2,
    borderColor: '#B88731',
    overflow: 'visible',
    paddingBottom: 4,
    paddingTop: width * 0.04,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  productMainContainer: {
    flex: 1,
    position: 'relative',
  },
  productImageWrapper: {
    marginTop: 2,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 8,
    overflow: 'hidden',
    height: width * 0.25,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: -width * 0.045, // Moved heart icon higher up
    right: -width * 0.025, // Adjusted right position for better alignment
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.04,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#B88731',
    zIndex: 10,
  },
  productInfoBox: {
    paddingHorizontal: width * 0.03,
    paddingTop: width * 0.015,
    paddingBottom: width * 0.005,
  },
  productName: {
    fontSize: width * 0.032,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginBottom: width * 0.015,
    textAlign: 'center',
    lineHeight: width * 0.04,
  },
  weightContainer: {
    flexDirection: 'column',
    marginTop: width * 0.01,
    paddingHorizontal: width * 0.02,
  },
  weightText: {
    fontSize: width * 0.024,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: width * 0.005,
    textAlign: 'center',
  },
  weightLabel: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
});

export default OurCollectionScreen;