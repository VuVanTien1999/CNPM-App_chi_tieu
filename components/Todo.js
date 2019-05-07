import React from "react";
import { TouchableHighlight, View, Text } from "react-native";

export default class Todo extends React.PureComponent {
  // toggle a todo as completed or not via update()

  render() {
    return (

        <View
          style={{
            flex: 1,
            height: 48,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor:'red',
          }}
        >
          <View style={{ flex: 4 }}>
            <Text>{this.props.purpose}</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text>{this.props.amount}</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text>hello</Text>
          </View>
        </View>


    );
  }
}