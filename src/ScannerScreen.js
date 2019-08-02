import React, { Component, Animated, Easing } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";
import AsyncStorage from "@react-native-community/async-storage";

class IconTextInput extends Component {
  render() {
    // destructuring pattern
    const { icon, hint, ispassword, onchange } = this.props;

    return (
      <View style={{ flexDirection: "row" }}>
        {/* <Icon name={icon} size={25} /> */}
        <TextInput
          onChangeText={onchange}
          secureTextEntry={ispassword}
          autoCapitalize="none"
          placeholder={hint}
          style={{ flex: 1, marginLeft: 16, color: "white" }}
        />
      </View>
    );
  }
}

export default class ScannerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      owner_name: ""
    };

    setTimeout(() => {
      this.setState({ isReady: true });
    }, 1500);
  }

  async componentDidMount() {
    this.state.owner_name = await AsyncStorage.getItem("owner_name");
  }

  async componentWillUnmount() {
    await AsyncStorage.setItem("owner_name", this.state.owner_name);
  }

  scanAgain = () => {
    // let callback = this.props.navigation.getParam("resultCallback")
    // callback("Hey, what's up Flutter?")
    // this.props.navigation.goBack()

    this.scanner.reactivate();
  };

  onSuccess(e) {
    const callback = this.props.navigation.getParam("resultCallback");
    callback(e.data);
    this.props.navigation.goBack();
  }

  showScanner = () => {
    return (
      <View style={{ flex: 0.8, width: "100%" }}>
        <QRCodeScanner
          // ref is represent QRCodeScanner
          ref={node => {
            this.scanner = node;
          }}
          showMarker
          style={{ flex: 1 }}
          // bind this mean "this" of global scope
          onRead={this.onSuccess.bind(this)}
          bottomContent={
            <TouchableOpacity
              onPress={this.scanAgain}
              style={styles.buttonTouchable}
            >
              {/* <View>
                <Text style={styles.buttonText}>Scan Barcode or QRCode</Text>
              </View> */}
              <View>


                <TextInput
                  value={this.state.owner_name}
                  onChangeText={text => this.setState({ owner_name: text })}
                  autoCapitalize="yes"
                  placeholder="Owner Name"
                  style={{ flex: 1, marginLeft: 16, color: "white" }}
                />
              </View>
            </TouchableOpacity>
          }
        />
      </View>
    );
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

        {this.state.isReady ? (
          this.showScanner()
        ) : (
          <Text
            style={{
              flex: 1,
              textAlignVertical: "center",
              color: "white",
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            Loading...
          </Text>
        )}
      </ImageBackground>
    );
  }
}

ScannerScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Scanner",
    headerStyle: {
      backgroundColor: "#3F51B5"
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: { color: "#fff" }
  };
};

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
    height: 50,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1872E4"
  },
  icon: { width: 30, height: 30, backgroundColor: "yellow", borderRadius: 15 }
});
