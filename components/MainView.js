import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements'
import flatListData from './FlatListData'

class FlatListItem extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.index%2 === 0 ? 'gainsboro' : 'lightgreen',
                borderBottomColor: 'green',
                borderBottomWidth: 3,
            }}>

                <Text style={{
                    fontSize: 20,
                    padding: 5,
                }}>{this.props.item.name}</Text>
                
            </View>
        );
    }
}
export default class MainView extends Component {
    render(){
        const buttons = ['Xóa', 'Xem', 'Tạo bản ghi mới']
        return(
            <View style= {{flex:1 }}>
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
                

                <View style= {{
                    flex:1, 
                    marginTop: 10, 
                    backgroundColor: 'clightcyan',
                    borderColor: 'black', 
                    borderWidth:2,
                    margin: 3,
                    }}>
                <FlatList
                    data = {flatListData}
                    renderItem={({item, index})=>{
                        
                        return (
                            <FlatListItem item={item} index={index}>

                            </FlatListItem>
                        )
                    }
                    }
                >
                </FlatList>
                </View>
                
                <ButtonGroup
                buttons={buttons}
                containerStyle={{height: 60}}
                />
                
                <View style={{
                    height: 60, 
                    flexDirection: 'row', 
                    justifyContent: 'flex-end',
                    margin: 10,
                    
                    }}>
                <Button
                title='Thoát'
                containerStyle={{width:85}}
                />
                
                </View>



                
                
                

                

            </View>
        );
    }
}