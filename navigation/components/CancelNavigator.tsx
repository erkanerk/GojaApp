import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { View, Pressable, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { RootStackParamList, RootTabParamList } from '../../types';
import { Bell } from "react-native-feather";
import AppContext from '../../shared/AppContext';

const styles = StyleSheet.create({
    container: {
        marginLeft: 7,
    },
    headerCancel: {
        fontSize: 14,
        color: 'red',
    },
  }); 

export const CancelNavigator = () => {
    const globalCtx = useContext(AppContext);

    function handleOnPress() {
        console.log('Pressed cancel')
        globalCtx.setLoggedIn(true)
    }

    return (
    <View style={styles.container}>
        <Pressable onPress={handleOnPress}>
            <Text style={styles.headerCancel}>Cancel</Text>
        </Pressable>
    </View>
    );
}; 

