import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { StyleSheet } from "react-native";
import { APIKit, onFailure } from "../../shared/APIkit";
import AppContext from "../../shared/AppContext";
import { useIsFocused } from "@react-navigation/native";
import { FadeText } from "../FadeText/FadeText";
import { User } from "../User/User";

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
}

export const FollowersFeed = ({
    userId
}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const isFocused = useIsFocused();
    const [users, setUsers] = useState<Follower[] | undefined>(undefined);
    const globalCtx = useContext(AppContext);
    const showFollowButton = userId == globalCtx.userInfo._id ? true : false;

    async function getFollowers() {
        setIsLoading(true);
        if (userId != globalCtx.userInfo._id) {
            APIKit.get(`/users/followers/${userId}`)
            .then((response) => {
                setUsers(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                onFailure(error, globalCtx);
                console.log(error && error);
                setIsLoading(false);
            });
        } else {
            APIKit.get("/users/followers/me")
            .then((response) => {
                setUsers(response.data);
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
            getFollowers()    
        }
    }, [isFocused]);

    const renderItem = ({ item, index, separators }: any) => (
        <User 
        user={item} 
        following={item.isMutualFollowers}
        showFollowButton={showFollowButton} />
    );

    return (
        <View style={styles.container}>
            {users && users?.length > 0 ? (
            <View style={styles.feedView}>
                <FlatList
                data={users}
                keyExtractor={user => user.userId}
                renderItem={renderItem} />
            </View>
            ) : (
            <View style={styles.textView}>
                <FadeText style={styles.text}>Your followers will show up here!</FadeText>
            </View>
            )}
        </View>
    );
};
