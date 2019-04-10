import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Header, ButtonGroup, Button, colors, ThemeProvider } from 'react-native-elements'
//import {icon} from 'react-native-vector-icons'
import recordList from './RecordList'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';


export default class Test extends Component {
    render() {
        return (
            <View>
                <Input
                    placeholder='BASIC INPUT'
                />

                <Input
                    placeholder='INPUT WITH ICON'
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                />

                <Input
                    placeholder='INPUT WITH CUSTOM ICON'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                />

                <Input
                    placeholder='INPUT WITH SHAKING EFFECT'
                    shake={true}
                />

                <Input
                    placeholder='INPUT WITH ERROR MESSAGE'
                    errorStyle={{ color: 'red' }}
                    errorMessage='ENTER A VALID ERROR HERE'
                />
            </View>
        )
    }

}