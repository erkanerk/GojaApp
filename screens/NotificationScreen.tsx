import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { RootStackParamList } from "../types";
import { StyleSheet } from "react-native";
import { ProfileInformation } from "../components/ProfileInformation/ProfileInformation";
import { LogoutButton } from "../components/Logout/LogoutButton";
import { FollowingFeed } from "../components/FollowingFeed/FollowingFeed";
import { FollowersFeed } from "../components/FollowersFeed/FollowersFeed";
import { MyFeed } from "../components/MyFeed/MyFeed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import AppContext from "../shared/AppContext";
import { APIKit, onFailure } from "../shared/APIkit";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
    },
    feedView: {

    }
});

interface Props {
    route: RouteProp<RootStackParamList, 'ProfileScreen'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileScreen'>
}

export default function ProfilePage({ 
    route,
    navigation 
}: Props){
    const globalCtx = useContext(AppContext);
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [notifications, setNotifications] = useState<Notification[] | undefined>(undefined);

    // TODO: change to a real endpoint
    async function getNotifications() {
        setIsLoading(true)
        console.log('Fetching notifications')
        APIKit.get("/notifications/me")
        .then((response) => {
            console.log("Successful /users/followers/:id response: ")
            console.log(response.data)
            setNotifications(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            onFailure(error, globalCtx);
            console.log(error && error);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        if (isFocused) {
            getNotifications()    
        }
    }, [isFocused]);

    const renderItem = ({ item, index, separators }: any) => (
        <Text>Placeholder</Text>
    );

    return (
    <View style={styles.container}>
        <View style={styles.feedView}>
            <FlatList
            data={notifications}
            keyExtractor={notification => notification.id}
            renderItem={renderItem} />
        </View>
    </View>
    );
}