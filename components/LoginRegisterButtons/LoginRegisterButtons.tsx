import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const styles = StyleSheet.create({
	test: {
        backgroundColor: 'red'
	},
});

interface userInfoProps {
    email: string;
    username: string;
    password: string;
}

export const LoginRegisterButtons = (userInfo: userInfoProps) => {
    console.log(userInfo.email);

    return (
        <>
            <TouchableOpacity onPress={() => console.log(userInfo.username)}>
                <View style={styles.test}>
                    <Text>{"Register"}</Text>   
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log(userInfo.username)}>
                <View style={styles.test}>
                    <Text>{"Login"}</Text>   
                </View>
            </TouchableOpacity>
        </>
    )
}