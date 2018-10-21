import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { Accelerometer } from "expo";
import styles from './styles';


export default class Bewegungsmesser extends React.Component {
    state = {
        buttontitle: "Start",
        buttontitle2: "",
        x: 0,
        y: 0,
        z: 0,
        ausgabe: 0,
        ausgabe2: 0,
    };

    helper = {
        c: 0,
    };

    measurementData = []
    

    constructor(props) {
        super(props);    
        Accelerometer.setUpdateInterval(10);
    }

    Start = (val) => {
        if (this.state.buttontitle == "Start") {
            console.log("Start");
            
            this.setState({
                    buttontitle: "Stop"
                })
            Accelerometer.setUpdateInterval(10);
            Accelerometer.addListener(accelerometerData => {
                
                this.measurementData.push({
                    x: accelerometerData.x*9.81, 
                    y: accelerometerData.y*9.81,
                    z: accelerometerData.z*9.81-9.81,
                })
            });

            this.measurementData = []   

        } else if (this.state.buttontitle == "Stop") {
            
            console.log("stop");
            Accelerometer.removeAllListeners()
            
            let data = this.measurementData;       
            let sx = 0;
            let vox = 0;
            let sy = 0;
            let voy = 0;
            let cd = 0;
            let g = 0;
            
            let cleanedData = data.map((a) => {
                let x = a.x
                if (x > -0.5 && x < 0.5 ) {
                    x = 0
                }

                let y = a.y
                if (y > -0.5 && y < 0.5 ) {
                    y = 0
                }

                return {x: x, y:y}
            })
            
            while(this.allZero(cleanedData.slice(g, g+10)) && g <= cleanedData.length) {
                g++;
            }

            while(!this.allZero(cleanedData.slice(g, g+10)) && g <= cleanedData.length) {
                sx += (cleanedData[g].x/2)*(0.01*0.01)+(vox*0.01);
                vox += (cleanedData[g].x*0.01);
    
                sy += (cleanedData[g].y/2)*(0.01*0.01)+(voy*0.01);
                voy += (cleanedData[g].y*0.01);
                console.log(sx)
                g++
            }
            console.log(g)
            
            if (this.helper.c == 0) {
            this.helper.c = Math.sqrt(sx*sx+sy*sy);
            } else {
                cd = (this.helper.c+ Math.sqrt(sx*sx+sy*sy))/2;
            }
            this.setState({
                ausgabe: this.helper.c,
                ausgabe2: cd,
            })

            

            console.log("x: " + sx);
            console.log("y: " + sy);
            
            console.log(cleanedData);
        

            this.setState({
            buttontitle: "Start",
            })

            this.measurementData = [];
        }        
    }
    Loschen = () => {
        this.setState({
            buttontitle: "Start",
            buttontitle2: "",
            x: 0,
            y: 0,
            z: 0,
            ausgabe: 0,
            ausgabe2: 0,
        })
        this.helper.c = 0;
    }

    allZero = (data) => {
        let count = 0;
        for (let h = 0; h < data.length; h++) {
            if (data[h].x == 0 && data[h].y == 0) {
                count ++;
            }
        }
        
        if (count >= data.length * 0.8 ) {
            return true
        }

        return false
    } 

    render () {
        return (
            <View style={styles.container}>
            <Text style={styles.headertext}>Distanzmessung</Text>
                <View style={[styles.inputContainer, {maxHeight: 350}]}>
                    <Text style={styles.inputText}>Legen Sie Ihr Smartphone auf eine gerade Unterlage. Starten Sie die Messung und bewgen Sie das Gerät zügig zur Zielposition. Stoppen Sie die Messung. Um genauere Ergebnisse zu erzielen, können Sie die Messung 2 mal durchführen.</Text>
                    <Button onPress={this.Start} title={this.state.buttontitle}></Button>
                </View>
                
                <View style={styles.outputContainer}>
                    {this.state.indicatorStatus ? <ActivityIndicator size="large"/> : null}
                    <Text style={styles.outputText}>Erste Messung (m):</Text>
                    <Text style={styles.outputText}>{this.state.ausgabe}</Text>
                    <Text style={styles.outputText}>Genauerer Wert aus 1. und 2. Messung (m):</Text>
                    <Text style={styles.outputText}>{this.state.ausgabe2}</Text>
                    <Button
                    onPress={this.Loschen}
                    title="Reset"
                    />
                </View>
            </View>

    )}
}