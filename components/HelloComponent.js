import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 21,
      weight: 70
    };
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ margin: 50 }}>Hello AnhTP!</Text>
        <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>My name is: {this.props.name}</Text>
        <Text style={{ color: 'red' }}>Im {this.state.age} years old </Text>
        <Text style={{ backgroundColor: 'cyan' }}>and my weight is {this.state.weight} kg</Text>
        <View style={{ margin: 50 }}>
          <Button style={{ backgroundColor: 'blue', color: 'white' }} title='NEXT YEAR' onPress={() => this.onPressNextYear()} />
        </View>
         <View style={{ margin: 50 }}>
          <Button style={{ backgroundColor: 'blue', color: 'white' }} title='PREVIOUS YEAR' onPress={() => this.onPressLoseWeight()} />
        </View>
      </View>
    );
  }
  onPressNextYear() {
    var curAge = this.state.age;
    var curWeight = this.state.weight;
    this.setState({
      age: curAge + 1,
      weight: curWeight + 2
    });
  }
  onPressLoseWeight() {
    var curWeight = this.state.weight;
    var curAge1 = this.state.age;
    this.setState({
        age: curAge1 - 1,
      weight: curWeight - 2
    });
  }
}
export default Hello;
