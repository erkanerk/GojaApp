import React, { useContext, useEffect, useState } from "react";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import { APIKit, onFailure } from "../../shared/APIkit";
import AppContext from "../../shared/AppContext";
import { useIsFocused } from "@react-navigation/native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    feedView: {},
    text: {
        fontSize: 12,
        color: 'gray',
    },
});

interface Props {}

export const FollowingFeed = ({}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const isFocused = useIsFocused();
    const [users, setUsers] = useState<any | undefined>(undefined);
    const globalCtx = useContext(AppContext);
    
    async function getUserFollowing() {
        setIsLoading(true)
        APIKit.get("/users/following/me")
        .then((response) => {
            console.log("Successful /users/following/me response: ")
            console.log(response.data)
            setUsers(response.data);
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
            getUserFollowing()    
        }
      }, [isFocused]);

    const renderItem = ({ item, index, separators }: any) => (
        <Text>User Item</Text>
    );

    if (isLoading) {
        return(
            <ActivityIndicator size="large" color={'lightgray'} />
        )
    }
    return (
        <View style={styles.container}>
            {users 
            ?
            <View style={styles.feedView}>
                <FlatList
                data={users}
                keyExtractor={user => user._id}
                renderItem={renderItem} />
            </View>
            :
            <View style={styles.textView}>
                <Text style={styles.text}>When you follow your friends they will show up here!</Text>
            </View>
            }
        </View>
    );
};
