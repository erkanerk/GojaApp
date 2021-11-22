import React from 'react';
import { View, Text } from 'react-native';
import { RootTabScreenProps } from '../types';
import { StyleSheet } from 'react-native';
import { ProfileInformation } from '../components/ProfileInformation/ProfileInformation';
import { SampleUser } from '../assets/sampleData/User';

export const styles = StyleSheet.create({
        container: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
    },
    feedView: {
        flex: 1,
    },
});

export default function ProfilePage({ 
    navigation 
}: RootTabScreenProps<'TabFour'>) {

    return (
    <View style={styles.container}>
        <View>
            <ProfileInformation 
            user={SampleUser}/>
        </View>
        <View style={styles.feedView}>
            <Text>Feed placeholder</Text>
        </View>
    </View>
    );
}

