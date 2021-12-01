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
    tab: number
    setTab: Dispatch<SetStateAction<number>>
}
export const Stats = ({ 
    user,
    tab,
    setTab
}: Props) => {

    function handleNPostsOnPress() {
        console.log("Number of post button pressed")
        setTab(0)
    }
    function handleNFollowersOnPress() {
        console.log("Number of followers button pressed")
        setTab(1)
    }
    function handleNFollowingOnPress() {
        console.log("Number of following button pressed")
        setTab(2)
    }
    return (
    <View style={styles.container}>
        <View style={styles.nPostsView}>
            <Pressable
            onPress={handleNPostsOnPress}>
                <Text style={tab === 0 ? styles.textFocused : styles.text}>Posts</Text>
                <Text style={tab === 0 ? styles.textFocused : styles.text}>???</Text>
            </Pressable>
        </View>
        <View style={styles.nFollowersView}>
            <Pressable
            onPress={handleNFollowersOnPress}>
                <Text style={tab === 1 ? styles.textFocused : styles.text}>Followers</Text>
                <Text style={tab === 1 ? styles.textFocused : styles.text}>{user.followerCount}</Text>
            </Pressable>
            
        </View>
        <View style={styles.nFollowingView}>
            <Pressable
            onPress={handleNFollowingOnPress}>
                <Text style={tab === 2 ? styles.textFocused : styles.text}>Following</Text>
                <Text style={tab === 2 ? styles.textFocused : styles.text}>{user.followingCount}</Text>
            </Pressable>
        </View>
    </View>
    );
}

