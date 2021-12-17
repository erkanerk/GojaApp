import React, { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native";
import { RootStackParamList } from "../types";
import { StyleSheet } from "react-native";
import { ProfileInformation } from "../components/ProfileInformation/ProfileInformation";
import { LogoutButton } from "../components/Logout/LogoutButton";
import { FollowingFeed } from "../components/FollowingFeed/FollowingFeed";
import { FollowersFeed } from "../components/FollowersFeed/FollowersFeed";
import { ProfileFeed } from '../components/ProfileFeed/ProfileFeed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { APIKit, onFailure } from "../shared/APIkit";
import AppContext from "../shared/AppContext";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    scrollView: {
    },
    profileView: {
    },
    feedView: {
        flex: 1,
    },
    postsView: {
        flex: 1,
    },
    followersView: {
        flex: 1,
    },
    followingView: {
        flex: 1,
    },
});

interface Props {
    route: RouteProp<RootStackParamList, 'ProfileScreen'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileScreen'>;
}

export default function ProfileScreen({ route, navigation }: Props) {
    const userId = route.params.userId;
    const [tab, setTab] = useState<number>(0);
    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const globalCtx = useContext(AppContext);
    const [profile, setProfile] = useState<Profile | undefined>(undefined);
    const [following, setFollowing] = useState<Following[] | undefined>(undefined);
    const [followers, setFollowers] = useState<Follower[] | undefined>(undefined);
    const [posts, setPosts] = useState<Post[] | undefined>(undefined);

    async function onRefresh() {
        setRefreshing(true);
        await getProfileInformation()
        if (tab == 0) {
            await getPosts()
        } else if (tab == 1) {
            await getFollowers()
        } else if (tab == 2) {
            await getFollowing()
        }
        setRefreshing(false);
    }

    
    function conditionalRender() {
        if (tab == 0) {
            return (
                <View style={styles.postsView}>
                    <ProfileFeed 
                    userId={userId}
                    posts={posts}
                    getPosts={getPosts} />
                </View>
            );
        } else if (tab == 1) {
            return (
                <View style={styles.followersView}>
                    <FollowersFeed 
                    userId={userId} 
                    users={followers}
                    navigation={navigation} 
                    getFollowers={getFollowers} />
                </View>
            );
        } else if (tab == 2) {
            return (
                <View style={styles.followingView}>
                    <FollowingFeed 
                    userId={userId}
                    users={following}
                    navigation={navigation}
                    getFollowing={getFollowing} />
                </View>
            );
        }
    }

    async function getPosts() {
        setIsLoading(true);
        if (userId !== globalCtx.userInfo._id) {
            APIKit.get(`/posts/by-user/${userId}`)
                .then((response) => {
                    const onlyOriginalPosts = response.data.filter(
                        (post) => post.inReplyToPostId == null
                    );
                    setPosts(onlyOriginalPosts);
                    setIsLoading(false);
                })
                .catch((error) => {
                    onFailure(error, globalCtx);
                    console.log(error && error);
                    setIsLoading(false);
                });
        } else {
            APIKit.get('/posts/by-user/me')
                .then((response) => {
                    const onlyOriginalPosts = response.data.filter(
                        (post) => post.inReplyToPostId == null
                    );
                    setPosts(onlyOriginalPosts);
                    setIsLoading(false);
                })
                .catch((error) => {
                    onFailure(error, globalCtx);
                    console.log(error && error);
                    setIsLoading(false);
                });
        }
    }

    async function getFollowers() {
        setIsLoading(true);
        if (userId != globalCtx.userInfo._id) {
            APIKit.get(`/users/followers/${userId}`)
            .then((response) => {
                setFollowers(response.data);
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
                setFollowers(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                onFailure(error, globalCtx);
                console.log(error && error);
                setIsLoading(false);
            });
        }
    }

    async function getFollowing() {
        setIsLoading(true)
        if (userId !== globalCtx.userInfo._id) {
            APIKit.get(`/users/following/${userId}`)
            .then((response) => {
                setFollowing(response.data);
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
                setFollowing(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                onFailure(error, globalCtx);
                console.log(error && error);
                setIsLoading(false);
            });
        }
        
    }

    async function getProfileInformation() {
        setIsLoading(true);
        //console.log('Fetching user information');
        if (userId !== globalCtx.userInfo._id) {
            APIKit.get(`/users/profile/${userId}`)
            .then((response) => {
                setProfile(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                onFailure(error, globalCtx);
                console.log(error && error);
                setIsLoading(false);
            });
        } else {
            APIKit.get('/users/profile/me')
            .then((response) => {
                setProfile(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                onFailure(error, globalCtx);
                console.log(error && error);
                setIsLoading(false);
            });
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.scrollView}>
                <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                >
                    <View style={styles.profileView}>                                   
                        <ProfileInformation 
                        profile={profile}
                        getProfileInformation={getProfileInformation}
                        tab={tab} 
                        setTab={setTab} 
                        userId={userId} />
                    </View>
                </ScrollView>
            </View>
            <View style={styles.feedView}>
                {conditionalRender()}
            </View>
        </View>
    );
}