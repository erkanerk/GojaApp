import React, { useState } from "react";
import { View } from "react-native";
import { RootTabScreenProps } from "../types";
import { StyleSheet } from "react-native";
import { ProfileInformation } from "../components/ProfileInformation/ProfileInformation";
import { LogoutButton } from "../components/Logout/LogoutButton";
import { FollowingFeed } from "../components/FollowingFeed/FollowingFeed";
import { FollowersFeed } from "../components/FollowersFeed/FollowersFeed";
import { MyFeed } from "../components/MyFeed/MyFeed";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
    },
    logout: {
        alignItems: 'flex-end'
    },
    profileView: {
    },
    postsView: {
        flex: 1,
    },
    followersView: {
        flex: 1,
    },
    followingView: {
        height: 'auto',
        flex: 1,
    },
    
});

export default function ProfilePage({
    navigation,
}: RootTabScreenProps<"TabFour">) {
    const [tab, setTab] = useState<number>(0)

    function conditionalRender() {
        if (tab == 0) {
            console.log("Showing posts")
            return (
            <View style={styles.postsView}>
                <MyFeed />
            </View>
            )
        } else if (tab == 1) {
            console.log("Showing followers")
            return (
            <View style={styles.followersView}>
                <FollowersFeed />
            </View>
            )
        } else if (tab == 2) {
            console.log("Showing following")
            return (
            <View style={styles.followingView}>
                <FollowingFeed />
            </View>
            )
        }
    }
    
    // TODO: Build the user item component
    return (
    <View style={styles.container}>
        <View style={styles.logout}>
            <LogoutButton/>
        </View>
        <View style={styles.profileView}>
            <ProfileInformation 
            tab={tab}
            setTab={setTab} />
        </View>
        {conditionalRender()}
    </View>
    );
}