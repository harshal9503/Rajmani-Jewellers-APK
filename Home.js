// src/screens/HomeScreen/HomeScreen.js

import React, {useMemo, useState, useEffect, useRef} from 'react';
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
  Text,
  Modal,
  TouchableOpacity,
  Linking,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {useNavigation, useDrawerStatus} from '@react-navigation/native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import VersionCheck from 'react-native-version-check';

// Components
import Carousel from './HomeComponents/Carousel';
import LiveGoldRate from './HomeComponents/LiveGoldRate';
import QuickBuyCard from './HomeComponents/QuickBuyCard';
import ShopAds from './ShopAds/ShopAds';
import YoutubeComponent from './HomeComponents/YoutubeComponent';
import NewArrivals from './NewArrivals/NewArrivals';
import CertSocial from './HomeComponents/CertSocial';
import TopStripHeader from './HomeComponents/TopStripHeader';
import WhatsAppFloatingButton from './HomeComponents/WhatsAppButton';

const {height, width} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  let drawerStatus = 'closed';
  try {
    drawerStatus = useDrawerStatus();
  } catch (err) {}

  const isDrawerOpen = useMemo(() => drawerStatus === 'open', [drawerStatus]);

  const [updateVisible, setUpdateVisible] = useState(false);
  const [exitApp, setExitApp] = useState(false);
  const backHandlerRef = useRef();

  useEffect(() => {
    const checkAppVersion = async () => {
      try {
        const currentVersion = VersionCheck.getCurrentVersion();
        console.log(`📱 Current Version: ${currentVersion}`);

        const latestVersion = await VersionCheck.getLatestVersion({
          provider: 'playStore',
        });
        console.log(`☁️ Latest Version from Play Store: ${latestVersion}`);

        if (!latestVersion) {
          console.log('⚠️ No Play Store version found. Skipping update popup.');
          return;
        }

        if (latestVersion !== currentVersion) {
          console.log('🔔 Update available! Showing popup...');
          setUpdateVisible(true);
        } else {
          console.log('✅ App is up-to-date.');
        }
      } catch (error) {
        console.log('❌ Version check failed:', error.message);
      }
    };

    if (!__DEV__) {
      checkAppVersion();
    } else {
      console.log('🛠 Skipping version check in development mode.');
    }
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (!navigation.isFocused()) {
        return false; // Let default behavior happen if not on HomeScreen
      }

      if (isDrawerOpen) {
        navigation.closeDrawer();
        return true;
      }

      if (!exitApp) {
        setExitApp(true);
        ToastAndroid.showWithGravity(
          'Press again to exit the app',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        const timer = setTimeout(() => {
          setExitApp(false);
        }, 2000);
        return true;
      } else {
        BackHandler.exitApp();
        return true;
      }
    };

    backHandlerRef.current = backAction;

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backHandlerRef.current,
    );

    return () => {
      backHandler.remove();
    };
  }, [exitApp, isDrawerOpen, navigation]);

  const handleUpdateNow = () => {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.example',
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <TopStripHeader navigation={navigation} />
            <KeyboardAvoidingView
              style={{flex: 1}}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
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
            </KeyboardAvoidingView>
            <WhatsAppFloatingButton />
            {isDrawerOpen && <View style={styles.drawerOverlay} />}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>

      <Modal visible={updateVisible} transparent animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={[styles.popupBox, styles.popupError]}>
            <View style={styles.popupErrorBorder} />
            <Text style={styles.popupText}>
              A new version is available. Please update your app.
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => setUpdateVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.updateButton]}
                onPress={handleUpdateNow}>
                <Text style={styles.updateText}>Update Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  scrollContent: {paddingBottom: height * 0.05},
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: height,
    width: width,
    backgroundColor: 'rgba(0, 0, 0, 0.29)',
    zIndex: 20,
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupBox: {
    backgroundColor: 'white',
    width: width * 0.8,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    overflow: 'hidden',
  },
  popupError: {position: 'relative'},
  popupText: {
    fontSize: width * 0.038,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  popupErrorBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#FF3B30',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  updateButton: {
    backgroundColor: '#B88731',
  },
  cancelText: {
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  updateText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default HomeScreen;