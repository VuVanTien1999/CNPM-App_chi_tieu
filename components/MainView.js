import React, { Component } from 'react';
import { Text, View, FlatList, Alert } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import flatListData from './FlatListData';
import Swipeout from 'react-native-swipeout';

class FlatListItem extends Component {
    render() {
        const swipeSettings = {
            autoClose: true,
            onClose: () => {

            },
            onOpen: () => {

            },
            right: [
                {
                    onPress: () => {
                        alert("Đã nhấn Xem");
                    },
                    text: 'Xem', type: 'primary',
                },
                {
                    onPress: () => {
                        alert("Đã nhấn Xóa");
                    },
                    text: 'Xóa', type: 'delete',
                }
            ],
        }
        return (
            <Swipeout {...swipeSettings}>
                <View style={{
                    flex: 1,
                    backgroundColor: this.props.index % 2 === 0 ? 'gainsboro' : 'lightgreen',
                    borderBottomColor: 'green',
                    borderBottomWidth: 3,
                    borderLeftColor: 'green',
                    borderLeftWidth: 3,
                    padding: 5,
                    marginTop: 2,
                }}>

                    <Text style={{
                        fontSize: 23,
                    }}>{this.props.item.name}</Text>

                </View>
            </Swipeout>
        );
    }
}
export default class MainView extends Component {
    render() {
        const buttons = ['Xóa', 'Xem', 'Tạo bản ghi mới']
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <Text style={{
                        backgroundColor: 'yellow',
                        fontSize: 30,
                        padding: 10,
                        borderBottomColor: 'gold',
                        borderBottomWidth: 3,
                        borderLeftColor: 'gold',
                        borderLeftWidth: 5,
                    }}>
                        Tạo kế hoạch chi tiêu
                    </Text>
                </View>


                <View style={{
                    flex: 1,
                    marginTop: 10,
                    backgroundColor: 'clightcyan',
                    borderColor: 'black',
                    borderWidth: 2,
                    margin: 3,
                }}>
                    <FlatList
                        data={flatListData}
                        renderItem={({ item, index }) => {

                            return (
                                <FlatListItem item={item} index={index}>

                                </FlatListItem>
                            )
                        }
                        }
                    >
                    </FlatList>
                </View>

                {/* <ButtonGroup
                buttons={buttons}
                containerStyle={{height: 60}}
                /> */}

                {/* <View style={{
                    height: 60, 
                    flexDirection: 'row', 
                    justifyContent: 'flex-end',
                    margin: 10,
                    
                    }}>
                <Button
                title='Thoát'
                containerStyle={{width:85}}
                />
                </View> */}


                <View style={{ margin: 3 }}>
                    <Button
                        title='Tạo bản ghi mới'
                        containerStyle={{ borderWidth: 1}}
                        type='outline'
                        raised
                        onPress={this._onPressAdd}
                    />
                </View>

                <View style={{
                    height: 60,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    margin: 10,

                }}>
                    <Button
                        title='Thoát'
                        containerStyle={{ width: 85 }}
                    />

                </View>







            </View>
        );
    }
}