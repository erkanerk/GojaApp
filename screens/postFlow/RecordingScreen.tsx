import React from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { RecordButton } from '../../components/Record/RecordButton';
import { TopBar } from '../../components/Record/TopBar';

export const RecordingScreen = () => {
    return (
        <View>
            <TopBar/>
            <RecordButton/>
        </View>
    )
}
