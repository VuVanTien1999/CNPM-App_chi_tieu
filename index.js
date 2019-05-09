/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import {name as appName} from './app.json';
import HelloWorld from './components/helloworld'
import MainView from './components/MainView'
import RecordView from './components/RecordView'
import Test from './components/Test.js'
import { StackNavigator } from 'react-navigation';
import {MainViewScreen, RecordViewScreen} from './ScreenNames';
import { createStackNavigator, createAppContainer } from "react-navigation";


const AppNavigator  = createStackNavigator(
    {
        MainScreen: MainView,
        RecordScreen: RecordView,
      },
      {
        initialRouteName: "MainScreen",
        defaultNavigationOptions: {},
        headerMode: "none"
      }
)

var AppContainer = createAppContainer(AppNavigator);


AppRegistry.registerComponent(appName, () => AppContainer);
