import React from 'react';
import styles from './styles';
import { Accelerometer } from "expo";
import { Platform, StatusBar, StyleSheet, View, Text, ActivityIndicator, Button, TextInput, Picker } from 'react-native';


const Value = ({name, value}) => (
    <View style={styles.valueContainer}>
      <Text style={styles.valueName}>{name}:</Text>
      <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
    </View>
  )

export default class BMI extends React.Component {
    state = {
        x: 0,
        y: 0,
        z: 0,
        mesurementData:[],
        notificationS: null,
        notificationT: null,
        time: null,
        distance: null,
        indicatorStatus: false,
        measureStatus: false,
      }

    constructor(props) {
        super(props);
        Accelerometer.setUpdateInterval(10);
      }
      Loschen = () => {
        this.setState({
          x: 0,
          y: 0,
          z: 0,
          mesurementData:[],
          notificationS: null,
          notificationT: null,
          time: null,
          distance: null,
          indicatorStatus: false,
          measureStatus: false,

        })
    }
      measureStart = (val) => {
        this.setState ({
          measurementData: [],
          indicatorStatus: true,
          measureStatus: true,
        }, () => {
          console.log('accelerometer');
          Accelerometer.setUpdateInterval(10);
          Accelerometer.addListener(accelerometerData => {
            let foo = this.state.measurementData;
            foo.push({
              x: accelerometerData.x*9.81, 
              y: accelerometerData.y*9.81, 
              z: accelerometerData.z*9.81-9.81,
            })
            this.setState({ measurementData: foo}); 
          });
        })
        
      }
      
      measureStop = (val) => {

        Accelerometer.removeAllListeners()

        let data = this.state.measurementData;       
        let filtered = 0;

        for (let g = 0; g < data.length; g++) {
          if ((data[g].x + data[g].y + data[g].z ) < -8) {
            filtered += 1;
          }          
        }

        let fm = filtered;
        let t = fm * 0.01;
        let s = (9.81/2)*(t*t);
      
        this.setState({
          notificationS: 'Gemessene Strecke: ' + s.toFixed(2) + 'm',
          notificationT: '(in ' + t + ' s)',
          indicatorStatus: false,
          mesureStatus: false,
        })
      }

      render() {
        console.log(this.state);
        return (
            <View style={styles.container}>
            <Text style={styles.headertext}>Höhenmessung</Text>
                <View style={[styles.inputContainer, {maxHeight: 350}]}>
                  <Text style={styles.inputText}>Halten Sie Ihr Smartphone mit dem Display nach oben. Drücken Sie den Start-Button und lassen Sie es fallen. Drücken Sie dann den Stopp-Button.</Text>
                  <Button onPress={this.measureStart} title="Starten" style={styles.button}></Button>
                  {this.state.mesureStatus ? <Text style={styles.inputText}>Gestartet.</Text> : null}
                  <Button onPress={this.measureStop} title="Stoppen" style={styles.button}></Button>
                </View>
                
                <View style={styles.outputContainer}>
                  {this.state.indicatorStatus ? <ActivityIndicator size="large"/> : null}
                  <Text style={styles.outputText}>{this.state.notificationS}</Text>
                  <Text style={styles.outputText}>{this.state.notificationT}</Text>
                  <Button
                  onPress={this.Loschen}
                  title="Reset"
                  />
                </View>
            </View>
        );
      }
    }

