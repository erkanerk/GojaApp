import React, { useEffect, useState, useContext } from "react";
import { View, Text } from "react-native";
import { RootTabScreenProps } from "../types";
import { StyleSheet } from "react-native";
import { PostFeed } from "../components/PostFeed/PostFeed";
import { APIKit, onFailure } from "../shared/APIkit";
import { useIsFocused } from "@react-navigation/native";
import AppContext from "../shared/AppContext";

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
  },
  feedView: {
    flex: 1,
  },
  playCardView: {},
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
        //change to /posts/my-feed when you can follow someone and it works
        APIKit.get('/posts/all')
            .then((response) => {
                setPosts(response.data);
                console.log(response.data);
                const minDate = response.data[response.data.length - 1]['created_at'];
                console.log(minDate);
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
            <PostFeed
                posts={posts}
                onRefresh={getMyFeed}
                refreshing={isRefreshing}
            />
        </View>
    );
}