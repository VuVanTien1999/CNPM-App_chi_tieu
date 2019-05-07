import React, { Component } from "react";
import { Text, View, FlatList, Alert, ToastAndroid, TouchableHighlight } from "react-native";
import {
  Header,
  ButtonGroup,
  Button,
  colors,
  ThemeProvider
} from "react-native-elements";
//import {icon} from 'react-native-vector-icons'
import recordList from "./RecordList";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import Swipeout from "react-native-swipeout";
import { makeEmptyAggregatedTestResult } from "@jest/test-result";
import { Toast } from "native-base";
//import console = require('console');
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import CalendarModal from "./CalendarModal";

import firebase from "react-native-firebase";
import Todo from "./Todo";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Require cycle:"]);

class RecordItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRowKey: null,
      numberOfRefresh: 0,
    };
  }

  

//   componentWillUnmount() {
//     // firestore
//     this.unsubscribe();
//   }

  refreshFlatListItem = () => {
    this.setState(prevState => {
      return {
        numberOfRefresh: prevState.numberOfRefresh + 1
      };
    });
  };
  render() {
    const swipeSettings = {
      autoClose: true,
      onClose: (secID, rowId, direction) => {
        if (this.state.activeRowKey != null) {
          this.setState({ activeRowKey: null });
        }
      },

      onOpen: (secID, rowId, direction) => {
        this.setState({ activeRowKey: this.props.item.key });
      },
      right: [
        {
          onPress: () => {
            //alert("Update");
            this.props.parentFlatList.refs.editModal.showEditModal(
              recordList[this.props.index],
              this
            );
          },
          text: "Chỉnh sửa",
          type: "primary"
        },
        {
          onPress: () => {
            const deletingRow = this.state.activeRowKey;
            Alert.alert(
              "Alert",
              "Are you sure you want to delete?",
              [
                {
                  text: "NO",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "YES",
                  onPress: () => {
                    recordList.splice(this.props.index, 1);
                    //Refresh FlatList
                    this.props.parentFlatList.refreshFlatList(deletingRow);
                  }
                }
              ],
              { cancelable: true }
            );
          },
          text: "Xóa",
          type: "delete"
        }
      ],
      rowId: this.props.index,
      sectionId: 1
    };
    return (
      <Swipeout {...swipeSettings}>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 2,
            borderLeftColor: "darkgreen",
            borderLeftWidth: 2,
            padding: 3,
            marginLeft: 1,
            marginTop: 2,
            backgroundColor: "lavenderblush"
          }}
        >
          <Text style={{ fontSize: 18 }}>
            {this.props.item.category} {this.props.item.amount}
          </Text>
          <Text style={{ fontSize: 18 }}>
            Mô tả: {this.props.item.description}
          </Text>
        </View>
      </Swipeout>
    );
  }
}

class FirestoreItem extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const swipeSettings_FI = {
      autoClose: true,
      onClose: () => {},
      
      onOpen: () => {},
      right: [
        {
          onPress: () => {
            //alert("Press Edit button");
            
            this.props.parentFlatList.refs.editModal.setState({item_id: this.props.item.id});
            this.props.parentFlatList.refs.editModal.showEditModal(
              this.props.item.id,
              this
            );
          },
          text: 'Chỉnh sửa',
          type: 'primary'
        },
        {
          onPress: () => {
            firebase.firestore().collection('todos').doc(this.props.item.id).delete();
            alert('Press Remove button')
          },
          text: 'Xóa',
          type: 'delete'
        }
      ],
      rowID: this.props.index,
      sectionId: 1
    };
    return (
      <Swipeout {...swipeSettings_FI}>
        <View style = {{
          borderBottomColor: "black",
            borderBottomWidth: 2,
            borderLeftColor: "darkgreen",
            borderLeftWidth: 2,
            padding: 3,
            marginLeft: 1,
            marginTop: 2,
            backgroundColor: "lavenderblush"
        }}>
        <Text style={{fontSize:18}}>
        Hạng mục: {this.props.item.category}
        </Text>
        <Text style={{fontSize:18}}>
        Mô tả: {this.props.item.description}
        </Text>
        <Text style={{fontSize:18}}>
        Số tiền: {this.props.item.amount}
        </Text>
        <Text style={{fontSize:18}}>
        Id: {this.props.item.id}
        </Text>
        </View>
      </Swipeout>
    )
  }
}

