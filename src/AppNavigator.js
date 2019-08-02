import React, { Component } from 'react'
import {
    View,
    Alert,
    StyleSheet,
    AsyncStorage,
    Image,
    ImageBackground,
    Button,
    Text,
    TextInput,
    Keyboard,
    Platform,
    TouchableOpacity
  } from "react-native";

  import TabBarcode from "./TabBarcode";
  import TabViewAsset from "./TabViewAsset";
  import ScannerScreen from './ScannerScreen'

  import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer
  
  } from "react-navigation";

  
  const tab1_Option = {
    tabBarLabel: "Barcode",
    tabBarIcon: ({ focused }) => (
      <Image
        style={{
          height: 28,
          width: 28
        }}
        resizeMode="contain"
        source={
          focused
          ? require("./assets/img/ic_barcode_press.png")
          : require("./assets/img/ic_barcode_normal.png")
        }
      />
    )
  }

  const tab2_Option = {
    tabBarLabel: "File Manager",
    tabBarIcon: ({ focused }) => (
      <Image
        style={{
          height: 28,
          width: 28
        }}
        resizeMode="contain"
        source={
          focused
            ? require("./assets/img/ic_qr_code_press.png")
            : require("./assets/img/ic_qr_code_normal.png")
        }
      />
    )
  }

  const TabStack = createBottomTabNavigator({
    tab1: {screen: TabBarcode, navigationOptions: tab1_Option},
    tab2: {screen: TabViewAsset, navigationOptions: tab2_Option}
  }, {
    initialRouteName: "tab1"
  })

  const AppStack = createStackNavigator({
    tab: {screen: TabStack, navigationOptions: {header: null}},
    scanner: {screen: ScannerScreen}
  },{
    initialRouteName:"tab"
  })

  export default createAppContainer(AppStack)

