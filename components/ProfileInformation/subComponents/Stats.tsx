import React, { Dispatch, SetStateAction } from 'react';
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
    user: UserInfo
    setRender: Dispatch<SetStateAction<string>>
}
export const Stats = ({ 
    user,
    setRender
}: Props) => {
    const [nPostsIsPressed, setNPostsIsPressed] = useState<boolean>(true)
    const [nFollowingIsPressed, setNFollowingIsPressed] = useState<boolean>(false)
    const [nFollowersIsPressed, setNFollowersIsPressed] = useState<boolean>(false)

    function handleNPostsOnPress() {
        console.log("Number of post button pressed")
        if (!nPostsIsPressed) {
            setNPostsIsPressed(true)
            setNFollowersIsPressed(false)
            setNFollowingIsPressed(false)
            setRender('posts')
        }
    }
    function handleNFollowersOnPress() {
        console.log("Number of followers button pressed")
        if (!nFollowingIsPressed) {
            setNPostsIsPressed(false)
            setNFollowersIsPressed(true)
            setNFollowingIsPressed(false)
            setRender('followers')
        }
    }
    function handleNFollowingOnPress() {
        console.log("Number of following button pressed")
        if (!nFollowingIsPressed) {
            setNPostsIsPressed(false)
            setNFollowersIsPressed(false)
            setNFollowingIsPressed(true)
            setRender('following')
        }
    }
    return (
    <View style={styles.container}>
        <View style={styles.nPostsView}>
            <Pressable
            onPress={handleNPostsOnPress}>
                <Text style={nPostsIsPressed ? styles.textFocused : styles.text}>Posts</Text>
                <Text style={nPostsIsPressed ? styles.textFocused : styles.text}>{user.postCount}</Text>
            </Pressable>
        </View>
        <View style={styles.nFollowersView}>
            <Pressable
            onPress={handleNFollowersOnPress}>
                <Text style={nFollowersIsPressed ? styles.textFocused : styles.text}>Followers</Text>
                <Text style={nFollowersIsPressed ? styles.textFocused : styles.text}>{user.followerCount}</Text>
            </Pressable>
            
        </View>
        <View style={styles.nFollowingView}>
            <Pressable
            onPress={handleNFollowingOnPress}>
                <Text style={nFollowingIsPressed ? styles.textFocused : styles.text}>Following</Text>
                <Text style={nFollowingIsPressed ? styles.textFocused : styles.text}>{user.followingCount}</Text>
            </Pressable>
        </View>
    </View>
    );
}

