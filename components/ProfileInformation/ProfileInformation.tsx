import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { StyleSheet } from "react-native";
import { APIKit, onFailure } from "../../shared/APIkit";
import AppContext from "../../shared/AppContext";
import { useIsFocused } from "@react-navigation/native";
import { FollowButton } from "../FollowButton/FollowButton";
import { Stats } from "./subcomponents/Stats";
import CachedImage from 'expo-cached-image';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    spinner: {
        marginTop: 100,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    imageView: {
        alignItems: 'center',
        margin: 2,
        marginTop: 20,
    },
    textView: {
        alignItems: 'center',
        margin: 5,
    },
    text: {
        color: 'black',
    },
    UserNameText: {
        fontSize: 20,
        color: 'black',
    },
    line: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
    followButtonView: {
        alignItems: 'center',
        margin: 10,
    },
    statsView: {
        margin: 10,
    },
});

interface Props {
    profile: Profile | undefined
    userId: string
    tab: number
    setTab: Dispatch<SetStateAction<number>>
    getProfileInformation(): Promise<void>
}

export const ProfileInformation = ({ 
    profile,
    tab, 
    userId,
    setTab,
    getProfileInformation
 }: Props) => {
     
    const globalCtx = useContext(AppContext);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && profile == undefined) {
            getProfileInformation()
        }
    }, [isFocused]);

    if (!profile) {
        return <></>
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <CachedImage
                    style={styles.image}
                    source={{
                        uri: profile.profilePicture,
                    }}
                    cacheKey={profile._id}
                />
            </View>
            <View style={styles.textView}>
                <Text style={styles.UserNameText}>{profile.userName}</Text>
            </View>
            {userId !== globalCtx.userInfo._id &&
                <View style={styles.followButtonView}>
                    <FollowButton 
                    userId={userId} 
                    following={profile.isFollowing} />
                </View>}
            <View style={styles.statsView}>
                <Stats 
                tab={tab} 
                setTab={setTab} 
                postCount={profile.postCount}
                followerCount={profile.followerCount}
                followingCount={profile.followingCount}/>
            </View>
            <View style={styles.line} />
        </View>
    );
};
