import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, ActivityIndicator, Button, TextInput, Picker } from 'react-native';
import styles from './styles';

export default class Calories extends React.Component {
  state = {
    isLoadingComplete: false,
    notification: null,
    sex: null,
    gewicht: '',
    groesse: '',
    alter: '',
    grundumsatz: null,
    notification: null,
    bgColorNotification: null,
  };
  Loschen = () => {
    this.setState({
      isLoadingComplete: false,
      notification: null,
      sex: null,
      gewicht: '',
      groesse: '',
      alter: '',
      grundumsatz: null,
      notification: null,
      bgColorNotification: null,

    })
}

  eingabeGewicht = (val) => {
    this.setState({
      gewicht: val,
    })
  }

  eingabeGroesse = (val) => {
    this.setState({
      groesse: val,
    })
  }

  eingabeAlter = (val) => {
    this.setState({
      alter: val,
    })
  }

  berechnenGrundumsatz = () => {
    let h = parseInt(this.state.groesse);
    let g = parseInt(this.state.gewicht);
    let a = parseInt(this.state.alter);
    // let s = this.state.sex;
    let u ;
    switch (this.state.sex) {
      case ("m"):
      u = (66,47 + (13,7 * g) + (5 * h) - (6,8 * a));
      this.setState({
        notification: 'Ihr Grundumsatz beträgt ' + u + ' kcal.',
        bgColorNotification: '#ccc',
      });
      break;
      case ("w"):
      u = (655,1 + (9,6 * g) + (1,8 * h) - (4,7 * a));
      this.setState({
        notification: 'Ihr Grundumsatz beträgt ' + u + ' kcal.',
        bgColorNotification: '#ccc',
      });
      // default:
      // this.setState({
      //   notification: 'Fehler: Bitte geben Sie alle Werte korrekt ein!',
      //   bgColorNotification: '#ff8c66'
      // });
      break;
    }
    this.setState({grundumsatz: u});
    console.log(h,g,a,this.state.sex,u);
  }

  render() {
    return <View style={styles.container}>
      <Text style={styles.headertext}>Kalorienrechner</Text>
      <View style={styles.inputContainer}>
      <Text style={styles.inputText}>Geschlecht:</Text>
      <Picker
        selectedValue={this.state.sex}
        style={[styles.inputPicker]}
        onValueChange={(itemValue, itemIndex) => this.setState({sex: itemValue})}>
        <Picker.Item label="Auswählen" value="" style={styles.inputText}/>
        <Picker.Item label="weiblich" value="w" style={styles.inputText}/>
        <Picker.Item label="männlich" value="m" style={styles.inputText}/>
      </Picker>
      <Text style={styles.inputText}>Größe (cm):</Text>
      <TextInput onChangeText={this.eingabeGroesse} value={this.state.groesse} style={styles.inputText}></TextInput>
      <Text style={styles.inputText}>Gewicht (kg):</Text>
      <TextInput onChangeText={this.eingabeGewicht} value={this.state.gewicht} style={styles.inputText}></TextInput>
      <Text style={styles.inputText}>Alter:</Text>
      <TextInput onChangeText={this.eingabeAlter} value={this.state.alter} style={styles.inputText}></TextInput>
      </View>
      <Button onPress={this.berechnenGrundumsatz} title="Grundumsatz berechnen"/>
      <View style={[styles.outputContainer, {backgroundColor: this.state.bgColorNotification}]}>
        <Text style={styles.outputText}>{this.state.notification}</Text>
        <Button
          onPress={this.Loschen}
          title="Reset"
          />
      </View>
    </View>
  }    
}