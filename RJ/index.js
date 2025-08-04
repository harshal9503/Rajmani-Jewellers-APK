/**
 * @format
 */
import {AppRegistry} from 'react-native';
import {getApp} from '@react-native-firebase/app';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {name as appName} from './app.json';
import App from './App';

// ✅ Background FCM handler
const app = getApp();
const messagingInstance = getMessaging(app);

setBackgroundMessageHandler(messagingInstance, async remoteMessage => {
  console.log('📩 Message handled in the background!', remoteMessage);
});

// ✅ Notifee background event handler
notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('🎯 Notifee Background Event:', type, detail);
});

AppRegistry.registerComponent(appName, () => App);
