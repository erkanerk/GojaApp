import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import { APIKit, onFailure } from "../../shared/APIkit";
import { PostFeed } from "../PostFeed/PostFeed";
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
    feedView: {
        flex: 1,
    },
    text: {
        fontSize: 12,
        color: 'gray',
    },
});
interface Props {}

export const MyFeed = ({}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const isFocused = useIsFocused();
    const [posts, setPosts] = useState<Post[] | undefined>(undefined);
    const globalCtx = useContext(AppContext);
    
    async function getUserPosts() {
        setIsLoading(true)
        APIKit.get("/posts/all")
        .then((response) => {
            console.log("Successful /posts/by-user/me response: ")
            console.log(response.data)
            setPosts(response.data);
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
            getUserPosts()
        }
      }, [isFocused]);


    if (isLoading) {
        return(
            <ActivityIndicator size="large" color={'lightgray'} />
        )
    }
    return (
        <View style={styles.container}>
            {posts && posts?.length > 0
            ?
            <View style={styles.feedView}>
                <PostFeed 
                posts={posts}/>
            </View>
            :
            <View style={styles.textView}>
                <Text style={styles.text}>Record some audio and see all your posts here!</Text>
            </View>
            }
        </View>
    );
};
