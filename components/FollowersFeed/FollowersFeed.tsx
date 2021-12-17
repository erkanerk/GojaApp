import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { StyleSheet } from "react-native";
import { APIKit, onFailure } from "../../shared/APIkit";
import AppContext from "../../shared/AppContext";
import { useIsFocused } from "@react-navigation/native";
import { FadeText } from "../FadeText/FadeText";
import { User } from "../User/User";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    feedView: {
        flex: 1,
    },
    text: {
        fontSize: 12,
        color: 'gray',
    },
});

interface Props {
    userId: string | undefined
    users: Follower[] | undefined
    navigation: NativeStackNavigationProp<RootStackParamList, "ProfileScreen">
    getFollowers(): Promise<void>
}

export const FollowersFeed = ({
    userId,
    users,
    navigation,
    getFollowers
}: Props) => {
    const globalCtx = useContext(AppContext);
    const myProfilePage = userId == globalCtx.userInfo._id ? true : false;
    const isFocused = useIsFocused();

    const renderItem = ({ item, index, separators }: any) => (
        <User 
        user={item} 
        following={item.isMutualFollowers}
        showFollowButton={myProfilePage} 
        navigation={navigation}/>
    );
    
    useEffect(() => {
        if (isFocused) {
            getFollowers()
        }
    }, [isFocused]);

    if (!users) {
        return <></>
    }

    return (
        <View style={styles.container}>
            {users?.length > 0 ? (
            <View style={styles.feedView}>
                <FlatList
                data={users}
                keyExtractor={user => user.userId}
                renderItem={renderItem} />
            </View>
            ) : (
            <View style={styles.textView}>
                <FadeText style={styles.text}>
                {myProfilePage ? 'Your followers will show up here!' : 'The users has no followers'}
                </FadeText>
            </View>
            )}
        </View>
    );
};
