import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import InformationTicketScreen from "./InformationTicketScreen";
import ScannerScreen from "./ScannerScreen";
import  {NumeroCodeScreen,ListNavigation} from "./NumeroCodeScreen";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {createStackNavigator} from "@react-navigation/native/lib/typescript/module/src/__stubs__/createStackNavigator";
import {Stack} from "expo-router";
import HomeScreen from "../homeScreen";

const Tab = createMaterialTopTabNavigator();

const ChoixMethode = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Scanner" component={ScannerScreen}  />
            <Tab.Screen name="NumeroCode" component={ListNavigation}  />
        </Tab.Navigator>
    );
}

export default ChoixMethode

StyleSheet.create({});
