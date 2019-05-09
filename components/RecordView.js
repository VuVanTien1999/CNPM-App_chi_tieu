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
            firebase.firestore().collection('SPRecordList')
            .doc(this.props.parentFlatList.props.navigation.getParam('itemId', 'noId'))
            .collection('SPRecord')
            .doc(this.props.item.id).delete();
            console.log(this.props.item.id);
            console.log(this.props.parentFlatList.props.navigation.getParam('itemId', 'noId'));
            //alert('Press Remove button')
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
    //this.ref = firebase.firestore().collection("todos");
    //this.ref = firebase.firestore().collection("SPRecordList")
    //            .doc(this.props.SPRecord_id).collection('SPRecord'); 

    this.state = {
      deleteRowKey: null,

      // for firestore
      loading: true,
      todoTask: [],

      // for Button
      start_day_text: 'Start day',
      end_day_text: 'End day',
      start_day_state: null,
      end_day_state: null,

      // for header
      record_name:'',
    };

    this._onPressAdd = this._onPressAdd.bind(this);
    this._onPressCalendar = this._onPressCalendar.bind(this);
    this._onPressCalendar_endDay = this._onPressCalendar_endDay.bind(this);
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
      console.log('category_name: $(category_name)');

    });
    this.setState({
        todoTask: todos,
        loading: false
      });
  }

  componentDidMount() {
    // firestore
    var db_ref_record = firebase.firestore().collection('SPRecordList')
            .doc(this.props.navigation.getParam('itemId', 'noId'))
            .collection('SPRecord');

    this.unsubscribe = db_ref_record.onSnapshot(this.onCollectionUpdate);
    this.setState({record_name: this.props.navigation.getParam('item', '').name});
    var db_ref_list = firebase.firestore().collection('SPRecordList')
            .doc(this.props.navigation.getParam('itemId', 'noId'));
            
    db_ref_list.get().then((doc) => {
      if (doc.exists) {
        //console.log(doc.data().start_day);
        if (doc.data().start_day.dateString != null){
          var start_day_str_db = doc.data().start_day.day
          +'-'+doc.data().start_day.month+'-'+doc.data().start_day.year;
          this.setState({
            start_day_text: start_day_str_db,
            start_day_state: doc.data().start_day
          })
        }
        if (doc.data().end_day.dateString != null){
          var end_day_str_db = doc.data().end_day.day
          +'-'+doc.data().end_day.month+'-'+doc.data().end_day.year;
          this.setState({
            end_day_text: end_day_str_db,
            end_day_state: doc.data().end_day
          })
        }
      }
      else {
        console.log('No such document');
      }
    })

  }

  componentWillUnmount() {
    this.unsubscribe();
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
    this.refs.calendarModal_startDay.showCalendarModal(this, 'start');
    //this.setState({start_day_text: 'display day'});
  }
  _onPressCalendar_endDay() {
    //this.state.start_day_text=='Start day'?return():
    if (this.state.start_day_text=='Start day') {
      return(alert("Vui lòng nhập ngày bắt đầu trước"));
    }
    else {
    this.refs.calendarModal_endDay.showCalendarModal(this, 'end');
    }
    //this.setState({start_day_text: 'display day'});
  }

  render() {
    
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: this.state.record_name, style: { color: "#fff" } }}
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
            title= {this.state.start_day_text}
            onPress={this._onPressCalendar}
          />

          <Button
            large
            icon={{ name: "date-range", color: "yellow" }}
            title={this.state.end_day_text}
            onPress={this._onPressCalendar_endDay}
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

          <FlatList
            ref = {'flatList'}
            data={this.state.todoTask}
            renderItem={({ item, index }) => {
              return (
                <FirestoreItem 
                  item = {item} 
                  parentFlatList = {this}
                  index = {index}

                >

                </FirestoreItem>
              );
            }}
            keyExtractor={(item, index) => item.id}
          ></FlatList>


          <AddModal 
          ref={"addModal"} 
          parentFlatList={this} 
          SPRecord_id = {this.props.navigation.getParam('itemId', 'noId')}
          />

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
          <Button 
          type="outline" 
          title="Thoát" 
          containerStyle={{ width: 85 }} 
          onPress = {() => {
            // TODO_: condition for start_day < end_day
            
            if (this.state.start_day_state==null 
            || this.state.end_day_state==null) {
              //alert('miss day');
              // check firestore
              console.log(this.props.navigation.getParam('itemId', 'noId'));
            var db_ref = firebase.firestore().collection('SPRecordList')
            .doc(this.props.navigation.getParam('itemId', 'noId'))
            .collection('SPRecord');
            db_ref.get()
            .then((querySnapshot)=> {
              querySnapshot.forEach((doc)=>{
                console.log(doc.id, "=>", doc.data());
              })
            })
            
            // check firestore
              return;
            }
            else {
              if (this.state.start_day_state.timestamp 
              > this.state.end_day_state.timestamp)
              {
                console.log(this.state.start_day_state);
                console.log(this.state.end_day_state);
                alert('start day must before end day');
                return;
              }
            }
            this.props.navigation.navigate('MainScreen');
          }}

          />
        </View>

        <CalendarModal 
        ref={"calendarModal_startDay"} 
        parentFlatList={this} 
        SPRecord_id = {this.props.navigation.getParam('itemId','noId')}

        />
        <CalendarModal 
        ref={"calendarModal_endDay"} 
        parentFlatList={this} 
        SPRecord_id = {this.props.navigation.getParam('itemId','noId')}
        />
      </View>
    );
  }
}
