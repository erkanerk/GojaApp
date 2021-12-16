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
    userId: string
    tab: number
    setTab: Dispatch<SetStateAction<number>>
    followingCount: number
    setFollowingCount: Dispatch<SetStateAction<number>>
}

export const ProfileInformation = ({ 
    tab, 
    userId,
    setTab,
    followingCount,
    setFollowingCount
 }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isFocused = useIsFocused();
    const [profile, setProfile] = useState<Profile | undefined>(undefined);
    const globalCtx = useContext(AppContext);

    async function getProfileInformation() {
        setIsLoading(true);
        //('Fetching user information');
        if (userId !== globalCtx.userInfo._id) {
            APIKit.get(`/users/profile/${userId}`)
            .then((response) => {
                setProfile(response.data);
                setFollowingCount(response.data.followingCount);
                setIsLoading(false);
            })
            .catch((error) => {
                onFailure(error, globalCtx);
                console.log(error && error);
                setIsLoading(false);
            });
        } else {
            APIKit.get('/users/profile/me')
            .then((response) => {
                setProfile(response.data);
                setFollowingCount(response.data.followingCount);
                setIsLoading(false);
            })
            .catch((error) => {
                onFailure(error, globalCtx);
                console.log(error && error);
                setIsLoading(false);
            });
        }
    }

    useEffect(() => {
        if (isFocused && profile == undefined) {
            getProfileInformation()
        } 
    }, [isFocused]);

    if (!profile || isLoading) {
        return (
            <View style={styles.spinner}>
                <ActivityIndicator size="large" color={'lightgray'} />
            </View>
        )
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
                followingCount={followingCount}/>
            </View>
            <View style={styles.line} />
        </View>
    );
};
