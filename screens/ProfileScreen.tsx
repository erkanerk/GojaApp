import React, { useState } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../types";
import { StyleSheet } from "react-native";
import { ProfileInformation } from "../components/ProfileInformation/ProfileInformation";
import { LogoutButton } from "../components/Logout/LogoutButton";
import { FollowingFeed } from "../components/FollowingFeed/FollowingFeed";
import { FollowersFeed } from "../components/FollowersFeed/FollowersFeed";
import { MyFeed } from "../components/MyFeed/MyFeed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
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


interface Props {
    route: RouteProp<RootStackParamList, 'ProfileScreen'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileScreen'>
}

export default function ProfileScreen({ 
    route,
    navigation 
}: Props){
    const userId = route.params.userId
    const [tab, setTab] = useState<number>(0)

    function conditionalRender() {
        if (tab == 0) {
            console.log("Showing posts")
            return (
            <View style={styles.postsView}>
                <MyFeed 
                userId={userId} />
            </View>
            )
        } else if (tab == 1) {
            console.log("Showing followers")
            return (
            <View style={styles.followersView}>
                <FollowersFeed 
                userId={userId} />
            </View>
            )
        } else if (tab == 2) {
            console.log("Showing following")
            return (
            <View style={styles.followingView}>
                <FollowingFeed 
                userId={userId} />
            </View>
            )
        }
    }
    
    return (
    <View style={styles.container}>
        <View style={styles.profileView}>
            <ProfileInformation 
            tab={tab}
            setTab={setTab} 
            userId={userId}/>
        </View>
        {conditionalRender()}
    </View>
    );
}