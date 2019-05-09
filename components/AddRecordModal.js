import React, { Component } from "react";
import {
  AppResistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Platform,
  TouchableHighlight,
  Dimensions,
  TextInput
} from "react-native";
import Button from "react-native-button";
import Modal from "react-native-modalbox";
import recordList from "./RecordList";
import firebase from "react-native-firebase";

var screen = Dimensions.get("window");
export default class AddRecordModal extends Component {
  constructor(props) {
    super(props);
    // Add firestore
    this.ref = firebase.firestore().collection("SPRecordList");
    this.unsubcribe = null;

    this.state = {
      record_name: "",
      newAmount: "",
      newDescription: "",
      //selectedDate: '2019-05-08'
    };
  }
  showAddRecordModal = () => {
    this.refs.currentModal.open();
  };
  generateKey = numOfCharacters => {
    return require("random-string")({ length: numOfCharacters });
  };

  render() {
    return (
      <Modal
        ref={"currentModal"}
        style={{
          justifyContent: "center",
          borderRadius: Platform.OS === "ios" ? 30 : 20,
          shadowRadius: 10,
          width: screen.width - 100,
          height: 280
        }}
        position="center"
        backdrop={true}
        onClosed={() => {
          //alert("Modal closed");
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 0
          }}
        >
          Nhập tên bản ghi
        </Text>

        <TextInput
          style={{
            height: 40,
            borderBottomColor: "gray",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 10,
            marginBottom: 10,
            borderBottomWidth: 1
          }}
          onChangeText={text => this.setState({ record_name: text })}
          placeholder=""
          value={this.state.record_name}
        />

        <Button
          style={{ fontSize: 18, color: "white" }}
          containerStyle={{
            padding: 8,
            marginLeft: 70,
            marginRight: 70,
            height: 40,
            borderRadius: 6,
            backgroundColor: "lightgreen"
          }}
          onPress={() => {
            if (
              this.state.record_name.length == 0 
            ) {
              alert("Bạn chưa nhập tên bản ghi\nKéo xuống để Cancel");
              return;
            }
            
            // firestore
            this.ref.add({
              name: this.state.record_name
            });
            this.refs.currentModal.close();
          }}
        >
          Save
        </Button>
      </Modal>
    );
  }
}
