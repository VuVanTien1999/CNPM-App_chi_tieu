import React, { Component } from 'react';
import {
    AppResistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput
} from 'react-native';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox'
import recordList from './RecordList';

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
    showAddModal = () => {
        this.refs.myModal.open();
    }
    generateKey = (numOfCharacters) => {
        return require('random-string')({ length: numOfCharacters });
    }
    render() {
        return (
            <Modal
                ref={'myModal'}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 20,
                    shadowRadius: 10,
                    width: screen.width - 100,
                    height: 280.
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    //alert("Modal closed");
                }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 0,
                }}>Chi tiêu mới</Text>

                <TextInput style={{
                    height: 40,
                    borderBottomColor: 'gray',
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 10,
                    marginBottom: 10,
                    borderBottomWidth: 1,
                }}
                    onChangeText={(text) => this.setState({ newCategory: text })}
                    placeholder="Nhập hạng mục"
                    value={this.state.newCategory}
                />

                <TextInput style={{
                    height: 40,
                    borderBottomColor: 'gray',
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 10,
                    marginBottom: 10,
                    borderBottomWidth: 1,
                }}
                    onChangeText={(text) => this.setState({ newAmount: text })}
                    placeholder="Nhập số tiền"
                    value={this.state.newAmount}
                />

                <TextInput style={{
                    height: 40,
                    borderBottomColor: 'gray',
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 10,
                    marginBottom: 10,
                    borderBottomWidth: 1,
                }}
                    onChangeText={(text) => this.setState({ newDescription: text })}
                    placeholder="Nhập mô tả"
                    value={this.state.newDescription}
                />

                <Button
                    style={{ fontSize: 18, color: 'white' }}
                    containerStyle={{
                        padding: 8,
                        marginLeft: 70,
                        marginRight: 70,
                        height: 40,
                        borderRadius: 6,
                        backgroundColor: 'lightgreen'
                    }}
                    onPress={
                        () => {
                            if (this.state.newCategory.length == 0 ||
                                this.state.newAmount.length == 0 || 
                                this.state.newDescription.length == 0) {
                                alert("Bạn chưa nhập đủ thông tin!!");
                                return;
                            }
                            const newKey = this.generateKey(24);
                            const newItem = {
                                key: newKey,
                                category: this.state.newCategory,
                                amount: this.state.newAmount,
                                description: this.state.newDescription,
                            };
                            recordList.push(newItem);
                            this.props.parentFlatList.refreshFlatList(newKey);
                            
                            this.refs.myModal.close();
                        }
                    }
                >
                    Save
                </Button>
            </Modal>
        );
    }
}