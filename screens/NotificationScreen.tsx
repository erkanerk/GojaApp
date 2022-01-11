import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { RootStackParamList } from "../types";
import { StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import AppContext from "../shared/AppContext";
import { APIKit, onFailure } from "../shared/APIkit";
import { NotificationEvent } from "../components/NotificationEvent/NotificationEvent";
import { FadeText } from "../components/FadeText/FadeText";


export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
    },
    feedView: {
        marginTop: 10,
    },
    textView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        color: 'gray',
    },
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
    const [notifications, setNotifications] = useState<Notification[] | undefined>(undefined);
    
    // TODO: change to a real endpoint
    async function getNotifications() {
        setIsLoading(true)
        APIKit.get("/notifications/me")
        .then((response) => {
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
        {!notifications ? 
        <View style={styles.textView}>
            <FadeText style={styles.text}>You have no new notifications</FadeText>
        </View>
        :
        <View style={styles.feedView}>
            <FlatList
            data={notifications}
            keyExtractor={notification => notification.id}
            renderItem={renderItem} />
        </View>}
    </View>
    );
}