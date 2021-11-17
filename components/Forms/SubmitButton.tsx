import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

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
});

interface Props {
    text: string;
    onPress: () => void;
}

export const SubmitButton = (props: Props) => {
    return (
        <>
            <Pressable style={styles.wrapper} onPress={props.onPress}>
                <Text style={styles.text}>{props.text}</Text>   
            </Pressable>
        </>
    )
}