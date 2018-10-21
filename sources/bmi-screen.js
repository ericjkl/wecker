import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, ActivityIndicator, Button, TextInput, Picker, Image } from 'react-native';
import styles from './styles';

export default class BMI extends React.Component {
  state = {
    isLoadingComplete: false,
    login: false,
    gewicht: '',
    groesse: '',
    bmi: null,
    notification: null,
    bgColorNotification: '#FFF',
    imageStatus: false,
  };

  eingabeGewicht = (val) => {
    this.setState({
      gewicht: val,
    })
  }
  Loschen = () => {
    this.setState({
      isLoadingComplete: false,
      login: false,
      gewicht: '',
      groesse: '',
      bmi: null,
      notification: null,
      bgColorNotification: '#FFF',
      imageStatus: false,

    })
}

  eingabeGroesse = (val) => {
    this.setState({
      groesse: val,
    })
  }

  berechnen = () => {
    let h = parseInt(this.state.groesse)/100;
    let b = parseInt(this.state.gewicht);
    let bmi = Math.round(b / (h*h));
    console.log(b,h,bmi);
    this.setState({bmi: bmi})
    switch (true) {
      case (bmi < 18):
      this.setState({
        notification: 'Sie haben Untergewicht.',
        bgColorNotification: 'red',
        imageStatus: false,
      })
      break;
      case (18<=bmi && 25>=bmi):
      this.setState({
        notification: 'Sie haben Normalgewicht.',
        bgColorNotification: '#8cff66',
        imageStatus: false,
      })
      break;
      case (25 < bmi && 30 >= bmi):
      this.setState({
        notification: 'Sie haben Übergewicht. Mehr Rettich!',
        bgColorNotification: '#ff8c66',        
        imageStatus: true,
      })
      break;
      case (bmi > 30):
      this.setState({
        notification: 'Sie haben Adipositas.',
        bgColorNotification: '#ff8c66',     
        imageStatus: true,
      })
      break;
      default:
      this.setState({
        notification: 'Fehler',
        bgColorNotification: '#FFF',
        imageStatus: false,
      })
    }
    this.setState({
      bmiOut: 'Ihr BMI beträgt '+bmi+'.',
    })
  }

  render() {
    return <View style={styles.container}>
      <Text style={styles.headertext}>BMI-Rechner</Text>
      <View style={[styles.inputContainer, styles.bmiContainer]}>
        <Text style={styles.inputText}>Größe (cm):</Text>
        <TextInput onChangeText={this.eingabeGroesse} value={this.state.groesse} style={styles.inputText}></TextInput>
        <Text style={styles.inputText}>Gewicht (kg):</Text>
        <TextInput onChangeText={this.eingabeGewicht} value={this.state.gewicht} style={styles.inputText}></TextInput>
      </View>
      <Button onPress={this.berechnen} title="BMI berechnen"/>
      <View style={styles.notification}>
        <Text style={styles.outputText}>{this.state.bmiOut}</Text>
      </View>
      <View style={[styles.outputContainer, {backgroundColor: this.state.bgColorNotification}, styles.notification]}>
        <Text style={styles.outputText}>{this.state.notification}</Text>
        {this.state.imageStatus ? <Image source={require('./images/salat.jpg')} style={styles.notificationImage}/> : null}
        <Button
          onPress={this.Loschen}
          title="Reset"
          style={styles.Button}
          />
      </View>
    </View>
  }    
}