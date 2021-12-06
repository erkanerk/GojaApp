import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { RootStackParamList, RootTabParamList } from '../../types';
import { LogoutButton } from '../../components/Logout/LogoutButton';

const styles = StyleSheet.create({
    container: {
    },
}); 

interface Props {
    route: RouteProp<RootStackParamList, 'ProfileScreen'>
    navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileScreen'>
}

export const LogoutNavigator = ({ 
    route,
    navigation
}: Props) => {

    return (
    <View style={styles.container}>
        <LogoutButton />
    </View>
    );
}; 

