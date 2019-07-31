import React, { Component } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Image,
  ImageBackground,
  Button,
  Text,
  TextInput,
  Keyboard,
  Platform,
  TouchableOpacity,
  Icon
} from "react-native";
import RNFS from "react-native-fs";

export default class TabViewAsset extends Component {
  onClickClear = () => {
    Alert.alert('Delete File Successfully')
    this.unlink()
  };

  async unlink() {
    try {
      var savePath = RNFS.ExternalDirectoryPath + "/asset.txt";
      await RNFS.unlink(savePath);
    } catch (error) {
      if (error && ((error.message && error.message.indexOf('exist') >= 0) || error.code === 'ENOENT')) {
        // Probably { [Error: File does not exist] framesToPop: 1, code: 'EUNSPECIFIED' }
        // which unfortunately does not have a proper error code. Can be ignored.
      } else {
        throw error;
      }
    }
  }
  
  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./assets/img/gradient_bg.png")}
      >
        {/* authentication section */}
        <View
          style={{
            flexDirection: "column",
            alignItems: "stretch",
            backgroundColor: "#FFF3",
            marginTop: 20,
            marginLeft: 30,
            marginRight: 30,
            borderRadius: 10,
            padding: 16
          }}
        >
          {/* <View style={{ marginTop: 40 }}>
            <Button title="CLEAR" onPress={this.onClickLogin} />
          </View> */}
          <TouchableOpacity
            // style={{ marginTop: 16 }}
            // onPress={() => this.props.navigation.navigate("register")}
            onPress={this.onClickClear}
          >
            <Text style={{ textAlign: "center" }}>CLEAR</Text>
          </TouchableOpacity>

          
        </View>

        <View
          style={{
            flexDirection: "column",
            alignItems: "stretch",
            backgroundColor: "#FFF3",
            marginTop: 20,
            marginLeft: 30,
            marginRight: 30,
            borderRadius: 10,
            padding: 16
          }}
        >
          {/* <View style={{ marginTop: 40 }}>
            <Button title="CLEAR" onPress={this.onClickLogin} />
          </View> */}
          <TouchableOpacity
            // style={{ marginTop: 16 }}
            // onPress={() => this.props.navigation.navigate("register")}
            // onPress={this.onClickClear}
          >
            <Text style={{ textAlign: "center" }}>EXPORT</Text>
          </TouchableOpacity>

          
        </View>

      </ImageBackground>
    );
  }
}
