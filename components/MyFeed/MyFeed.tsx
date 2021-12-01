import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, ActivityIndicator, Animated } from "react-native";
import { StyleSheet } from "react-native";
import { APIKit, onFailure } from "../../shared/APIkit";
import { PostFeed } from "../PostFeed/PostFeed";
import AppContext from "../../shared/AppContext";
import { useIsFocused } from "@react-navigation/native";
import { FadeText } from "../FadeText/FadeText";

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

export const MyFeed = ({
    userId
}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const isFocused = useIsFocused();
    const [posts, setPosts] = useState<Post[] | undefined>(undefined);
    const globalCtx = useContext(AppContext);
    
    async function getPosts() {
        setIsLoading(true)
        if (userId) {
            APIKit.get(`/posts/by-user/${userId}`)
            .then((response) => {
                console.log("Successful /posts/by-user/:id response: ")
                console.log(response.data)
                setPosts(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                onFailure(error, globalCtx);
                console.log(error && error);
                setIsLoading(false);
            });
        } else {
            APIKit.get("/posts/by-user/me")
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

    }

    useEffect(() => {
        if (isFocused) {
            getPosts()
        }
    }, [isFocused]);

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
                <FadeText style={styles.text} text={'Record some audio and see all your posts here!'} />
            </View>
            }
        </View>
    );
};
