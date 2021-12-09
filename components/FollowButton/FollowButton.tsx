import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
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
        alignItems: 'center',
        elevation: 2,
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
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2,
    },
});

interface Props {
    userId: string
    following: boolean
    onMyProfile?: boolean
    currentCount?: number
    setCount?: Dispatch<SetStateAction<number>>
}

export const FollowButton = ({ 
    userId,
    following = false,
    onMyProfile = false,
    currentCount,
    setCount
}: Props) => {
    const globalCtx = useContext(AppContext);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isFollowing, setIsFollowing] = useState<boolean>(following)
    
    async function followUser() {
        setIsLoading(true)
        console.log('Following user')
        const payload = { userToFollow: userId }
        APIKit.post("/users/follow", payload)
        .then((response) => {
            setIsFollowing(true);
            if (currentCount && setCount && onMyProfile) {
                setCount(currentCount+1);
            }
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
        const payload = { userToUnfollow: userId }
        APIKit.post("/users/unfollow", payload)
        .then((response) => {
            setIsFollowing(false);
            if (currentCount && setCount && onMyProfile) {
                setCount(currentCount-1);
            }
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
            unfollowUser();
        } else {
            followUser();
        }
      }

    return (
    <View style={styles.container}>
        {userId === globalCtx.userInfo._id ? null : 
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
        }
    </View>
    );
}

