"use strict";

import React, { Component } from "react";

import {
  Text,
  Alert,
  StyleSheet,
  Image,
  ImageBackground,
  View,
  Button,
  TouchableOpacity
} from "react-native";
import RNFS from "react-native-fs";
import AsyncStorage from "@react-native-community/async-storage";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogButton,
  DialogFooter
} from "react-native-popup-dialog";

export default class TabBarcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner_name: "",
      dialogShow: false,
      visible: false,
      barcode: "",
      value_write:""
    };
  }

  async writeToFile() {
    let encoding = "ascii";
    let savePath = (await RNFS.ExternalDirectoryPath) + "/asset.txt";
    let fileCheck = await RNFS.exists(savePath);
    this.state.owner_name = await AsyncStorage.getItem("owner_name");
    this.state.value_write = this.state.value_write + "|" + this.state.owner_name + "\r\n";
    this.state.visible = false;
    if (fileCheck) {
      console.log("append file ");
      RNFS.appendFile(savePath, this.state.value_write, encoding)
        .then(res => {
          console.log("append file success");
          this.props.navigation.navigate("scanner", {
            resultCallback: this.onResult
          });
        })
        .catch(err => {
          Alert.alert("write file failed");
        });
    } else {
      console.log("new file success");
      RNFS.writeFile(savePath, this.state.value_write, encoding)
        .then(res => {
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
    this.state.visible = true;
    this.state.barcode = result;
    let date = new Date().getDate(); //Current Date
    let month = new Date().getMonth() + 1; //Current Month
    let year = new Date().getFullYear(); //Current Year
    let hours = new Date().getHours(); //Current Hours
    let min = new Date().getMinutes(); //Current Minutes
    let sec = new Date().getSeconds(); //Current Seconds
    let fullDate =
      date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec;
    result = result + "|" + fullDate;
    this.state.value_write = result;
    this.setState({ visible: true });
  };

  onClickScan = () => {
    this.props.navigation.navigate("scanner", {
      resultCallback: this.onResult
    });
  };

  showDialog = () => {
    return (
      <View style={styles.container}>
        <Dialog
          visible={this.state.visible}
          dialogTitle={<DialogTitle title="Please Confirm this code" />}
          footer={
            <DialogFooter>
              <DialogButton
                style={styles.container}
                text="Cancel"
                onPress={() => {this.state.visible=false}}
              />
              <DialogButton
                style={styles.container}
                text="OK"
                onPress={() => {
                  this.writeToFile().then(
                    
                  );
                }}
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text>{this.state.barcode}</Text>
          </DialogContent>
        </Dialog>
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
        {this.showDialog()}
        <View style={styles.container}>
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
        </View>
      </ImageBackground>
    );
  }
}

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.containerDialog}>
//         <DialogButton
//           text="Default Animation Dialog"
//           onPress={this.showDialog}
//         />

//         <PopupDialog
//           // visible={this.state.visible}
//           ref={popupDialog => {
//             this.popupDialog = popupDialog;
//           }}
//           dialogAnimation={slideAnimation}
//           footer={
//             <DialogFooter>
//               <DialogButton text="CANCEL" onPress={() => {}} />
//               <DialogButton text="OK" onPress={() => {}} />
//             </DialogFooter>
//           }
//         >
//           <View>
//             <Text>Hello</Text>
//           </View>
//         </PopupDialog>
//       </View>
//     </View>
//   );
// }

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
  },
  containerDialog: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  dialogContentView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
