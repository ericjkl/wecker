import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import BMI from './sources/bmi-screen'
import Calories from './sources/calories-screen';
import Measure from './sources/measure';
import Measure2 from './sources/measure2';
import { MaterialIcons, Entypo  } from '@expo/vector-icons';

const AppNav = createBottomTabNavigator ({
  Kalorien: {
    screen: Calories,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <MaterialIcons name="fitness-center" size={26} color={tintColor} />
      },
    },
  },
  BMI: {
    screen: BMI,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <MaterialIcons name="accessibility" size={26} color={tintColor} />
      },
    },
  },
  Messen: {
    screen: Measure,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <Entypo name="ruler" size={26} color={tintColor} />
      },
    },
  },
  'Messen 2': {
    screen: Measure2,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <Entypo name="ruler" size={26} color={tintColor} />
      },
    },
  },
}, {
})

export default AppNav;