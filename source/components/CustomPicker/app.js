import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import PhoneInput from 'react-native-phone-input';
import ModalPickerImage from './ModalPickerImage';

class App extends Component {
  constructor() {
    super();

    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.state = {
      pickerData: null,
    };
  };

  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData(),
    });
    console.warn(this.phone.getPickerData());
  }

  onPressFlag() {
    this.myCountryPicker.open();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.iso2);
    console.log(this.phone);
    console.log(country);
  }

  render() {
    return (
      <View style={styles.container}>
        <PhoneInput
          flagStyle={{ height: 30, width: 50, borderRadius: 3 }}
          textStyle={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: 5, fontSize: 20, height: 40, width: '96%' }}
          onChangePhoneNumber={e => {
            console.log(e);
            console.log(this.phone);
          }}
          autoFormat={true}
          ref={(ref) => {
            this.phone = ref;
          }}
          onPressFlag={this.onPressFlag}
        />

        <TouchableOpacity onPress={() => {console.warn(this.phone.state.formattedNumber.replace(/ /g,'')); this.props.signInWithPhone(this.phone.state.formattedNumber.replace(/ /g,''))}} style={{ marginTop: 20, borderRadius: 5, marginRight: 10, borderWidth: 1, borderColor: 'lightgray', height: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center', width: 160 }}>
          <Text style={{ fontWeight: 'bold', color: 'gray' }}>SEND SMS CODE</Text>
        </TouchableOpacity>

        <ModalPickerImage
          ref={(ref) => {
            this.myCountryPicker = ref;
          }}
          data={this.state.pickerData}
          onChange={(country) => {
            this.selectCountry(country);
            console.log(country);
          }}
          cancelText="Cancel"
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    flexDirection: 'column'
  },
});

module.exports = App;
