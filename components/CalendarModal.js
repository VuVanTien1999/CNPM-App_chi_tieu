import React, { Component } from 'react';
import {
    AppResistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput
} from 'react-native';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Row } from 'native-base';

var screen = Dimensions.get('window');
export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCategory: '',
            newAmount: '',
            newDescription: '',
        }
    }
    showCalendarModal = () => {
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

                    <Calendar>

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
                                alert('da bam Cancel')
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
                                alert('da bam Save')
                                //this.refs.myModal.close()
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