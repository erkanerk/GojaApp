import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    image: {
        width: 20,
        height: 20,
    },
});

// TODO: This whole component man

interface Props {
    post: Post;
}

export const Reply = ({ post }: Props) => {
    function handleOnPress() {
        console.log('Reply button pressed');
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={handleOnPress}>
                <Icon name="reply" size={25} color="black" />
            </Pressable>
        </View>
    );
};