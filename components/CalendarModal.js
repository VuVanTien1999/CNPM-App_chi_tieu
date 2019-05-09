import React, { Component } from 'react';
import {
    AppResistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput, DatePickerAndroid   
} from 'react-native';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Row } from 'native-base';
import firebase from 'react-native-firebase';
//import console = require('console');

var screen = Dimensions.get('window');
export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // newCategory: '',
            // newAmount: '',
            // newDescription: '',

            selectedDate: null,
            this_recordView: null,
            day_s:'',
            month_s:'',
            year_s: '',
            button_s: '',
            startDay_s: null,
            start_day_min: null,
            endDay_s: null,
        }
        
    }


    showCalendarModal = (ref_recordView, button_state) => {
        this.setState({this_recordView: ref_recordView})
        this.setState({button_s: button_state})
        if (button_state == 'end') {
            this.setState({start_day_min: ref_recordView.state.start_day_state});
        }
        else {
            this.setState({start_day_min: null})
        }
        this.refs.myModal.open();
    }
    render() {

        return (
            <Modal
                ref={'myModal'}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 20,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 400, //280
                }}
                position='center'
                backdrop={true}
                backdropPressToClose={false}
                swipeToClose={true}
                onClosed={() => {
                    //alert("Modal closed");
                }}
            >

                <View style={{
                    backgroundColor: 'lightcoral',
                    height: 400,
                }}>

                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 0,
                        color: 'white',
                    }}>Chọn ngày
                    </Text>

                    <Calendar
                    markedDates={{[this.state.selectedDate]:{selected: true},}}
                    onDayPress={(day) => {
                        this.setState({
                            selectedDate: day.dateString,
                            day_s: day.day,
                            month_s: day.month,
                            year_s: day.year
                            });
                        if (this.state.button_s=='start') {
                            this.setState({startDay_s: day});
                        }
                        if (this.state.button_s=='end') {
                            this.setState({endDay_s: day});
                        }
                        
                        }}
                    minDate={this.state.start_day_min}
                    >

                    </Calendar>
                    

                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Button
                        style={{ fontSize: 18, color: 'white' }}
                        containerStyle={{
                            padding: 5,
                            //height: 40,
                            borderRadius: 6,
                            backgroundColor: 'limegreen',
                            margin: 5,
                            marginTop: 15,
                            width: 70,

                        }}
                        onPress={
                            () => {
                                // alert('da bam Cancel')
                                this.refs.myModal.close()
                            }
                        }
                    >
                        Cancel
                    </Button>
                    

                    <Button
                        style={{ fontSize: 18, color: 'white' }}
                        containerStyle={{
                            padding: 5,
                            //height: 40,
                            borderRadius: 6,
                            backgroundColor: 'limegreen',
                            margin: 5,
                            marginTop: 15,
                            width: 70,

                        }}
                        onPress={
                            () => {
                                //alert(this.state.selectedDate)
                                
                                // firebase.firestore().collection('todos').add({
                                //     start_date: this.state.selectedDate,
                                // });

                                // this.state.button_s=='start'?
                                // this.state.this_recordView.setState({
                                //     start_day_text: (this.state.day_s+'-'+this.state.month_s+'-'+this.state.year_s)
                                //     })

                                //     :this.state.this_recordView.setState({
                                //     end_day_text: (this.state.day_s+'-'+this.state.month_s+'-'+this.state.year_s)
                                //     });
                                if (this.state.button_s=='start') {
                                    
                                    // this.state.this_recordView.setState({
                                    this.props.parentFlatList.setState({
                                    start_day_text: (this.state.day_s+'-'+this.state.month_s+'-'+this.state.year_s),
                                    start_day_state: this.state.startDay_s
                                    });

                                    firebase.firestore().collection('SPRecordList').doc(this.props.SPRecord_id).update({
                                        start_day: this.state.startDay_s
                                    })
                                  
                                } 
                                if (this.state.button_s == 'end') {
                                    //this.state.this_recordView.setState({
                                    this.props.parentFlatList.setState({
                                    end_day_text: (this.state.day_s+'-'+this.state.month_s+'-'+this.state.year_s),
                                    end_day_state: this.state.endDay_s
                                    })

                                    firebase.firestore().collection('SPRecordList').doc(this.props.SPRecord_id).update({
                                        end_day: this.state.endDay_s
                                    })
                                } 
                                this.refs.myModal.close()
                            }
                        }
                    >
                        Save
                    </Button>

                    </View>

                </View>

            </Modal>
        )
    }
}