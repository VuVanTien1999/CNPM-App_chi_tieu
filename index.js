/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import HelloWorld from './components/helloworld'
import MainView from './components/MainView'
import RecordView from './components/RecordView'
import Test from './components/Test.js'

AppRegistry.registerComponent(appName, () => RecordView);
