import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { RootStackParamList } from "../types";
import { StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import AppContext from "../shared/AppContext";
import { APIKit, onFailure } from "../shared/APIkit";
import { NotificationEvent } from "../components/NotificationEvent/NotificationEvent";
import { SampleNotifications } from "../assets/sampleData/Notifications";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
    },
    feedView: {
        marginTop: 10,
    }
});

interface Props {
    route: RouteProp<RootStackParamList, 'ProfileScreen'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileScreen'>
}

export default function NotificationScreen({ 
    route,
    navigation 
}: Props){
    const globalCtx = useContext(AppContext);
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // TODO: rm SampleNotifications 
    const [notifications, setNotifications] = useState<Notification[] | undefined>(SampleNotifications);
    
    // TODO: change to a real endpoint
    async function getNotifications() {
        setIsLoading(true)
        //console.log('Fetching notifications')
        APIKit.get("/notifications/me")
        .then((response) => {
            //console.log("Successful /users/followers/:id response: ")
            //console.log(response.data)
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
            // getNotifications()    
        }
    }, [isFocused]);

    const renderItem = ({ item, index, separators }: any) => (
        <NotificationEvent 
        event={item} />
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