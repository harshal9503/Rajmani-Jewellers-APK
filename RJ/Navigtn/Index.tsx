import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from '../screens/splashscreen/splash';
import LoginScreen from '../screens/Auth/loginpage';
import OtpVerification from '../screens/Auth/OtpVerification';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import MPIN from '../screens/Auth/MPIN';
import MPINConfirm from '../screens/Auth/MPINConfirm';
import HomeScreen from '../screens/Auth/HomeScreen';

import Search from '../Bottom Navigation/Search';

import MyTijori from '../Bottom Navigation/MyTijori';
import SavingsPlan from '../Bottom Navigation/SavingsPlan/SavingsPlan';
import Account from '../Bottom Navigation/Account';
import QuestionMark from '../screens/InternalScreens/QuestionMark';
import QuickBuyNow from '../screens/InternalScreens/QuickBuyNow';
import PaymentScreen from '../screens/InternalScreens/PaymentScreen';
import TransactionSuccessScreen from '../screens/InternalScreens/TransactionSuccessScreen';
import Wishlist from '../DrawerNavigation/Drawer Items/Wishlist';
import Notification from '../DrawerNavigation/Drawer Items/Notification';
import SavingPlan from '../DrawerNavigation/Drawer Items/SavingPlan';
import Collection from '../DrawerNavigation/Drawer Items/Collection';
import CustomOrders from '../DrawerNavigation/Drawer Items/CustomOrders';
import BankDetails from '../DrawerNavigation/Drawer Items/BankDetails';
import ReferFriend from '../DrawerNavigation/Drawer Items/ReferFriend';
import AboutUs from '../DrawerNavigation/Drawer Items/AboutUs';
import PrivacyPolicy from '../DrawerNavigation/Drawer Items/PrivacyPolicy';
import TermsConditions from '../DrawerNavigation/Drawer Items/TermsConditions';
import OurCollectionScreen from '../Bottom Navigation/ShopAds/OurCollectionScreen';
import CustomOrdersScreen from '../Bottom Navigation/ShopAds/CustomOrdersScreen';
import SwarnBachatYojnaScreen from '../Bottom Navigation/ShopAds/SwarnBachatYojnaScreen';
import ProductDetails from '../Bottom Navigation/ShopAds/ProductDetails';
import GoldBanglesScreen from '../Bottom Navigation/NewArrivals/GoldBanglesScreen';
import NecklaceScreen from '../Bottom Navigation/NewArrivals/NecklaceScreen';
import SavingsQuestionMark from '../screens/InternalScreens/SavingsQuestionMark';
import SavingsCustomizePlan from '../Bottom Navigation/SavingsPlan/SavingsCustomizePlan';
import SavingsBuyNow from '../Bottom Navigation/SavingsPlan/SavingsBuyNow';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpVerification"
          component={OtpVerification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MPIN"
          component={MPIN}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MPINConfirm"
          component={MPINConfirm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyTijori"
          component={MyTijori}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SavingsPlan"
          component={SavingsPlan}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QuestionMark"
          component={QuestionMark}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QuickBuyNow"
          component={QuickBuyNow}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Wishlist"
          component={Wishlist}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SavingPlan"
          component={SavingPlan}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Collection"
          component={Collection}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CustomOrders"
          component={CustomOrders}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BankDetails"
          component={BankDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReferFriend"
          component={ReferFriend}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TermsConditions"
          component={TermsConditions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TransactionSuccessScreen"
          component={TransactionSuccessScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OurCollectionScreen"
          component={OurCollectionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CustomOrdersScreen"
          component={CustomOrdersScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SwarnBachatYojnaScreen"
          component={SwarnBachatYojnaScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GoldBanglesScreen"
          component={GoldBanglesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NecklaceScreen"
          component={NecklaceScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SavingsQuestionMark"
          component={SavingsQuestionMark}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SavingsCustomizePlan"
          component={SavingsCustomizePlan}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SavingsBuyNow"
          component={SavingsBuyNow}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
