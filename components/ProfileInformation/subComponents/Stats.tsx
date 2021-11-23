import React from 'react';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        textAlign: 'center'
    },
    nPostsView: {
        flex: 1,
    },
    nFollowersView: {
        flex: 1,
    },
    nFollowingView: {
        flex: 1,
    },
    text: {
        color: 'gray',
        fontWeight: 'normal',
        textAlign: 'center',
    },
    textFocused: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

interface Props {
    user: User
}
export const Stats = ({ 
    user
}: Props) => {
    const [nPostsIsPressed, setNPostsIsPressed] = useState<boolean>(true)
    const [nFollowingIsPressed, setNFollowingIsPressed] = useState<boolean>(false)
    const [nFollowersIsPressed, setNFollowersIsPressed] = useState<boolean>(false)

    function handleNPostsOnPress() {
        console.log("Number of post button pressed")
        setNPostsIsPressed(true)
        setNFollowersIsPressed(false)
        setNFollowingIsPressed(false)
    }
    function handleNFollowersOnPress() {
        console.log("Number of followers button pressed")
        setNPostsIsPressed(false)
        setNFollowersIsPressed(true)
        setNFollowingIsPressed(false)
    }
    function handleNFollowingOnPress() {
        console.log("Number of following button pressed")
        setNPostsIsPressed(false)
        setNFollowersIsPressed(false)
        setNFollowingIsPressed(true)
    }
    return (
    <View style={styles.container}>
        <View style={styles.nPostsView}>
            <Pressable
            onPress={handleNPostsOnPress}>
                <Text style={nPostsIsPressed ? styles.textFocused : styles.text}>Posts</Text>
                <Text style={nPostsIsPressed ? styles.textFocused : styles.text}>{user.nPosts}</Text>
            </Pressable>
        </View>
        <View style={styles.nFollowersView}>
            <Pressable
            onPress={handleNFollowersOnPress}>
                <Text style={nFollowersIsPressed ? styles.textFocused : styles.text}>Followers</Text>
                <Text style={nFollowersIsPressed ? styles.textFocused : styles.text}>{user.nFollowers}</Text>
            </Pressable>
            
        </View>
        <View style={styles.nFollowingView}>
            <Pressable
            onPress={handleNFollowingOnPress}>
                <Text style={nFollowingIsPressed ? styles.textFocused : styles.text}>Following</Text>
                <Text style={nFollowingIsPressed ? styles.textFocused : styles.text}>{user.nFollowing}</Text>
            </Pressable>
        </View>
    </View>
    );
}

