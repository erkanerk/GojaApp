import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { RootStackParamList, RootTabParamList } from '../../types';
import { LogoutButton } from '../../components/Logout/LogoutButton';

const styles = StyleSheet.create({
    container: {
    },
    recordIcon: {
        borderRadius: 20,
        width: 40,
        height: 40,
        backgroundColor: 'red',
    },
    focusedRecordIcon: {
        borderRadius: 25,
        width: 50,
        height: 50,
        backgroundColor: 'red',
    },
}); 

interface Props {
    isFocused: boolean
}

export const RecordNavigator = ({ isFocused }: Props) => {
    return (
    <View style={styles.container}>
        <View style={isFocused ? styles.focusedRecordIcon : styles.recordIcon}/>
    </View>
    );
}; 

