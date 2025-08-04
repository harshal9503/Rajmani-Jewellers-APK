// File: App.tsx
import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import {getApp} from '@react-native-firebase/app';
import {
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
} from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackNavigation from './Navigtn/Index';

const App = () => {
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          console.log('🔐 Notification Permission:', granted);

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Permission Granted', 'Notifications enabled.');
          } else {
            Alert.alert('Permission Denied', 'Notifications will be disabled.');
          }
        } catch (err) {
          console.warn('Permission error:', err);
        }
      }
    };

    const getFCMToken = async () => {
      try {
        const app = getApp();
        const messaging = getMessaging(app);
        const token = await getToken(messaging);
        console.log('🔥 FCM Token:', token);
        await AsyncStorage.setItem('fcmToken', token);
      } catch (error) {
        console.error('❌ Error fetching FCM token:', error);
      }
    };

    const handleNotificationOpenEvents = () => {
      const messagingInstance = getMessaging(getApp());

      onNotificationOpenedApp(messagingInstance, remoteMessage => {
        console.log('🔔 Notification opened from background:', remoteMessage);
        global.notificationData = remoteMessage;
      });

      getInitialNotification(messagingInstance).then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            '🛑 App opened from quit state due to notification:',
            remoteMessage,
          );
          global.notificationData = remoteMessage;
        }
      });

      const unsubscribeOnMessage = onMessage(
        messagingInstance,
        async remoteMessage => {
          console.log('📩 Foreground FCM message received:', remoteMessage);
          await displayNotification(remoteMessage);
        },
      );

      return unsubscribeOnMessage;
    };

    requestPermissions();
    getFCMToken();
    const unsubscribe = handleNotificationOpenEvents();

    return () => unsubscribe();
  }, []);

  const displayNotification = async (remoteMessage: any) => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    const newNotification = {
      title: remoteMessage.notification?.title || 'Notification',
      body: remoteMessage.notification?.body || 'You have a new message',
      time: new Date().toLocaleString(),
    };

    const stored = await AsyncStorage.getItem('pushNotifications');
    const notis = stored ? JSON.parse(stored) : [];
    await AsyncStorage.setItem(
      'pushNotifications',
      JSON.stringify([...notis, newNotification]),
    );

    await notifee.displayNotification({
      title: newNotification.title,
      body: newNotification.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: {
          id: 'default',
        },
        largeIcon: require('./assets/info.png'),
      },
    });
  };

  return <StackNavigation />;
};

export default App;
