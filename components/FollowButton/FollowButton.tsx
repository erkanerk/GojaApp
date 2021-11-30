import React, { useContext, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { APIKit, onFailure } from '../../shared/APIkit';
import AppContext from '../../shared/AppContext';

export const styles = StyleSheet.create({
    container: {
        width: 80,
    },
    following: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    followingView: {
        padding: 2,
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 30,
        backgroundColor: 'red',
        alignItems: 'center'
    },
    notFollowing: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
    },
    notFollowingView: {
        padding: 2,
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 30,
        alignItems: 'center'
    },
});

interface Props {
    user: Follower
    following?: boolean
}

export const FollowButton = ({ 
    user,
    following = false
}: Props) => {
    const globalCtx = useContext(AppContext);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isFollowing, setIsFollowing] = useState<boolean>((following || user.isMutualFollowers) ? true : false)
    
    async function followUser() {
        setIsLoading(true)
        console.log('Following user')
        const payload = { userToFollow: user._id }
        APIKit.post("/users/follow", payload)
        .then((response) => {
            console.log("Successful /users/profile/me response: ")
            console.log(response.data)
            setIsFollowing(true);
            setIsLoading(false);
        })
        .catch((error) => {
            onFailure(error, globalCtx);
            console.log(error && error);
            setIsLoading(false);
        });
    }

    async function unfollowUser() {
        setIsLoading(true)
        console.log('Unfollowing user')
        const payload = { userToUnfollow: user._id }
        APIKit.post("/users/unfollow", payload)
        .then((response) => {
            console.log("Successful /users/profile/me response: ")
            console.log(response.data)
            setIsFollowing(false);
            setIsLoading(false);
        })
        .catch((error) => {
            onFailure(error, globalCtx);
            console.log(error && error);
            setIsLoading(false);
        });
    }

    function handleOnPress() {
        if (isFollowing) {
            console.log("Unfollow button pressed")
            unfollowUser()
        } else {
            console.log("Follow button pressed")
            followUser()
            
        }
      }

    return (
    <View style={styles.container}>
        <Pressable
        onPress={handleOnPress}>
            {isFollowing
            ?
            <View style={styles.followingView}>
                <Text style={styles.following}>Unfollow</Text>
            </View>
            :
            <View style={styles.notFollowingView}>
                <Text style={styles.notFollowing}>+ Follow</Text>
            </View>
            }
        </Pressable>
    </View>
    );
}

