"use strict";

import React, { Component } from "react";

import {
  Alert,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity
} from "react-native";
import Barcode from "react-native-barcode-builder";
import RNFS from "react-native-fs";
//  import { ifIphoneX } from 'react-native-iphone-x-helper'

export default class TabBarcode extends Component {

  async checkFileExists(result) {

    var encoding = "ascii";
    var savePath = (await RNFS.ExternalDirectoryPath) + "/asset.txt";
    var fileCheck = await RNFS.exists(savePath);
    // console.log("fileCheck ", fileCheck);

    if (fileCheck) {
      console.log("append file ");
      RNFS.appendFile(savePath, result, encoding)
      .then(res => {
        console.log("append file success");
        this.props.navigation.navigate("scanner", {
          resultCallback: this.onResult
        });
      })
      .catch(err => {
        Alert.alert("write file failed");
      });
    }else{
      
      console.log("new file success");
      RNFS.writeFile(savePath, result, encoding)
      .then(res => {
        // Alert.alert("new file success");
        this.props.navigation.navigate("scanner", {
          resultCallback: this.onResult
        });
      })
      .catch(err => {
        Alert.alert("write file failed");
      });
    }
    return fileCheck;

  }

  onResult = result => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    Alert.alert("Barcode : " + result);
    var fullDate = date + "/" + month + "/" + year+" "+hours+":"+min+":"+sec;
    result = result + "|" + fullDate + "\r\n";
    // var file = RNFS.readFile(savePath, encoding)
    this.checkFileExists(result).then();

  };

  onClickScan = () => {
    this.props.navigation.navigate("scanner", {
      resultCallback: this.onResult
    });
  };

  render() {
    return (
      <ImageBackground
        source={require("./assets/img/gradient_bg.png")}
        resizeMode={"stretch"}
        style={styles.container}
      >
        {/* <Image
              resizeMode={"contain"}
              style={{ width: "100%", height: 120, marginTop: 10, padding: 0 }}
              source={require("./assets/img/header_react_native.png")}
            /> */}
        <TouchableOpacity
          style={{
            flex: 1,
            marginBottom: 16,
            alignSelf: "center",
            justifyContent: "center"
          }}
          onPress={this.onClickScan}
        >
          <Image
            source={require("./assets/img/scan_button.png")}
            style={{ width: 100, height: 100 }}
          />
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777"
  },
  buttonText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#FFF"
  },
  buttonTouchable: {
    flex: 1,
    height: 100,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fa4a4d"
  }
});
