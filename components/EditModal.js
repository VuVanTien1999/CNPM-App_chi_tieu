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
export default class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editingCategory: '',
            editingAmount: '',
            editingDescription: '',
            
        }
    }
    showEditModal = (editingItem, flatlistItem_para) => {
        this.setState({
            key: editingItem.key,
            category: editingItem.category,
            amount: editingItem.amount,
            description: editingItem.description,
            flatlistItem: flatlistItem_para,
        })
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
                backdrop={false}
                onClosed={() => {
                    //alert("Modal closed");
                }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 0,
                }}>Chỉnh sửa chi tiêu</Text>

                <TextInput style={{
                    height: 40,
                    borderBottomColor: 'gray',
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 10,
                    marginBottom: 10,
                    borderBottomWidth: 1,
                }}
                    onChangeText={(text) => this.setState({ editingCategory: text })}
                    placeholder="Nhập hạng mục"
                    value={this.state.editingCategory}
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
                    onChangeText={(text) => this.setState({ editingAmount: text })}
                    placeholder="Nhập số tiền"
                    value={this.state.editingAmount}
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
                    onChangeText={(text) => this.setState({ editingDescription: text })}
                    placeholder="Nhập mô tả"
                    value={this.state.editingDescription}
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
                            if (this.state.editingCategory.length == 0 ||
                                this.state.editingAmount.length == 0 || 
                                this.state.editingDescription.length == 0) {
                                alert("Bạn chưa nhập đủ thông tin!!");
                                return;
                            }
                            //Update existing Food
                            var foundIndex = recordList.findIndex(item => this.state.key == item.key);
                            if (foundIndex < 0) {
                                return; //not found
                            }
                            recordList[foundIndex].category = this.state.editingCategory;
                            recordList[foundIndex].amount = this.state.editingAmount;
                            recordList[foundIndex].description = this.state.editingDescription;
                            //Refresh flatlist item
                            this.state.flatlistItem.refreshFlatListItem();
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