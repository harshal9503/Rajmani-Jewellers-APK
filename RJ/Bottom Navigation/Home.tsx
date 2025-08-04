import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import Carousel from './HomeComponents/Carousel';
import LiveGoldRate from './HomeComponents/LiveGoldRate';
import QuickBuyCard from './HomeComponents/QuickBuyCard';
import ShopAds from './ShopAds/ShopAds';
import YoutubeComponent from './HomeComponents/YoutubeComponent';
import NewArrivals from './NewArrivals/NewArrivals';
import CertSocial from './HomeComponents/CertSocial';
import TopStripHeader from './HomeComponents/TopStripHeader';
import WhatsAppFloatingButton from './HomeComponents/WhatsAppButton';

const {height} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
              <TopStripHeader navigation={navigation} />
              <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>
                <Carousel />
                <LiveGoldRate />
                <QuickBuyCard />
                <ShopAds />
                <YoutubeComponent />
                <NewArrivals />
                <CertSocial />
              </ScrollView>
              <WhatsAppFloatingButton />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingBottom: height * 0.05,
  },
});

export default HomeScreen;
