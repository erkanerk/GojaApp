import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { RootTabScreenProps } from '../types';
import { StyleSheet } from 'react-native';
import { ProfileInformation } from '../components/ProfileInformation/ProfileInformation';
import { APIKit, onFailure } from '../shared/APIkit';
import { LogoutButton } from '../components/Logout/LogoutButton';
import AppContext from '../shared/AppContext';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { PostFeed } from '../components/PostFeed/PostFeed';


export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
    },
    logout: {
        alignItems: 'flex-end'
    },
    profileView: {
        flex: 1,
        backgroundColor: 'green',
    },
    postsView: {
        height: 'auto',
        backgroundColor: 'red',
    },
    followersView: {
        height: 'auto',
        backgroundColor: 'red',
    },
    followingView: {
        height: 'auto',
        backgroundColor: 'red',
    },
    
});

export default function ProfilePage({ 
    navigation 
}: RootTabScreenProps<'TabFour'>) {
    const globalCtx = useContext(AppContext);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [posts, setPosts] = useState<Post[] | undefined>(undefined);
    const [user, setUser] = useState<any | undefined>(undefined);
    const [userFollowers, setUserFollowers] = useState<any | undefined>(undefined);
    const [userFollowing, setUserFollowing] = useState<any | undefined>(undefined);
    const isFocused = useIsFocused();
    const [render, setRender] = useState<string>('posts')
    const [rendered, setRendered] = useState<string>('')

    async function getUserPosts() {
        setIsLoading(true)
        APIKit.get("/posts/by-user/me")
        .then((response) => {
            console.log("Successful /users/following/me response: ")
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

    async function getUserFollowing() {
        setIsLoading(true)
        APIKit.get("/users/following/me")
        .then((response) => {
            console.log("Successful /users/following/me response: ")
            console.log(response.data)
            setUserFollowing(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            onFailure(error, globalCtx);
            console.log(error && error);
            setIsLoading(false);
        });
    }

    async function getUserFollowers() {
        setIsLoading(true)
        APIKit.get("/users/followers/me")
        .then((response) => {
            console.log("Successful /users/followers/me response: ")
            console.log(response.data)
            setUserFollowers(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            onFailure(error, globalCtx);
            console.log(error && error);
            setIsLoading(false);
        });
    }

    async function getUserInformation() {
        setIsLoading(true)
        console.log('Fetching user information')

        APIKit.get("/users/profile/me")
        .then((response) => {
            console.log("Successful /users/profile/me response: ")
            console.log(response.data)
            setUser(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            onFailure(error, globalCtx);
            console.log(error && error);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        getUserInformation()
        getUserFollowers()
        getUserFollowing()
        getUserPosts()
    }, [])

    function conditionalRender() {
        if (render == 'posts') {
            console.log("Showing posts")
            return (
            <View style={styles.postsView}>
                <Text>Posts feed here</Text>
            </View>
            )
        } else if (render == 'followers') {
            console.log("Showing followers")
            return (
            <View style={styles.followersView}>
                <Text>Following feed here</Text>
            </View>
            )
        } else if (render == 'following') {
            console.log("Showing following")
            return (
            <View style={styles.followingView}>
                <Text>Followers feed here</Text>
            </View>
            )
        }
    }

    return (
    <View style={styles.container}>
        {isLoading ? <ActivityIndicator /> : null}
        <ScrollView>
        <View style={styles.logout}>
            <LogoutButton/>
        </View>
        <View style={styles.profileView}>
            <ProfileInformation 
            user={user}
            setRender={setRender}
            />
        </View>
        {conditionalRender()}
        </ScrollView>
    </View>
    );
}
