import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, BackHandler } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 20,
        borderRadius: 19,
        backgroundColor: 'red',
    },
    text: {
        color: 'white',
        width: 100,
        height: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },
    disabled: {
        backgroundColor: 'transparent'
    },
});

interface Props {
    disabled: boolean;
    text: string;
    onPress: () => void;
}

export const Button = (props: Props) => {
    return (
        <>
            <TouchableOpacity style={[styles.wrapper, props.disabled ? styles.disabled : null]} disabled={props.disabled} onPress={props.onPress}>
                <View>
                    <Text style={styles.text}>{props.text}</Text>   
                </View>
            </TouchableOpacity>
        </>
    )
}