import React, { useEffect, useState, useContext } from "react";
import { View, Text } from "react-native";
import { RootTabScreenProps } from "../types";
import { StyleSheet } from "react-native";
import { PostFeed } from "../components/PostFeed/PostFeed";
import { APIKit, onFailure, clearUserSession } from '../shared/APIkit';
import { useIsFocused } from "@react-navigation/native";
import AppContext from "../shared/AppContext";
import { FadeText } from "../components/FadeText/FadeText";

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "white",
        flex: 1,
    },
    text: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'center'
        },
    textView: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
        },
});

export default function HomeFeed({
    navigation,
}: RootTabScreenProps<'FeedTab'>) {
    const globalCtx = useContext(AppContext);
    const [posts, setPosts] = useState<Post[] | undefined>(undefined);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

    useEffect(() => {
            getMyFeed();
    }, []);

    async function getMyFeed() {
        setIsRefreshing(true);
        APIKit.get('/posts/my-feed')
            .then((response) => {
                setPosts(response.data);
                setIsRefreshing(false);
            })
            .catch((error) => {
                onFailure(error, globalCtx);
                console.log(error && error);
                setIsRefreshing(false);
            });
    }

    async function getMyFeedMore() {
        if(!posts){
          return
        }
        setIsLoadingMore(true);
        const minDate = posts[posts.length - 1]['created_at'];
        APIKit.get('/posts/my-feed/more/' + minDate)
            .then((response) => {
                setPosts(posts.concat(response.data));
                setIsLoadingMore(false);
            })
            .catch((error) => {
                onFailure(error, globalCtx);
                console.log(error && error);
                setIsLoadingMore(false);
            });
    }

    return (
        <View style={styles.container}>
            {!posts
            ?
            <PostFeed
                posts={posts}
                onRefresh={getMyFeed}
                refreshing={isRefreshing}
                onEndReached={getMyFeedMore}
            />
            :
            <View style={styles.textView}>
                <FadeText style={styles.text}>Your feed is empty, try following some people through the search tab!</FadeText>
            </View>
            }
        </View>
    );
}