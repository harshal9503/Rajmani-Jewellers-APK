import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import SearchIcon from '../assets/search.svg';
import CloseIcon from '../assets/close.svg';
import RecentIcon from '../assets/recent.svg';
import Svg17 from '../assets/17.svg';
import Svg19 from '../assets/19.svg';

const {width} = Dimensions.get('window');

const Search = ({navigation}) => {
  const recentSearches = ['Necklace', 'Mangalsutra'];

  const searchResults = [
    {id: 1, SvgComponent: Svg17, title: 'Gold Bangles'},
    {id: 2, SvgComponent: Svg19, title: 'Necklace'},
  ];

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}>
          <View style={styles.goldStrip} />

          <View style={styles.searchSection}>
            <View style={styles.searchBox}>
              <SearchIcon
                width={width * 0.05}
                height={width * 0.05}
                marginBottom={5}
              />
              <TextInput
                style={styles.input}
                placeholder="Jhumki"
                placeholderTextColor="#B88731"
              />
              <TouchableOpacity>
                <CloseIcon width={width * 0.045} height={width * 0.045} />
              </TouchableOpacity>
            </View>

            <View style={styles.recentSection}>
              {recentSearches.map((item, index) => (
                <View style={styles.recentItem} key={index}>
                  <RecentIcon
                    width={width * 0.045}
                    height={width * 0.045}
                    style={{marginRight: 10}}
                  />
                  <Text style={styles.recentText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Our Collection</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.seeMore}>See more &gt;&gt;</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultsContainer}>
            {searchResults.map(item => {
              const SvgImage = item.SvgComponent;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.resultItem}
                  onPress={() => navigation.navigate('JewelleryDetail')}>
                  <View style={styles.svgWrapper}>
                    <SvgImage width="100%" height={width * 0.35} />
                  </View>
                  <Text style={styles.resultText}>{item.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  goldStrip: {
    height: width * 0.11,
    backgroundColor: '#B88731',
    width: '100%',
  },
  searchSection: {
    padding: 15,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#B88731',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    color: '#B88731',
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Medium',
  },
  recentSection: {
    marginTop: 15,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentText: {
    color: '#B88731',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Medium',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  resultsTitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  seeMore: {
    fontSize: width * 0.035,
    color: '#0000FF',
    fontFamily: 'Poppins-SemiBold',
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  resultItem: {
    width: width * 0.44,
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
  resultText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: width * 0.035,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
});

export default Search;
