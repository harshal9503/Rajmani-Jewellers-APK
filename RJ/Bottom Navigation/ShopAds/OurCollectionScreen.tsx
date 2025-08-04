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

const {width} = Dimensions.get('window');

const categories = [
  {id: 1, name: 'Rings', icon: require('../../assets/ring.png')},
  {id: 2, name: 'Chains', icon: require('../../assets/ring.png')},
  {id: 3, name: 'Earrings', icon: require('../../assets/ring.png')},
  {id: 4, name: 'Bracelets', icon: require('../../assets/ring.png')},
  {id: 5, name: 'Necklace', icon: require('../../assets/ring.png')},
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
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.id)}>
            <Image
              source={
                item.isFavorite
                  ? require('../../assets/filled.png')
                  : require('../../assets/unfilled.png')
              }
              style={styles.heartIcon}
            />
          </TouchableOpacity>
          <View style={styles.productImageWrapper}>
            <Image source={item.image} style={styles.productImage} />
          </View>
          <View style={styles.productInfoBox}>
            <Text style={styles.productName} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.weightContainer}>
              <View style={styles.weightSection}>
                <Text style={styles.weightLabel}>Gross Weight</Text>
                <Text style={styles.weightValue}>{item.grossWeight}</Text>
              </View>
              <View style={[styles.weightSection, styles.netWeightSection]}>
                <Text style={[styles.weightLabel, styles.netWeightLabel]}>
                  Net Weight
                </Text>
                <Text style={[styles.weightValue, styles.netWeightValue]}>
                  {item.netWeight}
                </Text>
              </View>
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
  container: {flex: 1, backgroundColor: '#fff'},
  goldStrip: {height: width * 0.11, backgroundColor: '#B88731', width: '100%'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.025,
    backgroundColor: '#fff',
  },
  backButton: {flexDirection: 'row', alignItems: 'center'},
  backIcon: {width: width * 0.06, height: width * 0.06, resizeMode: 'contain'},
  backText: {
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  content: {flex: 1, backgroundColor: '#fff'},
  categoriesContainer: {
    paddingVertical: width * 0.04,
    backgroundColor: '#fff',
  },
  categoriesList: {paddingHorizontal: width * 0.04},
  categoryItem: {alignItems: 'center', marginRight: width * 0.06},
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
  selectedCategoryText: {color: '#B88731', fontWeight: '600'},
  productsContainer: {flex: 1, paddingHorizontal: width * 0.02},
  productsList: {paddingBottom: width * 0.04, paddingTop: 15},
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.01,
  },
  productCard: {
    width: (width - width * 0.09) / 2,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: width * 0.05,
    marginHorizontal: width * 0.01,
    borderWidth: 2,
    borderColor: '#B88731',
    overflow: 'visible',
    paddingBottom: 4,
    paddingTop: 0,
    position: 'relative',
  },
  productMainContainer: {flex: 1, position: 'relative'},
  productImageWrapper: {
    marginTop: width * 0.02,
    marginHorizontal: width * 0.02,
    borderWidth: 1,
    borderColor: '#B88731',
    borderRadius: 8,
    overflow: 'hidden',
    height: width * 0.32,
  },
  productImage: {width: '100%', height: '100%', resizeMode: 'cover'},
  favoriteButton: {
    position: 'absolute',
    top: -width * 0.022,
    right: -width * 0.01,
    width: width * 0.09,
    height: width * 0.09,
    borderRadius: width * 0.049,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B88731',
    zIndex: 2,
    elevation: 4,
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
    flexDirection: 'row', // ADJUSTED: Changed to row to show weights side by side
    marginTop: width * 0.01,
    paddingHorizontal: width * 0.02,
    justifyContent: 'space-between', // ADJUSTED: Space sections evenly
  },
  weightSection: {
    flex: 1, // ADJUSTED: Each section takes equal space (half-half)
    alignItems: 'flex-start', // ADJUSTED: Left align content in each section
  },
  weightLabel: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    fontSize: width * 0.025, // ADJUSTED: Slightly smaller font for labels
    textAlign: 'left', // ADJUSTED: Left align text
    marginBottom: width * 0.003, // ADJUSTED: Small margin between label and value
  },
  weightValue: {
    fontSize: width * 0.025, // ADJUSTED: Font size for weight values
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'left', // ADJUSTED: Left align text
  },
  heartIcon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  netWeightSection: {
    alignItems: 'flex-end', // ADJUSTED: Right align the net weight section
  },
  netWeightLabel: {
    textAlign: 'right', // ADJUSTED: Right align net weight label
  },
  netWeightValue: {
    textAlign: 'right', // ADJUSTED: Right align net weight value
  },
});

export default OurCollectionScreen;
