import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { StyleSheet } from "react-native";
import { APIKit, onFailure } from "../../shared/APIkit";
import AppContext from "../../shared/AppContext";
import { useIsFocused } from "@react-navigation/native";
import { FadeText } from "../FadeText/FadeText";
import { User } from "../User/User";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

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

interface Props {
    userId: string | undefined
    currentCount: number
    setCount: Dispatch<SetStateAction<number>>
    navigation: NativeStackNavigationProp<RootStackParamList, "ProfileScreen">
}

export const FollowingFeed = ({
    userId,
    currentCount,
    setCount,
    navigation,
}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const isFocused = useIsFocused();
    const [users, setUsers] = useState<Following[] | undefined>(undefined);
    const globalCtx = useContext(AppContext);
    const myProfilePage = userId == globalCtx.userInfo._id ? true : false;

    async function getFollowing() {
        setIsLoading(true)
        if (userId !== globalCtx.userInfo._id) {
            APIKit.get(`/users/following/${userId}`)
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
            APIKit.get("/users/following/me")
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
            getFollowing()    
        }
    }, [isFocused]);

    const renderItem = ({ item, index, separators }: any) => (
        <User 
        user={item} 
        following={true}
        currentCount={currentCount}
        setCount={setCount} 
        showFollowButton={myProfilePage} 
        navigation={navigation}/>
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
                <FadeText style={styles.text}>
                {myProfilePage ? 'When you follow your friends they will show up here!' : 'The users is not following any users'}
                </FadeText>
            </View>
            )}
        </View>
    );
};
