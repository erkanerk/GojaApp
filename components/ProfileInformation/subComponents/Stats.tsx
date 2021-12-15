import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        textAlign: 'center',
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
    },
});

interface Props {
    tab: number;
    setTab: Dispatch<SetStateAction<number>>;
    postCount: number;
    followerCount: number;
    followingCount: number;
}

export const Stats = ({ 
    tab, 
    setTab,
    postCount,
    followerCount,
    followingCount
 }: Props) => {

    function handleNPostsOnPress() {
        setTab(0);
    }
    function handleNFollowersOnPress() {
        setTab(1);
    }
    function handleNFollowingOnPress() {
        setTab(2);
    }
    return (
        <View style={styles.container}>
            <View style={styles.nPostsView}>
                <Pressable onPress={handleNPostsOnPress}>
                    <Text style={tab === 0 ? styles.textFocused : styles.text}>
                        Posts
                    </Text>
                    <Text style={tab === 0 ? styles.textFocused : styles.text}>
                        {postCount}
                    </Text>
                </Pressable>
            </View>
            <View style={styles.nFollowersView}>
                <Pressable onPress={handleNFollowersOnPress}>
                    <Text style={tab === 1 ? styles.textFocused : styles.text}>
                        Followers
                    </Text>
                    <Text style={tab === 1 ? styles.textFocused : styles.text}>
                        {followerCount}
                    </Text>
                </Pressable>
            </View>
            <View style={styles.nFollowingView}>
                <Pressable onPress={handleNFollowingOnPress}>
                    <Text style={tab === 2 ? styles.textFocused : styles.text}>
                        Following
                    </Text>
                    <Text style={tab === 2 ? styles.textFocused : styles.text}>
                        {followingCount}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};
