import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { StyleSheet } from "react-native";
import { APIKit, onFailure } from "../../shared/APIkit";
import AppContext from "../../shared/AppContext";
import { useIsFocused } from "@react-navigation/native";
import { FollowButton } from "../FollowButton/FollowButton";
import { Stats } from "./subcomponents/Stats";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    imageView: {
        alignItems: 'center',
        margin: 2,
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
    userId: string | undefined
    tab: number
    setTab: Dispatch<SetStateAction<number>>
}

export const ProfileInformation = ({ 
    tab, 
    userId,
    setTab
 }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isFocused = useIsFocused();
    const [profile, setProfile] = useState<Profile | undefined>(undefined);
    const globalCtx = useContext(AppContext);

    async function getProfileInformation() {
        setIsLoading(true);
        console.log('Fetching user information');
        if (userId) {
            APIKit.get(`/users/profile/${userId}`)
            .then((response) => {
                setProfile(response.data);
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
        if (isFocused) {
            getProfileInformation()
        } 
    }, [isFocused]);

    if (!profile) {
        return <ActivityIndicator size="large" color={'lightgray'} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image
                    style={styles.image}
                    source={{
                        uri: profile.profilePicture,
                    }}
                />
            </View>
            <View style={styles.textView}>
                <Text style={styles.UserNameText}>{profile.userName}</Text>
            </View>
            {userId
            ?
            <View style={styles.followButtonView}>
                <FollowButton userId={userId} following={false}/>
            </View>
            :
            null}
            <View style={styles.statsView}>
                <Stats user={profile} tab={tab} setTab={setTab} />
            </View>
            <View style={styles.line} />
        </View>
    );
};