export default class RecordView extends Component {
  constructor(props) {
    super(props);

    // Firestore
    this.ref = firebase.firestore().collection("todos");

    this.state = {
      deleteRowKey: null,

      // for firestore
      loading: true,
      todoTask: []
    };

    this._onPressAdd = this._onPressAdd.bind(this);
    this._onPressCalendar = this._onPressCalendar.bind(this);
  }

  onCollectionUpdate = (querySnapshot) => {
    // firestore
    const todos = [];
    querySnapshot.forEach( (doc) => {
      //const { db_category, db_amount, db_description } = doc.data();

      todos.push({
        id: doc.id,
        category: doc.data().category,
        amount: doc.data().amount,
        description: doc.data().description
      });
      console.log('category_name: ${category_name}');
    });
    this.setState({
        todoTask: todos,
        loading: false
      });
  }

  componentDidMount() {
    // firestore
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    // this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {

    //   });
  }

  refreshFlatList = activeKey => {
    this.setState(prevState => {
      return {
        deleteRowKey: activeKey
      };
    });

    //this.setState({ deleteRowKey: activeKey });f

    //this.refs.flatList.scrollToItem(0);
    this.refs.flatList.scrollToEnd();
  };
  _onPressAdd() {
    //alert("Them");
    this.refs.addModal.showAddModal();
  }
  _onPressCalendar() {
    this.refs.calendarModal.showCalendarModal();
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "Ban ghi 1", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />

        <View
          style={{
            flexDirection: "row",
            margin: 5,
            justifyContent: "space-around"
          }}
        >
          <Button
            large
            icon={{ name: "date-range", color: "yellow" }}
            title="Start day"
            onPress={this._onPressCalendar}
          />

          <Button
            large
            icon={{ name: "date-range", color: "yellow" }}
            title="End day"
            onPress={this._onPressCalendar}
          />
        </View>

        <View
          style={{
            //flex:1,
            height: 340,
            marginTop: 10,
            backgroundColor: "gainsboro",
            borderColor: "black",
            borderWidth: 2,
            margin: 3
          }}
        >
          {/* <FlatList   //test firestore
                        ref={'flatList'}
                        data={recordList}
                        renderItem={({ item, index }) => {
                            return (
                                <RecordItemList
                                    item={item}
                                    index={index}
                                    parentFlatList={this}
                                >
                                </RecordItemList>
                            )
                        }
                        }
                    >
                    </FlatList>      */}

          <FlatList
            ref = {'flatList'}
            data={this.state.todoTask}
            renderItem={({ item, index }) => {
              return (
                // <View>
                // <Text style={{color: 'blue'}}>{item.category}</Text>
                // <Text style={{color:'red'}}>Hello</Text>
                // </View>
                <FirestoreItem 
                  item = {item} // writing
                  parentFlatList = {this}
                  index = {index}

                >

                </FirestoreItem>
              );
            }}
            keyExtractor={(item, index) => item.category}
          ></FlatList>


          <AddModal ref={"addModal"} parentFlatList={this} />

          <EditModal 
          ref={"editModal"} 
          parentFlatList={this} 
          item_id={'and hello'}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            borderColor: "orange",
            borderWidth: 3,
            margin: 3,
            padding: 3
          }}
        >
          <Text
            style={{
              fontSize: 20
            }}
          >
            Tổng cộng: 160.000 đ
          </Text>
        </View>

        {/* <ButtonGroup
                    buttons={buttons}
                    containerStyle={{ height: 50 }}
                    onPress={(value) => {
                        ToastAndroid.show(value.toString(), ToastAndroid.SHORT);
                    }}
                /> */}

        <View>
          <Button
            title="Thêm"
            //containerStyle={{ height: 65}}
            type="outline"
            //raised
            onPress={this._onPressAdd}
            containerStyle={{ margin: 5, borderWidth: 2, borderColor: "blue" }}
          />
        </View>

        <View
          style={{
            height: 60,
            flexDirection: "row",
            justifyContent: "flex-end",
            margin: 10
          }}
        >
          <Button title="Thoát" containerStyle={{ width: 85 }} />
        </View>

        <CalendarModal ref={"calendarModal"} parentFlatList={this} />
      </View>
    );
  }
}
