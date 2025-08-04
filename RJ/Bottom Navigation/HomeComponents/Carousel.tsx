import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

const {width} = Dimensions.get('window');

const carouselData = [
  {id: '1', local: require('../../assets/banner.png'), title: 'Welcome'},
  {id: '2', local: require('../../assets/banner2.jpg'), title: 'New Arrivals'},
  {
    id: '3',
    local: require('../../assets/banner3.jpg'),
    title: 'Discount Offers',
  },
  {id: '4', local: require('../../assets/banner4.jpg'), title: 'Festive Sale'},
  {
    id: '5',
    local: require('../../assets/banner5.jpg'),
    title: 'Gold Collection',
  },
  {id: '6', local: require('../../assets/banner6.jpg'), title: 'Design Launch'},
];

const MULTIPLIER = 50;
const infiniteData = Array(MULTIPLIER).fill(carouselData).flat();
const middleIndex = Math.floor(infiniteData.length / 2);

const Carousel = () => {
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef(null);
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setReady(true), 100);

    intervalRef.current = setInterval(() => {
      currentIndexRef.current += 1;
      flatListRef.current?.scrollToOffset({
        offset: (middleIndex + currentIndexRef.current) * width,
        animated: true,
      });
      setCurrentIndex(currentIndexRef.current % carouselData.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  const handleScrollEnd = e => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const flatIndex = Math.round(offsetX / width);
    const index = flatIndex % carouselData.length;

    setCurrentIndex(index);

    if (
      flatIndex < carouselData.length ||
      flatIndex > infiniteData.length - carouselData.length
    ) {
      const resetIndex = middleIndex + index;
      flatListRef.current?.scrollToIndex({index: resetIndex, animated: false});
      currentIndexRef.current = index;
    }
  };

  const renderItem = ({item}) => (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.slide}>
        <Image source={item.local} style={styles.image} resizeMode="cover" />
      </View>
    </TouchableWithoutFeedback>
  );

  const getItemLayout = (_, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  const onScrollToIndexFailed = ({index}) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({index, animated: false});
    }, 500);
  };

  const renderDots = () =>
    carouselData.map((_, index) => {
      const isActive = currentIndex === index;
      return (
        <View key={index} style={[styles.dot, isActive && styles.activeDot]} />
      );
    });

  return (
    <View style={styles.container}>
      {ready && (
        <FlatList
          ref={flatListRef}
          data={infiniteData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleScrollEnd}
          renderItem={renderItem}
          keyExtractor={(_, index) => `${index}`}
          scrollEventThrottle={16}
          getItemLayout={getItemLayout}
          onScrollToIndexFailed={onScrollToIndexFailed}
          initialScrollIndex={middleIndex}
          bounces={false}
          decelerationRate="fast"
        />
      )}
      <View style={styles.pagination}>{renderDots()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: width * 0.5,
    borderRadius: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 14,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#B88731',
    marginHorizontal: 4,
    opacity: 0.4,
  },
  activeDot: {
    opacity: 1,
    transform: [{scale: 1.4}],
  },
});

export default Carousel;
